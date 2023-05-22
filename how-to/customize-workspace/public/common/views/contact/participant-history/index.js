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
	const randomId = (Math.random() * 1000000).toFixed(0);
	document.title = `Participant History - ${ctx.name}`;
	const userNameContainers = document.querySelectorAll('.username');

	const username = `${ctx.name} (${randomId})`;

	for (let i = 0; i < userNameContainers.length; i++) {
		userNameContainers[i].textContent = username;
	}
}

window.addEventListener('DOMContentLoaded', init);
