let acceptableOrigin;
const finFrames = [];

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
		console.log('Parent Module: Setting up message listener.');
		window.addEventListener('message', handleEvent, false);
		console.log('Parent Module: Listener added');
		console.log('Parent Module: Setting framed url.');
		const frame = document.createElement('iframe');
		frame.title = options?.customData?.frame?.title;
		frame.src = options.customData.frame.url;
		const sandbox = options?.customData?.frame?.sandbox;
		if (sandbox !== undefined && sandbox !== null) {
			frame.sandbox = sandbox;
		}
		document.body.append(frame);
		let hasFinApi = true;
		if (options?.api?.iframe !== undefined) {
			const crossDomainBlocked = options.api.iframe.crossOriginInjection === false;
			const sameOriginBlocked = options.api.iframe.sameOriginInjection === false;
			const isBlocked =
				location.origin === new URL(options.customData.frame.url).origin
					? sameOriginBlocked
					: crossDomainBlocked;
			hasFinApi = !isBlocked;
			if (!hasFinApi) {
				console.log('Parent Module: Frame does not have fin api enabled.');
				fin.me.interop.addContextHandler((context) => {
					frame.contentWindow.postMessage(
						{ action: 'context-received', data: { context } },
						acceptableOrigin
					);
				});
			}
		}
		if (hasFinApi) {
			fin.me.on('options-changed', (event) => {
				const assignedContextGroupName = event?.diff?.interop?.newVal?.currentContextGroup;
				if (assignedContextGroupName !== undefined) {
					console.log(
						`Parent Module: Notifying frame of context group assignment: ${assignedContextGroupName}`
					);
					notifyOfContextGroupAssignment(frame.contentWindow, assignedContextGroupName);
				}
			});
		}
	}
}

/**
 * This function sends a message to the targeted frame to notify it of a context group assignment.
 * @param target The object to call postmessage on
 * @param name The name of the context group that has been assigned
 */
function notifyOfContextGroupAssignment(target, name) {
	target.postMessage(
		{ action: 'context-group-assignment', data: { contextGroup: { name } } },
		acceptableOrigin
	);
}

/**
 * Handles the message from the child frame.
 * @param message message from child frame
 * @param source the thing that triggered the message
 */
async function handleMessage(message, source) {
	switch (message.action) {
		case 'update-title': {
			document.title = message?.data?.title;
			break;
		}
		case 'broadcast-context': {
			try {
				const context = message?.data?.context;
				console.log('Parent Module: setting context on system contextual group', context);
				fin.me.interop.setContext(context);
			} catch (error) {
				console.warn(
					'Parent Module: You are not bound to a system context group and are unable to set context',
					error
				);
			}
			break;
		}
		case 'send-identity': {
			const identity = message?.data?.identity;
			if (identity !== undefined) {
				console.log('Parent Module: Adding identity of OpenFin enabled frame.', identity);
				finFrames.push(identity);
			}
			break;
		}
		case 'request-context-group-assignment': {
			let contextGroupName;
			if (window.fdc3 !== undefined) {
				const currentContextGroup = await fdc3.getCurrentChannel();
				contextGroupName = currentContextGroup?.id;
			} else {
				const options = await fin.me.getOptions();
				contextGroupName = options?.interop?.currentContextGroup;
			}
			notifyOfContextGroupAssignment(source, contextGroupName);
			break;
		}
		default: {
			console.warn(`Parent Module: Unknown action passed from frame: ${message.action}`);
		}
	}
}

/**
 * Takes a post message event and handles it.
 * @param event postMessage event that is sent from child frame
 */
function handleEvent(event) {
	console.log('Parent Module: Received event', event);
	console.log('Parent Module: Acceptable domain', acceptableOrigin);
	const { data, origin, source } = event;
	if (origin === acceptableOrigin) {
		handleMessage(data, source);
	}
}

/**
 * Initializes the logic to support actions between a parent and a frame.
 */
export function init() {
	initializeDOM()
		.then((_) => {
			console.log('Parent Module: initialized.');
			return true;
		})
		.catch((reason) => {
			console.error('Parent Module: Error initializing.', reason);
		});
}
