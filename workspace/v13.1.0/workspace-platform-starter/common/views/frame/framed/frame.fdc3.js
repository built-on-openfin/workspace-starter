const listeners = {};
const contextCache = {};
let initialized = false;

/**
 * Handles the message from the child frame.
 * @param message message from child frame
 */
function handleMessage(message) {
	switch (message.action) {
		case 'context-received': {
			const context = message?.data?.context;
			const targetContextListeners = listeners[context.type];
			const allContextListeners = listeners['*'];
			contextCache['*'] = context;
			if (context?.type !== undefined) {
				contextCache[context.type] = context;
			}

			if (targetContextListeners !== undefined && Array.isArray(targetContextListeners)) {
				for (const targetListener of targetContextListeners) {
					targetListener.handler(context, message?.data?.metadata);
				}
			}

			if (allContextListeners !== undefined && Array.isArray(allContextListeners)) {
				for (const allListener of allContextListeners) {
					allListener.handler(context, message?.data?.metadata);
				}
			}

			break;
		}
		default: {
			console.warn(`FDC3 Module: Unsupported action passed from frame: ${message.action}`);
		}
	}
}

/**
 * Takes a post message event and handles it.
 * @param event postMessage event that is sent from child frame
 */
function handleEvent(event) {
	console.log('FDC3 Module: Received event', event);
	console.log('FDC3 Module: Acceptable domain', parent.origin);
	const { data, origin } = event;
	if (origin === parent.origin) {
		handleMessage(data);
	}
}

/**
 * Polyfills randomUUID if running in a non-secure context.
 * @returns The random UUID.
 */
export function randomUUID() {
	if ('randomUUID' in window.crypto) {
		// eslint-disable-next-line no-restricted-syntax
		return window.crypto.randomUUID();
	}
	// Polyfill the window.crypto.randomUUID if we are running in a non secure context that doesn't have it
	// we are still using window.crypto.getRandomValues which is always available
	// https://stackoverflow.com/a/2117523/2800218
	/**
	 * Get random hex value.
	 * @param c The number to base the random value on.
	 * @returns The random value.
	 */
	function getRandomHex(c) {
		// eslint-disable-next-line no-bitwise
		const rnd = window.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4));
		return (
			// eslint-disable-next-line no-bitwise
			(Number(c) ^ rnd).toString(16)
		);
	}
	return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, getRandomHex);
}

/**
 * Returns a reduced fdc3 client api.
 * @returns fdc3 cut down api
 */
export function getFDC3Client() {
	if (!initialized) {
		window.addEventListener('message', handleEvent, false);
		initialized = true;
	}
	return {
		broadcast: async (context) => {
			parent.postMessage({ action: 'broadcast-context', data: { context } }, '*');
		},
		addContextListener: async (contextType, handler) => {
			const typeId = contextType ?? '*';
			if (handler === undefined) {
				throw new Error(
					'FDC3 Module: You must specify either null or a specific type of context object to listen for as the first argument and a function to handle the context as the second argument.'
				);
			}
			if (listeners[typeId] === undefined) {
				listeners[typeId] = [];
			}
			const handlerId = randomUUID();
			listeners[typeId].push({ handlerId, handler });
			if (contextCache[typeId] !== undefined) {
				setTimeout(() => {
					handleMessage({ action: 'context-received', data: { context: contextCache[typeId] } });
				}, 0);
			}
			return {
				unsubscribe: () => {
					const handlers = listeners[typeId];
					listeners[typeId] = handlers.filter((object) => object.handlerId !== handlerId);
				}
			};
		}
	};
}
