window.addEventListener('DOMContentLoaded', async () => {
	console.log('Parent: Initializing');
	try {
		const parentModule = await import('../framed/parent.frame.js');
		parentModule.init();
	} catch (err) {
		console.error('Parent: Error Initializing.', err);
	}
	console.log('Parent Initialized.');
});
