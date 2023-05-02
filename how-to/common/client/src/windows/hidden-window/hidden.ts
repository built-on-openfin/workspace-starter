import {
	IndicatorColor,
	addEventListener as addNotificationEventListener,
	create,
	type NotificationOptions
} from "@openfin/workspace/notifications";

async function notifyOfLoad() {
	const notification: NotificationOptions = {
		body: "The hidden window has been launched.",
		buttons: [
			{
				title: "Close Hidden Window",
				type: "button",
				cta: false,
				onClick: {
					task: "Close"
				}
			},
			{
				title: "Show Hidden Window",
				type: "button",
				cta: true,
				onClick: {
					task: "Show"
				}
			}
		],
		priority: 1,
		indicator: {
			color: IndicatorColor.GREEN,
			text: "Hidden Window Loaded"
		},
		category: "hidden",
		title: "Hidden Window Loaded",
		template: "markdown"
	};
	await create(notification);
}

async function init() {
	addNotificationEventListener("notification-action", async (event) => {
		const action = event?.result?.task;

		switch (action) {
			case "Close": {
				const me = fin.Window.wrapSync(fin.me.identity);
				await me.close(true);
				break;
			}
			default: {
				console.log("Action triggered:", action);
				await fin.me.show(true);
				break;
			}
		}
	});

	await notifyOfLoad();
}

window.addEventListener("DOMContentLoaded", async () => {
	console.log("Script loaded");

	await init();
});
