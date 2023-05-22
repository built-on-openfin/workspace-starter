function init() {
	if (window.fdc3) {
		const contextHandler = (ctx) => {
			console.log('Context Received:', ctx);
			if (ctx.type === 'fdc3.contact') {
				setContact(ctx);
			}
		};

		window.fdc3.addContextListener(contextHandler);

		window.fdc3.addIntentListener('ViewContact', contextHandler);
	}
}

function setContact(ctx) {
	const userNameContainers = document.querySelectorAll('#username');
	document.title = `Investments &amp; Models - ${ctx.name}`;
	for (let i = 0; i < userNameContainers.length; i++) {
		userNameContainers[i].textContent = ctx.name;
	}
}

window.addEventListener('DOMContentLoaded', init);
