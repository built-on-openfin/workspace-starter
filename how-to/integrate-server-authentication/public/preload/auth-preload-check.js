document.addEventListener('DOMContentLoaded', async () => {
	console.log('auth-preload-check.js loaded. Performing logic checks.');
	// preload scripts can be loaded into an iframe so only check the top level window
	if (window === window.top && window.fin !== undefined) {
		// TODO: ADD YOUR OWN LOGIC HERE
		console.log('auth-preload-check.js logic starting.');
		// Create a new URL object from the current window location
		const url = new URL(window.location.href);

		// TODO: ADD YOUR OWN PATH LOGIC HERE
		// determine behavior based on the current URL (we have example paths)
		if (url.pathname === '/app/login') {
			console.log('Detected we are on the login page.');
			// If we are on the login page ensure the page is visible
			await fin.me.show();
		} else {
			// ensure the page is hidden as we may have shown it if it was the login page and we are now on a redirect page or the provider.
			console.log('We are on a page that should not be visible. Ensuring the window is hidden.');
			await fin.me.hide();
		}

		// TODO: WHEN STUCK OR UNHAPPY PATH DETERMINE WHAT TO DO NEXT
		// We provide an example of launching a new window to show a friendly error message
		if (url.pathname === '/app/stuck') {
			console.log(
				'Detected we are authenticated but a redirect has encountered an error and is stuck so the main provider.html page will not be loaded. Showing a friendly error message.'
			);
			window.open('/app/friendly-error', '_blank');
		}
	}
});
