import { ButtonStyle, TemplateFragment } from "@openfin/workspace";
import { createButton, createContainer, createImage, createText } from "../../templates";

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