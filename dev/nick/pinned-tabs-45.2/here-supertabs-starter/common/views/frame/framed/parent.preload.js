// only run on the main window/frame
console.log('Parent Preload: Initializing Check.');
if (window === window.top) {
	console.log('Parent Preload: Initializing.');
	window.addEventListener('DOMContentLoaded', async () => {
		try {
			const parentModule = await import('../framed/parent.frame.js');
			parentModule.init();
		} catch (err) {
			console.error('Parent Preload: Error Initializing.', err);
		}

		console.log('Parent Preload: Initialized.');
	});
}
