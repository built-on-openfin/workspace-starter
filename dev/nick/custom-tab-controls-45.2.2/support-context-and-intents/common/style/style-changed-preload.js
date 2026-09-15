/**
 * This preload script can be included by any view that wants to keep track
 * of the currently selected, it listens for a channel message of platform.theme
 * which contains the scheme "dark" or "light" and the current palette.
 * By default this will create add a CSS class to the body of "theme-dark" or "theme-light"
 * and will also create a set of CSS root variable for the theme colors.
 * An example of the theme vars will be
 * --theme-scheme: light;
 * --theme-brand-primary: #0A76D3;
 * --theme-brand-secondary: #1E1F23;
 * --theme-background-primary: #FAFBFE;
 * --theme-background1: #FFFFFF;
 * --theme-background2: #FAFBFE;
 * --theme-background3: #F3F5F8;
 * --theme-background4: #ECEEF1;
 * --theme-background5: #DDDFE4;
 * --theme-background6: #C9CBD2;
 * --theme-status-success: #35C759;
 * --theme-status-warning: #F48F00;
 * --theme-status-critical: #BE1D1F;
 * --theme-status-active: #0498FB;
 * --theme-input-background: #ECEEF1;
 * --theme-input-color: #1E1F23;
 * --theme-input-placeholder: #383A40;
 * --theme-input-disabled: #7D808A;
 * --theme-input-focused: #C9CBD2;
 * --theme-text-default: #1E1F23;
 * --theme-text-help: #2F3136;
 * --theme-text-inactive: #7D808A;
 * --theme-content-background1: #0A76D3;
 * --theme-content-background2: #000000;
 * --theme-content-background3: #000000;
 * --theme-content-background4: #000000;
 * --theme-content-background5: #000000;
 */
document.addEventListener('DOMContentLoaded', async () => {
	try {
		console.log('Style Change Preload activated');

		if (
			window.fin !== undefined &&
			fin.me.interop !== undefined &&
			fin.me.interop.joinSessionContextGroup !== undefined
		) {
			const appSessionContextGroup = await fin.me.interop.joinSessionContextGroup('platform/events');

			appSessionContextGroup.addContextHandler((context) => {
				if (context.type === 'platform.theme') {
					console.log('Received platform.theme context', context);
					const prefix = context?.prefix ?? 'theme';
					const darkScheme = context?.schemeNames?.dark ?? 'theme-dark';
					const lightScheme = context?.schemeNames?.light ?? 'theme-light';
					setColorScheme(context.schemeType, darkScheme, lightScheme);
					convertPaletteToCss(prefix, context.schemeType, context.palette);
				}
			});
		}
	} catch (err) {
		console.error('Error encountered while listening for platform events via interop.', err);
	}
});

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
