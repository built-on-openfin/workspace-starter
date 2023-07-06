if (window !== window.top) {
	window.addEventListener('DOMContentLoaded', () => {
		import('./framed/frame.title.js')
			.then((module) => {
				module.watchPageTitle();
				return true;
			})
			.catch((err) => console.error('Error setting up title watch.', err));
	});
}
