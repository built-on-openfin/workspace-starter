/**
 * Initialize the DOM.
 */
function initializeDOM() {
	const contextPicker = document.querySelector('#context-group-picker');
	contextPicker.style.display = fin.me.isWindow ? 'block' : 'none';

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
	document.title = `Participant Summary - ${ctx.name}`;
	const username = ctx.name;
	const email = ctx.id?.email;

	const userNameContainers = document.querySelectorAll('#username');
	const emailContainers = document.querySelectorAll('#email');

	for (const element of userNameContainers) {
		element.textContent = username;
	}

	for (const element of emailContainers) {
		element.textContent = email;
	}
}

window.addEventListener('DOMContentLoaded', initializeDOM);
