import { ButtonStyle, TemplateFragment } from "@openfin/workspace";
import { createButton, createContainer, createImage, createText } from "../../templates";
import { getCurrentPalette } from "../../themes";

export async function getQuoteTemplate(actions: { detailsAction: string }): Promise<TemplateFragment> {
	const palette = await getCurrentPalette();

	return createContainer(
		"column",
		[
			await createContainer(
				"row",
				[await createText("symbol", 18, { fontWeight: "bold" }), await createText("price", 18)],
				{
					justifyContent: "space-between"
				}
			),
			await createText("company", 12, { color: palette.textDefault, margin: "5px 0px" }),
			await createContainer("column", [await createImage("graph", "History")], {
				backgroundColor: "black",
				borderRadius: "5px",
				padding: "5px"
			}),
			await createContainer(
				"row",
				[
					await createButton(ButtonStyle.Primary, "detailsTitle", actions.detailsAction, {
						fontSize: "12px"
					})
				],
				{ justifyContent: "flex-end", paddingTop: "10px" }
			)
		],
		{
			padding: "10px"
		}
	);
}
