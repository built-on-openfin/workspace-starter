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
	const randomId = (Math.random() * 1000000).toFixed(0);
	document.title = `Participant History - ${ctx.name}`;
	const userNameContainers = document.querySelectorAll('.username');

	const username = `${ctx.name} (${randomId})`;
	for (const element of userNameContainers) {
		element.textContent = username;
	}
}

window.addEventListener('DOMContentLoaded', initializeDOM);
