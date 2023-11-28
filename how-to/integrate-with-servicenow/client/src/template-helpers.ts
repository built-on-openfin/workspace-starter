import {
	ButtonStyle,
	TemplateFragmentTypes,
	type ButtonTemplateFragment,
	type ImageTemplateFragment,
	type PlainContainerTemplateFragment,
	type TemplateFragment,
	type TextTemplateFragment
} from "@openfin/workspace";
import { type CustomPaletteSet, getCurrentSync, ColorSchemeOptionType } from "@openfin/workspace-platform";
import type * as CSS from "csstype";

/**
 * Create a template for displaying help.
 * @param title The title at the top of the template.
 * @param description The description of the template.
 * @param examples Example to display.
 * @returns The layout and data for the template.
 */
export async function createHelp(
	title: string,
	description: string[],
	examples: string[]
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ layout: PlainContainerTemplateFragment; data: any }> {
	const palette = await getCurrentPalette();
	const additionalData: { [id: string]: string } = {};
	const fragments: TemplateFragment[] = [];
	for (let i = 0; i < description.length; i++) {
		const descriptionKey = `desc-${i}`;
		additionalData[descriptionKey] = description[i];
		fragments.push(
			await createText(descriptionKey, 12, {
				padding: "6px 0px"
			})
		);
	}
	const exampleFragments: TemplateFragment[] = [];
	for (let i = 0; i < examples.length; i++) {
		const exampleKey = `line-${i}`;
		additionalData[exampleKey] = examples[i];
		exampleFragments.push(
			await createText(exampleKey, 12, {
				fontFamily: "monospace",
				whiteSpace: "nowrap"
			})
		);
	}
	if (exampleFragments.length > 0) {
		fragments.push(
			await createContainer("column", exampleFragments, {
				padding: "10px",
				marginTop: "6px",
				backgroundColor: palette.inputBackground,
				color: palette.inputColor,
				borderRadius: "5px",
				overflow: "auto"
			})
		);
	}

	const layoutData = await createLayout(title, undefined, fragments);

	return {
		layout: layoutData.layout,
		data: {
			...layoutData.data,
			...additionalData
		}
	};
}

/**
 * Create a container element for the home template.
 * @param containerType The type of container.
 * @param children The children to include in the container.
 * @param style Additional CSS properties to use.
 * @returns The container fragment.
 */
export async function createContainer(
	containerType: "column" | "row",
	children: TemplateFragment[],
	style?: CSS.Properties
): Promise<PlainContainerTemplateFragment> {
	return {
		type: TemplateFragmentTypes.Container,
		style: {
			display: "flex",
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
export async function createText(
	dataKey: string,
	fontSize: number = 12,
	style?: CSS.Properties
): Promise<TextTemplateFragment> {
	return {
		type: TemplateFragmentTypes.Text,
		dataKey,
		style: {
			fontSize: `${fontSize ?? 12}px`,
			...style
		}
	};
}

/**
 * Create an image element.
 * @param dataKey The data key for the image url.
 * @param alternativeText Alternative text for the image.
 * @param style Additional CSS properties to use.
 * @returns The image fragment.
 */
export async function createImage(
	dataKey: string,
	alternativeText: string,
	style?: CSS.Properties
): Promise<ImageTemplateFragment> {
	return {
		type: TemplateFragmentTypes.Image,
		dataKey,
		alternativeText,
		style: {
			...style
		}
	};
}

/**
 * Create a button element.
 * @param buttonStyle The style of the button.
 * @param titleKey The data key to lookup in the data object for the title.
 * @param action The action to send on the button click.
 * @param style Additional CSS properties to use.
 * @param children Any child elements for the button.
 * @returns The button fragment.
 */
export async function createButton(
	buttonStyle: ButtonStyle,
	titleKey: string,
	action: string,
	style?: CSS.Properties,
	children?: TemplateFragment[]
): Promise<ButtonTemplateFragment> {
	const palette = await getCurrentPalette();
	const buttonOptions =
		buttonStyle === ButtonStyle.Secondary
			? {
					border: `1px solid ${palette.inputColor}`
			  }
			: {};
	return {
		type: TemplateFragmentTypes.Button,
		buttonStyle,
		children: children ?? [await createText(titleKey, 12)],
		action,
		style: {
			...buttonOptions,
			...style
		}
	};
}

/**
 * Create a link element.
 * @param labelKey The data key for the label text.
 * @param action The action to perform on clicking the link.
 * @param fontSize The font size for the link.
 * @param style Additional CSS properties to use.
 * @returns The link fragment.
 */
export async function createLink(
	labelKey: string,
	action: string,
	fontSize: number = 10,
	style?: CSS.Properties
): Promise<TemplateFragment> {
	return {
		type: TemplateFragmentTypes.Button,
		buttonStyle: ButtonStyle.TextOnly,
		children: [await createText(labelKey, fontSize)],
		action,
		style: {
			padding: 0,
			border: 0,
			fontWeight: "normal",
			textDecoration: "underline",
			...style
		}
	};
}

/**
 * Create a title element.
 * @param dataKey The data key for the title text.
 * @param fontSize The font size.
 * @param fontWeight The font weight.
 * @param style Additional CSS properties to use.
 * @returns The title element.
 */
export async function createTitle(
	dataKey: string,
	fontSize: number = 12,
	fontWeight: string = "bold",
	style?: CSS.Properties
): Promise<TextTemplateFragment> {
	const palette = await getCurrentPalette();
	return {
		type: TemplateFragmentTypes.Text,
		dataKey,
		style: {
			color: palette.textDefault ?? "#ffffff",
			fontSize: `${fontSize ?? 12}px`,
			fontWeight,
			overflow: "hidden",
			whiteSpace: "nowrap",
			textOverflow: "ellipsis",
			...style
		}
	};
}

/**
 * Create a template layout.
 * @param title The title for the template.
 * @param icon The icon for the template.
 * @param bodyFragments The fragments to go in the body.
 * @param buttons The buttons for the footer.
 * @returns The layout fragment.
 */
export async function createLayout(
	title: string,
	icon: string | undefined,
	bodyFragments: TemplateFragment[],
	buttons?: { title: string; action: string }[]
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ layout: PlainContainerTemplateFragment; data: any }> {
	const palette = await getCurrentPalette();
	const additionalData: { [id: string]: string } = {
		title
	};

	const header: TemplateFragment[] = [];
	if (icon) {
		header.push(
			await createImage("icon", "", {
				width: "16px",
				height: "16px"
			})
		);
		additionalData.icon = icon;
	}
	header.push(await createTitle("title"));

	const buttonsFragments: TemplateFragment[] = [];
	if (Array.isArray(buttons)) {
		for (let i = 0; i < buttons.length; i++) {
			buttonsFragments.push(await createButton(ButtonStyle.Primary, `buttonTitle${i}`, buttons[i].action));
			additionalData[`buttonTitle${i}`] = buttons[i].title;
		}
	}

	return {
		layout: await createContainer(
			"column",
			[
				await createContainer("row", header, {
					borderBottom: `1px solid ${palette.background6}`,
					paddingBottom: "5px",
					gap: "5px",
					alignItems: "center"
				}),
				await createContainer("column", bodyFragments, {
					flex: "1",
					gap: "10px"
				}),
				await createContainer("row", buttonsFragments, {
					justifyContent: "center",
					gap: "10px"
				})
			],
			{
				padding: "10px",
				gap: "10px",
				flex: "1"
			}
		),
		data: additionalData
	};
}

/**
 * Get the current platform palette.
 * @returns The current palette.
 */
export async function getCurrentPalette(): Promise<CustomPaletteSet> {
	const platform = getCurrentSync();
	const colorScheme = await platform.Theme.getSelectedScheme();

	if (!colorScheme) {
		return DEFAULT_PALETTES.dark;
	}

	const scheme: "dark" | "light" =
		colorScheme === ColorSchemeOptionType.System ? getSystemPreferredColorScheme() : colorScheme;

	return DEFAULT_PALETTES[scheme];
}

/**
 * Get the current system theme.
 * @returns Either light or dark.
 */
function getSystemPreferredColorScheme(): "dark" | "light" {
	if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
		return "dark";
	}
	return "light";
}

/**
 * The default pallettes for the platform.
 */
export const DEFAULT_PALETTES: {
	dark: CustomPaletteSet;
	light: CustomPaletteSet;
} = {
	light: {
		brandPrimary: "#0A76D3",
		brandSecondary: "#1E1F23",
		backgroundPrimary: "#FAFBFE",
		background1: "#FFFFFF",
		background2: "#FAFBFE",
		background3: "#F3F5F8",
		background4: "#ECEEF1",
		background5: "#DDDFE4",
		background6: "#C9CBD2",
		statusSuccess: "#35C759",
		statusWarning: "#F48F00",
		statusCritical: "#BE1D1F",
		statusActive: "#0498FB",
		inputBackground: "#ECEEF1",
		inputColor: "#1E1F23",
		inputPlaceholder: "#383A40",
		inputDisabled: "#7D808A",
		inputFocused: "#C9CBD2",
		textDefault: "#1E1F23",
		textHelp: "#2F3136",
		textInactive: "#7D808A",
		contentBackground1: "#0A76D3",
		contentBackground2: "#000000",
		contentBackground3: "#000000",
		contentBackground4: "#000000",
		contentBackground5: "#000000"
	},
	dark: {
		brandPrimary: "#0A76D3",
		brandSecondary: "#383A40",
		backgroundPrimary: "#1E1F23",
		background1: "#111214",
		background2: "#1E1F23",
		background3: "#24262B",
		background4: "#2F3136",
		background5: "#383A40",
		background6: "#53565F",
		statusSuccess: "#35C759",
		statusWarning: "#F48F00",
		statusCritical: "#BE1D1F",
		statusActive: "#0498FB",
		inputBackground: "#53565F",
		inputColor: "#FFFFFF",
		inputPlaceholder: "#C9CBD2",
		inputDisabled: "#7D808A",
		inputFocused: "#C9CBD2",
		textDefault: "#FFFFFF",
		textHelp: "#C9CBD2",
		textInactive: "#7D808A",
		contentBackground1: "#0A76D3",
		contentBackground2: "#000000",
		contentBackground3: "#000000",
		contentBackground4: "#000000",
		contentBackground5: "#000000"
	}
};
