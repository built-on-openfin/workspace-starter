import {
    ButtonStyle,
    ButtonTemplateFragment,
    ImageTemplateFragment,
    PlainContainerTemplateFragment,
    TemplateFragment,
    TemplateFragmentTypes,
    TextTemplateFragment,
} from "@openfin/workspace";
import * as CSS from "csstype";

export function getQuoteTemplate(actions: { detailsAction: string }): TemplateFragment {
    return createContainer("column", [
        createContainer("row", [
            createText("symbol", 18, { fontWeight: "bold" }),
            createText("price", 18)
        ], {
            justifyContent: "space-between"
        }),
        createText("company", 12, { color: "gray", margin: "5px 0px" }),
        createContainer("column", [
            createImage("graph", "History")
        ],
            {
                backgroundColor: "black",
                borderRadius: "5px",
                padding: "5px"
            }),
        createContainer("row", [
            createButton(ButtonStyle.Primary, "detailsTitle", actions.detailsAction, { fontSize: "12px" })
        ], { justifyContent: "flex-end", paddingTop: "10px" })
    ], {
        padding: "10px"
    });
}

export function getEmojiTemplate(actions: {
    copyEmojiAction: string,
    copyKeyAction: string,
    detailsAction: string
}): TemplateFragment {
    return createContainer("column", [
        createText("keyTitle", 12, { color: "lightgray", fontWeight: "bold" }),
        createContainer("row", [
            createText("key", 12, { color: "white", wordBreak: "break-all" }),
            createButton(ButtonStyle.Secondary, "copyKeyTitle", actions.copyKeyAction, { fontSize: "12px" })
        ], { justifyContent: "space-between", alignItems: "center", gap: "10px", marginBottom: "10px" }),

        createText("emojiTitle", 12, { color: "lightgray", fontWeight: "bold" }),
        createContainer("row", [
            createText("emoji", 32, { color: "white" }),
            createButton(ButtonStyle.Secondary, "copyEmojiTitle", actions.copyEmojiAction, { fontSize: "12px" })
        ], { justifyContent: "space-between", alignItems: "center", gap: "10px", marginBottom: "10px" }),

        createContainer("row", [
            createButton(ButtonStyle.Primary, "detailsTitle", actions.detailsAction, { fontSize: "12px" })
        ], { justifyContent: "flex-end" })
    ], {
        padding: "10px"
    });
}

function createContainer(containerType: "column" | "row", children: TemplateFragment[], style?: CSS.Properties): PlainContainerTemplateFragment {
    return {
        type: TemplateFragmentTypes.Container,
        style: {
            display: "flex",
            flexDirection: containerType,
            ...style
        },
        children
    }
}

function createText(dataKey: string, fontSize: number = 14, style?: CSS.Properties): TextTemplateFragment {
    return {
        type: TemplateFragmentTypes.Text,
        dataKey,
        style: {
            fontSize: `${fontSize ?? 14}px`,
            ...style
        }
    }
}

function createImage(dataKey: string, alternativeText: string, style?: CSS.Properties): ImageTemplateFragment {
    return {
        type: TemplateFragmentTypes.Image,
        dataKey,
        alternativeText,
        style: {
            ...style
        }
    }
}

function createButton(buttonStyle: ButtonStyle, titleKey: string, action: string, style?: CSS.Properties): ButtonTemplateFragment {
    return {
        type: TemplateFragmentTypes.Button,
        buttonStyle,
        children: [
            createText(titleKey, 12)
        ],
        action: action,
        style: {
            ...style
        }
    }
}