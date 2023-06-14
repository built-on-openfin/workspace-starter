import type { ButtonStyle, ButtonTemplateFragment, ImageTemplateFragment, PlainContainerTemplateFragment, TemplateFragment, TextTemplateFragment } from "@openfin/workspace";
import type * as CSS from "csstype";
import type { PlatformApp } from "./app-shapes";
/**
 * Helpers for home templates.
 */
export interface TemplateHelpers {
    /**
     * Create a template for displaying help.
     * @param title The title at the top of the template.
     * @param description The description of the template.
     * @param examples Example to display.
     * @returns The layout and data for the template.
     */
    createHelp(title: string, description: string[], examples: string[]): Promise<{
        layout: PlainContainerTemplateFragment;
        data: any;
    }>;
    /**
     * Create a container element for the home template.
     * @param containerType The type of container.
     * @param children The children to include in the container.
     * @param style Additional CSS properties to use.
     * @returns The container fragment.
     */
    createContainer(containerType: "column" | "row", children: TemplateFragment[], style?: CSS.Properties): Promise<PlainContainerTemplateFragment>;
    /**
     * Create a title element.
     * @param dataKey The data key for the title text.
     * @param fontSize The font size.
     * @param fontWeight The font weight.
     * @param style Additional CSS properties to use.
     * @returns The title element.
     */
    createTitle(dataKey: string, fontSize?: number, fontWeight?: string, style?: CSS.Properties): Promise<TextTemplateFragment>;
    /**
     * Create a text element.
     * @param dataKey The data key to lookup in the data object.
     * @param fontSize The size of the font.
     * @param style Additional CSS properties to use.
     * @returns The text fragment.
     */
    createText(dataKey: string, fontSize?: number, style?: CSS.Properties): Promise<TextTemplateFragment>;
    /**
     * Create an image element.
     * @param dataKey The data key for the image url.
     * @param alternativeText Alternative text for the image.
     * @param style Additional CSS properties to use.
     * @returns The image fragment.
     */
    createImage(dataKey: string, alternativeText: string, style?: CSS.Properties): Promise<ImageTemplateFragment>;
    /**
     * Create a button element.
     * @param buttonStyle The style of the button.
     * @param titleKey The data key to lookup in the data object for the title.
     * @param action The action to send on the button click.
     * @param style Additional CSS properties to use.
     * @param children Any child elements for the button.
     * @returns The button fragment.
     */
    createButton(buttonStyle: ButtonStyle, titleKey: string, action: string, style?: CSS.Properties, children?: TemplateFragment[]): Promise<ButtonTemplateFragment>;
    /**
     * Create a labelled value.
     * @param labelKey The data key to lookup in the data object for the label.
     * @param valueKey The data key to lookup in the data object for the value.
     * @param style Additional CSS properties to use.
     * @returns The label and value fragment.
     */
    createLabelledValue(labelKey: string, valueKey: string, style?: CSS.Properties): Promise<PlainContainerTemplateFragment>;
    /**
     * Create a table.
     * @param tableData as an table two dimensional array.
     * @param colSpans Spans for the columns.
     * @param tableIndex The index for the table so that keys don't clash.
     * @param data The data object to populate.
     * @returns The table fragment.
     */
    createTable(tableData: string[][], colSpans: number[], tableIndex: number, data: {
        [id: string]: string;
    }): Promise<TemplateFragment>;
    /**
     * Create a link element.
     * @param labelKey The data key for the label text.
     * @param action The action to perform on clicking the link.
     * @param fontSize The font size for the link.
     * @param style Additional CSS properties to use.
     * @returns The link fragment.
     */
    createLink(labelKey: string, action: string, fontSize?: number, style?: CSS.Properties): Promise<TemplateFragment>;
    /**
     * Create a template layout.
     * @param title The title for the template.
     * @param icon The icon for the template.
     * @param bodyFragments The fragments to go in the body.
     * @param buttons The buttons for the footer.
     * @returns The layout fragment.
     */
    createLayout(title: string, icon: string | undefined, bodyFragments: TemplateFragment[], buttons?: {
        title: string;
        action: string;
    }[]): Promise<{
        layout: PlainContainerTemplateFragment;
        data: any;
    }>;
    /**
     * Create a template for an app.
     * @param app The app to create the template for.
     * @param appIcon The icon for the app.
     * @param action The action to launch the app.
     * @returns The app fragment.
     */
    createApp(app: PlatformApp, appIcon: string, action: string): Promise<{
        layout: PlainContainerTemplateFragment;
        data: any;
    }>;
}
