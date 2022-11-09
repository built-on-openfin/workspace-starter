import {
	ButtonStyle,
	ButtonTemplateFragment,
	ImageTemplateFragment,
	PlainContainerTemplateFragment,
	TemplateFragment,
	TemplateFragmentTypes,
	TextTemplateFragment
} from "@openfin/workspace";
import type * as CSS from "csstype";
import { getCurrentTheme } from "./themes";

export async function createHelp(
	title: string,
	description: string[],
	examples: string[]
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ layout: PlainContainerTemplateFragment; data: any }> {
	const theme = await getCurrentTheme();
	const additionalData = {};
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
				fontFamily: "monospace"
			})
		);
	}
	if (exampleFragments.length > 0) {
		fragments.push(
			await createContainer("column", exampleFragments, {
				padding: "10px",
				marginTop: "6px",
				backgroundColor: theme.palette.inputBackground,
				color: theme.palette.inputColor,
				borderRadius: "5px"
			})
		);
	}
	return {
		layout: await createContainer("column", [await createTitle("title"), ...fragments], {
			padding: "10px"
		}),
		data: {
			title,
			...additionalData
		}
	};
}

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

export async function createTitle(
	dataKey: string,
	fontSize: number = 16,
	fontWeight: string = "bold",
	style?: CSS.Properties
): Promise<TextTemplateFragment> {
	const theme = await getCurrentTheme();
	return {
		type: TemplateFragmentTypes.Text,
		dataKey,
		style: {
			color: theme.palette.brandPrimary,
			fontSize: `${fontSize ?? 16}px`,
			fontWeight,
			...style
		}
	};
}

export async function createText(
	dataKey: string,
	fontSize: number = 14,
	style?: CSS.Properties
): Promise<TextTemplateFragment> {
	return {
		type: TemplateFragmentTypes.Text,
		dataKey,
		style: {
			fontSize: `${fontSize ?? 14}px`,
			...style
		}
	};
}

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

export async function createButton(
	buttonStyle: ButtonStyle,
	titleKey: string,
	action: string,
	style?: CSS.Properties
): Promise<ButtonTemplateFragment> {
	const theme = await getCurrentTheme();
	const buttonOptions =
		buttonStyle === ButtonStyle.Secondary
			? {
					border: `1px solid ${theme.palette.inputColor}`
			  }
			: {};
	return {
		type: TemplateFragmentTypes.Button,
		buttonStyle,
		children: [await createText(titleKey, 12)],
		action,
		style: {
			...buttonOptions,
			...style
		}
	};
}

export async function createLabelledValue(
	labelKey: string,
	valueKey: string,
	style?: CSS.Properties
): Promise<PlainContainerTemplateFragment> {
	const theme = await getCurrentTheme();
	return {
		type: TemplateFragmentTypes.Container,
		style: {
			display: "flex",
			flexDirection: "column",
			marginBottom: "9px",
			...style
		},
		children: [
			await createText(labelKey, 11, { fontWeight: "bold", color: theme.palette.brandPrimary }),
			await createText(valueKey, 14)
		]
	};
}

export async function createTable(
	tableData: string[][],
	colSpans: number[],
	tableIndex: number,
	data: { [id: string]: string }
): Promise<TemplateFragment> {
	const theme = await getCurrentTheme();

	const cells: TemplateFragment[] = [];
	const finalColSpans = colSpans.slice();
	for (let col = 0; col < tableData[0].length; col++) {
		const headerKey = `table${tableIndex}_header${col}`;
		data[headerKey] = tableData[0][col];
		cells.push(
			await createText(headerKey, 10, {
				marginBottom: "10px",
				padding: "3px",
				whiteSpace: "nowrap",
				fontWeight: "bold",
				backgroundColor: theme.palette.brandPrimary
			})
		);

		if (colSpans.length === 0) {
			finalColSpans.push(1);
		}
	}

	for (let row = 1; row < tableData.length; row++) {
		for (let col = 0; col < tableData[0].length; col++) {
			const rowColKey = `table${tableIndex}_col${col}_row${row}`;
			data[rowColKey] = tableData[row][col];
			cells.push(await createText(rowColKey, 10, { padding: "3px", whiteSpace: "nowrap" }));
		}
	}

	return createContainer("row", cells, {
		display: "grid",
		gridTemplateColumns: finalColSpans.map((s) => `${s}fr`).join(" "),
		marginBottom: "10px",
		overflow: "auto"
	});
}

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
