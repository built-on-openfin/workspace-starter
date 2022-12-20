const query = document.querySelector('#query');
const action = document.querySelector('#action');

function isQueryAUrl(value) {
	return /^https?:\/\//.test(value);
}

function validateValue(e) {
	if (isQueryAUrl(e.target.value)) {
		action.textContent = 'Navigate To Url';
	} else {
		action.textContent = 'Search';
	}
}

function actionQuery() {
	if (isQueryAUrl(query.value)) {
		location.href = query.value;
	} else {
		location.href = `https://www.google.com/search?q=${encodeURIComponent(query.value)}`;
	}
}

async function init() {
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
