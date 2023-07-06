let acceptableOrigin;

window.addEventListener('DOMContentLoaded', initializeDOM);

/**
 * Initialize the DOM.
 */
async function initializeDOM() {
	const options = await fin.me.getOptions();
	if (options?.customData?.frame?.title) {
		document.title = options.customData.frame.title;
	}
	if (options?.customData?.frame?.url) {
		acceptableOrigin = new URL(options.customData.frame.url).origin;
		console.log('Setting up message listener.');
		window.addEventListener('message', handleEvent, false);
		console.log('Listener added');
		console.log('Setting framed url.');
		const frame = document.createElement('iframe');
		frame.title = options?.customData?.frame?.title;
		frame.src = options.customData.frame.url;
		document.body.append(frame);

		fin.me.interop.addContextHandler((context) => {
			frame.contentWindow.postMessage(
				{ action: 'context-received', data: { context } },
				new URL(options.customData.frame.url).origin
			);
		});
	}
}

/**
 * Handles the message from the child frame.
 * @param message message from child frame
 */
function handleMessage(message) {
	switch (message.action) {
		case 'update-title': {
			document.title = message?.data?.title;
			break;
		}
		case 'broadcast-context': {
			try {
				const context = message?.data?.context;
				console.log('setting context on system contextual group', context);
				fin.me.interop.setContext(context);
			} catch (error) {
				console.warn('You are not bound to a system context group and are unable to set context', error);
			}
			break;
		}
		default: {
			console.warn(`Unknown action passed from frame: ${message.action}`);
		}
	}
}

/**
 * Takes a post message event and handles it.
 * @param event postMessage event that is sent from child frame
 */
function handleEvent(event) {
	console.log('Received event', event);
	console.log('Acceptable domain', acceptableOrigin);
	const { data, origin } = event;
	if (origin === acceptableOrigin) {
		handleMessage(data);
	}
}
