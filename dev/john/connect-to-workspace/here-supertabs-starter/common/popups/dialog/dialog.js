document.addEventListener('DOMContentLoaded', initDOM);

/**
 * Initialize the DOM components.
 */
async function initDOM() {
	const options = await fin.me.getOptions();
	const dialogData = options.customData;

	const colorScheme = dialogData?.colorScheme ?? 'dark';

	setColorScheme(colorScheme, 'theme-dark', 'theme-light');
	convertPaletteToCss('theme', colorScheme, dialogData?.palette);

	const header = document.querySelector('header');
	if (header) {
		if (dialogData?.iconUrl) {
			const icon = document.createElement('img');
			icon.src = dialogData.iconUrl;
			icon.width = 16;
			icon.height = 16;
			header.append(icon);
		}
		const title = document.createElement('h4');
		title.textContent = dialogData?.title ?? 'Confirmation';
		header.append(title);
	}

	const message = document.querySelector('#message');
	if (message) {
		message.innerHTML = dialogData?.message ?? '';
	}

	const footer = document.querySelector('footer');
	if (footer && Array.isArray(dialogData?.buttons) && dialogData.buttons.length > 0) {
		for (const button of dialogData.buttons) {
			const dialogButton = document.createElement('button');

			dialogButton.ariaLabel = button.label;
			dialogButton.textContent = button.label;

			dialogButton.addEventListener('click', async () => {
				await fin.me.dispatchPopupResult(button);
			});

			footer.append(dialogButton);
		}
	}
}

/**
 * Set the color scheme class on the document body.
 * @param schemeType The type of the scheme dark or light.
 * @param darkScheme The class name to add for dark scheme.
 * @param lightScheme The class name to add for light scheme.
 */
function setColorScheme(schemeType, darkScheme, lightScheme) {
	if (schemeType === 'light') {
		document.body.classList.remove(darkScheme);
		document.body.classList.add(lightScheme);
	} else {
		document.body.classList.remove(lightScheme);
		document.body.classList.add(darkScheme);
	}
}

/**
 * Convert a camel case property name to kebab case for the css properties.
 * @param input The input name to convert.
 * @returns The name in kebab case.
 */
function kebabCase(input) {
	if (typeof input === 'string' && input.length > 0) {
		return (
			input
				.replace(/([A-Z])/g, ' $1')
				.trim()
				.match(/[^\u0000-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007F]+/g) ?? []
		)
			.join('-')
			.toLowerCase();
	}
	return '';
}

/**
 * Create all the css vars from the palette properties.
 * @param prefix The prefix to add to the property names.
 * @param scheme The scheme dark or light.
 * @param palette The palette to convert to properties.
 */
function convertPaletteToCss(prefix, scheme, palette) {
	const root = document.querySelector(':root');
	if (root) {
		root.style.setProperty(`--${prefix}-scheme`, scheme);
		const keys = Object.keys(palette);
		for (const key of keys) {
			root.style.setProperty(`--${prefix}-${kebabCase(key)}`, palette[key]);
		}
	}
}
