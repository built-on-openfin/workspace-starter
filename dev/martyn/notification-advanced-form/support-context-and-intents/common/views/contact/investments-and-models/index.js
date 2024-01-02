/**
 * Initialize the DOM.
 */
function initializeDOM() {
	if (window.fdc3) {
		window.fdc3.addContextListener(contextHandler);
		window.fdc3.addIntentListener('ViewContact', contextHandler);
	}
}

/**
 * Handler for setting the context.
 * @param ctx The FDC3 context.
 */
function contextHandler(ctx) {
	console.log('Context Received:', ctx);
	if (ctx.type === 'fdc3.contact') {
		setContact(ctx);
	}
}

/**
 * Update the contact details.
 * @param ctx The FDC3 context.
 */
function setContact(ctx) {
	const userNameContainers = document.querySelectorAll('#username');
	document.title = `Investments &amp; Models - ${ctx.name}`;
	for (const element of userNameContainers) {
		element.textContent = ctx.name;
	}
}

window.addEventListener('DOMContentLoaded', initializeDOM);
