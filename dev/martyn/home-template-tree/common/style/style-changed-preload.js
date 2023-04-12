function setColorScheme(schemeType, darkScheme, lightScheme) {
	if (schemeType === 'light') {
		document.body.classList.remove(darkScheme);
		document.body.classList.add(lightScheme);
	} else {
		document.body.classList.remove(lightScheme);
		document.body.classList.add(darkScheme);
	}
}

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

function createCssVars(prefix, scheme, palette) {
	const root = document.querySelector(':root');
	if (root) {
		root.style.setProperty(`--${prefix}-scheme`, scheme);
		const keys = Object.keys(palette);
		for (const key of keys) {
			root.style.setProperty(`--${prefix}-${kebabCase(key)}`, palette[key]);
		}
	}
}

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
					createCssVars(prefix, context.schemeType, context.palette);
				}
			});
		}
	} catch (err) {
		console.error('Error encountered while listening for platform events via interop.', err);
	}
});
