const query = document.querySelector('#query');
const action = document.querySelector('#action');

/**
 * Is the query text a url.
 * @param value The value to test.
 * @returns True if the input is a url.
 */
function isQueryAUrl(value) {
	return /^https?:\/\//.test(value);
}

/**
 * Switch the label based on the content.
 * @param e The event to get the value from.
 */
function validateValue(e) {
	if (isQueryAUrl(e.target.value)) {
		action.textContent = 'Navigate To Url';
	} else {
		action.textContent = 'Search';
	}
}

/**
 * Open the query or search.
 */
function actionQuery() {
	if (isQueryAUrl(query.value)) {
		location.href = query.value;
	} else {
		location.href = `https://www.google.com/search?q=${encodeURIComponent(query.value)}`;
	}
}

/**
 * Init the content.
 */
async function init() {
	query.addEventListener('input', validateValue);
	query.addEventListener('keydown', (event) => {
		if (event.key === 'Enter') {
			actionQuery();
		}
	});
	action.addEventListener('click', actionQuery);
	if (location.search !== undefined) {
		const queryParams = new URLSearchParams(location.search);
		if (queryParams.has('q')) {
			query.value = queryParams.get('q');
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	try {
		init();
	} catch (error) {
		console.error(error);
	}
});
