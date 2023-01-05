import { ButtonStyle, TemplateFragment } from "@openfin/workspace";
import { createButton, createContainer, createImage, createText } from "../../templates";
import { getCurrentPalette } from "../../themes";

export async function getRssFeedTemplate(actions: { viewAction: string }): Promise<TemplateFragment> {
	const palette = await getCurrentPalette();

	return createContainer(
		"column",
		[
			await createText("titleLabel", 12, { color: palette.brandPrimary, fontWeight: "bold" }),
			await createText("title", 10),
			await createContainer(
				"row",
				[
					await createButton(ButtonStyle.Primary, "viewLabel", actions.viewAction, {
						fontSize: "12px"
					})
				],
				{ justifyContent: "flex-end", marginTop: "10px" }
			)
		],
		{
			padding: "10px",
			gap: "5px"
		}
	);
}

export async function getRssEntryTemplate(actions: { viewAction: string }): Promise<TemplateFragment> {
	const palette = await getCurrentPalette();

	return createContainer(
		"column",
		[
			await createText("titleLabel", 12, { color: palette.brandPrimary, fontWeight: "bold" }),
			await createText("title", 10),
			await createText("descriptionLabel", 12, { color: palette.brandPrimary, fontWeight: "bold" }),
			await createText("description", 10, { whiteSpace: "pre-wrap" }),
			await createImage("thumbnailUrl", "Thumbnail"),
			await createContainer(
				"row",
				[
					await createButton(ButtonStyle.Primary, "viewLabel", actions.viewAction, {
						fontSize: "12px"
					})
				],
				{ justifyContent: "flex-end", marginTop: "10px" }
			)
		],
		{
			padding: "10px",
			gap: "5px"
		}
	);
}
