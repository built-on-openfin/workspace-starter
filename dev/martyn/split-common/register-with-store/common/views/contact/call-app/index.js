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
	function startStopTimer() {
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
			contactNameLabel = '';
			action.textContent = 'Start Call';
			timeLabel.textContent = '00:00';
			document.title = originalTitle;
			contactHeaderLabel.textContent = '';
		} else {
			action.textContent = `End Call${contactNameLabel}`;
			seconds = 0;
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
		if (ctx !== undefined) {
			if (ctx.type === 'fdc3.contact') {
				contactNameLabel = ` To ${ctx.name}`;
				contactHeaderLabel.textContent = ctx.name;
				action.textContent = `Start Call${contactNameLabel}`;
				document.title = `${originalTitle} - ${ctx.name}`;
			} else {
				console.warn('Passed context was not of type fdc3.contact.', ctx);
			}
		} else {
			console.log(`Received Context For Intent: ${intentName}`, ctx);
		}
	}

	if (window.fdc3 !== undefined) {
		const startCallIntent = 'StartCall';
		const openAppIntent = 'OpenApp';
		fdc3.addIntentListener(startCallIntent, (ctx) => {
			updateCallInformation(ctx, startCallIntent);
			return new Promise((resolve) => {
				// To demonstrate getResult in fdc3 2.0 we simply return the context that was sent.
				resolve(ctx);
			});
		});
		fdc3.addIntentListener(openAppIntent, (ctx) => {
			updateCallInformation(ctx, openAppIntent);
		});
	}
}
window.addEventListener('DOMContentLoaded', initializeDOM);
