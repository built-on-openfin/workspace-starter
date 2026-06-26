/* eslint-disable @typescript-eslint/consistent-type-definitions */
import {
	type AIContextResponse,
	type ContextChangedOptions,
	type ContextProviderType,
	type GetAIContextOptions,
	type PageStateRecord,
	useAIContext
} from "@openfin/ai-context";
import type OpenFin from "@openfin/core";
import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { Logger } from "here-workspace-starter/shapes/logger-shapes";

/**
 * Optional filter for which view URLs may contribute to AI context (aligned with cloud-platform's useAiContext).
 * Return true to include the view. Default: include all views.
 */
export type IsAIContextPermitted = (url: string) => boolean | Promise<boolean>;

/**
 * Options used to initialize {@link AIContextProvider.initialize}.
 */
export type AIContextProviderInit = {
	getPlatform: () => WorkspacePlatformModule;
	logger: Logger;
	enabled?: boolean;
	/** Optional: filter view identities by URL (e.g. domain allow-list). Default: permit all. */
	isAIContextPermitted?: IsAIContextPermitted;
};

let instance: AIContextProvider | undefined;

/**
 * Singleton that wraps @openfin/ai-context (useAIContext) and exposes getAIContext(winIdentity)
 * and fireContextChanged(windowId, pageId). Aligned with cloud-platform and @openfin/ai-context API:
 * - getAIContext: passes pageState (singular), viewIdentities, contextProviders, windowId.
 * - fireContextChanged: builds ContextChangedOptions { pageStates, newOptions } (package debounces).
 * Lifecycle subscriptions (workspace-changed, page-changed) are not in starter.
 * Window view-event listeners are set up via setupWinListeners (called from platform override createWindow).
 */
const DEFAULT_CONTEXT_PROVIDERS: ContextProviderType[] = ["readability", "screenshot"];

const WIN_VIEW_EVENTS = [
	"view-attached",
	"view-shown",
	"view-hidden",
	"view-destroyed",
	"view-url-changed",
	"view-page-title-updated",
	"view-added-to-layout",
	"view-removed-from-layout"
] as const;

/**
 * Default URL filter: allow all views to contribute AI context.
 * @param _url View URL (unused).
 * @returns Always true.
 */
function defaultPermitAllUrl(_url: string): boolean {
	return true;
}

/**
 * Bridges workspace platform windows/pages to @openfin/ai-context.
 */
export class AIContextProvider {
	private _getAIContext?: Awaited<ReturnType<typeof useAIContext>>["getAIContext"];

	private _fireContextChanged?: Awaited<ReturnType<typeof useAIContext>>["fireContextChanged"];

	private _getPlatform: (() => WorkspacePlatformModule) | undefined;

	private _logger: Logger | undefined;

	private _enabled = false;

	private _isAIContextPermitted: IsAIContextPermitted;

	private readonly _windows = new Set<string>();

	/**
	 * Use {@link AIContextProvider.get}; prevents external instantiation.
	 */
	private constructor() {
		this._isAIContextPermitted = defaultPermitAllUrl;
	}

	/**
	 * Returns the shared provider instance, creating it on first use.
	 * @returns The singleton instance.
	 */
	public static get(): AIContextProvider {
		if (!instance) {
			instance = new AIContextProvider();
		}
		return instance;
	}

	/**
	 * Clears singleton state (e.g. for tests).
	 */
	public static reset(): void {
		if (instance) {
			instance._windows.clear();
		}
		instance = undefined;
	}

	/**
	 * Loads @openfin/ai-context when enabled and stores platform/logger references.
	 * @param init Initialization options.
	 * @returns Resolves when setup completes.
	 */
	public async initialize(init: AIContextProviderInit): Promise<void> {
		this._getPlatform = init.getPlatform;
		this._logger = init.logger;
		this._enabled = Boolean(init.enabled);
		this._isAIContextPermitted = init.isAIContextPermitted ?? defaultPermitAllUrl;
		if (!this._enabled) {
			this._logger?.info("AI context disabled, skipping useAIContext");
			return;
		}
		try {
			const { getAIContext, fireContextChanged } = await useAIContext({
				fin: fin as unknown as Parameters<typeof useAIContext>[0]["fin"],
				logger: (msg: unknown, ...args: unknown[]): void => {
					this._logger?.info(String(msg), ...args);
				}
			});
			this._getAIContext = getAIContext;
			this._fireContextChanged = fireContextChanged;
			this._logger?.info("AIContextProvider: useAIContext ready");
		} catch (err) {
			this._logger?.info("AIContextProvider: @openfin/ai-context not available", err);
		}
	}

	/**
	 * Whether AI context calls are active (enabled and package initialized).
	 * @returns True when getAIContext can run against the real implementation.
	 */
	public isEnabled(): boolean {
		return this._enabled && Boolean(this._getAIContext);
	}

	/**
	 * Get AI context for a window. Aligned with cloud-platform flow: resolve window, getPageStates,
	 * find active page, getViewIdentities (with optional URL filter), then call package getAIContext.
	 * When the request is from the AI center window we use last focused content window so we scrape
	 * the tab the user was viewing (e.g. participant-selection with dom-sender).
	 * @param winIdentity Window to resolve context for.
	 * @returns AI context payload or a placeholder when unavailable.
	 */
	public async getAIContext(winIdentity: OpenFin.Identity): Promise<AIContextResponse> {
		if (!this._getAIContext || !this._getPlatform) {
			return this.placeholderResponse();
		}
		const platform = this._getPlatform();
		let windowId = winIdentity;

		let pageStates: PageStateRecord[];
		try {
			pageStates = await this.getPageStates(windowId);
		} catch {
			pageStates = [];
		}
		// No pages for this window: fall back to last focused (e.g. AI panel in own window).
		if (pageStates.length === 0) {
			const lastFocused = await platform.Browser.getLastFocusedWindow();
			if (lastFocused?.uuid && lastFocused?.name) {
				this._logger?.debug("getAIContext: no pages for requested window, using last focused", {
					requested: winIdentity,
					lastFocused
				});
				windowId = lastFocused;
				try {
					pageStates = await this.getPageStates(windowId);
				} catch {
					pageStates = [];
				}
			}
		}

		const pageState = pageStates.find((p) => p.isActive) ?? pageStates[0];
		if (!pageState) {
			this._logger?.warn("getAIContext: no active page for window, returning placeholder");
			return this.placeholderResponse();
		}

		let viewIdentities: OpenFin.Identity[];
		try {
			viewIdentities = await this.getViewIdentities(windowId);
		} catch {
			viewIdentities = [];
		}
		if (viewIdentities.length === 0) {
			this._logger?.debug("getAIContext: no view identities");
		}

		try {
			const options: GetAIContextOptions = {
				windowId,
				pageState,
				viewIdentities,
				contextProviders: DEFAULT_CONTEXT_PROVIDERS
			};
			this._logger?.info("getAIContext: getting AI context", { windowId, pageState: pageState.pageId });
			// eslint-disable-next-line @typescript-eslint/return-await
			return await this._getAIContext(options);
		} catch (err) {
			this._logger?.warn("AIContextProvider getAIContext failed", err);
			return this.placeholderResponse();
		}
	}

	/**
	 * Notify that context changed (e.g. after setActivePage). Calls ai-context fireContextChanged with
	 * ContextChangedOptions { pageStates, newOptions }. Package debounces internally.
	 * @param windowId Window whose context changed.
	 * @param pageId Optional page id; defaults to active page.
	 */
	public fireContextChanged(windowId: OpenFin.Identity, pageId?: string): void {
		if (!this._getPlatform) {
			return;
		}
		const fireContextChanged = this._fireContextChanged;
		// Fire-and-forget; errors are logged in catch.
		this.buildContextChangedOptions(windowId, pageId)
			.then(async (opts) => {
				if (!opts) {
					return null;
				}
				if (fireContextChanged) {
					await fireContextChanged(opts);
				}
				return null;
			})
			.catch((err) => {
				this._logger?.warn("fireContextChanged failed", err);
			});
	}

	/**
	 * Set up window/view event listeners so context is refreshed when views change.
	 * Call from platform override createWindow to ensure every new window is wired up.
	 * @param windowId Window identity to subscribe to.
	 * @returns Resolves when listeners are registered.
	 */
	public async setupWinListeners(windowId: OpenFin.Identity): Promise<void> {
		await this.setupWindowListeners(windowId);
	}

	/**
	 * Empty AI context response used when the feature is off or calls fail.
	 * @returns Placeholder response object.
	 */
	private placeholderResponse(): AIContextResponse {
		return { currentContext: undefined, results: {} } as unknown as AIContextResponse;
	}

	/**
	 * Get page states for a window (aligned with cloud-platform #getPageStates).
	 * Uses platform Browser.wrapSync(winIdentity).getPages() and getActivePage when available.
	 * @param windowIdentity Host browser window.
	 * @returns Page state records for the window.
	 */
	private async getPageStates(windowIdentity: OpenFin.Identity): Promise<PageStateRecord[]> {
		const platform = this._getPlatform?.();
		if (!platform) {
			return [];
		}
		const browserWindow = platform.Browser.wrapSync(windowIdentity);
		const pages = await browserWindow.getPages();
		const activePageId =
			(await (browserWindow as { getActivePage?: () => Promise<string> }).getActivePage?.()) ??
			pages[0]?.pageId;
		return pages.map((p) => {
			const layout = p.layout as { children?: unknown[] } | undefined;
			const attached = p as { iconUrl?: string; title?: string };
			return {
				pageId: p.pageId,
				isActive: p.pageId === activePageId,
				attachedPageType: (layout?.children?.length
					? "multiView"
					: "singleView") as PageStateRecord["attachedPageType"],
				...(attached.title && { title: attached.title }),
				...(attached.iconUrl && { faviconUrl: attached.iconUrl })
			};
		});
	}

	/**
	 * Get view identities for a window, filtered by business logic captured in this._isAIContextPermitted().
	 * @param windowIdentity Host window identity.
	 * @returns Allowed view identities for AI context.
	 */
	private async getViewIdentities(windowIdentity: OpenFin.Identity): Promise<OpenFin.Identity[]> {
		const views = await fin.Platform.Layout.wrapSync(windowIdentity).getCurrentViews();
		const viewIdentities: OpenFin.Identity[] = [];
		await Promise.all(
			views.map(async (v) => {
				const info = await v.getInfo();
				const aiContextPermitted = await this._isAIContextPermitted(info.url);
				if (aiContextPermitted) {
					viewIdentities.push(v.identity);
				}
			})
		);

		return viewIdentities;
	}

	/**
	 * Loads page states and view identities for a window in parallel.
	 * @param winIdentity Window identity.
	 * @returns Combined page and view data.
	 */
	private async getPageStatesAndViewIdentities(
		winIdentity: OpenFin.Identity
	): Promise<{ pageStates: PageStateRecord[]; viewIdentities: OpenFin.Identity[] }> {
		const [pageStates, viewIdentities] = await Promise.all([
			this.getPageStates(winIdentity),
			this.getViewIdentities(winIdentity)
		]);
		return { pageStates, viewIdentities };
	}

	/**
	 * Builds options for fireContextChanged from current window state.
	 * @param windowId Window identity.
	 * @param pageId Optional page id.
	 * @returns Options for the ai-context package, or undefined if no page.
	 */
	private async buildContextChangedOptions(
		windowId: OpenFin.Identity,
		pageId?: string
	): Promise<ContextChangedOptions | undefined> {
		const { pageStates, viewIdentities } = await this.getPageStatesAndViewIdentities(windowId);
		const pageState = pageStates.find((p) => (pageId ? p.pageId === pageId : p.isActive)) ?? pageStates[0];
		if (!pageState) {
			this._logger?.debug("fireContextChanged: no active page");
			return undefined;
		}
		return {
			pageStates,
			newOptions: {
				windowId,
				pageState,
				viewIdentities,
				contextProviders: [...DEFAULT_CONTEXT_PROVIDERS]
			}
		};
	}

	/**
	 * Registers view lifecycle listeners and cleans them up when the window closes.
	 * @param windowId Window to wire.
	 * @returns Resolves when registration completes.
	 */
	private async setupWindowListeners(windowId: OpenFin.Identity): Promise<void> {
		if (this._windows.has(windowId.name)) {
			return;
		}
		try {
			this._windows.add(windowId.name);
			const win = fin.Window.wrapSync(windowId);
			const cleanupListeners = await Promise.all(
				WIN_VIEW_EVENTS.map(async (eventName) => this.attachWinViewEventListener(win, windowId, eventName))
			);
			await win.once("closed", async () => {
				await Promise.allSettled(cleanupListeners.map(async (c) => c()));
				this._windows.delete(windowId.name);
			});
			this._logger?.info("setupWinListeners: listeners set up for window", windowId.name);
		} catch (e) {
			this._windows.delete(windowId.name);
			this._logger?.warn("setupWinListeners: error setting up listeners for window", windowId.name, e);
		}
	}

	/**
	 * Subscribes to one view event and returns a cleanup function.
	 * @param win Wrapped OpenFin window.
	 * @param windowId Identity used when emitting context changes.
	 * @param eventName View event name.
	 * @returns Cleanup that removes the listener.
	 */
	private async attachWinViewEventListener(
		win: OpenFin.Window,
		windowId: OpenFin.Identity,
		eventName: (typeof WIN_VIEW_EVENTS)[number]
	): Promise<() => Promise<void>> {
		/**
		 * Emits a context-changed signal for this window.
		 */
		const emitContextChanged = (): void => {
			this.fireContextChanged(windowId);
		};
		/**
		 * Forwards a view lifecycle event to the context pipeline.
		 */
		function onViewEvent(): void {
			emitContextChanged();
		}
		await win.on(eventName, onViewEvent);
		return async (): Promise<void> => {
			await win.removeListener(eventName, onViewEvent);
		};
	}
}
