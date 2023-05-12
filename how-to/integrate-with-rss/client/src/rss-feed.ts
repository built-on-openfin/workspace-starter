import {
	CHANNEL_ACTIONS,
	RSS_APP_CHANNEL_NAME,
	RSS_WINDOW_NAME,
	type RssChannelFeedUpdatePayload,
	type RssFeedCache,
	type RssFeedCacheEntry
} from "./shapes";

/**
 * This code is for the rss-view.html that gets launched when you view a whole RSS feed.
 */
window.addEventListener("DOMContentLoaded", async () => initialize());

/**
 * Initialize the connection to the inter application bus.
 */
async function initialize(): Promise<void> {
	const url = new URL(window.location.href);

	const feedId = url.searchParams.get("feedId");

	if (!feedId) {
		console.error("No feedId was passed as a query param");
	}

	const channel = await fin.InterApplicationBus.Channel.connect(RSS_APP_CHANNEL_NAME);

	channel.register(CHANNEL_ACTIONS.feedUpdate, async (unknownPayload) => {
		const payload = unknownPayload as RssChannelFeedUpdatePayload;
		if (payload?.feed) {
			await updateFeed(payload?.feed);
		}
	});

	await channel.dispatch(CHANNEL_ACTIONS.feedSubscribe, {
		feedId
	});
}

/**
 * Update the feed in the DOM.
 * @param feed The feed to display in the DOM.
 */
async function updateFeed(feed: RssFeedCache): Promise<void> {
	if (feed.title) {
		document.title = feed.title;
		const titleElem = document.querySelector("#feed-title");
		if (titleElem) {
			titleElem.textContent = feed.title;
		}

		const entries: RssFeedCacheEntry[] = [];
		for (const entry in feed.entries) {
			entries.push(feed.entries[entry]);
		}
		entries.sort((a, b) => b.lastUpdated - a.lastUpdated);

		const feedContainer = document.querySelector("#feed-container");
		if (feedContainer) {
			feedContainer.innerHTML = "";

			for (const entry of entries) {
				const entryContainer = document.createElement("div");
				entryContainer.classList.add("row");
				entryContainer.classList.add("gap20");

				const textContainer = document.createElement("div");
				textContainer.classList.add("fill");
				textContainer.classList.add("col");
				textContainer.classList.add("left");
				textContainer.classList.add("gap10");
				textContainer.classList.add("overflow-hidden");

				const title = document.createElement("h4");
				title.textContent = entry.title;

				const date = document.createElement("p");
				date.textContent = new Date(entry.lastUpdated).toLocaleString();

				const description = document.createElement("p");
				description.textContent =
					entry.description.length > 200 ? `${entry.description.slice(0, 200)}...` : entry.description;

				const view = document.createElement("button");
				view.textContent = "View";
				view.addEventListener("click", async () => {
					const platform = fin.Platform.getCurrentSync();
					await platform.createView(
						{ url: entry.url },
						{ uuid: platform.identity.uuid, name: RSS_WINDOW_NAME }
					);
				});

				textContainer.append(title);
				textContainer.append(date);
				textContainer.append(description);
				textContainer.append(view);

				const imageContainer = document.createElement("div");
				imageContainer.style.display = "flex";
				imageContainer.style.flex = "0 0 200px";

				if (entry.thumbnailUrl) {
					const thumbnail = document.createElement("img");
					thumbnail.src = entry.thumbnailUrl;
					thumbnail.style.width = "100%";
					imageContainer.append(thumbnail);
				}

				entryContainer.append(textContainer);
				entryContainer.append(imageContainer);

				feedContainer.append(entryContainer);
			}
		}
	}
}
