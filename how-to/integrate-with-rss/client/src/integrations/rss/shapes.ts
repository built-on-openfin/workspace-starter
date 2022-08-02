export interface RssLink {
	href?: string;
	rel?: string;
}

export interface RssAuthor {
	name?: string;
	uri?: string;
}

export interface RssFeedEntry {
	id: string;
	guid?: {
		isPermalink: string;
		"#text": string;
	};
	title?: string;
	link?: RssLink | string;
	description?: string;
	author?: RssAuthor;
	pubDate?: string;
	published?: string;
	updated?: string;
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

export interface RssFeedDetails {
	id?: string;
	title?: string;
	author?: RssAuthor;
	link?: RssLink | string;
	published?: string;
	pubDate?: string;
	entry?: RssFeedEntry[];
	item?: RssFeedEntry[];
}

export interface RssFeed {
	feed?: RssFeedDetails;
	rss?: {
		channel?: RssFeedDetails;
	};
}

export interface RssFeedCacheEntry {
	id: string;
	title: string;
	description: string;
	url: string;
	thumbnailUrl?: string;
	lastUpdated: number;
}

export interface RssFeedCache {
	[id: string]: {
		title: string;
		entries: { [entryId: string]: RssFeedCacheEntry };
	};
}

export interface RssFeedConfig {
	id: string;
	url: string;
}

export interface RssFeedSettings {
	rootUrl: string;
	proxyUrl: string;
	feeds: RssFeedConfig[];
	pollingInterval?: number;
}
