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