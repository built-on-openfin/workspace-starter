/**
 * Handles the message from the child frame.
 * @param message message from child frame
 */
function handleMessage(message) {
	switch (message.action) {
		case 'context-group-assignment': {
			const contextGroup = message?.data?.contextGroup;
			if (contextGroup?.name !== undefined && contextGroup?.name !== null && contextGroup?.name.length > 0) {
				console.log(`Interop Module: Joining context group: ${contextGroup.name}`);
				fin.me.interop
					.joinContextGroup(contextGroup.name)
					.then((_) => {
						console.log(`Interop Module: Joined context group: ${contextGroup.name}`);
						return true;
					})
					.catch((reason) => {
						console.error(`Interop Module: Unable to join context group: ${contextGroup.name}`, reason);
					});
			} else {
				console.log('Interop Module: Leaving context group if currently assigned.');
				fin.me.interop
					.removeFromContextGroup(fin.me.identity)
					.then((_) => {
						console.log('Interop Module: Left context group if currently assigned.');
						return true;
					})
					.catch((reason) => {
						console.error('Interop Module: Unable to leave context group.', reason);
					});
			}

			break;
		}
		default: {
			console.warn(
				`Interop Module: Unsupported action passed from frame: ${message.action} that will not be handled by the interop module.`
			);
		}
	}
}

/**
 * Takes a post message event and handles it.
 * @param event postMessage event that is sent from child frame
 */
function handleEvent(event) {
	console.log('Interop Module: Received event', event);
	console.log('Interop Module: Acceptable domain', parent.origin);
	const { data, origin } = event;
	if (origin === parent.origin) {
		handleMessage(data);
	}
}

/**
 * Sends a request to the parent to notify it if it should be on a particular context group.
 */
function requestContextGroup() {
	console.log('Interop Module: Requesting current context group.');
	parent.postMessage({ action: 'request-context-group-assignment', data: {} }, '*');
}

/**
 * Initializes this module so that it listens for send messages and changes the context group based on what it has been told.
 * @param connect should it update the frames fin.me.interop with a fin.Interop.connectSync so it is synced with the current broker - default true.
 */
export function init(connect = true) {
	if (connect) {
		fin.me.interop = fin.Interop.connectSync(fin.me.identity.uuid);
	}
	window.addEventListener('message', handleEvent, false);
	requestContextGroup();
}
