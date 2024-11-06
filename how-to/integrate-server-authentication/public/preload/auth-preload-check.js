console.log('auth-preload-check.js loaded. Performing logic checks.');
// wrap in an async iife to not pollute the global scope and allow the use of await
(async () => {
	// preload scripts can be loaded into an iframe so only check the top level window
	if (window === window.top && window.fin !== undefined) {
		console.log('auth-preload-check.js logic starting.');
		// Create a new URL object from the current window location
		const url = new URL(window.location.href);

		// determine behavior based on the current URL
		if (url.pathname === '/app/login') {
			console.log('Detected we are on the login page.');
			// If we are on the login page ensure the page is visible
			await fin.me.show();
		} else {
			// ensure the page is hidden as we may have shown it if it was the login page and we are now on a redirect page or the provider.
			console.log('We are on a page that should not be visible. Ensuring the window is hidden.');
			await fin.me.hide();
		}

		if (url.pathname === '/app/stuck') {
			console.log(
				'Detected we are authenticated but a redirect has encountered an error and is stuck so the main provider.html page will not be loaded. Showing a friendly error message.'
			);
			window.open('/app/friendly-error', '_blank');
		}
	}
})();
