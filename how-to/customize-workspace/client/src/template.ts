import { ButtonStyle, TemplateFragment, TemplateFragmentTypes } from "@openfin/workspace";

export const PAGE_ACTION_IDS = {
	delete: "page-delete",
	share: "page-share",
	launch: "page-launch"
};

export const WORKSPACE_ACTION_IDS = {
	delete: "workspace-delete",
	share: "workspace-share",
	launch: "workspace-launch"
};

export function getPageTemplate(enableShare: boolean): TemplateFragment {
	const actionButtons: TemplateFragment[] = [
		{
			type: TemplateFragmentTypes.Button,
			style: {
				display: "flex",
				flexDirection: "column",
				width: "80px"
			},
			action: PAGE_ACTION_IDS.launch,
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
			action: PAGE_ACTION_IDS.delete,
			children: [
				{
					type: TemplateFragmentTypes.Text,
					dataKey: "deleteText",
					optional: false
				}
			]
		}
	];

	if (enableShare) {
		actionButtons.push({
			type: TemplateFragmentTypes.Button,
			buttonStyle: ButtonStyle.Primary,
			style: {
				display: "flex",
				flexDirection: "column",
				width: "80px"
			},
			action: PAGE_ACTION_IDS.share,
			children: [
				{
					type: TemplateFragmentTypes.Text,
					dataKey: "shareText",
					optional: false
				}
			]
		});
	}
	return {
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
				children: actionButtons
			}
		]
	};
}

export function getWorkspaceTemplate(enableShare: boolean): TemplateFragment {
	const actionButtons: TemplateFragment[] = [
		{
			type: TemplateFragmentTypes.Button,
			style: {
				display: "flex",
				flexDirection: "column",
				width: "80px"
			},
			action: WORKSPACE_ACTION_IDS.launch,
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
			action: WORKSPACE_ACTION_IDS.delete,
			children: [
				{
					type: TemplateFragmentTypes.Text,
					dataKey: "deleteText",
					optional: false
				}
			]
		}
	];

	if (enableShare) {
		actionButtons.push({
			type: TemplateFragmentTypes.Button,
			buttonStyle: ButtonStyle.Primary,
			style: {
				display: "flex",
				flexDirection: "column",
				width: "80px"
			},
			action: WORKSPACE_ACTION_IDS.share,
			children: [
				{
					type: TemplateFragmentTypes.Text,
					dataKey: "shareText",
					optional: false
				}
			]
		});
	}

	return {
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
				dataKey: "instructions",
				optional: true,
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
				children: actionButtons
			}
		]
	};
}

export function getCurrentWorkspaceTemplate(): TemplateFragment {
	return {
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
				dataKey: "instructions",
				optional: true,
				style: {
					fontWeight: "bold",
					paddingTop: "10px",
					paddingBottom: "10px",
					paddingLeft: "10px",
					paddingRight: "10px"
				}
			}
		]
	};
}
