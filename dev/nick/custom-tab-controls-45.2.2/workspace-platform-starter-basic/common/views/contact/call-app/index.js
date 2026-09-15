/**
 * Initialize the DOM.
 */
function initializeDOM() {
	const action = document.querySelector('#action');
	const timeLabel = document.querySelector('#time');
	const contactHeaderLabel = document.querySelector('#contact');
	const originalTitle = document.title;

	let contactNameLabel = '';
	let intervalId = null;
	let seconds = 0;
	let min;
	let sec;
	let currentContact;

	/**
	 * Update the timer display.
	 */
	function update() {
		seconds++;
		min = Math.floor(seconds / 60);
		sec = seconds % 60;
		const displayMinutes = min < 10 ? `0${min}` : min;
		const displaySeconds = sec < 10 ? `0${sec}` : sec;
		timeLabel.textContent = `${displayMinutes}:${displaySeconds}`;
	}

	/**
	 * Start or stop the timer.
	 */
	async function startStopTimer() {
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
			contactNameLabel = '';
			action.textContent = 'Start Call';
			timeLabel.textContent = '00:00';
			document.title = originalTitle;
			contactHeaderLabel.textContent = '';
			if (currentContact !== undefined) {
				await notifyCallEndListeners(currentContact);
			}
			currentContact = undefined;
		} else {
			action.textContent = `End Call${contactNameLabel}`;
			seconds = 0;
			const userChannel = await fdc3.getCurrentChannel();
			if (
				window.fdc3 !== undefined &&
				userChannel !== undefined &&
				userChannel !== null &&
				currentContact !== undefined
			) {
				console.log(`Current Channel: ${userChannel.id}`);
				fdc3.broadcast(currentContact);
			}
			update();
			intervalId = setInterval(() => {
				update();
			}, 1000);
		}
	}

	action.addEventListener('click', startStopTimer);

	/**
	 * Update the call information display.
	 * @param ctx The FDC3 context.
	 * @param intentName The intent name.
	 */
	function updateCallInformation(ctx, intentName) {
		if (ctx !== undefined && (currentContact === undefined || currentContact.name !== ctx.name)) {
			if (ctx.type === 'fdc3.contact') {
				contactNameLabel = ` To ${ctx.name}`;
				contactHeaderLabel.textContent = ctx.name;
				action.textContent = `Start Call${contactNameLabel}`;
				document.title = `${originalTitle} - ${ctx.name}`;
				currentContact = ctx;
			} else {
				console.warn('Passed context was not of type fdc3.contact.', ctx);
			}
		} else {
			console.log(`Received Context For Intent: ${intentName}`, ctx);
		}
	}

	/**
	 * Notifies interested parties that a call conversation just ended.
	 * @param context The contact that was just on the call.
	 */
	async function notifyCallEndListeners(context) {
		if (window.fdc3 === undefined) {
			console.warn(
				`fdc3 is not available and we therefore cannot notify interested parties that the call has ended for user ${context.name}.`
			);
			return;
		}
		const channel = 'openfin/demo/call-end';
		const appChannel = await window.fdc3.getOrCreateChannel(channel);
		console.log(
			`Notifying interested parties that the call has ended for user ${context.name} on app channel ${channel}.`
		);
		await appChannel.broadcast(context);
	}

	/**
	 * Sets up the related fdc3 listeners once fdc3 is available.
	 */
	function setupListeners() {
		const startCallIntent = 'StartCall';
		const openAppIntent = 'OpenApp';
		try {
			fdc3.addContextListener('fdc3.contact', (ctx, metadata) => {
				console.log('Received Context', ctx, metadata);
				updateCallInformation(ctx);
			});
			fdc3.addIntentListener(startCallIntent, (ctx, metadata) => {
				console.log(`Received Context For Intent: ${startCallIntent}`, ctx, metadata);
				updateCallInformation(ctx, startCallIntent);
				return new Promise((resolve) => {
					// To demonstrate getResult in fdc3 2.0 we simply return the context that was sent.
					resolve(ctx);
				});
			});
			fdc3.addIntentListener(openAppIntent, (ctx, metadata) => {
				console.log(`Received Context For Intent: ${openAppIntent}`, ctx, metadata);
				updateCallInformation(ctx, openAppIntent);
			});
		} catch (error) {
			console.error('Error setting up all of the fdc3 listeners', error);
		}
	}
	if (window.fdc3 !== undefined) {
		setupListeners();
	} else {
		window.addEventListener('fdc3Ready', async () => {
			setupListeners();
		});
	}
}
window.addEventListener('DOMContentLoaded', initializeDOM);
