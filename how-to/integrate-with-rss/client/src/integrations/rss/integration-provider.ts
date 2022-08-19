import {
	CLITemplate,
	HomeSearchResult,
	Page,
	type CLIFilter,
	type HomeDispatchedSearchResult,
	type HomeSearchListenerResponse,
	type HomeSearchResponse
} from "@openfin/workspace";
import { LayoutComponentExtended } from "@openfin/workspace-platform/client-api/src";
import {
	addEventListener as addNotificationEventListener,
	create as createNotification,
	NotificationActionEvent
} from "@openfin/workspace/notifications";
import { XMLParser } from "fast-xml-parser";
import type { Integration, IntegrationManager, IntegrationModule } from "../../integrations-shapes";
import {
	CHANNEL_ACTIONS,
	RssCache,
	RssChannelFeedSubscribePayload,
	RssFeed,
	RssFeedCache,
	RssFeedCacheEntry,
	RssFeedSettings
} from "./shapes";
import { getRssEntryTemplate, getRssFeedTemplate } from "./templates";

/**
 * Implement the integration provider for RSS Feeds.
 */
export class RssIntegrationProvider implements IntegrationModule<RssFeedSettings> {
	/**
	 * Provider id.
	 * @internal
	 */
	private static readonly _PROVIDER_ID = "rss";

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
	 * The name to use for the rss feed application channel.
	 * @internal
	 */
	private static readonly _RSS_APP_CHANNEL_NAME = "rss-feed";

	/**
	 * The window name.
	 * @internal
	 */
	private static readonly _RSS_WINDOW_NAME = "internal-generated-window-rss-feed";

	/**
	 * The integration manager.
	 * @internal
	 */
	private _integrationManager: IntegrationManager | undefined;

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
	private _channelProvider: OpenFin.ChannelProvider | undefined;

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
	 * The module is being registered.
	 * @param integrationManager The manager for the integration.
	 * @param integration The integration details.
	 * @returns Nothing.
	 */
	public async register(
		integrationManager: IntegrationManager,
		integration: Integration<RssFeedSettings>
	): Promise<void> {
		this._integrationManager = integrationManager;

		if (!Array.isArray(integration.data?.feeds) || integration.data.feeds.length === 0) {
			console.warn("The RSS Feed integration has no feeds");
		} else {
			await this.loadFeeds();
			this._pollingTimerId = window.setInterval(
				async () => this.updateFeeds(integration),
				(integration.data?.pollingInterval ?? 60) * 1000
			);
			await this.updateFeeds(integration);

			addNotificationEventListener(
				"notification-action",
				async (
					event: NotificationActionEvent<{
						action: string;
						payload: {
							feed: Omit<RssFeedCache, "entries">;
							entry: RssFeedCacheEntry;
						};
					}>
				) => {
					if (event?.result.action === "view-entry") {
						const payload = event.result.payload;
						await this.launchFeedOrEntry(integration, payload.feed, payload.entry);
					}
				}
			);

			this._channelProvider = await fin.InterApplicationBus.Channel.create(
				RssIntegrationProvider._RSS_APP_CHANNEL_NAME
			);

			this._channelProvider.register(
				CHANNEL_ACTIONS.feedSubscribe,
				async (payload: RssChannelFeedSubscribePayload, clientId: OpenFin.Identity) => {
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
	 * @param integration The integration details.
	 * @returns Nothing.
	 */
	public async deregister(integration: Integration<RssFeedSettings>): Promise<void> {
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
	 * @param integration The integration details.
	 * @param result The dispatched result.
	 * @param lastResponse The last response.
	 * @returns True if the item was handled.
	 */
	public async itemSelection(
		integration: Integration<RssFeedSettings>,
		result: HomeDispatchedSearchResult,
		lastResponse: HomeSearchListenerResponse
	): Promise<boolean> {
		if (
			result.action.trigger === "user-action" &&
			((result.action.name === RssIntegrationProvider._RSS_PROVIDER_FEED_VIEW_ACTION && result.data.feed) ||
				(result.action.name === RssIntegrationProvider._RSS_PROVIDER_ENTRY_VIEW_ACTION &&
					result.data.entry)) &&
			this._integrationManager.launchWindow &&
			this._integrationManager.launchPage &&
			this._integrationManager.launchView
		) {
			await this.launchFeedOrEntry(
				integration,
				result.data.feed as Omit<RssFeedCache, "entries">,
				result.data.entry as RssFeedCacheEntry
			);
			return true;
		}

		return false;
	}

	/**
	 * Get a list of search results based on the query and filters.
	 * @param integration The integration details.
	 * @param query The query to search for.
	 * @param filters The filters to apply.
	 * @param lastResponse The last search response used for updating existing results.
	 * @returns The list of results and new filters.
	 */
	public async getSearchResults(
		integration: Integration<RssFeedSettings>,
		query: string,
		filters: CLIFilter[],
		lastResponse: HomeSearchListenerResponse
	): Promise<HomeSearchResponse> {
		const results = [];

		if (query.length >= 3) {
			const re = new RegExp(query, "gi");
			const matches: {
				feed: RssFeedCache;
				entry: RssFeedCacheEntry;
			}[] = [];

			for (const feed in this._feedsCache) {
				if (re.test(this._feedsCache[feed].title)) {
					results.push(await this.createFeedResult(integration, this._feedsCache[feed]));
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
				results.push(await this.createEntryResult(integration, match.feed, match.entry));
			}
		}

		return {
			results
		};
	}

	/**
	 * Update all the RSS feeds.
	 * @param integration The integration details.
	 */
	private async updateFeeds(integration: Integration<RssFeedSettings>): Promise<void> {
		for (const feed of integration.data.feeds) {
			try {
				console.log(`Retrieving RSS feed '${feed.id}' from ${feed.url}`);

				let feedResponse: Response;
				if (integration.data?.proxyUrl) {
					feedResponse = await fetch(integration.data?.proxyUrl, {
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
									description: feedEntry.description ?? feedEntry["media:group"]?.["media:description"] ?? "",
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

	/**
	 * Create a notification for a feed entry being updated.
	 * @param feedTitle The title of the feed.
	 * @param feedEntry The entry being updated.
	 */
	private async notify(type: "add" | "update", feed: RssFeedCache, feedEntry: RssFeedCacheEntry) {
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
	 * @param integration The integration details.
	 * @param feed The RSS feed.
	 * @returns The search result.
	 */
	private async createFeedResult(
		integration: Integration<RssFeedSettings>,
		feed: RssFeedCache
	): Promise<HomeSearchResult> {
		return {
			key: `rss-${feed.id}`,
			title: feed.title,
			label: "Feed",
			icon: `${integration.data.rootUrl}assets/rss.svg`,
			actions: [
				{
					name: RssIntegrationProvider._RSS_PROVIDER_FEED_VIEW_ACTION,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: RssIntegrationProvider._PROVIDER_ID,
				feed: {
					id: feed.id,
					title: feed.title
				}
			},
			template: CLITemplate.Custom,
			templateContent: {
				layout: await getRssFeedTemplate({
					viewAction: RssIntegrationProvider._RSS_PROVIDER_FEED_VIEW_ACTION
				}),
				data: {
					titleLabel: "Title",
					title: feed.title,
					viewLabel: "View"
				}
			}
		};
	}

	/**
	 * Create a search result for an entry.
	 * @param integration The integration details.
	 * @param feed The RSS feed.
	 * @param entry The RSS feed entry.
	 * @returns The search result.
	 */
	private async createEntryResult(
		integration: Integration<RssFeedSettings>,
		feed: RssFeedCache,
		entry: RssFeedCacheEntry
	): Promise<HomeSearchResult> {
		return {
			key: `rss-${entry.id}`,
			title: entry.title,
			label: "Information",
			icon: `${integration.data.rootUrl}assets/rss-entry.svg`,
			actions: [
				{
					name: RssIntegrationProvider._RSS_PROVIDER_ENTRY_VIEW_ACTION,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: RssIntegrationProvider._PROVIDER_ID,
				feed: {
					id: feed.id,
					title: feed.title
				},
				entry
			},
			template: CLITemplate.Custom,
			templateContent: {
				layout: await getRssEntryTemplate({
					viewAction: RssIntegrationProvider._RSS_PROVIDER_ENTRY_VIEW_ACTION
				}),
				data: {
					titleLabel: "Title",
					title: entry.title,
					descriptionLabel: "Description",
					description:
						entry.description.length > 100 ? `${entry.description.slice(0, 100)}...` : entry.description,
					thumbnailUrl: entry.thumbnailUrl,
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
	 * @param integration The integration details.
	 * @param feed The feed to launch.
	 * @param entry The individual entry to launch.
	 */
	private async launchFeedOrEntry(
		integration: Integration<RssFeedSettings>,
		feed: Omit<RssFeedCache, "entries">,
		entry?: RssFeedCacheEntry
	): Promise<void> {
		const platformId = fin.Platform.getCurrentSync().identity.uuid;
		const viewUrl = entry?.url ?? `${integration.data?.feedView}?feedId=${feed.id}`;
		const viewTitle = entry ? undefined : feed.title;
		const viewId = `rss-view-${entry?.id ?? feed.id}`;
		const viewTargetIdentity = entry
			? null
			: {
					name: viewId,
					uuid: platformId
			  };

		const pageId = `rss-feed-page-${feed.id}`;

		const viewDetails = await this._integrationManager.findAndActivateView(
			{ name: RssIntegrationProvider._RSS_WINDOW_NAME, uuid: platformId },
			pageId,
			{
				name: viewId,
				uuid: platformId
			}
		);

		const page: Page = {
			title: feed.title,
			pageId,
			iconUrl: `${integration.data.rootUrl}assets/rss.svg`,
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
							} as LayoutComponentExtended
						]
					}
				]
			}
		};

		if (!viewDetails.window) {
			await this._integrationManager.launchWindow(
				{
					name: RssIntegrationProvider._RSS_WINDOW_NAME,
					uuid: platformId,
					icon: `${integration.data.rootUrl}assets/rss.svg`,
					workspacePlatform: {
						favicon: `${integration.data.rootUrl}assets/rss.svg`,
						title: "RSS Feeds",
						pages: [page]
					}
				},
				true
			);
		} else if (viewDetails.window && !viewDetails.page) {
			await this._integrationManager.launchPage(page, {
				uuid: platformId,
				name: RssIntegrationProvider._RSS_WINDOW_NAME
			});
		} else if (viewDetails.window && viewDetails.page && !viewDetails.view) {
			const view: OpenFin.PlatformViewCreationOptions = {
				target: viewTargetIdentity,
				name: viewTitle,
				url: viewUrl
			};

			await this._integrationManager.launchView(view, {
				uuid: platformId,
				name: RssIntegrationProvider._RSS_WINDOW_NAME
			});
		}
	}
}
