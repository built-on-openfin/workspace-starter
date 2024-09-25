// notification messages
const sampleMessages = {};

// launch app notification
sampleMessages['notificationLaunchApp'] = {
	type: 'openfin.notificationoptions',
	notification: {
		id: 'guid-goes-here',
		title: 'Example Launches App',
		body: 'Click the button to launch an app.',
		buttons: [
			{
				onClick: {
					task: 'launch-app',
					customData: {
						id: 'call-app'
					}
				},
				cta: true,
				title: 'Open Call App',
				type: 'button'
			}
		]
	}
};

// launch content notification
sampleMessages['notificationLaunchContent'] = {
	type: 'openfin.notificationoptions',
	notification: {
		id: 'guid-goes-here',
		title: 'Example Launches Page',
		body: 'Click the button to launch or focus on a specific page.',
		buttons: [
			{
				onClick: {
					task: 'launch-content',
					customData: {
						id: 'page-id'
					}
				},
				cta: true,
				title: 'Open Call App',
				type: 'button'
			}
		]
	}
};

// raise intent notification
sampleMessages['notificationRaiseIntent'] = {
	type: 'openfin.notificationoptions',
	notification: {
		id: 'guid-goes-here',
		title: 'Example Raise Intent Notification',
		body: 'Click the button to raise an intent',
		buttons: [
			{
				onClick: {
					task: 'raise-intent',
					customData: {
						id: 'HandleNotification',
						context: {
							type: 'fdc3.contact',
							name: 'John Example',
							id: {
								email: 'john@example.com',
								phone: 'Number goes here'
							}
						},
						target: {
							appId: 'example-notification-service-app',
							instanceId: 'instanceId if available'
						}
					}
				},
				cta: true,
				title: 'Respond to Raising App',
				type: 'button'
			}
		]
	}
};

// broadcast user notification
sampleMessages['notificationBroadcastUser'] = {
	type: 'openfin.notificationoptions',
	notification: {
		id: 'guid-goes-here',
		title: 'Broadcast on User Channel',
		body: 'Click the button to broadcast on a user channel.',
		buttons: [
			{
				onClick: {
					task: 'broadcast',
					customData: {
						id: 'green',
						context: {
							type: 'fdc3.contact',
							name: 'John Example',
							id: {
								email: 'john@example.com',
								phone: 'Number goes here'
							}
						},
						broadcastOptions: {
							isUserChannel: true
						}
					}
				},
				cta: true,
				title: 'Broadcast On User Channel',
				type: 'button'
			}
		]
	}
};

// broadcast form user notification
sampleMessages['notificationBroadcastFormUser'] = {
	type: 'openfin.notificationoptions',
	notification: {
		id: 'guid-goes-here',
		title: 'Broadcast Form on User Channel',
		body: 'Click the button to broadcast on a user channel.',
		form: [
			{
				type: 'boolean',
				key: 'intendedThemeChange',
				label: 'Did you intend to change the theme?',
				widget: {
					type: 'Toggle'
				}
			}
		],
		buttons: [
			{
				onClick: {
					task: 'broadcast',
					customData: {
						id: 'green',
						context: {
							type: 'custom.context',
							name: 'Form Submitted'
						},
						broadcastOptions: {
							isUserChannel: true
						}
					}
				},
				cta: true,
				submit: true,
				title: 'Broadcast On Green',
				type: 'button'
			}
		]
	}
};

// broadcast app notification
sampleMessages['notificationBroadcastAppChannel'] = {
	type: 'openfin.notificationoptions',
	notification: {
		id: 'guid-goes-here',
		title: 'Broadcast on App Channel',
		body: 'Click the button to broadcast on an app channel.',
		buttons: [
			{
				onClick: {
					task: 'broadcast',
					customData: {
						id: 'custom-app-channel',
						context: {
							type: 'fdc3.contact',
							name: 'John Example',
							id: {
								email: 'john@example.com',
								phone: 'Number goes here'
							}
						}
					}
				},
				cta: true,
				title: 'Broadcast On App Channel',
				type: 'button'
			}
		]
	}
};

// endpoint notification
sampleMessages['notificationActionEndpoint'] = {
	type: 'openfin.notificationoptions',
	notification: {
		id: 'guid-goes-here',
		title: 'Trigger a post to a backend through a CTA',
		body: 'Click the button to call an action on the specified endpoint.',
		buttons: [
			{
				onClick: {
					task: 'endpoint',
					customData: {
						id: 'endpointId you wish to call. The notification service module must be permitted to access this endpoint through endpointClients',
						context: {
							type: 'fdc3.contact',
							name: 'John Example',
							id: {
								email: 'john@example.com',
								phone: 'Number goes here'
							}
						},
						endpointOptions: {
							request: {
								description:
									'If request is specified then context will be ignored and this object will be sent to the endpoint as the request'
							}
						}
					}
				},
				cta: true,
				title: 'Send to Endpoint',
				type: 'button'
			}
		]
	}
};

// update notification
sampleMessages['notificationUpdate'] = {
	type: 'openfin.updatablenotificationoptions',
	notification: {
		id: 'guid-goes-here',
		body: 'notification has been updated and buttons have been removed.',
		template: 'markdown'
	}
};

// notification to clear
sampleMessages['notificationClear'] = {
	type: 'openfin.notification',
	notification: {
		id: 'guid-goes-here'
	}
};

/**
 * Add some logging.
 * @param selectionElement The element to read the current selection.
 * @param messageElement The element to set text against.
 */
function setMessageContent(selectionElement, messageElement) {
	const selectedExample = selectionElement.value;
	if (selectedExample) {
		const sampleMessage = sampleMessages[selectedExample];
		if (sampleMessage) {
			if (sampleMessage.eventId === 'create') {
				sampleMessage.payload.id = `${Date.now().toString()}-${Math.floor(Math.random() * 1000)}`;
			}
			messageElement.value = JSON.stringify(sampleMessage, null, 2);
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
			sampleMessages['notificationRaiseIntent'].notification.buttons[0].onClick.customData.target.appId =
				appId;
			sampleMessages['notificationRaiseIntent'].notification.buttons[0].onClick.customData.target.instanceId =
				instanceId;

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
