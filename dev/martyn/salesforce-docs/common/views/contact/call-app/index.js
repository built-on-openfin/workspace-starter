function init() {
	const action = document.querySelector('#action');
	const timeLabel = document.querySelector('#time');
	let contactNameLabel = '';
	let intervalId = null;
	let seconds = 0;
	let min;
	let sec;

	function update() {
		seconds++;
		min = Math.floor(seconds / 60);
		sec = seconds % 60;
		const displayMinutes = min < 10 ? `0${min}` : min;
		const displaySeconds = sec < 10 ? `0${sec}` : sec;
		timeLabel.textContent = `${displayMinutes}:${displaySeconds}`;
	}

	const startStopTimer = () => {
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
			contactNameLabel = '';
			action.textContent = 'Start Call';
			timeLabel.textContent = '00:00';
		} else {
			action.textContent = `End Call${contactNameLabel}`;
			seconds = 0;
			update();
			intervalId = setInterval(() => {
				update();
			}, 1000);
		}
	};

	action.addEventListener('click', startStopTimer);

	const updateCallInformation = (ctx, intentName) => {
		if (ctx !== undefined) {
			if (ctx.type === 'fdc3.contact') {
				contactNameLabel = ` To ${ctx.name}`;
				action.textContent = `Start Call${contactNameLabel}`;
			} else {
				console.warn('Passed context was not of type fdc3.contact.', ctx);
			}
		} else {
			console.log(`Received Context For Intent: ${intentName}`, ctx);
		}
	};

	if (window.fdc3 !== undefined) {
		const startCallIntent = 'StartCall';
		const openAppIntent = 'OpenApp';
		fdc3.addIntentListener(startCallIntent, (ctx) => {
			updateCallInformation(ctx, startCallIntent);
		});
		fdc3.addIntentListener(openAppIntent, (ctx) => {
			updateCallInformation(ctx, openAppIntent);
		});
	}
}
window.addEventListener('DOMContentLoaded', init);
