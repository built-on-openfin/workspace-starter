import {
	IndicatorColor,
	addEventListener as addNotificationEventListener,
	clear,
	create,
	type BodyTemplateOptions,
	type ButtonOptions,
	type CustomTemplateData,
	type NotificationOptions
} from "@openfin/workspace/notifications";
import { randomUUID } from "../../lib/uuid";
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
	effective: number | null;
	maturity: number | null;
	ref: string | undefined;
	executionTime: number | undefined;
	deskExecuteStart: number | undefined;
	deskExecuteEnd: number | undefined;
	clientExecuteStart: number | undefined;
	clientExecuteEnd: number | undefined;
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
let clearButton: HTMLButtonElement;

const currencies: string[] = ["USD", "GBP", "EUR", "YEN"];

const accounts: Map<string, string> = new Map<string, string>();
accounts.set("ACT10", "Acme Ltd");
accounts.set("CON20", "Contoso Ltd");
accounts.set("NOR50", "Northwind Inc");

const allocations: Map<string, string> = new Map<string, string>();
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

	clearButton = document.querySelector("#btnClear");
	clearButton.addEventListener("click", () => {
		clearForm();
	});

	rfqButton = document.querySelector("#btnRfq");
	rfqButton.addEventListener("click", async () => {
		await showInboundRFQ(gatherData());
	});

	currencyElement.addEventListener("change", () => {
		updateSummary();
	});

	notionalElement.addEventListener("input", () => {
		notionalElement.value = notionalElement.value.toUpperCase();
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

	addNotificationEventListener("notification-action", async (event) => {
		if (event?.result?.task === "accept-rate") {
			window.setTimeout(async () => {
				const id = await showQuote(event.result.customData as IrsRfqData);
				window.setTimeout(async () => {
					await clear(id);
				}, 30000);
			}, 5000);
		} else if (event?.result?.task === "execute-trade") {
			window.setTimeout(async () => {
				const quoteData = event.result.customData as IrsRfqData;
				quoteData.executionTime = Date.now();
				quoteData.ref = randomUUID().slice(0, 10);
				await showClientConfirmation(quoteData);
			}, 5000);
		} else if (event?.result?.task === "dismiss-quote-client") {
			window.setTimeout(async () => {
				await showTraderConfirmation(event.result.customData as IrsRfqData);
			}, 5000);
		}
	});
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

	const notionalInput: string = notionalElement.value.toLowerCase();
	let notionalValue: number | undefined = Number.parseFloat(notionalInput);
	let notionalUnits;
	let notionalFormatted;
	let localLibor = libor;

	if (Number.isNaN(notionalValue) || !/^\d+(\.\d+)?[bkmt]?$/.test(notionalInput)) {
		notionalValue = undefined;
	} else {
		let notionalSuffix: string = "";
		let notionalDiv: number;

		const units: Map<string, number> = new Map<string, number>();
		units.set("T", 1000000000000);
		units.set("B", 1000000000);
		units.set("M", 1000000);
		units.set("K", 1000);
		units.set("", 1);

		if (/[bkmt]$/.test(notionalInput)) {
			// Already in suffix mode, so just use that
			// and multiply up the value
			notionalSuffix = notionalInput[notionalInput.length - 1].toUpperCase();
			notionalDiv = notionalValue;
			notionalValue *= units.get(notionalSuffix);
		} else {
			for (const [unitKey, unitValue] of units) {
				if (notionalValue >= unitValue) {
					notionalDiv = notionalValue / unitValue;
					notionalSuffix = unitKey;
					break;
				}
			}
		}

		if (notionalSuffix === "K") {
			localLibor += 1;
		} else if (notionalSuffix === "M") {
			localLibor += 1.5;
		} else if (notionalSuffix === "B") {
			localLibor += 2;
		} else if (notionalSuffix === "T") {
			localLibor += 2.5;
		}

		notionalUnits = `${notionalDiv.toFixed(2).replace(/\.0+$/, "")} ${notionalSuffix}`.trim();
		notionalFormatted = notionalValue.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}

	const frequency = frequencyElement.value;

	return {
		swapType: "fixed",
		currency,
		tenor,
		notional: notionalValue,
		notionalFormatted,
		notionalUnits,
		frequency,
		libor: localLibor,
		actType: "ACT 30",
		act: "30/360",
		account: accountElement.value,
		allocation: allocationElement.value,
		effective: effectiveDateElement.valueAsDate ? effectiveDateElement.valueAsDate.getTime() : null,
		maturity: maturityDateElement.valueAsDate ? maturityDateElement.valueAsDate.getTime() : null,
		deskExecuteStart: undefined,
		deskExecuteEnd: undefined,
		clientExecuteStart: undefined,
		clientExecuteEnd: undefined,
		ref: undefined,
		executionTime: undefined
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

function formatShortDate(timestamp: number | null) {
	if (timestamp === null) {
		return "";
	}
	const date = new Date(timestamp);
	return `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })} ${date.getFullYear()}`;
}

async function showNotification(
	rfqData: IrsRfqData,
	indicatorColor: IndicatorColor,
	indicatorValue: string,
	accountOrAllocation: "account" | "allocation",
	summaryColor: string,
	summaryTitle: string,
	summaryValue: string,
	isDeskRate: boolean,
	actionButtons: {
		label: string;
		id: string;
		cta: boolean;
	}[]
): Promise<string> {
	const title = createTitle(rfqData);
	const id = randomUUID();

	const bodyTemplateOptions: BodyTemplateOptions = {
		compositions: [
			{
				minTemplateAPIVersion: "1",
				layout: createContainer(
					"column",
					[
						createLabelledForm("accountOrAllocationLabel", "accountOrAllocationValue"),
						createLabelledForm("notionalLabel", "notionalValue"),
						createLabelledForm("tenorLabel", "tenorValue"),
						createLabelledForm("effectiveLabel", "effectiveValue"),
						createLabelledForm("maturityLabel", "maturityValue"),
						createLabelledForm("actLabel", "actValue"),
						createLabelledForm("rateLabel", "rateValue"),
						createContainer(
							"column",
							[
								createText("summaryTitle", 11.25, {
									color: summaryColor,
									fontWeight: "700"
								}),
								createText("summaryValue", 11, {
									fontWeight: "600",
									whiteSpace: "pre-line"
								})
							],
							{
								border: `1px solid ${summaryColor}`,
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
	};

	const templateData: CustomTemplateData = {
		accountOrAllocationLabel: accountOrAllocation === "account" ? "Client" : "Provided by",
		accountOrAllocationValue:
			accountOrAllocation === "account" ? accounts.get(rfqData.account) : allocations.get(rfqData.allocation),
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
		rateLabel: isDeskRate ? "Indicative given" : "Desk rate",
		rateValue: `${rfqData.libor.toFixed(3)}% libor`,
		summaryTitle,
		summaryValue
	};

	const buttons: ButtonOptions[] = actionButtons.map((b) => ({
		title: b.label,
		type: "button",
		cta: b.cta,
		onClick: {
			task: b.id,
			customData: rfqData
		}
	}));

	const webRoot = window.location.href.replace("windows/irs-rfq/irs-rfq.html", "");

	const notification: NotificationOptions = {
		title,
		toast: "transient",
		category: "default",
		template: "custom",
		id,
		icon: `${webRoot}/images/icon-blue.png`,
		indicator: {
			color: indicatorColor,
			text: indicatorValue
		},
		templateOptions: {
			body: bodyTemplateOptions
		},
		templateData,
		buttons
	};

	await create(notification);

	return id;
}

async function showInboundRFQ(rfqData: IrsRfqData): Promise<string> {
	const title = createTitle(rfqData);
	rfqData.deskExecuteStart = Date.now();
	return showNotification(
		rfqData,
		IndicatorColor.YELLOW,
		"INBOUND RFQ",
		"account",
		"#FF8C4C",
		"INDICATIVE RATE PROVIDED",
		title,
		false,
		[
			{
				label: "Accept Rate & respond",
				id: "accept-rate",
				cta: false
			},
			{
				label: "View Blotter",
				id: "view-blotter",
				cta: true
			}
		]
	);
}

async function showQuote(rfqData: IrsRfqData): Promise<string> {
	rfqData.clientExecuteStart = Date.now();
	return showNotification(
		rfqData,
		IndicatorColor.GREEN,
		"YOUR QUOTE",
		"allocation",
		"green",
		"ACTION REQUIRED",
		"You have 30 seconds from receipt to complete order",
		false,
		[
			{
				label: "Reject quote",
				id: "reject-quote",
				cta: false
			},
			{
				label: "Execute trade",
				id: "execute-trade",
				cta: true
			}
		]
	);
}

async function showClientConfirmation(rfqData: IrsRfqData): Promise<string> {
	const title = createTitle(rfqData);
	rfqData.clientExecuteEnd = Date.now();
	return showNotification(
		rfqData,
		IndicatorColor.GREEN,
		"TRADE CONFIRMED",
		"allocation",
		"green",
		"TRADE CONFIRMED",
		`${title}
		ref: ${rfqData.ref}
		
		Execution: ${new Date(rfqData.executionTime).toLocaleString()}`,
		false,
		[
			{
				label: "Dismiss",
				id: "dismiss-quote-client",
				cta: false
			},
			{
				label: "View blotter",
				id: "dismiss-quote-client",
				cta: true
			}
		]
	);
}

async function showTraderConfirmation(rfqData: IrsRfqData): Promise<string> {
	const title = createTitle(rfqData);
	rfqData.deskExecuteEnd = Date.now();
	return showNotification(
		rfqData,
		IndicatorColor.GREEN,
		"INBOUND RFQ",
		"allocation",
		"green",
		"TRADE CONFIRMED",
		`${title}
		ref: ${rfqData.ref}
		Response: Desk ${Math.round(
			(rfqData.deskExecuteEnd - rfqData.deskExecuteStart) / 1000
		)}s, Client ${Math.round((rfqData.clientExecuteEnd - rfqData.clientExecuteStart) / 1000)}s
		Execution: ${new Date(rfqData.executionTime).toLocaleString()}`,
		false,
		[
			{
				label: "Dismiss",
				id: "dismiss-quote-trader",
				cta: false
			},
			{
				label: "View blotter",
				id: "dismiss-quote-trader",
				cta: true
			}
		]
	);
}

window.addEventListener("DOMContentLoaded", init);
