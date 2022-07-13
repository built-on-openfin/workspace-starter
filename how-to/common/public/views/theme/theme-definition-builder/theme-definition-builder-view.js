const btnResetDark = document.querySelector('#btnResetDark');
const btnResetLight = document.querySelector('#btnResetLight');
const btnSave = document.querySelector('#btnSave');
const btnCopy = document.querySelector('#btnCopy');
const btnCaptureDomain = document.querySelector('#btnCaptureDomain');
const domain = document.querySelector('#domain');
const domainPreview = document.querySelector('#domain-preview');
const domainDelay = document.querySelector('#domain-delay');
const delayInSeconds = document.querySelector('#delay');
const paletteContainer = document.querySelector('#palette-container');
const preview = document.querySelector('#preview');
// domain inspired palette
const dominantColor = document.querySelector('#dominant-color');
const palette1 = document.querySelector('#palette-1');
const palette2 = document.querySelector('#palette-2');
const palette3 = document.querySelector('#palette-3');
const palette4 = document.querySelector('#palette-4');
const palette5 = document.querySelector('#palette-5');
const palette6 = document.querySelector('#palette-6');
const palette7 = document.querySelector('#palette-7');
const palette8 = document.querySelector('#palette-8');
const palette9 = document.querySelector('#palette-9');
const palette10 = document.querySelector('#palette-10');

// theme options
const title = document.querySelector('#title');
const logo = document.querySelector('#logo');

const brandPrimary = document.querySelector('#brand-primary');
const brandSecondary = document.querySelector('#brand-secondary');
const backgroundPrimary = document.querySelector('#background-primary');
const background1 = document.querySelector('#background-1');
const background2 = document.querySelector('#background-2');
const background3 = document.querySelector('#background-3');
const background4 = document.querySelector('#background-4');
const background5 = document.querySelector('#background-5');
const background6 = document.querySelector('#background-6');
const statusSuccess = document.querySelector('#status-success');
const statusWarning = document.querySelector('#status-warning');
const statusCritical = document.querySelector('#status-critical');
const statusActive = document.querySelector('#status-active');
const inputBackground = document.querySelector('#input-background');
const inputColor = document.querySelector('#input-color');
const inputPlaceholder = document.querySelector('#input-placeholder');
const inputDisabled = document.querySelector('#input-disabled');
const inputFocused = document.querySelector('#input-focused');
const textDefault = document.querySelector('#text-default');
const textHelp = document.querySelector('#text-help');
const textInactive = document.querySelector('#text-inactive');

// variables
let lastDomain;
let lastColor;
const paletteLight = {
	brandPrimary: '#399BB8',
	brandSecondary: '#383A40',
	backgroundPrimary: '#111214',
	background1: '#ECEEF1',
	background2: '#FAFBFE',
	background3: '#ECEEF1',
	background4: '#ECEEF1',
	background5: '#DDDFE4',
	background6: '#ffffff',
	statusSuccess: '#35C759',
	statusWarning: '#C93400',
	statusCritical: '#000000',
	statusActive: '#399BB8',
	inputBackground: '#ECEEF1',
	inputColor: '#1E1F23',
	inputPlaceholder: '#7D808A',
	inputDisabled: '#7D808A',
	inputFocused: '#C9CBD2',
	textDefault: '#1E1F23',
	textHelp: '#111214',
	textInactive: '#7D808A'
};

const paletteDark = {
	brandPrimary: '#504CFF',
	brandSecondary: '#383A40',
	backgroundPrimary: '#000000',
	background1: '#111214',
	background2: '#1E1F23',
	background3: '#24262B',
	background4: '#2F3136',
	background5: '#383A40',
	background6: '#53565F',
	statusSuccess: '#35C759',
	statusWarning: '#C93400',
	statusCritical: '#000000',
	statusActive: '#0879C4',
	inputBackground: '#53565F',
	inputColor: '#FFFFFF',
	inputPlaceholder: '#C9CBD2',
	inputDisabled: '#7D808A',
	inputFocused: '#C9CBD2',
	textDefault: '#FFFFFF',
	textHelp: '#C9CBD2',
	textInactive: '#7D808A'
};

function validateDomain() {
	btnCaptureDomain.disabled = !domain.checkValidity();
}

function rgbToHex(r, g, b) {
	const hexToReturn = [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
	return `#${hexToReturn}`;
}

function rgbStringToHex(rgbString) {
	if (!rgbString.includes('rgb')) {
		return rgbString;
	}
	let result = rgbString.replace('rgb(', '');
	result = result.replace(')', '');
	result = result.split(',');
	const r = Number.parseInt(result[0].trim(), 10);
	const g = Number.parseInt(result[1].trim(), 10);
	const b = Number.parseInt(result[2].trim(), 10);
	return rgbToHex(r, g, b);
}

async function getThemePalette(base64) {
	const themeImage = document.createElement('img');

	await new Promise((resolve, reject) => {
		themeImage.src = `data:image/jpg;base64,${base64}`;
		themeImage.addEventListener('load', resolve);
	});

	const colorThief = new ColorThief();
	const color = colorThief.getColor(themeImage);
	const palette = colorThief.getPalette(themeImage);

	const response = [];

	if (color !== undefined && color !== null) {
		response.push(rgbToHex(color[0], color[1], color[2]));
	}

	if (palette !== undefined && palette !== null) {
		for (let i = 0; i < palette.length; i++) {
			response.push(rgbToHex(palette[i][0], palette[i][1], palette[i][2]));
		}
	}
	console.log(response);
	return response;
}

async function captureUrl(url, delay) {
	if (window.fin === undefined) {
		return;
	}
	let targetWindow;
	let result;

	try {
		const winOption = {
			name: 'site-image-capture-window',
			defaultWidth: 720,
			defaultHeight: 500,
			url,
			frame: true,
			autoShow: false
		};
		targetWindow = await fin.Window.create(winOption);

		if (delay !== undefined) {
			const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));
			await wait(delay);
		}

		const options = {
			area: {
				height: 500,
				width: 720,
				x: 0,
				y: 0
			},
			format: 'jpg',
			quality: 85
		};
		result = await targetWindow.capturePage(options);
	} catch (err) {
		console.log(`Error while trying to screen capture ${url}`, err);
	}

	if (targetWindow !== undefined) {
		targetWindow.close(true);
	}
	return result;
}

async function copyToClipboard(value) {
	if (window.fin) {
		fin.Clipboard.write({
			data: { text: value }
		})
			.then(() => console.log('Data saved to clipboard.'))
			.catch((err) => console.log(err));
	}
}

function updatePreview(customData) {
	if (customData.theme !== undefined) {
		const json = JSON.stringify(customData.theme, null, 4);
		const dataURL = `data:application/json;base64,${btoa(json)}`;
		preview.textContent = json;

		let filename = customData.theme.title.toLowerCase();
		filename = filename.trim();
		filename = filename.replaceAll(' ', '-');
		if (filename === '') {
			filename = 'my-custom';
		}
		btnSave.setAttribute('download', `${filename}.workspacetheme`);
		btnSave.setAttribute('href', dataURL);
	}
}

async function onThemeChange(evt) {
	console.log('Theme has changed');
	const customData = await getChanges();
	await saveChanges(customData);
	await updatePreview(customData);
}

function onPaletteDragStart(event) {
	lastColor = rgbStringToHex(event.currentTarget.style.backgroundColor);
}

function onPaletteDragOver(event) {
	event.preventDefault();
}

async function onPaletteDrop(evt) {
	evt.target.value = lastColor;
	onThemeChange();
}

async function onPaletteClick(evt) {
	copyToClipboard(rgbStringToHex(evt.currentTarget.style.backgroundColor));
}

function bindThemeOptions(element) {
	element.addEventListener('dragover', onPaletteDragOver);
	element.addEventListener('drop', onPaletteDrop);
	element.addEventListener('change', onThemeChange);
}

function bindPaletteOptions(element) {
	element.addEventListener('dragstart', onPaletteDragStart);
	element.addEventListener('click', onPaletteClick);
}

async function bindButtons() {
	btnCopy.addEventListener('click', async () => {
		const data = await getChanges();
		await copyToClipboard(JSON.stringify(data.theme, null, 4));
	});
	btnResetDark.addEventListener('click', async () => {
		console.log('apply dark settings');
		const customData = {};
		const theme = {};
		theme.title = title.value;
		theme.logo = logo.value;
		theme.palette = paletteDark;
		customData.theme = theme;
		await applyChanges(customData);
		await updatePreview(customData);
	});
	btnResetLight.addEventListener('click', async () => {
		console.log('apply light settings');
		const customData = {};
		const theme = {};
		theme.title = title.value;
		theme.logo = logo.value;
		theme.palette = paletteLight;

		customData.theme = theme;
		await applyChanges(customData);
		await updatePreview(customData);
	});
	btnCaptureDomain.addEventListener('click', async () => {
		paletteContainer.style.display = 'none';
		const url = domain.value;
		const delay = Number.parseInt(domainDelay.value, 10) * 1000;
		const siteImage = await captureUrl(url, delay);
		if (siteImage !== undefined && siteImage !== null) {
			const colors = await getThemePalette(siteImage);
			domainPreview.src = `data:image/jpg;base64,${siteImage}`;
			domainPreview.title =
				'If the capture has a cookie consent popup you can click the image to launch it in a new window in order to dismiss the prompt. If you re-request the image it will not include the prompt.';
			lastDomain = url;
			dominantColor.style.backgroundColor = colors[0];
			palette1.style.backgroundColor = colors[1];
			palette2.style.backgroundColor = colors[2];
			palette3.style.backgroundColor = colors[3];
			palette4.style.backgroundColor = colors[4];
			palette5.style.backgroundColor = colors[5];
			palette6.style.backgroundColor = colors[6];
			palette7.style.backgroundColor = colors[7];
			palette8.style.backgroundColor = colors[8];
			palette9.style.backgroundColor = colors[9];
			palette10.style.backgroundColor = colors[10];
			paletteContainer.style.display = 'flex';
			const customData = await getChanges();
			await saveChanges(customData);
		}
	});
}

async function saveChanges(customData) {
	console.log('Custom Data to be saved:', customData);
	await fin.me.updateOptions({ customData });
}

async function getChanges() {
	const customData = {};
	const theme = {};
	theme.title = title.value;
	theme.logo = logo.value;
	theme.palette = {};
	theme.palette.brandPrimary = brandPrimary.value;
	theme.palette.brandSecondary = brandSecondary.value;
	theme.palette.backgroundPrimary = backgroundPrimary.value;
	theme.palette.background1 = background1.value;
	theme.palette.background2 = background2.value;
	theme.palette.background3 = background3.value;
	theme.palette.background4 = background4.value;
	theme.palette.background5 = background5.value;
	theme.palette.background6 = background6.value;
	theme.palette.statusSuccess = statusSuccess.value;
	theme.palette.statusWarning = statusWarning.value;
	theme.palette.statusCritical = statusCritical.value;
	theme.palette.statusActive = statusActive.value;
	theme.palette.inputBackground = inputBackground.value;
	theme.palette.inputColor = inputColor.value;
	theme.palette.inputPlaceholder = inputPlaceholder.value;
	theme.palette.inputDisabled = inputDisabled.value;
	theme.palette.inputFocused = inputFocused.value;
	theme.palette.textDefault = textDefault.value;
	theme.palette.textHelp = textHelp.value;
	theme.palette.textInactive = textInactive.value;

	const domainPalette = {};
	domainPalette.domain = domain.value;
	domainPalette.delay = domainDelay.value;
	domainPalette.dominantColor = rgbStringToHex(dominantColor.style.backgroundColor);
	domainPalette.palette1 = rgbStringToHex(palette1.style.backgroundColor);
	domainPalette.palette2 = rgbStringToHex(palette2.style.backgroundColor);
	domainPalette.palette3 = rgbStringToHex(palette3.style.backgroundColor);
	domainPalette.palette4 = rgbStringToHex(palette4.style.backgroundColor);
	domainPalette.palette5 = rgbStringToHex(palette5.style.backgroundColor);
	domainPalette.palette6 = rgbStringToHex(palette6.style.backgroundColor);
	domainPalette.palette7 = rgbStringToHex(palette7.style.backgroundColor);
	domainPalette.palette8 = rgbStringToHex(palette8.style.backgroundColor);
	domainPalette.palette9 = rgbStringToHex(palette9.style.backgroundColor);
	domainPalette.palette10 = rgbStringToHex(palette10.style.backgroundColor);

	customData.theme = theme;
	customData.domainPalette = domainPalette;
	return customData;
}

async function applyChanges(customData) {
	if (customData !== undefined) {
		const theme = customData.theme;
		const domainPalette = customData.domainPalette;

		if (theme !== undefined) {
			title.value = theme.title;
			logo.value = theme.logo;
			brandPrimary.value = theme.palette.brandPrimary;
			brandSecondary.value = theme.palette.brandSecondary;
			backgroundPrimary.value = theme.palette.backgroundPrimary;
			background1.value = theme.palette.background1;
			background2.value = theme.palette.background2;
			background3.value = theme.palette.background3;
			background4.value = theme.palette.background4;
			background5.value = theme.palette.background5;
			background6.value = theme.palette.background6;
			statusSuccess.value = theme.palette.statusSuccess;
			statusWarning.value = theme.palette.statusWarning;
			statusCritical.value = theme.palette.statusCritical;
			statusActive.value = theme.palette.statusActive;
			inputBackground.value = theme.palette.inputBackground;
			inputColor.value = theme.palette.inputColor;
			inputPlaceholder.value = theme.palette.inputPlaceholder;
			inputDisabled.value = theme.palette.inputDisabled;
			inputFocused.value = theme.palette.inputFocused;
			textDefault.value = theme.palette.textDefault;
			textHelp.value = theme.palette.textHelp;
			textInactive.value = theme.palette.textInactive;
		}

		if (domainPalette !== undefined) {
			domain.value = domainPalette.domain;
			delayInSeconds.textContent = domainPalette.delay;
			domainDelay.value = domainPalette.delay;
			dominantColor.style.backgroundColor = domainPalette.dominantColor;
			palette1.style.backgroundColor = domainPalette.palette1;
			palette2.style.backgroundColor = domainPalette.palette2;
			palette3.style.backgroundColor = domainPalette.palette3;
			palette4.style.backgroundColor = domainPalette.palette4;
			palette5.style.backgroundColor = domainPalette.palette5;
			palette6.style.backgroundColor = domainPalette.palette6;
			palette7.style.backgroundColor = domainPalette.palette7;
			palette8.style.backgroundColor = domainPalette.palette8;
			palette9.style.backgroundColor = domainPalette.palette9;
			palette10.style.backgroundColor = domainPalette.palette10;
			if (domainPalette.dominantColor !== undefined) {
				paletteContainer.style.display = 'flex';
			}
		}
	}
}

async function init() {
	const options = await fin.me.getOptions();
	if (options?.customData?.theme !== undefined) {
		await applyChanges(options.customData);
		await updatePreview(options.customData);
	} else {
		const customData = {
			theme: {
				title: '',
				logo: '',
				palette: paletteDark
			}
		};
		await applyChanges(customData);
		await updatePreview(customData);
	}

	await bindButtons();
	validateDomain();

	domain.addEventListener('input', () => {
		validateDomain();
	});

	domainPreview.addEventListener('click', () => {
		window.open(lastDomain, '_blank');
	});

	domainDelay.addEventListener('input', async () => {
		delayInSeconds.textContent = domainDelay.value;
		const customData = await getChanges();
		await saveChanges(customData);
	});

	title.addEventListener('input', async () => {
		const customData = await getChanges();
		await updatePreview(customData);
		await saveChanges(customData);
	});

	logo.addEventListener('input', async () => {
		const customData = await getChanges();
		await updatePreview(customData);
		await saveChanges(customData);
	});

	bindPaletteOptions(dominantColor);
	bindPaletteOptions(palette1);
	bindPaletteOptions(palette2);
	bindPaletteOptions(palette3);
	bindPaletteOptions(palette4);
	bindPaletteOptions(palette5);
	bindPaletteOptions(palette6);
	bindPaletteOptions(palette7);
	bindPaletteOptions(palette8);
	bindPaletteOptions(palette9);
	bindPaletteOptions(palette10);
	bindThemeOptions(brandPrimary);
	bindThemeOptions(brandSecondary);
	bindThemeOptions(backgroundPrimary);
	bindThemeOptions(background1);
	bindThemeOptions(background2);
	bindThemeOptions(background3);
	bindThemeOptions(background4);
	bindThemeOptions(background5);
	bindThemeOptions(background6);
	bindThemeOptions(statusSuccess);
	bindThemeOptions(statusWarning);
	bindThemeOptions(statusCritical);
	bindThemeOptions(statusActive);
	bindThemeOptions(inputBackground);
	bindThemeOptions(inputColor);
	bindThemeOptions(inputPlaceholder);
	bindThemeOptions(inputDisabled);
	bindThemeOptions(inputFocused);
	bindThemeOptions(textDefault);
	bindThemeOptions(textHelp);
	bindThemeOptions(textInactive);
}

document.addEventListener('DOMContentLoaded', () => {
	try {
		init();
	} catch (error) {
		console.error(error);
	}
});
