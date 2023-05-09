import type {
	ContainerTemplateFragment,
	TemplateFragment,
	TextTemplateFragment
} from "@openfin/workspace/notifications";
import type * as CSS from "csstype";

export function createContainer(
	containerType: "column" | "row",
	children: TemplateFragment[],
	style?: CSS.Properties
): ContainerTemplateFragment {
	return {
		type: "container",
		style: {
			display: "flex",
			flexDirection: containerType,
			...style
		},
		children
	};
}

export function createText(
	dataKey: string,
	fontSize: number = 14,
	style?: CSS.Properties
): TextTemplateFragment {
	return {
		type: "text",
		dataKey,
		style: {
			fontSize: `${fontSize ?? 14}px`,
			...style
		}
	};
}

export function createLabelledValue(
	labelKey: string,
	valueKey: string,
	style?: { [key: string]: string | number }
): ContainerTemplateFragment {
	return {
		type: "container",
		style: {
			display: "flex",
			flexDirection: "column",
			marginBottom: "10px",
			...style
		},
		children: [
			createText(labelKey, 12),
			createText(valueKey, undefined, {
				color: "var(--openfin-ui-brandPrimary)"
			})
		]
	};
}

export function createTable(tableData: string[][]): TemplateFragment {
	const cells: TemplateFragment[] = [];
	const colSpans = [];
	for (const cell of tableData[0]) {
		cells.push(
			createText(cell, 10, {
				marginBottom: "10px",
				padding: "3px",
				whiteSpace: "nowrap",
				fontWeight: "bold",
				backgroundColor: "var(--openfin-ui-brandPrimary)"
			})
		);

		colSpans.push(1);
	}

	for (let row = 1; row < tableData.length; row++) {
		for (let col = 0; col < tableData[0].length; col++) {
			cells.push(
				createText(tableData[row][col], 10, {
					padding: "3px",
					whiteSpace: "nowrap"
				})
			);
		}
	}

	return createContainer("row", cells, {
		display: "grid",
		gridTemplateColumns: colSpans.map((s) => `${s}fr`).join(" "),
		marginBottom: "10px",
		overflow: "auto"
	});
}

export function createLabelledForm(
	labelKey: string,
	valueKey: string,
	style?: { [key: string]: string | number }
): ContainerTemplateFragment {
	return {
		type: "container",
		style: {
			display: "flex",
			flexDirection: "row",
			marginBottom: "6px",
			gap: "10px",
			...style
		},
		children: [
			createText(labelKey, 12, {
				flex: "1",
				display: "flex",
				justifyContent: "flex-end"
			}),
			createContainer(
				"row",
				[
					createText(valueKey, 10, {
						display: "flex",
						alignItems: "center",
						padding: "0px 8px",
						backgroundColor: "white",
						color: "black",
						textTransform: "uppercase",
						fontWeight: "700",
						borderRadius: "2px"
					})
				],
				{ flex: "1.5" }
			)
		]
	};
}
