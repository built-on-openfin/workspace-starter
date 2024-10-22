import { init as initExcel, launchExcel } from "./excel";
import type { ExcelSettings } from "./shapes";

window.addEventListener("DOMContentLoaded", async () => {
	const url = new URL(window.location.href);
	const root = url.host;
	const excelSettings: ExcelSettings = {
		appAsset: {
			alias: "excel-interop-example.xlsx",
			version: "0.0.5",
			src: `${root}/assets/excel-interop-example.zip`,
			target: "excel-interop-example.xlsx"
		},
		icon: `${root}/assets/excel.svg`,
		asset: {
			title: "Excel Interop Example",
			description: "Demonstrate interop with Excel workbook",
			workbook: "excel-interop-example.xlsx",
			worksheets: [
				{
					name: "Sheet1",
					cellHandlers: [
						{
							cell: "$B$3",
							types: ["instrument", "fdc3.instrument"],
							contextGroup: "green"
						},
						{
							cell: "$B$4",
							types: ["instrument", "fdc3.instrument"],
							contextGroup: "purple"
						},
						{
							cell: "$B$5",
							types: ["instrument", "fdc3.instrument"],
							contextGroup: "orange"
						},
						{
							cell: "$B$6",
							types: ["instrument", "fdc3.instrument"],
							contextGroup: "red"
						},
						{
							cell: "$B$7",
							types: ["instrument", "fdc3.instrument"],
							contextGroup: "pink"
						},
						{
							cell: "$B$8",
							types: ["instrument", "fdc3.instrument"],
							contextGroup: "yellow"
						}
					]
				}
			]
		}
	};
	await initExcel(excelSettings);
	await launchExcel(excelSettings.asset);
});
