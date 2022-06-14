import { ButtonStyle, TemplateFragment } from "@openfin/workspace";
import { createButton, createContainer, createText } from "../../templates";

export function getAsyncTemplate(actions: {
    detailsAction: string
}): TemplateFragment {
    return createContainer("column", [
        createText("keyTitle", 12, { color: "lightgray", fontWeight: "bold" }),

        createText("emojiTitle", 12, { color: "lightgray", fontWeight: "bold" }),

        createContainer("row", [
            createButton(ButtonStyle.Primary, "detailsTitle", actions.detailsAction, { fontSize: "12px" })
        ], { justifyContent: "flex-end" })
    ], {
        padding: "10px"
    });
}