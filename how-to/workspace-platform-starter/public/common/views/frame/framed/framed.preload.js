// do not run on the main window and only run on iframes directly added to the main window/view
console.log('Framed Preload: Initializing Check.');
if (window !== window.top && window.top === window.parent) {
	console.log('Framed Preload: Initializing.');
	window.addEventListener('DOMContentLoaded', async () => {
		try {
			const titleModule = await import('../framed/frame.title.js');
			titleModule.init();
		} catch (err) {
			console.error('Framed Preload: Error setting up title watch.', err);
		}

		try {
			const identityModule = await import('../framed/frame.identity.js');
			identityModule.postIdentity();
		} catch (err) {
			console.error('Framed Preload: Error notifying parent of identity.', err);
		}

		try {
			const interopModule = await import('../framed/frame.interop.js');
			interopModule.init();
		} catch (err) {
			console.error('Framed Preload: Error initializing interop setup.', err);
		}

		console.log('Framed Preload: Initialized.');
	});
}
