/**
 * Initialize the DOM.
 */
async function initializeDOM() {
	notifications.addEventListener('notification-action', async (event) => {
		const action = event?.result?.task;

		if (action === 'Close') {
			const me = fin.Window.wrapSync(fin.me.identity);
			await me.close(true);
		} else {
			console.log('Action triggered:', action);
			await fin.me.show(true);
		}
	});

	await notifyOfLoad();
}

/**
 * Create a notification to show the window has been loaded.
 */
async function notifyOfLoad() {
	const notification = {
		body: 'The hidden window has been launched.',
		buttons: [
			{
				title: 'Close Hidden Window',
				type: 'button',
				cta: false,
				onClick: {
					task: 'Close'
				}
			},
			{
				title: 'Show Hidden Window',
				type: 'button',
				cta: true,
				onClick: {
					task: 'Show'
				}
			}
		],
		priority: 1,
		indicator: {
			color: 'green',
			text: 'Hidden Window Loaded'
		},
		category: 'hidden',
		title: 'Hidden Window Loaded',
		template: 'markdown'
	};
	await notifications.create(notification);
}

window.addEventListener('DOMContentLoaded', async () => {
	console.log('Script loaded');

	await initializeDOM();
});
