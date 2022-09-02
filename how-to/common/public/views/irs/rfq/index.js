const libor = Math.random() * 2;
const actType = 'ACT 30';
const act = '30/360';

let currencyElement;
let notionalElement;
let frequencyElement;
let tenorElement;
let effectiveDateElement;
let maturityDateElement;
let accountElement;
let allocationElement;

function init() {
	currencyElement = document.querySelector('#currency');
	notionalElement = document.querySelector('#notional');
	frequencyElement = document.querySelector('#frequency');
	tenorElement = document.querySelector('#tenor');
	effectiveDateElement = document.querySelector('#effectiveDate');
	maturityDateElement = document.querySelector('#maturityDate');
	accountElement = document.querySelector('#account');
	allocationElement = document.querySelector('#allocation');

	const btnClose = document.querySelector('#btnClose');
	btnClose.addEventListener('click', () => {
		fin.me.close();
	});

	const btnClear = document.querySelector('#btnClear');
	btnClear.addEventListener('click', () => {
		currencyElement.value = 'USD';
		notionalElement.value = '';
		frequencyElement.value = 'annual';
		tenorElement.value = '5Y';
		effectiveDateElement.valueAsDate = new Date();
		accountElement.value = 'ACT10';
		allocationElement.value = '0000001';
		updateMaturity();
		updateSummary();
	});

	currencyElement.addEventListener('change', () => {
		updateSummary();
	});

	notionalElement.addEventListener('keyup', () => {
		updateSummary();
	});

	frequencyElement.addEventListener('change', () => {
		updateMaturity();
		updateSummary();
	});

	tenorElement.addEventListener('change', () => {
		updateMaturity();
		updateSummary();
	});

	effectiveDateElement.addEventListener('change', () => {
		updateMaturity();
		updateSummary();
	});

	effectiveDateElement.valueAsDate = new Date();
	updateMaturity();
	updateSummary();
}

function updateMaturity() {
	const effectiveDate = effectiveDateElement.valueAsDate;

	if (effectiveDate === null) {
		maturityDateElement.valueAsDate = null;
	} else {
		const tenor = Number.parseInt(tenorElement.value, 10);

		maturityDateElement.valueAsDate = new Date(
			effectiveDate.getFullYear() + tenor,
			effectiveDate.getMonth(),
			effectiveDate.getDate(),
			12,
			0
		);
	}
}

function updateSummary() {
	const currency = currencyElement.value;
	const tenor = tenorElement.value;

	let notional = notionalElement.valueAsNumber;
	let notionalSuffix = '';
	let hasNotional = true;
	let localLibor = libor;
	if (Number.isNaN(notional)) {
		notional = 'Enter notional value above';
		hasNotional = false;
	} else {
		if (notional >= 1000000000000) {
			notional /= 1000000000000;
			notionalSuffix = 'T';
			localLibor += 2;
		} else if (notional >= 1000000000) {
			notional /= 1000000000;
			notionalSuffix = 'B';
			localLibor += 1.5;
		} else if (notional >= 1000000) {
			notional /= 1000000;
			notionalSuffix = 'M';
			localLibor += 1.5;
		} else if (notional >= 1000) {
			notional /= 1000;
			notionalSuffix = 'K';
			localLibor += 1;
		}
		notional = Math.round(notional);
	}

	const frequency = frequencyElement.value;

	const titleElement = document.querySelector('#title');
	titleElement.textContent = hasNotional
		? `IRS: Fixed ${currency}@${localLibor.toFixed(3)}% vs ${notional}${notionalSuffix} LIBOR ${tenor}`
		: `IRS: Fixed ${currency}`;

	const summaryElement = document.querySelector('#summary');
	summaryElement.textContent = `IRS: Fixed ${currency}\n${notional}${notionalSuffix}\n${frequency.toUpperCase()}\n${tenor}\n${actType}\n${act}\nINDICATIVE: `;

	const summaryLiborElement = document.querySelector('#summary-libor');
	summaryLiborElement.textContent = hasNotional ? `${localLibor.toFixed(3)}% LIBOR` : notional;
}

window.addEventListener('DOMContentLoaded', init);
