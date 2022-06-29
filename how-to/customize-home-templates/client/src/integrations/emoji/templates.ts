import { ButtonStyle, TemplateFragment } from "@openfin/workspace";
import { createButton, createContainer, createText } from "../../templates";

export function getEmojiTemplate(actions: {
	copyEmojiAction: string;
	copyKeyAction: string;
	detailsAction: string;
}): TemplateFragment {
	return createContainer(
		"column",
		[
			createText("keyTitle", 12, { color: "lightgray", fontWeight: "bold" }),
			createContainer(
				"row",
				[
					createText("key", 12, { color: "white", wordBreak: "break-all" }),
					createButton(ButtonStyle.Secondary, "copyKeyTitle", actions.copyKeyAction, {
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

			createText("emojiTitle", 12, { color: "lightgray", fontWeight: "bold" }),
			createContainer(
				"row",
				[
					createText("emoji", 32, { color: "white" }),
					createButton(ButtonStyle.Secondary, "copyEmojiTitle", actions.copyEmojiAction, {
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

			createContainer(
				"row",
				[
					createButton(ButtonStyle.Primary, "detailsTitle", actions.detailsAction, {
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
