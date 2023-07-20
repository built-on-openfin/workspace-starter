import type OpenFin from "@openfin/core";

/**
 * Definition of the custom settings
 */
export interface CustomSettings {
	/**
	 * The settings for RSS.
	 */
	rss?: RssSettings;
}

/**
 * The settings for the RSS integration.
 */
export interface RssSettings {
	/**
	 * Icons for display.
	 */
	icons: {
		[id: string]: string;
	};
	/**
	 * The url for the proxy.
	 */
	proxyUrl: string;

	/**
	 * The view to launch for a feed.
	 */
	feedView: string;

	/**
	 * The feeds to monitor.
	 */
	feeds: RssFeedSettings[];

	/**
	 * Interval for polling the feeds.
	 */
	pollingInterval?: number;
}

/**
 * Settings for a feed.
 */
export interface RssFeedSettings {
	/**
	 * The feed id.
	 */
	id: string;

	/**
	 * The url for the feed.
	 */
	url: string;
}

/**
 * Create a combined type for all the layout items.
 */
export type LayoutItemExtended =
	| OpenFin.LayoutItemConfig
	| OpenFin.LayoutRow
	| OpenFin.LayoutColumn
	| OpenFin.LayoutComponent;

/**
 * A link in a RSS item.
 */
export interface RssLink {
	/**
	 * The href for the link.
	 */
	href?: string;
	/**
	 * The rel type for the link.
	 */
	rel?: string;
}

/**
 * The author if the feed.
 */
export interface RssAuthor {
	/**
	 * The name of the author.
	 */
	name?: string;
	/**
	 * The resource locator for the author.
	 */
	uri?: string;
}

/**
 * An entry in an RSS feed.
 */
export interface RssFeedEntry {
	/**
	 * The id of the entry.
	 */
	id: string;
	/**
	 * The guid for the entry.
	 */
	guid?: {
		isPermalink: string;
		"#text": string;
	};
	/**
	 * The title.
	 */
	title?: string;
	/**
	 * The link to the feed item.
	 */
	link?: RssLink | string;
	/**
	 * Description for the item.
	 */
	description?: string;
	/**
	 * The author of the item.
	 */
	author?: RssAuthor;
	/**
	 * The published date of the item.
	 */
	pubDate?: string;
	/**
	 * Alternate published date for the item.
	 */
	published?: string;
	/**
	 * When the item was updated.
	 */
	updated?: string;
	/**
	 * Media items such as images.
	 */
	"media:group"?: {
		"media:title"?: string;
		"media:description"?: string;
		"media:content"?: {
			url: string;
			type: string;
			width: string;
			height: string;
		};
		"media:thumbnail"?: {
			url: string;
			width: string;
			height: string;
		};
	};
}

/**
 * Details for the feed.
 */
export interface RssFeedDetails {
	/**
	 * The feed id.
	 */
	id?: string;
	/**
	 * Title of the feed.
	 */
	title?: string;
	/**
	 * Description of the feed.
	 */
	description?: string;
	/**
	 * Author of the feed.
	 */
	author?: RssAuthor;
	/**
	 * Link to the feed content.
	 */
	link?: RssLink | string;
	/**
	 * The date of the feed publish.
	 */
	published?: string;
	/**
	 * The published date of the feed.
	 */
	pubDate?: string;
	/**
	 * The entries in the feed.
	 */
	entry?: RssFeedEntry[];
	/**
	 * Alternate items in the feed.
	 */
	item?: RssFeedEntry[];
}

/**
 * Feed container.
 */
export interface RssFeed {
	/**
	 * The feed details.
	 */
	feed?: RssFeedDetails;
	/**
	 * The RSS header.
	 */
	rss?: {
		channel?: RssFeedDetails;
	};
}

/**
 * The cache of all the feeds.
 */
export interface RssCache {
	[id: string]: RssFeedCache;
}

/**
 * The cache for a feed.
 */
export interface RssFeedCache {
	/**
	 * The id of the feed.
	 */
	id: string;
	/**
	 * The title of the feed.
	 */
	title: string;
	/**
	 * The description of the feed.
	 */
	description: string;
	/**
	 * The entries in the feed.
	 */
	entries: { [entryId: string]: RssFeedCacheEntry };
}

/**
 * Cache entry for processed items.
 */
export interface RssFeedCacheEntry {
	/**
	 * The id of the cached item.
	 */
	id: string;
	/**
	 * The title of the cached item.
	 */
	title: string;
	/**
	 * The description of the cached item.
	 */
	description: string;
	/**
	 * The url for the cached item.
	 */
	url: string;
	/**
	 * Optional thumbnail.
	 */
	thumbnailUrl?: string;
	/**
	 * Timestamp the item was last updated.
	 */
	lastUpdated: number;
}

/**
 * The RSS feed channel name.
 */
export const RSS_APP_CHANNEL_NAME = "rss-feed";

/**
 * The RSS feed main window name.
 */
export const RSS_WINDOW_NAME = "internal-generated-window-rss-feed";

/**
 * The interop channel actions.
 */
export const CHANNEL_ACTIONS = {
	feedSubscribe: "feed-subscribe",
	feedUpdate: "feed-update"
};

/**
 * Payload for the channel subscribe action.
 */
export interface RssChannelFeedSubscribePayload {
	/**
	 * The id of the feed being subscribed.
	 */
	feedId: string;
}

/**
 * Payload for the channel update action.
 */
export interface RssChannelFeedUpdatePayload {
	/**
	 * The id of the feed being updated.
	 */
	feed: RssFeedCache;
}
