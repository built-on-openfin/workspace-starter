(async () => {
	// if fdc3 is injected by the OpenFin runtime it will be available before this script runs
	if (window.fdc3 === undefined) {
		try {
			const fdc3Module = await import('../framed/frame.fdc3.js');
			window.fdc3 = fdc3Module.getFDC3Client();
			window.dispatchEvent(new Event('fdc3Ready'));
		} catch (fdc3Error) {
			console.error('Framed: Error setting up fdc3 module.', fdc3Error);
		}
	}
	if (window.fin === undefined) {
		try {
			const titleModule = await import('../framed/frame.title.js');
			titleModule.init();
		} catch (titleError) {
			console.error('Framed: Error setting up title watch.', titleError);
		}
	}
})();
