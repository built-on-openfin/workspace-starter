import { ButtonStyle, TemplateFragmentTypes, type TemplateFragment } from "@openfin/workspace";

const WORKSPACE_ACTIONS = {
	delete: "workspace-delete",
	launch: "workspace-launch"
};

export const WORKSPACE_TEMPLATE: {
	actions: { delete: string; launch: string };
	template: TemplateFragment;
} = {
	actions: WORKSPACE_ACTIONS,
	template: {
		type: TemplateFragmentTypes.Container,
		style: {
			paddingTop: "10px",
			display: "flex",
			flexDirection: "column"
		},
		children: [
			{
				type: TemplateFragmentTypes.Text,
				dataKey: "title",
				style: {
					fontWeight: "bold",
					fontSize: "16px",
					textAlign: "center"
				}
			},
			{
				type: TemplateFragmentTypes.Text,
				dataKey: "description",
				optional: true,
				style: {
					paddingLeft: "10px",
					paddingRight: "10px"
				}
			},
			{
				type: TemplateFragmentTypes.Text,
				dataKey: "instructions",
				style: {
					fontWeight: "bold",
					paddingTop: "10px",
					paddingBottom: "10px",
					paddingLeft: "10px",
					paddingRight: "10px"
				}
			},
			{
				type: TemplateFragmentTypes.Container,
				style: {
					display: "flex",
					flexFlow: "row wrap",
					justifyContent: "center",
					paddingTop: "10px",
					paddingBottom: "10px"
				},
				children: [
					{
						type: TemplateFragmentTypes.Button,
						style: {
							display: "flex",
							flexDirection: "column",
							width: "80px"
						},
						action: WORKSPACE_ACTIONS.launch,
						children: [
							{
								type: TemplateFragmentTypes.Text,
								dataKey: "openText",
								optional: false
							}
						]
					},
					{
						type: TemplateFragmentTypes.Button,
						buttonStyle: ButtonStyle.Primary,
						style: {
							display: "flex",
							flexDirection: "column",
							width: "80px",
							marginLeft: "10px",
							marginRight: "10px"
						},
						action: WORKSPACE_ACTIONS.delete,
						children: [
							{
								type: TemplateFragmentTypes.Text,
								dataKey: "deleteText",
								optional: false
							}
						]
					}
				]
			}
		]
	}
};
