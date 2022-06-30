const query = document.querySelector('#query');
const action = document.querySelector('#action');

function validateValue(e) {
	const value = e.target.value;
	if (value.startsWith('http://') || value.startsWith('https://')) {
		action.textContent = 'Navigate To Url';
	} else {
		action.textContent = 'Search';
	}
}

function actionQuery() {
	const value = query.value;
	if (value.startsWith('http://') || value.startsWith('https://')) {
		location.href = value;
	} else {
		location.href = `https://www.google.com/search?q=${encodeURIComponent(value)}`;
	}
}

function init() {
	query.addEventListener('input', validateValue);
	query.addEventListener('keydown', (event) => {
		if (event.key === 'Enter') {
			actionQuery();
		}
	});
	action.addEventListener('click', actionQuery);
}

document.addEventListener('DOMContentLoaded', () => {
	try {
		init();
	} catch (error) {
		console.error(error);
	}
});
