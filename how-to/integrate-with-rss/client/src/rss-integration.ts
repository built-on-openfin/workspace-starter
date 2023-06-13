import type OpenFin from "@openfin/core";
import type { ChannelProvider } from "@openfin/core/src/api/interappbus/channel/provider";
import {
	ButtonStyle,
	CLITemplate,
	type HomeDispatchedSearchResult,
	type HomeSearchResponse,
	type HomeSearchResult,
	type Page,
	type TemplateFragment
} from "@openfin/workspace";
import {
	getCurrentSync,
	type BrowserCreateWindowRequest,
	type BrowserWindowModule
} from "@openfin/workspace-platform";
import {
	addEventListener as addNotificationEventListener,
	create as createNotification,
	type NotificationActionEvent
} from "@openfin/workspace/notifications";
import { XMLParser } from "fast-xml-parser";
import {
	CHANNEL_ACTIONS,
	RSS_APP_CHANNEL_NAME,
	RSS_WINDOW_NAME,
	type LayoutItemExtended,
	type RssCache,
	type RssChannelFeedSubscribePayload,
	type RssFeed,
	type RssFeedCache,
	type RssFeedCacheEntry,
	type RssSettings
} from "./shapes";

/**
 * Implement the integration provider for RSS Feeds.
 */
export class RssIntegration {
	/**
	 * The key to use for a rss feed result.
	 * @internal
	 */
	private static readonly _RSS_PROVIDER_FEED_VIEW_ACTION = "View Feed";

	/**
	 * The key to use for a rss entry result.
	 * @internal
	 */
	private static readonly _RSS_PROVIDER_ENTRY_VIEW_ACTION = "View Entry";

	/**
	 * The integration settings.
	 * @internal
	 */
	private _settings: RssSettings | undefined;

	/**
	 * The id of the timer used to poll the feeds.
	 * @internal
	 */
	private _pollingTimerId: number | undefined;

	/**
	 * The id of the timer used to poll the feeds.
	 * @internal
	 */
	private _feedsCache: RssCache;

	/**
	 * The channel for issuing feed updates.
	 */
	private _channelProvider: ChannelProvider | undefined;

	/**
	 * The subscribers for the feeds.
	 */
	private _subscribers: {
		clientId: OpenFin.Identity;
		feedIds: string[];
	}[];

	/**
	 * Create a new instance of RssIntegrationProvider.
	 */
	constructor() {
		this._feedsCache = {};
		this._subscribers = [];
	}

	/**
	 * Initialize the module.
	 * @param settings The settings for the module.
	 * @returns Nothing.
	 */
	public async initialize(settings: RssSettings): Promise<void> {
		this._settings = settings;

		if (!Array.isArray(this._settings?.feeds) || this._settings.feeds.length === 0) {
			console.warn("The RSS Feed integration has no feeds");
		} else {
			await this.loadFeeds();
			this._pollingTimerId = window.setInterval(
				async () => this.updateFeeds(),
				(this._settings?.pollingInterval ?? 60) * 1000
			);
			await this.updateFeeds();

			addNotificationEventListener("notification-action", async (event: NotificationActionEvent) => {
				if (event?.result.action === "view-entry") {
					const payload: {
						feed: Omit<RssFeedCache, "entries">;
						entry: RssFeedCacheEntry;
					} = event.result.payload;
					await this.launchFeedOrEntry(payload.feed, payload.entry);
				}
			});

			this._channelProvider = await fin.InterApplicationBus.Channel.create(RSS_APP_CHANNEL_NAME);

			this._channelProvider.register(
				CHANNEL_ACTIONS.feedSubscribe,
				async (unknownPayload: unknown, clientId: OpenFin.Identity) => {
					const payload = unknownPayload as RssChannelFeedSubscribePayload;
					let subscriber = this._subscribers.find(
						(s) => s.clientId.name === clientId.name && s.clientId.uuid === clientId.uuid
					);
					if (!subscriber) {
						subscriber = {
							clientId,
							feedIds: []
						};
						this._subscribers.push(subscriber);
						console.log(`Adding subscriber ${clientId.uuid}, ${clientId.name}`);
					}
					if (!subscriber.feedIds.includes(payload.feedId)) {
						if (this._feedsCache[payload.feedId] === undefined) {
							console.warn(
								`Trying to subscribe to unknown feed ${payload.feedId} for ${clientId.uuid}, ${clientId.name}`
							);
						} else {
							console.log(
								`Adding feed ${payload.feedId} subscription for ${clientId.uuid}, ${clientId.name}`
							);
							subscriber.feedIds.push(payload.feedId);
							await this.publishUpdate(clientId, payload.feedId);
						}
					}
				}
			);

			this._channelProvider.onDisconnection((clientId: OpenFin.Identity) => {
				const subscriberIdx = this._subscribers.findIndex(
					(s) => s.clientId.name === clientId.name && s.clientId.uuid === clientId.uuid
				);

				if (subscriberIdx >= 0) {
					console.log(`Removing subscriber ${clientId.uuid}, ${clientId.name}`);
					this._subscribers.splice(subscriberIdx, 1);
				} else {
					console.warn(`Trying to remove unknown subscriber ${clientId.uuid}, ${clientId.name}`);
				}
			});
		}
	}

	/**
	 * The module is being deregistered.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		this._feedsCache = {};
		this._subscribers = [];
		if (this._pollingTimerId) {
			window.clearInterval(this._pollingTimerId);
			this._pollingTimerId = undefined;
		}
		if (this._channelProvider) {
			this._channelProvider.remove(CHANNEL_ACTIONS.feedSubscribe);
			this._channelProvider = undefined;
		}
	}

	/**
	 * An entry has been selected.
	 * @param result The dispatched result.
	 * @returns True if the item was handled.
	 */
	public async itemSelection(result: HomeDispatchedSearchResult): Promise<boolean> {
		if (
			result.action.trigger === "user-action" &&
			((result.action.name === RssIntegration._RSS_PROVIDER_FEED_VIEW_ACTION && result.data.feed) ||
				(result.action.name === RssIntegration._RSS_PROVIDER_ENTRY_VIEW_ACTION && result.data.entry))
		) {
			await this.launchFeedOrEntry(
				result.data.feed as Omit<RssFeedCache, "entries">,
				result.data.entry as RssFeedCacheEntry
			);
			return true;
		}

		return false;
	}

	/**
	 * Get a list of search results based on the query and filters.
	 * @param query The query to search for.
	 * @returns The list of results and new filters.
	 */
	public async getSearchResults(query: string): Promise<HomeSearchResponse> {
		const results = [];

		if (query.length >= 3) {
			const re = new RegExp(query, "gi");
			const matches: {
				feed: RssFeedCache;
				entry: RssFeedCacheEntry;
			}[] = [];

			for (const feed in this._feedsCache) {
				if (re.test(this._feedsCache[feed].title)) {
					results.push(await this.createFeedResult(this._feedsCache[feed]));
				}
				for (const entryKey in this._feedsCache[feed].entries) {
					const entry = this._feedsCache[feed].entries[entryKey];

					if (re.test(entry.title) || re.test(entry.description)) {
						matches.push({
							feed: this._feedsCache[feed],
							entry
						});
					}
				}
			}

			matches.sort((a, b) => b.entry.lastUpdated - a.entry.lastUpdated);

			for (const match of matches) {
				results.push(await this.createEntryResult(match.feed, match.entry));
			}
		}

		return {
			results
		};
	}

	/**
	 * Update all the RSS feeds.
	 */
	private async updateFeeds(): Promise<void> {
		if (this._settings?.feeds) {
			for (const feed of this._settings.feeds) {
				try {
					console.log(`Retrieving RSS feed '${feed.id}' from ${feed.url}`);

					let feedResponse: Response;
					if (this._settings?.proxyUrl) {
						feedResponse = await fetch(this._settings?.proxyUrl, {
							method: "POST",
							headers: {
								"content-type": "application/json"
							},
							body: JSON.stringify({
								url: feed.url
							})
						});
					} else {
						feedResponse = await fetch(feed.url);
					}

					const feedXml = await feedResponse.text();

					const parser = new XMLParser({
						attributeNamePrefix: "",
						ignoreAttributes: false,
						parseAttributeValue: true
					});
					const feedJson = parser.parse(feedXml) as RssFeed;

					const feedDetails = feedJson?.feed ?? feedJson?.rss?.channel;

					if (feedDetails) {
						this._feedsCache[feed.id] = this._feedsCache[feed.id] ?? {
							id: feed.id,
							title: feedDetails.title ?? feed.id,
							description: feedDetails.description ?? "",
							entries: {}
						};

						const now = Date.now();

						const entryCache = this._feedsCache[feed.id].entries;

						const feedEntries = feedDetails?.item ?? feedDetails?.entry;

						if (Array.isArray(feedEntries) && feedEntries.length > 0) {
							const isNewCache = Object.keys(entryCache).length === 0;

							for (const feedEntry of feedEntries) {
								const entryId = feedEntry.id ?? feedEntry.guid?.["#text"];

								if (entryId) {
									let previousUpdated;
									if (entryCache[entryId]) {
										previousUpdated = entryCache[entryId].lastUpdated;
									}
									entryCache[entryId] = {
										id: entryId,
										title: feedEntry.title ?? feedEntry["media:group"]?.["media:title"] ?? "Untitled",
										description:
											feedEntry.description ?? feedEntry["media:group"]?.["media:description"] ?? "",
										url:
											(typeof feedEntry.link === "string" ? feedEntry.link : feedEntry.link?.href) ??
											feedEntry["media:group"]?.["media:content"]?.url ??
											"",
										thumbnailUrl: feedEntry["media:group"]?.["media:thumbnail"]?.url ?? "",
										lastUpdated: new Date(
											feedEntry.updated ?? feedEntry.pubDate ?? feedEntry.published ?? now
										).getTime()
									};

									if (previousUpdated !== undefined) {
										// If the new last updated time is greater then the previous one
										// then the entry has been updated
										if (entryCache[entryId].lastUpdated > previousUpdated) {
											await this.notify("update", this._feedsCache[feed.id], entryCache[entryId]);
										}
									} else if (!isNewCache) {
										// If there was no previous update time for this entry then it is new
										await this.notify("add", this._feedsCache[feed.id], entryCache[entryId]);
									}
								}
							}
						}
					} else {
						console.log(`Unexpected feed format retrieving '${feed.id}' from ${feed.url}`);
					}
				} catch (err) {
					console.log(`Error retrieving RSS feed '${feed.id}' from ${feed.url}`, err);
				}
			}

			await this.saveFeeds();
			await this.publishFeeds();
		}
	}

	/**
	 * Create a notification for a feed entry being updated.
	 * @param type The operation to perform.
	 * @param feed The feed.
	 * @param feedEntry The entry being updated.
	 */
	private async notify(
		type: "add" | "update",
		feed: RssFeedCache,
		feedEntry: RssFeedCacheEntry
	): Promise<void> {
		await createNotification({
			title: feed.title,
			body:
				type === "update"
					? `An entry on the feed has been updated titled '${feedEntry.title}'`
					: `A new entry has been added to the feed titled '${feedEntry.title}'`,
			toast: "transient",
			category: "default",
			template: "markdown",
			id: feedEntry.id,
			buttons: [
				{
					title: "View",
					type: "button",
					cta: true,
					onClick: {
						action: "view-entry",
						payload: {
							feed: {
								id: feed.id,
								title: feed.title
							},
							entry: feedEntry
						}
					}
				}
			]
		});
	}

	/**
	 * Create a search result for a feed.
	 * @param feed The RSS feed.
	 * @returns The search result.
	 */
	private async createFeedResult(feed: RssFeedCache): Promise<HomeSearchResult> {
		return {
			key: `rss-${feed.id}`,
			title: feed.title,
			label: "Feed",
			icon: this._settings?.icons.rss,
			actions: [
				{
					name: RssIntegration._RSS_PROVIDER_FEED_VIEW_ACTION,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: "rss",
				feed: {
					id: feed.id,
					title: feed.title
				}
			},
			template: CLITemplate.Custom,
			templateContent: {
				layout: this.getRssFeedTemplate(),
				data: {
					title: feed.title,
					description: feed.description,
					viewLabel: "View"
				}
			}
		};
	}

	/**
	 * Create a search result for an entry.
	 * @param feed The RSS feed.
	 * @param entry The RSS feed entry.
	 * @returns The search result.
	 */
	private async createEntryResult(feed: RssFeedCache, entry: RssFeedCacheEntry): Promise<HomeSearchResult> {
		return {
			key: `rss-${entry.id}`,
			title: entry.title,
			label: "Information",
			icon: this._settings?.icons.rssEntry,
			actions: [
				{
					name: RssIntegration._RSS_PROVIDER_ENTRY_VIEW_ACTION,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: "rss",
				feed: {
					id: feed.id,
					title: feed.title
				},
				entry
			},
			template: CLITemplate.Custom,
			templateContent: {
				layout: this.getRssEntryTemplate(),
				data: {
					title: entry.title,
					description:
						entry.description.length > 100 ? `${entry.description.slice(0, 100)}...` : entry.description,
					thumbnailUrl: entry.thumbnailUrl ?? "",
					viewLabel: "View"
				}
			}
		};
	}

	/**
	 * Load the feeds from storage.
	 */
	private async loadFeeds(): Promise<void> {
		const feeds = window.localStorage.getItem("rss-feed-cache");
		if (feeds) {
			this._feedsCache = JSON.parse(feeds) as RssCache;
		}
	}

	/**
	 * Save the feeds to storage.
	 */
	private async saveFeeds(): Promise<void> {
		window.localStorage.setItem("rss-feed-cache", JSON.stringify(this._feedsCache));
	}

	/**
	 * Publish the feeds to subscribers.
	 */
	private async publishFeeds(): Promise<void> {
		for (const subscriber of this._subscribers) {
			for (const feedId of subscriber.feedIds) {
				await this.publishUpdate(subscriber.clientId, feedId);
			}
		}
	}

	/**
	 * Publish the update for a client subscriptions.
	 * @param clientId The client to send the update to.
	 * @param feedId The feed that has been updated.
	 */
	private async publishUpdate(clientId: OpenFin.Identity, feedId: string): Promise<void> {
		if (this._channelProvider) {
			await this._channelProvider.dispatch(clientId, CHANNEL_ACTIONS.feedUpdate, {
				feed: this._feedsCache[feedId] ?? {}
			});
		}
	}

	/**
	 * Launch a feed or an entry.
	 * @param feed The feed to launch.
	 * @param entry The individual entry to launch.
	 */
	private async launchFeedOrEntry(
		feed: Omit<RssFeedCache, "entries">,
		entry?: RssFeedCacheEntry
	): Promise<void> {
		const platformId = fin.Platform.getCurrentSync().identity.uuid;
		const viewUrl = entry?.url ?? `${this._settings?.feedView}?feedId=${feed.id}`;
		const viewTitle = entry ? undefined : feed.title;
		const viewId = `rss-view-${entry?.id ?? feed.id}`;
		const viewTargetIdentity: OpenFin.Identity | undefined = entry
			? undefined
			: {
					name: viewId,
					uuid: platformId
			  };

		const pageId = `rss-feed-page-${feed.id}`;

		const viewDetails = await this.findAndActivateView({ name: RSS_WINDOW_NAME, uuid: platformId }, pageId, {
			name: viewId,
			uuid: platformId
		});

		const page: Page = {
			title: feed.title,
			pageId,
			iconUrl: this._settings?.icons.rss,
			layout: {
				content: [
					{
						type: "stack",
						content: [
							{
								type: "component",
								componentName: "view",
								componentState: {
									title: viewTitle,
									name: viewId,
									uuid: viewId,
									url: viewUrl
								}
							} as OpenFin.LayoutItemConfig
						]
					}
				]
			}
		};

		if (!viewDetails.window) {
			await this.launchWindow(
				{
					name: RSS_WINDOW_NAME,
					uuid: platformId,
					icon: this._settings?.icons.rss,
					workspacePlatform: {
						favicon: this._settings?.icons.rss,
						title: "RSS Feeds",
						pages: [page]
					}
				},
				true
			);
		} else if (viewDetails.window && !viewDetails.page) {
			await this.launchPage(page, {
				uuid: platformId,
				name: RSS_WINDOW_NAME
			});
		} else if (viewDetails.window && viewDetails.page && !viewDetails.view) {
			const view: OpenFin.PlatformViewCreationOptions = {
				target: viewTargetIdentity,
				name: viewTitle,
				url: viewUrl
			};

			await this.launchView(view, {
				uuid: platformId,
				name: RSS_WINDOW_NAME
			});
		}
	}

	/**
	 * Get the home template for an RSS feed.
	 * @returns The template for the home search result.
	 */
	private getRssFeedTemplate(): TemplateFragment {
		return {
			type: "Container",
			style: { display: "flex", flex: "1", flexDirection: "column", padding: "10px" },
			children: [
				{
					type: "Text",
					dataKey: "title",
					style: {
						color: "#FFFFFF",
						fontSize: "12px",
						fontWeight: "bold",
						marginBottom: "10px",
						borderBottom: "1px solid #53565F"
					}
				},
				{
					type: "Text",
					dataKey: "description",
					style: {
						display: "flex",
						flex: "1",
						fontSize: "12px"
					}
				},
				{
					type: "Container",
					style: { display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: "10px" },
					children: [
						{
							type: "Button",
							buttonStyle: ButtonStyle.Primary,
							children: [{ type: "Text", dataKey: "viewLabel", style: { fontSize: "12px" } }],
							action: RssIntegration._RSS_PROVIDER_FEED_VIEW_ACTION,
							style: { fontSize: "12px" }
						}
					]
				}
			]
		};
	}

	/**
	 * Get the home template for an RSS feed entry.
	 * @returns The template for the home search result.
	 */
	private getRssEntryTemplate(): TemplateFragment {
		return {
			type: "Container",
			style: { display: "flex", flex: "1", flexDirection: "column", padding: "10px", gap: "10px" },
			children: [
				{
					type: "Text",
					dataKey: "title",
					style: {
						color: "#FFFFFF",
						fontSize: "12px",
						fontWeight: "bold",
						marginBottom: "10px",
						borderBottom: "1px solid #53565F"
					}
				},
				{
					type: "Text",
					dataKey: "description",
					style: { fontSize: "10px", whiteSpace: "pre-wrap", display: "flex", flex: "1" }
				},
				{ type: "Image", dataKey: "thumbnailUrl", alternativeText: "Thumbnail", style: {} },
				{
					type: "Container",
					style: { display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: "10px" },
					children: [
						{
							type: "Button",
							buttonStyle: ButtonStyle.Primary,
							children: [{ type: "Text", dataKey: "viewLabel", style: { fontSize: "12px" } }],
							action: RssIntegration._RSS_PROVIDER_ENTRY_VIEW_ACTION,
							style: { fontSize: "12px" }
						}
					]
				}
			]
		};
	}

	/**
	 * Find a view in the specified window and page with the requested view.
	 * @param windowIdentity The window to find.
	 * @param pageId The page to find.
	 * @param viewIdentity The view to activate.
	 * @returns The window, page and view found during activation.
	 */
	private async findAndActivateView(
		windowIdentity: OpenFin.Identity,
		pageId: string,
		viewIdentity: OpenFin.Identity
	): Promise<{
		window?: BrowserWindowModule;
		page?: Page;
		view?: OpenFin.View;
	}> {
		const window = await this.findWindow(windowIdentity);
		let page: Page | undefined;
		let view: OpenFin.View | undefined;

		if (window) {
			await window.openfinWindow.setAsForeground();
			await window.openfinWindow.focus();

			const allPages = await window.getPages();
			for (const allPage of allPages) {
				if (allPage.pageId === pageId) {
					await window.setActivePage(pageId);

					page = allPage;

					const activeComponents: {
						currentParent?: LayoutItemExtended;
						current?: LayoutItemExtended;
						foundParent?: LayoutItemExtended;
						foundIndex?: number;
						found?: LayoutItemExtended;
					} = {};
					this.activateComponent(viewIdentity, undefined, allPage.layout.content, activeComponents);

					if (activeComponents.found) {
						if (activeComponents.foundParent) {
							if (activeComponents.currentParent) {
								// eslint-disable-next-line @typescript-eslint/no-explicit-any
								delete (activeComponents.currentParent as any).activeItemIndex;
							}
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							(activeComponents.foundParent as any).activeItemIndex = activeComponents.foundIndex;
						}

						await window.updatePage({
							pageId: allPage.pageId,
							page: allPage
						});

						const platform = getCurrentSync();
						const childWindows = await platform.Application.getChildWindows();
						for (const childWindow of childWindows) {
							const views = await childWindow.getCurrentViews();
							view = views.find(
								(v) => v.identity.name === viewIdentity.name && v.identity.uuid === viewIdentity.uuid
							);
							if (view) {
								await view.focus();
								break;
							}
						}
					}
					break;
				}
			}
		}

		return {
			window,
			page,
			view
		};
	}

	/**
	 * Find a window with the specified identity and activate it.
	 * @param windowIdentity The identity to find.
	 * @returns The window if it was found.
	 */
	private async findWindow(windowIdentity: OpenFin.Identity): Promise<BrowserWindowModule | undefined> {
		const platform = getCurrentSync();

		const windows = await platform.Browser.getAllWindows();
		for (const window of windows) {
			if (window.identity.name === windowIdentity.name && window.identity.uuid === windowIdentity.uuid) {
				await window.openfinWindow.setAsForeground();
				return window;
			}
		}
	}

	/**
	 * Launch a window with the specified options.
	 * @param options The options to launch the window with.
	 * @param reuse Reuse a window if it already exists.
	 * @returns The window that was launched.
	 */
	private async launchWindow(
		options: BrowserCreateWindowRequest,
		reuse?: boolean
	): Promise<BrowserWindowModule | undefined> {
		const platform = getCurrentSync();

		if (reuse && options?.name && options?.uuid) {
			const window = await this.findWindow({ name: options.name, uuid: options.uuid });
			if (window) {
				return window;
			}
		}

		return platform.Browser.createWindow(options);
	}

	/**
	 * Launch a page in a window.
	 * @param page The page to launch.
	 * @param targetWindowIdentity The target window to open the page in.
	 * @returns The window the page was launched in.
	 */
	private async launchPage(
		page: Page,
		targetWindowIdentity?: OpenFin.Identity
	): Promise<BrowserWindowModule | undefined> {
		if (targetWindowIdentity) {
			const window = await this.findWindow(targetWindowIdentity);
			if (window) {
				const allPages = await window.getPages();
				for (const allPage of allPages) {
					if (allPage.pageId === page.pageId) {
						await window.setActivePage(page.pageId);
						return window;
					}
				}
				await window.addPage(page);
				await window.setActivePage(page.pageId);
				return window;
			}
		}

		const platform = getCurrentSync();
		return platform.Browser.createWindow({
			workspacePlatform: {
				pages: [page]
			}
		});
	}

	/**
	 * Launch a view in the specified window.
	 * @param viewOptions The view to launch.
	 * @param targetIdentity The target window to launch the view in.
	 * @returns The view that was launched.
	 */
	private async launchView(
		viewOptions: OpenFin.PlatformViewCreationOptions,
		targetIdentity?: OpenFin.Identity
	): Promise<OpenFin.View> {
		const platform = getCurrentSync();
		return platform.createView(viewOptions, targetIdentity);
	}

	/**
	 * Activate a component in a page layout.
	 * @param viewIdentity The view to activate.
	 * @param parentComponent The parent component.
	 * @param content The content of the layout.
	 * @param activeComponents The active components.
	 * @param activeComponents.currentParent The parent.
	 * @param activeComponents.current The current component.
	 * @param activeComponents.foundParent The parent it was found in.
	 * @param activeComponents.foundIndex The index of the item in the parent.
	 * @param activeComponents.found The item that was found.
	 */
	private activateComponent(
		viewIdentity: OpenFin.Identity,
		parentComponent: LayoutItemExtended | undefined,
		content: OpenFin.LayoutContent | undefined,
		activeComponents: {
			currentParent?: LayoutItemExtended;
			current?: LayoutItemExtended;
			foundParent?: LayoutItemExtended;
			foundIndex?: number;
			found?: LayoutItemExtended;
		}
	): void {
		if (content) {
			for (let i = 0; i < content.length; i++) {
				const component = content[i];
				if (component.type === "column" || component.type === "row" || component.type === "stack") {
					this.activateComponent(viewIdentity, component, component.content, activeComponents);
				} else {
					// If its not column, row or stack it must be extended
					const extended = component as OpenFin.LayoutComponent & {
						componentState: { uuid: string; target?: OpenFin.Identity };
					};

					const mainIdentityMatch =
						extended.componentState.name === viewIdentity.name &&
						extended.componentState.uuid === viewIdentity.uuid;

					const targetIdentityMatch =
						extended.componentState.target?.name === viewIdentity.name &&
						extended.componentState?.target.uuid === viewIdentity.uuid;

					if (mainIdentityMatch || targetIdentityMatch) {
						activeComponents.found = component;
						activeComponents.foundIndex = i;
						activeComponents.foundParent = parentComponent;
					} else if (
						(parentComponent?.type === "column" ||
							parentComponent?.type === "row" ||
							parentComponent?.type === "stack") &&
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						(parentComponent as any).activeItemIndex >= 0
					) {
						activeComponents.current = component;
						activeComponents.currentParent = parentComponent;
					}
				}
			}
		}
	}
}
