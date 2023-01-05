import { ButtonStyle, TemplateFragment } from "@openfin/workspace";
import { createButton, createContainer, createText } from "../../templates";
import { getCurrentPalette } from "../../themes";

export async function getEmojiTemplate(actions: {
	copyEmojiAction: string;
	copyKeyAction: string;
	detailsAction: string;
}): Promise<TemplateFragment> {
	const palette = await getCurrentPalette();

	return createContainer(
		"column",
		[
			await createText("keyTitle", 12, { color: palette.brandPrimary, fontWeight: "bold" }),
			await createContainer(
				"row",
				[
					await createText("key", 12, { color: palette.textDefault, wordBreak: "break-all" }),
					await createButton(ButtonStyle.Secondary, "copyKeyTitle", actions.copyKeyAction, {
						fontSize: "12px"
					})
				],
				{
					justifyContent: "space-between",
					alignItems: "center",
					gap: "10px",
					marginBottom: "10px"
				}
			),

			await createText("emojiTitle", 12, { color: palette.brandPrimary, fontWeight: "bold" }),
			await createContainer(
				"row",
				[
					await createText("emoji", 32, { color: palette.textDefault }),
					await createButton(ButtonStyle.Secondary, "copyEmojiTitle", actions.copyEmojiAction, {
						fontSize: "12px"
					})
				],
				{
					justifyContent: "space-between",
					alignItems: "center",
					gap: "10px",
					marginBottom: "10px"
				}
			),

			await createContainer(
				"row",
				[
					await createButton(ButtonStyle.Primary, "detailsTitle", actions.detailsAction, {
						fontSize: "12px"
					})
				],
				{ justifyContent: "flex-end" }
			)
		],
		{
			padding: "10px"
		}
	);
}
