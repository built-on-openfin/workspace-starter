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

export function createHelp(title: string, description: string[], examples: string[]): { layout: PlainContainerTemplateFragment, data: any } {
    const additionalData = {};
    const fragments = [];
    for (let i = 0; i < description.length; i++) {
        const descriptionKey = `desc-${i}`;
        additionalData[descriptionKey] = description[i];
        fragments.push(createText(descriptionKey, 12, {
            padding: "6px 0px"
        }))
    }
    const exampleFragments = [];
    for (let i = 0; i < examples.length; i++) {
        const exampleKey = `line-${i}`;
        additionalData[exampleKey] = examples[i];
        exampleFragments.push(createText(exampleKey, 12, {
            fontFamily: "monospace"
        }))
    }
    if (exampleFragments.length > 0) {
        fragments.push(createContainer("column", exampleFragments, { 
            padding: "10px", 
            marginTop: "6px",
            backgroundColor: "var(--openfin-ui-inputBackground)", 
            color: "var(--openfin-ui-inputColor)",
            borderRadius: "5px"
        }));
    }
    return {
        layout: createContainer("column", [
            createText("title", 16, { color: "var(--openfin-ui-brandPrimary)", fontWeight: "bold" }),
            ...fragments
        ], {
            padding: "10px"
        }),
        data: {
            title,
            ...additionalData
        }
    };
}

export function createContainer(containerType: "column" | "row", children: TemplateFragment[], style?: CSS.Properties): PlainContainerTemplateFragment {
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

export function createText(dataKey: string, fontSize: number = 14, style?: CSS.Properties): TextTemplateFragment {
    return {
        type: TemplateFragmentTypes.Text,
        dataKey,
        style: {
            fontSize: `${fontSize ?? 14}px`,
            ...style
        }
    }
}

export function createImage(dataKey: string, alternativeText: string, style?: CSS.Properties): ImageTemplateFragment {
    return {
        type: TemplateFragmentTypes.Image,
        dataKey,
        alternativeText,
        style: {
            ...style
        }
    }
}

export function createButton(buttonStyle: ButtonStyle, titleKey: string, action: string, style?: CSS.Properties): ButtonTemplateFragment {
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