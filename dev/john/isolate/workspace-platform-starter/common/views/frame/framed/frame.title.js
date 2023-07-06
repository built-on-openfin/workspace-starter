/**
 * Posts the title to the Framed view.
 * @param title - The document title that should be show
 */
export function updateFrameTitle(title) {
	console.log(`Notify parent frame of title: ${title}.`);
	parent.postMessage({ action: 'update-title', data: { title } }, '*');
}

/**
 * Watches the current document for when changes to the title occur and notify the parent frame.
 */
export function watchPageTitle() {
	console.log('Start Setup Title Mutation Observer');
	const title = document.head;
	try {
		new MutationObserver((mutations) => {
			const titleNode = mutations[0].target;
			if (titleNode.nodeName === 'TITLE' && titleNode.text !== null && titleNode.text !== undefined) {
				updateFrameTitle(titleNode.text);
			}
		}).observe(title, { subtree: true, characterData: true, childList: true });
	} catch (err) {
		console.error('Error trying to add title mutation observer', err);
	}
	console.log('End Setup Title Mutation Observer');
	updateFrameTitle(document.title);
}
