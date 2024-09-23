document.addEventListener('DOMContentLoaded', initDOM);

let activeSubMenu;
let activeSubMenuId;
let mouseOverEntry;

/**
 * Initialize the DOM components.
 */
async function initDOM() {
	const options = await fin.me.getOptions();
	const menuData = options.customData;

	window.addEventListener('blur', async () => {
		// If we have an active submenu the blur was setting focus
		// to the menu, otherwise we have lose focus so close without result
		if (!activeSubMenu) {
			// We delay this so that the blur event has time to complete
			setTimeout(async () => {
				await fin.me.dispatchPopupResult();
			}, 200);
		}
	});

	const colorScheme = menuData?.colorScheme ?? 'dark';

	setColorScheme(colorScheme, 'theme-dark', 'theme-light');
	convertPaletteToCss('theme', colorScheme, menuData?.palette);

	const menuContainer = document.querySelector('#menuContainer');
	// The menuContainer is initially hidden to allow for the palette to be set
	menuContainer.style.display = 'flex';

	if (menuContainer) {
		if (Array.isArray(menuData?.menuEntries) && menuData.menuEntries.length > 0) {
			let iconCount = 0;
			for (const menuEntry of menuData.menuEntries) {
				if (
					menuEntry.type === 'checkbox' ||
					menuEntry.checked !== undefined ||
					menuEntry.icon !== undefined
				) {
					iconCount++;
				}
			}
			for (const menuEntry of menuData.menuEntries) {
				let menuEntryItem;
				const hasSubMenu = menuEntry.type === 'submenu' || Array.isArray(menuEntry.submenu);
				const isDisabled = !(menuEntry.enabled ?? true);

				if (menuEntry.type === 'separator') {
					menuEntryItem = document.createElement('div');

					menuEntryItem.classList.add('menu-item-separator');
					if (isDisabled) {
						menuEntryItem.classList.add('menu-item-disabled');
					}

					const sep = document.createElement('hr');
					menuEntryItem.append(sep);

					menuContainer.append(menuEntryItem);
				} else {
					menuEntryItem = document.createElement('button');
					menuEntryItem.ariaLabel = menuEntry.label;

					menuEntryItem.classList.add('menu-item');

					if (isDisabled) {
						menuEntryItem.classList.add('menu-item-disabled');
					} else if (!hasSubMenu) {
						menuEntryItem.addEventListener('click', async () => {
							await fin.me.dispatchPopupResult(menuEntry.data);
						});
					}

					let icon;
					if (menuEntry.checked) {
						icon = createSVG(
							'M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z'
						);
					} else if (menuEntry.icon) {
						icon = document.createElement('img');
						icon.src = menuEntry.icon;
						icon.style.maxWidth = '20px';
						icon.style.maxHeight = '20px';
					}

					const text = document.createElement('span');
					text.textContent = menuEntry.label;

					if (iconCount > 0) {
						const iconContainer = document.createElement('div');
						iconContainer.style.display = 'flex';
						iconContainer.style.justifyContent = 'center';
						iconContainer.style.alignItems = 'center';
						iconContainer.style.width = '20px';
						iconContainer.style.height = '20px';
						if (icon) {
							iconContainer.append(icon);
						}

						menuEntryItem.append(iconContainer);
					}
					menuEntryItem.append(text);
					if (hasSubMenu) {
						menuEntryItem.append(
							createSVG(
								'M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z'
							)
						);
					}
					menuContainer.append(menuEntryItem);
				}

				menuEntryItem.addEventListener('mouseover', async (event) => {
					mouseOverEntry = menuEntry;

					// If there is an active sub menu and it's different from the
					// current hovered menu entry, close it
					if (activeSubMenu && activeSubMenu !== mouseOverEntry) {
						await closeSubMenu();
					}

					// For the current hovered entry if it has a sub menu and it's not
					// disabled, and there is no open menu then display the menu
					if (!isDisabled && hasSubMenu && !activeSubMenu) {
						// Debounce
						setTimeout(async () => {
							if (menuEntry === mouseOverEntry) {
								await createSubMenu(menuData, menuEntry);
							}
						}, 200);
					}
				});
			}
		} else {
			const noEntries = document.createElement('div');
			const content = menuData?.noEntryText ?? 'No entries';
			noEntries.textContent = content;
			noEntries.ariaLabel = content;
			noEntries.classList.add('menu-item-none');
			menuContainer.append(noEntries);
		}
	}
}

/**
 * Create a sub menu.
 * @param menuData The menu data passed to the window.
 * @param menuEntry The menu entry to create the submenu for.
 */
async function createSubMenu(menuData, menuEntry) {
	if (activeSubMenu !== menuEntry) {
		activeSubMenu = menuEntry;
		activeSubMenuId = randomUUID();

		let x = menuData.bounds.width - 20;
		let y = menuEntry.y;
		const width = menuEntry.submenuDimensions.width;
		const height = menuEntry.submenuDimensions.height;

		if (x + menuData.bounds.x + width > menuData.monitorRect.right) {
			x = menuData.monitorRect.right - menuData.bounds.x - width - 20;
		}
		if (y + menuData.bounds.y + height > menuData.monitorRect.bottom) {
			y = menuData.monitorRect.bottom - menuData.bounds.y - height - 20;
		}

		const bounds = { x, y, width, height };

		const parentWindow = fin.Window.wrapSync(fin.me.identity);
		const result = await parentWindow.showPopupWindow({
			name: activeSubMenuId,
			initialOptions: {
				showTaskbarIcon: false,
				smallWindow: true,
				contextMenu: false,
				backgroundColor: menuData.currentPalette?.backgroundPrimary,
				customData: {
					...menuData,
					menuEntries: menuEntry.submenu,
					bounds
				}
			},
			url: menuData?.popupUrl,
			...bounds,
			blurBehavior: 'modal'
		});
		if (result.result === 'clicked' && result.identity.name === activeSubMenuId) {
			setTimeout(async () => {
				await fin.me.dispatchPopupResult(result.data);
			}, 200);
		}
	}
}

/**
 * Close the current submenu.
 */
async function closeSubMenu() {
	if (activeSubMenu !== undefined) {
		const win = fin.Window.wrapSync({
			uuid: fin.me.identity.uuid,
			name: activeSubMenuId
		});
		activeSubMenuId = undefined;
		activeSubMenu = undefined;
		try {
			await win.close();
		} catch {}
	}
}

/**
 * Create an SVG using just its path data.
 * @param pathData The data to use in the path.
 * @returns The created SVG
 */
function createSVG(pathData) {
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('width', '12px');
	svg.setAttribute('height', '12px');
	svg.setAttribute('viewBox', '0 0 1024 1024');

	const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	path.setAttribute('d', pathData);
	svg.append(path);
	return svg;
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
