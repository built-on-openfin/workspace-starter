/**
 * Initialize the DOM.
 */
function initializeDOM() {
	if (window.fdc3 !== undefined) {
		setupListeners();
	} else {
		window.addEventListener('fdc3Ready', async () => {
			setupListeners();
		});
	}
}

/**
 * Sets up the related fdc3 listeners once fdc3 is available.
 */
function setupListeners() {
	try {
		window.fdc3.addContextListener(contextHandler);
		window.fdc3.addIntentListener('ViewContact', contextHandler);
	} catch (error) {
		console.error('There was an error while setting up all of the fdc3 listeners', error);
	}
}

/**
 * Handler for setting the context.
 * @param ctx The FDC3 context.
 * @param metadata The FDC3 metadata.
 */
function contextHandler(ctx, metadata) {
	console.log('Context Received:', ctx, metadata);
	if (ctx.type === 'fdc3.contact') {
		setContact(ctx);
	}
}

/**
 * Update the contact details.
 * @param ctx The FDC3 context.
 */
function setContact(ctx) {
	document.title = `Participant History - ${ctx.name}`;
	const userNameContainers = document.querySelectorAll('.username');

	for (const element of userNameContainers) {
		element.textContent = ctx.name;
	}
}

window.addEventListener('DOMContentLoaded', initializeDOM);
