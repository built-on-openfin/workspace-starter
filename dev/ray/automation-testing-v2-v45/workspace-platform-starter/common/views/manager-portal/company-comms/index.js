import { loadCompanyComms } from '../common/common.js';

document.addEventListener('DOMContentLoaded', () => {
	init();
});

let companyComms;

/**
 * Initialize the view.
 */
async function init() {
	companyComms = await loadCompanyComms();

	await initDom();
}

/**
 * Initialize the DOM.
 */
async function initDom() {
	const companyCommsListElem = document.querySelector('.company-comms-list');

	let lastDay = '';
	for (const companyComm of companyComms) {
		const ts = new Date(companyComm.ts);
		const currentDay = ts.toDateString();

		if (currentDay !== lastDay) {
			const dayElem = document.createElement('div');
			dayElem.classList.add('comms-date');
			dayElem.textContent = currentDay;

			companyCommsListElem.append(dayElem);
		}

		const commElem = document.createElement('div');
		commElem.classList.add('row');
		commElem.classList.add('gap20');
		commElem.classList.add('comms-tile');

		const commTime = document.createElement('div');
		commTime.classList.add('comms-time');
		// eslint-disable-next-line newline-per-chained-call
		commTime.textContent = `${ts.getHours().toString().padStart(2, '0')}:${ts
			.getMinutes()
			.toString()
			.padStart(2, '0')}`;

		const contentCol = document.createElement('div');
		contentCol.classList.add('col');

		const contentTitle = document.createElement('h1');
		contentTitle.textContent = companyComm.title;

		const contentText = document.createElement('div');
		contentText.classList.add('comm-content');
		contentText.textContent = companyComm.content;

		const contentLink = document.createElement('a');
		contentLink.classList.add('comm-link');
		contentLink.setAttribute('href', companyComm.url);
		contentLink.setAttribute('target', '_blank');
		contentLink.textContent = 'More';

		contentCol.append(contentTitle);
		contentCol.append(contentText);
		contentCol.append(contentLink);

		commElem.append(commTime);
		commElem.append(contentCol);

		companyCommsListElem.append(commElem);

		lastDay = currentDay;
	}
}
