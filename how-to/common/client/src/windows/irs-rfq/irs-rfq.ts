import { create, IndicatorColor, NotificationOptions } from "@openfin/workspace/notifications";
import { createContainer, createLabelledForm, createText } from "./notifications";

interface IrsRfqData {
	swapType: string;
	currency: string;
	tenor: string;
	notional: number | undefined;
	notionalFormatted: string | undefined;
	notionalUnits: string | undefined;
	frequency: string;
	libor: number;
	actType: string;
	act: string;
	account: string;
	allocation: string;
	effective: Date | null;
	maturity: Date | null;
}

let currencyElement: HTMLSelectElement;
let notionalElement: HTMLInputElement;
let frequencyElement: HTMLSelectElement;
let tenorElement: HTMLSelectElement;
let effectiveDateElement: HTMLInputElement;
let maturityDateElement: HTMLInputElement;
let accountElement: HTMLSelectElement;
let allocationElement: HTMLSelectElement;
let rfqButton: HTMLButtonElement;

const currencies: string[] = ["USD", "GBP", "EUR", "YEN"];

const accounts: Map<string, string> = new Map();
accounts.set("ACT10", "Acme Ltd");
accounts.set("CON20", "Contoso Ltd");
accounts.set("NOR50", "Northwind Inc");

const allocations: Map<string, string> = new Map();
allocations.set("TRD01", "Trader 1");
allocations.set("TRD02", "Trader 2");
allocations.set("TRD03", "Trader 3");

const libor = Math.random() * 2;

async function init() {
	currencyElement = document.querySelector<HTMLSelectElement>("#currency");
	notionalElement = document.querySelector<HTMLInputElement>("#notional");
	frequencyElement = document.querySelector<HTMLSelectElement>("#frequency");
	tenorElement = document.querySelector<HTMLSelectElement>("#tenor");
	effectiveDateElement = document.querySelector<HTMLInputElement>("#effectiveDate");
	maturityDateElement = document.querySelector<HTMLInputElement>("#maturityDate");
	accountElement = document.querySelector<HTMLSelectElement>("#account");
	allocationElement = document.querySelector<HTMLSelectElement>("#allocation");

	const closeButton = document.querySelector("#btnClose");
	closeButton.addEventListener("click", async () => {
		const me = fin.Window.wrapSync(fin.me.identity);
		await me.close(true);
	});

	const clearButton = document.querySelector("#btnClear");
	clearButton.addEventListener("click", () => {
		clearForm();
	});

	rfqButton = document.querySelector("#btnRfq");
	rfqButton.addEventListener("click", async () => {
		await showInboundRFQ();
	});

	currencyElement.addEventListener("change", () => {
		updateSummary();
	});

	notionalElement.addEventListener("input", () => {
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

	for (const currency of currencies) {
		const option = document.createElement("option");
		option.value = currency;
		option.textContent = currency;
		currencyElement.append(option);
	}

	for (const [accountId, accountName] of accounts) {
		const option = document.createElement("option");
		option.value = accountId;
		option.textContent = accountName;
		accountElement.append(option);
	}

	for (const [allocationId, allocationName] of allocations) {
		const option = document.createElement("option");
		option.value = allocationId;
		option.textContent = allocationName;
		allocationElement.append(option);
	}

	clearForm();
}

function clearForm() {
	currencyElement.value = "USD";
	notionalElement.value = "";
	frequencyElement.value = "annual";
	tenorElement.value = "5Y";
	effectiveDateElement.valueAsDate = new Date();
	accountElement.value = "ACT10";
	allocationElement.value = "TRD01";
	updateMaturity();
	updateSummary();
}

function gatherData(): IrsRfqData {
	const currency = currencyElement.value;
	const tenor = tenorElement.value;

	let notional: number = notionalElement.valueAsNumber;
	let notionalUnits;
	let notionalFormatted;
	let localLibor = libor;

	if (Number.isNaN(notional)) {
		notional = undefined;
	} else {
		let notionalSuffix = "";
		let notionalDiv = notional;
		if (notional >= 1000000000000) {
			notionalDiv = notional / 1000000000000;
			notionalSuffix = "T";
			localLibor += 2;
		} else if (notional >= 1000000000) {
			notionalDiv = notional / 1000000000;
			notionalSuffix = "B";
			localLibor += 1.5;
		} else if (notional >= 1000000) {
			notionalDiv = notional / 1000000;
			notionalSuffix = "M";
			localLibor += 1.5;
		} else if (notional >= 1000) {
			notionalDiv = notional / 1000;
			notionalSuffix = "K";
			localLibor += 1;
		}
		notionalUnits = `${Math.round(notionalDiv)} ${notionalSuffix}`.trim();
		notionalFormatted = notional.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}

	const frequency = frequencyElement.value;

	return {
		swapType: "fixed",
		currency,
		tenor,
		notional,
		notionalFormatted,
		notionalUnits,
		frequency,
		libor: localLibor,
		actType: "ACT 30",
		act: "30/360",
		account: accountElement.value,
		allocation: allocationElement.value,
		effective: effectiveDateElement.valueAsDate,
		maturity: maturityDateElement.valueAsDate
	};
}

function createTitle(rfqData: IrsRfqData) {
	return rfqData.notional !== undefined
		? `IRS: ${rfqData.swapType.toUpperCase()} ${rfqData.currency}@${rfqData.libor.toFixed(3)}% vs ${
				rfqData.notionalUnits
		  } LIBOR ${rfqData.tenor}`
		: `IRS: ${rfqData.swapType.toUpperCase()} ${rfqData.currency}`;
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
	const rfqData = gatherData();

	const titleElement = document.querySelector("#title");
	titleElement.textContent = createTitle(rfqData);

	const summaryElement = document.querySelector("#summary");
	summaryElement.textContent = `IRS: ${rfqData.swapType.toUpperCase()} ${rfqData.currency}
	${rfqData.notionalFormatted ?? "Enter notional value above"}${
		rfqData.notionalUnits ? ` (${rfqData.notionalUnits})` : ""
	}
	${rfqData.frequency.toUpperCase()}
	${rfqData.tenor}
	${rfqData.actType}
	${rfqData.act}
	INDICATIVE: `;

	const summaryLiborElement = document.querySelector("#summary-libor");
	summaryLiborElement.textContent =
		rfqData.notional !== undefined
			? `${rfqData.libor.toFixed(3)}% LIBOR`
			: rfqData.notional?.toString() ?? "Enter notional value above";

	rfqButton.disabled = rfqData.notional === undefined || effectiveDateElement.valueAsDate === null;
}

function formatShortDate(date: Date | null) {
	if (!date) {
		return "";
	}
	return `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })} ${date.getFullYear()}`;
}

async function showInboundRFQ() {
	const rfqData = gatherData();
	const title = createTitle(rfqData);
	const notification: NotificationOptions = {
		title,
		toast: "transient",
		category: "default",
		template: "custom",
		id: crypto.randomUUID(),
		icon: "http://localhost:8080/common/images/icon-blue.png",
		indicator: {
			color: IndicatorColor.GREEN,
			text: "INBOUND RFQ"
		},
		templateOptions: {
			body: {
				compositions: [
					{
						minTemplateAPIVersion: "1",
						layout: createContainer(
							"column",
							[
								createLabelledForm("clientLabel", "clientValue"),
								createLabelledForm("notionalLabel", "notionalValue"),
								createLabelledForm("tenorLabel", "tenorValue"),
								createLabelledForm("effectiveLabel", "effectiveValue"),
								createLabelledForm("maturityLabel", "maturityValue"),
								createLabelledForm("actLabel", "actValue"),
								createLabelledForm("indicativeGivenLabel", "indicativeGivenValue"),
								createContainer(
									"column",
									[
										createText("indicativeRateTitle", 11.25, {
											color: "#FF8C4C",
											fontWeight: "700"
										}),
										createText("indicativeRateValue", 12, {
											fontWeight: "600"
										})
									],
									{
										border: "1px solid #FF8C4C",
										background: "#1E1F23",
										padding: "10px",
										borderRadius: "4px",
										marginTop: "10px"
									}
								)
							],
							{ padding: "10px 0px" }
						)
					}
				]
			}
		},
		templateData: {
			clientLabel: "Client",
			clientValue: accounts.get(rfqData.account),
			notionalLabel: "Notional",
			notionalValue: `${rfqData.notionalFormatted} ${rfqData.currency} (${rfqData.notionalUnits})`,
			tenorLabel: "Tenor",
			tenorValue: rfqData.tenor,
			effectiveLabel: "Effective",
			effectiveValue: formatShortDate(rfqData.effective),
			maturityLabel: "Maturity",
			maturityValue: formatShortDate(rfqData.maturity),
			actLabel: "ACT",
			actValue: rfqData.act,
			indicativeGivenLabel: "Indicative given",
			indicativeGivenValue: `${rfqData.libor.toFixed(3)}% libor`,
			indicativeRateTitle: "INDICATIVE RATE PROVIDED",
			indicativeRateValue: title
		},
		buttons: [
			{
				title: "Accept Rate & Respond",
				type: "button",
				cta: false
			},
			{
				title: "View Blotter",
				type: "button",
				cta: true
			}
		]
	};

	await create(notification);
}

window.addEventListener("DOMContentLoaded", init);
