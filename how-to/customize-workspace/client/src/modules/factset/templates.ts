import { ButtonStyle, CustomTemplateData, TemplateFragment, TemplateFragmentTypes } from "@openfin/workspace";
import {
	createButton,
	createContainer,
	createImage,
	createLabelledValue,
	createTable,
	createText
} from "../../templates";
import type { FactSetTableSet, FactSetTemplateData } from "./shapes";

export async function getBusyTemplate(spinnerKey: string): Promise<TemplateFragment> {
	return createContainer(
		"column",
		[await createImage(spinnerKey, "Busy", { width: "100px", height: "100px" })],
		{ padding: "10px", flex: "1", alignItems: "center", justifyContent: "center" }
	);
}

export async function getTemplateAndData(
	template: string,
	templateData: FactSetTemplateData
): Promise<{
	layout: TemplateFragment;
	data: CustomTemplateData;
}> {
	const data: { [id: string]: string } = {};
	const children: TemplateFragment[] = [];

	if (templateData.label && templateData.value) {
		data.labelValueTitle = templateData.label;
		data.labelValueData =
			typeof templateData.value === "string" ? templateData.value : templateData.value.text;
		children.push(await createLabelledValue("labelValueTitle", "labelValueData"));
	}
	if (templateData.text) {
		data.textData = templateData.text;
		children.push(await createText("textData", 12, { marginBottom: "10px" }));
	}
	const valueChangeRow: TemplateFragment[] = [];
	if (templateData.value) {
		data.valueTitle = "Value";
		data.valueData = templateData.value as string;
		valueChangeRow.push(
			await createLabelledValue("valueTitle", "valueData", { marginBottom: "10px", flex: 1 })
		);
	}
	if (templateData.valueChange) {
		data.valueChangeTitle = "Change";
		data.valueChangeData = templateData.valueChange.percentageChange;
		valueChangeRow.push(
			await createLabelledValue("valueChangeTitle", "valueChangeData", { marginBottom: "10px", flex: 1 })
		);
	}
	if (valueChangeRow.length > 0) {
		children.push(await createContainer("row", valueChangeRow));
	}
	if (templateData.date) {
		data.dateTitle = "Date";
		data.dateData = templateData.date;
		children.push(await createLabelledValue("dateTitle", "dateData"));
	}
	if (templateData.body) {
		data.bodyData = templateData.body;
		children.push(await createText("bodyData", 12, { marginBottom: "10px" }));
	}

	const tickerTypeRow: TemplateFragment[] = [];
	if (templateData.fdc3Context) {
		data.fdc3Title = "FDC3 Type";
		data.fdc3Data = templateData.fdc3Context.type;
		tickerTypeRow.push(await createLabelledValue("fdc3Title", "fdc3Data", { marginBottom: "10px", flex: 1 }));

		if (templateData.fdc3Context.type === "fdc3.instrument") {
			data.tickerTitle = "Ticker";
			data.tickerData = templateData.fdc3Context.id.ticker;
			tickerTypeRow.push(
				await createLabelledValue("tickerTitle", "tickerData", { marginBottom: "10px", flex: 1 })
			);
		}
	}
	if (tickerTypeRow.length > 0) {
		children.push(await createContainer("row", tickerTypeRow));
	}

	if (template === "TableTemplate" && templateData.table) {
		children.push(await processTableData(templateData.table, 0, data));
	} else if (template === "TableTableTemplate") {
		if (templateData.table1) {
			children.push(await processTableData(templateData.table1, 1, data));
		}
		if (templateData.table2) {
			children.push(await processTableData(templateData.table2, 2, data));
		}
	} else if (template === "RankedTableTemplate" && templateData.table) {
		const tableData: string[][] = [];
		tableData.push(templateData.table.headers);

		for (let i = 0; i < templateData.table.rows.length; i++) {
			tableData.push([
				templateData.table.rows[i].rank.toString(),
				templateData.table.rows[i].entity.name,
				templateData.table.rows[i].additionalData[0]
			]);
		}

		children.push(await createTable(tableData, [1, 4, 1], 0, data));
	}

	if (templateData.list) {
		for (let i = 0; i < templateData.list.length; i++) {
			const titleKey = `listTitle${i}`;
			const dataKey = `listData${i}`;
			data[titleKey] = templateData.list[i].label;
			data[dataKey] = templateData.list[i].value;
			children.push(await createLabelledValue(titleKey, dataKey));
		}
	}

	if (templateData.footer) {
		data.footerData = templateData.footer;
		children.push(
			await createText("footerData", 12, { marginBottom: "10px", marginTop: "10px", fontStyle: "italic" })
		);
	}

	if (templateData.applicationLinks) {
		const buttons = [];
		for (let i = 0; i < templateData.applicationLinks.length; i++) {
			const buttonTitleKey = `buttonTitle${i}`;
			data[buttonTitleKey] =
				templateData.applicationLinks[i].name.length > 30
					? `${templateData.applicationLinks[i].name.slice(0, 30)}...`
					: templateData.applicationLinks[i].name;
			buttons.push(createButton(ButtonStyle.Primary, buttonTitleKey, `open${i}`));
		}
		children.push({
			type: TemplateFragmentTypes.Container,
			style: {
				display: "flex",
				flex: 1,
				flexDirection: "row",
				flexWrap: "wrap",
				alignItems: "flex-end"
			},
			children: buttons
		});
	}

	return {
		layout: {
			type: TemplateFragmentTypes.Container,
			style: {
				display: "flex",
				flexDirection: "column",
				flex: 1,
				padding: "10px"
			},
			children
		},
		data
	};
}

async function processTableData(
	table: FactSetTableSet,
	tableIndex: number,
	data: {
		[id: string]: string;
	}
): Promise<TemplateFragment> {
	let tableData: string[][] = [];
	tableData.push(table.tableHeaders);
	const rows = table.tableRows ?? table.tableData;
	tableData = tableData.concat(rows);
	if (table.tableFooters?.length) {
		tableData = tableData.concat(table.tableFooters);
	}
	return createTable(tableData, [], tableIndex, data);
}
