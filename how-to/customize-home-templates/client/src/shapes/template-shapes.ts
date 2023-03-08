import type {
	ButtonStyle,
	ButtonTemplateFragment,
	ImageTemplateFragment,
	PlainContainerTemplateFragment,
	TemplateFragment,
	TextTemplateFragment
} from "@openfin/workspace";
import type * as CSS from "csstype";

export interface TemplateHelpers {
	createHelp(
		title: string,
		description: string[],
		examples: string[]
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	): Promise<{ layout: PlainContainerTemplateFragment; data: any }>;

	createContainer(
		containerType: "column" | "row",
		children: TemplateFragment[],
		style?: CSS.Properties
	): Promise<PlainContainerTemplateFragment>;

	createTitle(
		dataKey: string,
		fontSize?: number,
		fontWeight?: string,
		style?: CSS.Properties,
		children?: TemplateFragment[]
	): Promise<TextTemplateFragment>;

	createText(dataKey: string, fontSize?: number, style?: CSS.Properties): Promise<TextTemplateFragment>;

	createImage(
		dataKey: string,
		alternativeText: string,
		style?: CSS.Properties
	): Promise<ImageTemplateFragment>;

	createButton(
		buttonStyle: ButtonStyle,
		titleKey: string,
		action: string,
		style?: CSS.Properties,
		children?: TemplateFragment[]
	): Promise<ButtonTemplateFragment>;

	createLabelledValue(
		labelKey: string,
		valueKey: string,
		style?: CSS.Properties
	): Promise<PlainContainerTemplateFragment>;

	createTable(
		tableData: string[][],
		colSpans: number[],
		tableIndex: number,
		data: { [id: string]: string }
	): Promise<TemplateFragment>;

	createLink(
		labelKey: string,
		action: string,
		fontSize?: number,
		style?: CSS.Properties
	): Promise<TemplateFragment>;
}
