// notification messages
let messages = [];

/**
 * Fetch messages from messages.json.
 */
async function fetchMessages() {
	try {
		const response = await fetch('./messages.json');
		if (!response.ok) {
			throw new Error('Network response was not ok when trying to get messages.json');
		}
		messages = await response.json();

		console.log('messages populated:', messages);
	} catch (error) {
		console.error('Failed to fetch messages:', error);
	}
}

/**
 * Add some logging.
 * @param selectionElement The element to read the current selection.
 * @param messageElement The element to set text against.
 */
function setMessageContent(selectionElement, messageElement) {
	const selectedExample = selectionElement.value;
	if (selectedExample) {
		const entry = messages.find((messageEntry) => messageEntry.messageId === selectedExample);
		if (entry) {
			if (entry.message.eventId === 'create') {
				entry.message.payload.id = `${Date.now().toString()}-${Math.floor(Math.random() * 1000)}`;
			}
			messageElement.value = JSON.stringify(entry.message, null, 2);
		}
	}
}

/**
 * Add some logging.
 * @param logElement The element to use to store previews
 * @param text The text for the log entry.
 * @param data Associated data for the log entry.
 */
function log(logElement, text, data) {
	let logs = `
${new Date(Date.now()).toLocaleTimeString()}: ${text}`;

	if (data !== undefined) {
		logs += `
${JSON.stringify(data, null, 3)}`;
	}

	console.log(text, data);

	logElement.textContent += logs;
}

/**
 * Raise the Intent.
 * @param message The message to send.
 * @param logElement The element to use to store previews
 */
async function raiseIntent(message, logElement) {
	const intentApps = await fdc3.findIntentsByContext(message);
	if (intentApps.length > 0) {
		const result = intentApps[0];
		const intent = result.intent;
		const app = result.apps[0];
		log(
			logElement,
			`Intent found: ${intent.name} for context object type: ${message.type} specifying app: ${app.appId}`
		);
		await fdc3.raiseIntent(intent.name, message, app);
	} else {
		log(logElement, 'No intent found.');
	}
}

/**
 * Initialize the example.
 */
async function init() {
	// reference the controls
	const notificationTypeExamples = document.querySelector('#notificationTypeExamples');
	const message = document.querySelector('#message');
	const logPreview = document.querySelector('#log');
	const btnRaiseIntent = document.querySelector('#btnRaiseIntent');
	const btnClear = document.querySelector('#btnClear');

	if (
		notificationTypeExamples !== null &&
		message !== null &&
		logPreview !== null &&
		btnRaiseIntent !== null &&
		btnClear !== null
	) {
		await fetchMessages();
		for (const entry of messages) {
			// Create a new option element
			const option = document.createElement('option');
			option.value = entry.messageId;
			option.id = entry.messageId;
			option.textContent = entry.title;

			// Append the option to the select element
			notificationTypeExamples.append(option);
		}

		notificationTypeExamples.addEventListener('change', () => {
			setMessageContent(notificationTypeExamples, message);
		});

		setMessageContent(notificationTypeExamples, message);

		btnRaiseIntent.addEventListener('click', async () => {
			try {
				log(logPreview, 'Preparing message to send.');
				const messageValue = JSON.parse(message.value);
				log(logPreview, 'Message to send', messageValue);
				await raiseIntent(messageValue, logPreview);
			} catch (error) {
				log(logPreview, `Error preparing message: ${error.message}`);
			}
		});
		btnClear.addEventListener('click', () => {
			logPreview.textContent = '';
		});
		try {
			const implementationMetadata = await fdc3.getInfo();
			const { appId, instanceId } = implementationMetadata.appMetadata;

			const messageEntry = messages.find(
				(intentEntry) => intentEntry.messageId === 'notificationRaiseIntent'
			);

			if (messageEntry !== undefined) {
				messageEntry.message.notification.buttons[0].onClick.customData.target.appId = appId;
				messageEntry.message.notification.buttons[0].onClick.customData.target.instanceId = instanceId;
			}

			fdc3.addIntentListener('HandleNotification', async (context) => {
				log(logPreview, 'Context Received through HandleNotification Intent Handler.', context);
			});

			fdc3.addContextListener(null, async (context) => {
				log(logPreview, 'User Context Received.', context);
			});
			const channel = 'custom-app-channel';
			const appChannel = await fdc3.getOrCreateChannel(channel);
			appChannel.addContextListener(null, (context) => {
				log(logPreview, 'App Channel Context Received.', context);
			});
		} catch (e) {
			console.error(e);
		}
	}
}

document.addEventListener('DOMContentLoaded', async () => {
	if (window.fdc3) {
		init();
	} else {
		window.addEventListener('fdc3Ready', () => {
			init();
		});
	}
});
