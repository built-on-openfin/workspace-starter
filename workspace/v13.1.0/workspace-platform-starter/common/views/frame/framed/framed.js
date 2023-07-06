(async () => {
	// if fdc3 is injected by the OpenFin runtime it will be available before this script runs
	if (window.fdc3 === undefined) {
		try {
			const fdc3Module = await import('./frame.fdc3.js');
			window.fdc3 = fdc3Module.getFDC3Client();
			window.dispatchEvent(new Event('fdc3Ready'));
		} catch (fdc3Error) {
			console.error('Error setting up fdc3 module.', fdc3Error);
		}
	}
	if (window.fin === undefined) {
		try {
			const titleModule = await import('./frame.title.js');
			titleModule.watchPageTitle();
		} catch (titleError) {
			console.error('Error setting up title watch.', titleError);
		}
	}
})();
