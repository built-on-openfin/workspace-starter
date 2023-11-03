let currencyElement;
let notionalElement;
let frequencyElement;
let tenorElement;
let effectiveDateElement;
let maturityDateElement;
let accountElement;
let allocationElement;
let rfqButton;
let clearButton;

const currencies = ['USD', 'GBP', 'EUR', 'YEN'];

const accounts = new Map();
accounts.set('ACT10', 'Acme Ltd');
accounts.set('CON20', 'Contoso Ltd');
accounts.set('NOR50', 'Northwind Inc');

const allocations = new Map();
allocations.set('TRD01', 'Trader 1');
allocations.set('TRD02', 'Trader 2');
allocations.set('TRD03', 'Trader 3');

const libor = Math.random() * 2;

window.addEventListener('DOMContentLoaded', init);

/**
 * Initialize the DOM elements.
 */
async function init() {
	currencyElement = document.querySelector('#currency');
	notionalElement = document.querySelector('#notional');
	frequencyElement = document.querySelector('#frequency');
	tenorElement = document.querySelector('#tenor');
	effectiveDateElement = document.querySelector('#effectiveDate');
	maturityDateElement = document.querySelector('#maturityDate');
	accountElement = document.querySelector('#account');
	allocationElement = document.querySelector('#allocation');

	const closeButton = document.querySelector('#btnClose');
	closeButton.addEventListener('click', async () => {
		const me = fin.Window.wrapSync(fin.me.identity);
		await me.close(true);
	});

	clearButton = document.querySelector('#btnClear');
	clearButton.addEventListener('click', () => {
		clearForm();
	});

	rfqButton = document.querySelector('#btnRfq');
	rfqButton.addEventListener('click', async () => {
		await showInboundRFQ(gatherData());
	});

	currencyElement.addEventListener('change', () => {
		updateSummary();
	});

	notionalElement.addEventListener('input', () => {
		notionalElement.value = notionalElement.value.toUpperCase();
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

	for (const currency of currencies) {
		const option = document.createElement('option');
		option.value = currency;
		option.textContent = currency;
		currencyElement.append(option);
	}

	for (const [accountId, accountName] of accounts) {
		const option = document.createElement('option');
		option.value = accountId;
		option.textContent = accountName;
		accountElement.append(option);
	}

	for (const [allocationId, allocationName] of allocations) {
		const option = document.createElement('option');
		option.value = allocationId;
		option.textContent = allocationName;
		allocationElement.append(option);
	}

	clearForm();

	notifications.addEventListener('notification-action', async (event) => {
		if (event?.result?.task === 'accept-rate') {
			window.setTimeout(async () => {
				const id = await showQuote(event.result.customData);
				window.setTimeout(async () => {
					await notifications.clear(id);
				}, 30000);
			}, 5000);
		} else if (event?.result?.task === 'execute-trade') {
			window.setTimeout(async () => {
				const quoteData = event.result.customData;
				quoteData.executionTime = Date.now();
				quoteData.ref = randomUUID().slice(0, 10);
				await showClientConfirmation(quoteData);
			}, 5000);
		} else if (event?.result?.task === 'dismiss-quote-client') {
			window.setTimeout(async () => {
				await showTraderConfirmation(event.result.customData);
			}, 5000);
		}
	});
}

/**
 * Clear the form.
 */
function clearForm() {
	currencyElement.value = 'USD';
	notionalElement.value = '';
	frequencyElement.value = 'annual';
	tenorElement.value = '5Y';
	effectiveDateElement.valueAsDate = new Date();
	accountElement.value = 'ACT10';
	allocationElement.value = 'TRD01';
	updateMaturity();
	updateSummary();
}

/**
 * Gather the data from the form.
 * @returns The data.
 */
function gatherData() {
	const currency = currencyElement.value;
	const tenor = tenorElement.value;

	const notionalInput = notionalElement.value.toLowerCase();
	let notionalValue = Number.parseFloat(notionalInput);
	let notionalUnits;
	let notionalFormatted;
	let localLibor = libor;

	if (Number.isNaN(notionalValue) || !/^\d+(\.\d+)?[bkmt]?$/.test(notionalInput)) {
		notionalValue = undefined;
	} else {
		let notionalSuffix = '';
		let notionalDiv;

		const units = new Map();
		units.set('T', 1000000000000);
		units.set('B', 1000000000);
		units.set('M', 1000000);
		units.set('K', 1000);
		units.set('', 1);

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

		if (notionalSuffix === 'K') {
			localLibor += 1;
		} else if (notionalSuffix === 'M') {
			localLibor += 1.5;
		} else if (notionalSuffix === 'B') {
			localLibor += 2;
		} else if (notionalSuffix === 'T') {
			localLibor += 2.5;
		}

		notionalUnits = `${notionalDiv.toFixed(2).replace(/\.0+$/, '')} ${notionalSuffix}`.trim();
		notionalFormatted = notionalValue.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	}

	const frequency = frequencyElement.value;

	return {
		swapType: 'fixed',
		currency,
		tenor,
		notional: notionalValue,
		notionalFormatted,
		notionalUnits,
		frequency,
		libor: localLibor,
		actType: 'ACT 30',
		act: '30/360',
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

/**
 * Create a title based on the data.
 * @param rfqData The data to create the title from.
 * @returns Title.
 */
function createTitle(rfqData) {
	return rfqData.notional !== undefined
		? `IRS: ${rfqData.swapType.toUpperCase()} ${rfqData.currency}@${rfqData.libor.toFixed(3)}% vs ${
				rfqData.notionalUnits
		  } LIBOR ${rfqData.tenor}`
		: `IRS: ${rfqData.swapType.toUpperCase()} ${rfqData.currency}`;
}

/**
 * Update the maturity values.
 */
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

/**
 * Update the summary.
 */
function updateSummary() {
	const rfqData = gatherData();

	const titleElement = document.querySelector('#title');
	titleElement.textContent = createTitle(rfqData);

	const summaryElement = document.querySelector('#summary');
	summaryElement.textContent = `IRS: ${rfqData.swapType.toUpperCase()} ${rfqData.currency}
	${rfqData.notionalFormatted ?? 'Enter notional value above'}${
		rfqData.notionalUnits ? ` (${rfqData.notionalUnits})` : ''
	}
	${rfqData.frequency.toUpperCase()}
	${rfqData.tenor}
	${rfqData.actType}
	${rfqData.act}
	INDICATIVE: `;

	const summaryLiborElement = document.querySelector('#summary-libor');
	summaryLiborElement.textContent =
		rfqData.notional !== undefined
			? `${rfqData.libor.toFixed(3)}% LIBOR`
			: rfqData.notional?.toString() ?? 'Enter notional value above';

	rfqButton.disabled = rfqData.notional === undefined || effectiveDateElement.valueAsDate === null;
}

/**
 * Format a timestamp to a date.
 * @param timestamp The timestamp to format.
 * @returns The formatted date.
 */
function formatShortDate(timestamp) {
	if (timestamp === null) {
		return '';
	}
	const date = new Date(timestamp);
	return `${date.getDate()} ${date.toLocaleString('en-US', { month: 'short' })} ${date.getFullYear()}`;
}

/**
 * Show a notification.
 * @param rfqData The rfq data.
 * @param indicatorColor The indicator color.
 * @param indicatorValue The indicator value.
 * @param accountOrAllocation Is it an account or allocation.
 * @param summaryColor The summary color.
 * @param summaryTitle The summary title.
 * @param summaryValue The summary value.
 * @param isDeskRate Is it a desk rate.
 * @param actionButtons The action buttons.
 * @returns The id of the notification.
 */
async function showNotification(
	rfqData,
	indicatorColor,
	indicatorValue,
	accountOrAllocation,
	summaryColor,
	summaryTitle,
	summaryValue,
	isDeskRate,
	actionButtons
) {
	const title = createTitle(rfqData);
	const id = randomUUID();

	const bodyTemplateOptions = {
		compositions: [
			{
				minTemplateAPIVersion: '1',
				layout: createContainer(
					'column',
					[
						createLabelledForm('accountOrAllocationLabel', 'accountOrAllocationValue'),
						createLabelledForm('notionalLabel', 'notionalValue'),
						createLabelledForm('tenorLabel', 'tenorValue'),
						createLabelledForm('effectiveLabel', 'effectiveValue'),
						createLabelledForm('maturityLabel', 'maturityValue'),
						createLabelledForm('actLabel', 'actValue'),
						createLabelledForm('rateLabel', 'rateValue'),
						createContainer(
							'column',
							[
								createText('summaryTitle', 11.25, {
									color: summaryColor,
									fontWeight: '700'
								}),
								createText('summaryValue', 11, {
									fontWeight: '600',
									whiteSpace: 'pre-line'
								})
							],
							{
								border: `1px solid ${summaryColor}`,
								background: '#1E1F23',
								padding: '10px',
								borderRadius: '4px',
								marginTop: '10px'
							}
						)
					],
					{ padding: '10px 0px' }
				)
			}
		]
	};

	const templateData = {
		accountOrAllocationLabel: accountOrAllocation === 'account' ? 'Client' : 'Provided by',
		accountOrAllocationValue:
			accountOrAllocation === 'account' ? accounts.get(rfqData.account) : allocations.get(rfqData.allocation),
		notionalLabel: 'Notional',
		notionalValue: `${rfqData.notionalFormatted} ${rfqData.currency} (${rfqData.notionalUnits})`,
		tenorLabel: 'Tenor',
		tenorValue: rfqData.tenor,
		effectiveLabel: 'Effective',
		effectiveValue: formatShortDate(rfqData.effective),
		maturityLabel: 'Maturity',
		maturityValue: formatShortDate(rfqData.maturity),
		actLabel: 'ACT',
		actValue: rfqData.act,
		rateLabel: isDeskRate ? 'Indicative given' : 'Desk rate',
		rateValue: `${rfqData.libor.toFixed(3)}% libor`,
		summaryTitle,
		summaryValue
	};

	const buttons = actionButtons.map((b) => ({
		title: b.label,
		type: 'button',
		cta: b.cta,
		onClick: {
			task: b.id,
			customData: rfqData
		}
	}));

	const webRoot = window.location.href.replace('windows/irs-rfq/irs-rfq.html', '');

	const notification = {
		title,
		toast: 'transient',
		category: 'default',
		template: 'custom',
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

	await notifications.create(notification);

	return id;
}

/**
 * Show inbound frq notification.
 * @param rfqData The data to use in the notification.
 * @returns The id.
 */
async function showInboundRFQ(rfqData) {
	const title = createTitle(rfqData);
	rfqData.deskExecuteStart = Date.now();
	return showNotification(
		rfqData,
		'yellow',
		'INBOUND RFQ',
		'account',
		'#FF8C4C',
		'INDICATIVE RATE PROVIDED',
		title,
		false,
		[
			{
				label: 'Accept Rate & respond',
				id: 'accept-rate',
				cta: false
			},
			{
				label: 'View Blotter',
				id: 'view-blotter',
				cta: true
			}
		]
	);
}

/**
 * Show quote notification.
 * @param rfqData The data ot use in the notification.
 * @returns The id.
 */
async function showQuote(rfqData) {
	rfqData.clientExecuteStart = Date.now();
	return showNotification(
		rfqData,
		'green',
		'YOUR QUOTE',
		'allocation',
		'green',
		'ACTION REQUIRED',
		'You have 30 seconds from receipt to complete order',
		false,
		[
			{
				label: 'Reject quote',
				id: 'reject-quote',
				cta: false
			},
			{
				label: 'Execute trade',
				id: 'execute-trade',
				cta: true
			}
		]
	);
}

/**
 * Show client confirmation data.
 * @param rfqData The data for the notification.
 * @returns The id.
 */
async function showClientConfirmation(rfqData) {
	const title = createTitle(rfqData);
	rfqData.clientExecuteEnd = Date.now();
	return showNotification(
		rfqData,
		'green',
		'TRADE CONFIRMED',
		'allocation',
		'green',
		'TRADE CONFIRMED',
		`${title}
		ref: ${rfqData.ref}
		
		Execution: ${new Date(rfqData.executionTime).toLocaleString()}`,
		false,
		[
			{
				label: 'Dismiss',
				id: 'dismiss-quote-client',
				cta: false
			},
			{
				label: 'View blotter',
				id: 'dismiss-quote-client',
				cta: true
			}
		]
	);
}

/**
 * Show trader notification.
 * @param rfqData The data for the notification.
 * @returns The id.
 */
async function showTraderConfirmation(rfqData) {
	const title = createTitle(rfqData);
	rfqData.deskExecuteEnd = Date.now();
	return showNotification(
		rfqData,
		'green',
		'INBOUND RFQ',
		'allocation',
		'green',
		'TRADE CONFIRMED',
		`${title}
		ref: ${rfqData.ref}
		Response: Desk ${Math.round(
			(rfqData.deskExecuteEnd - rfqData.deskExecuteStart) / 1000
		)}s, Client ${Math.round((rfqData.clientExecuteEnd - rfqData.clientExecuteStart) / 1000)}s
		Execution: ${new Date(rfqData.executionTime).toLocaleString()}`,
		false,
		[
			{
				label: 'Dismiss',
				id: 'dismiss-quote-trader',
				cta: false
			},
			{
				label: 'View blotter',
				id: 'dismiss-quote-trader',
				cta: true
			}
		]
	);
}

/**
 * Polyfills randomUUID if running in a non-secure context.
 * @returns The random UUID.
 */
function randomUUID() {
	if ('randomUUID' in window.crypto) {
		// eslint-disable-next-line no-restricted-syntax
		return window.crypto.randomUUID();
	}
	// Polyfill the window.crypto.randomUUID if we are running in a non secure context that doesn't have it
	// we are still using window.crypto.getRandomValues which is always available
	// https://stackoverflow.com/a/2117523/2800218
	/**
	 * Get random hex value.
	 * @param c The number to base the random value on.
	 * @returns The random value.
	 */
	function getRandomHex(c) {
		// eslint-disable-next-line no-bitwise
		const rnd = window.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4));
		return (
			// eslint-disable-next-line no-bitwise
			(Number(c) ^ rnd).toString(16)
		);
	}
	return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, getRandomHex);
}

/**
 * Create a container element for the home template.
 * @param containerType The type of container.
 * @param children The children to include in the container.
 * @param style Additional CSS properties to use.
 * @returns The container fragment.
 */
function createContainer(containerType, children, style) {
	return {
		type: 'container',
		style: {
			display: 'flex',
			flexDirection: containerType,
			...style
		},
		children
	};
}

/**
 * Create a text element.
 * @param dataKey The data key to lookup in the data object.
 * @param fontSize The size of the font.
 * @param style Additional CSS properties to use.
 * @returns The text fragment.
 */
function createText(dataKey, fontSize, style) {
	return {
		type: 'text',
		dataKey,
		style: {
			fontSize: `${fontSize ?? 14}px`,
			...style
		}
	};
}

/**
 * Create a labelled value.
 * @param labelKey The data key to lookup in the data object for the label.
 * @param valueKey The data key to lookup in the data object for the value.
 * @param style Additional CSS properties to use.
 * @returns The label and value fragment.
 */
function createLabelledForm(labelKey, valueKey, style) {
	return {
		type: 'container',
		style: {
			display: 'flex',
			flexDirection: 'row',
			marginBottom: '6px',
			gap: '10px',
			...style
		},
		children: [
			createText(labelKey, 12, {
				flex: '1',
				display: 'flex',
				justifyContent: 'flex-end'
			}),
			createContainer(
				'row',
				[
					createText(valueKey, 10, {
						display: 'flex',
						alignItems: 'center',
						padding: '0px 8px',
						backgroundColor: 'white',
						color: 'black',
						textTransform: 'uppercase',
						fontWeight: '700',
						borderRadius: '2px'
					})
				],
				{ flex: '1.5' }
			)
		]
	};
}
