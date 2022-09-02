import { create } from "@openfin/workspace/notifications";

const libor = Math.random() * 2;
const actType = "ACT 30";
const act = "30/360";

let currencyElement: HTMLSelectElement;
let notionalElement: HTMLInputElement;
let frequencyElement: HTMLSelectElement;
let tenorElement: HTMLSelectElement;
let effectiveDateElement: HTMLInputElement;
let maturityDateElement: HTMLInputElement;
let accountElement: HTMLSelectElement;
let allocationElement: HTMLSelectElement;

async function init() {
	currencyElement = document.querySelector<HTMLSelectElement>("#currency");
	notionalElement = document.querySelector<HTMLInputElement>("#notional");
	frequencyElement = document.querySelector<HTMLSelectElement>("#frequency");
	tenorElement = document.querySelector<HTMLSelectElement>("#tenor");
	effectiveDateElement = document.querySelector<HTMLInputElement>("#effectiveDate");
	maturityDateElement = document.querySelector<HTMLInputElement>("#maturityDate");
	accountElement = document.querySelector<HTMLSelectElement>("#account");
	allocationElement = document.querySelector<HTMLSelectElement>("#allocation");

	const btnClose = document.querySelector("#btnClose");
	btnClose.addEventListener("click", async () => {
		const me = fin.Window.wrapSync(fin.me.identity);
		await me.close(true);
	});

	const btnClear = document.querySelector("#btnClear");
	btnClear.addEventListener("click", () => {
		currencyElement.value = "USD";
		notionalElement.value = "";
		frequencyElement.value = "annual";
		tenorElement.value = "5Y";
		effectiveDateElement.valueAsDate = new Date();
		accountElement.value = "ACT10";
		allocationElement.value = "0000001";
		updateMaturity();
		updateSummary();
	});

	const btnRfq = document.querySelector("#btnRfq");
	btnRfq.addEventListener("click", async () => {
		await create({
			title: "Simple Notification",
			body: "This is a simple notification",
			toast: "transient",
			category: "default",
			template: "markdown",
			id: crypto.randomUUID()
		});
	});

	currencyElement.addEventListener("change", () => {
		updateSummary();
	});

	notionalElement.addEventListener("keyup", () => {
		updateSummary();
	});

	frequencyElement.addEventListener("change", () => {
		updateMaturity();
		updateSummary();
	});

	tenorElement.addEventListener("change", () => {
		updateMaturity();
		updateSummary();
	});

	effectiveDateElement.addEventListener("change", () => {
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

	let notional: string | number = notionalElement.valueAsNumber;
	let notionalSuffix = "";
	let hasNotional = true;
	let localLibor = libor;
	if (Number.isNaN(notional)) {
		notional = "Enter notional value above";
		hasNotional = false;
	} else {
		if (notional >= 1000000000000) {
			notional /= 1000000000000;
			notionalSuffix = "T";
			localLibor += 2;
		} else if (notional >= 1000000000) {
			notional /= 1000000000;
			notionalSuffix = "B";
			localLibor += 1.5;
		} else if (notional >= 1000000) {
			notional /= 1000000;
			notionalSuffix = "M";
			localLibor += 1.5;
		} else if (notional >= 1000) {
			notional /= 1000;
			notionalSuffix = "K";
			localLibor += 1;
		}
		notional = Math.round(notional);
	}

	const frequency = frequencyElement.value;

	const titleElement = document.querySelector("#title");
	titleElement.textContent = hasNotional
		? `IRS: Fixed ${currency}@${localLibor.toFixed(3)}% vs ${notional}${notionalSuffix} LIBOR ${tenor}`
		: `IRS: Fixed ${currency}`;

	const summaryElement = document.querySelector("#summary");
	summaryElement.textContent = `IRS: Fixed ${currency}\n${notional}${notionalSuffix}\n${frequency.toUpperCase()}\n${tenor}\n${actType}\n${act}\nINDICATIVE: `;

	const summaryLiborElement = document.querySelector("#summary-libor");
	summaryLiborElement.textContent = hasNotional ? `${localLibor.toFixed(3)}% LIBOR` : notional.toString();
}

window.addEventListener("DOMContentLoaded", init);
