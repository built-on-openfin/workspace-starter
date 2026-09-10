import {
	CLITemplate,
	type HomeDispatchedSearchResult,
	type HomeSearchResponse,
	type HomeSearchResult
} from "@openfin/workspace";
import { init as initExcel, closeDown as closeDownExcel, launchExcel } from "./excel";
import type { ExcelAssetSettings, ExcelSettings } from "./shapes";

/**
 * Implement the integration for Excel.
 */
export class ExcelIntegration {
	/**
	 * The key to use for a sheet open action.
	 * @internal
	 */
	private static readonly _EXCEL_PROVIDER_OPEN_KEY_ACTION = "Open Excel";

	/**
	 * The settings for the integration.
	 * @internal
	 */
	private _settings: ExcelSettings | undefined;

	/**
	 * Initialize the module.
	 * @param settings The settings for the integration.
	 * @returns Nothing.
	 */
	public async initialize(settings: ExcelSettings): Promise<void> {
		this._settings = settings;

		await initExcel(settings);
	}

	/**
	 * The module is being deregistered.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		await closeDownExcel();
	}

	/**
	 * Get a list of search results based on the query and filters.
	 * @param query The query to search for.
	 * @returns The list of results and new filters.
	 */
	public async getSearchResults(query: string): Promise<HomeSearchResponse> {
		// Validate that query is a string
		if (typeof query !== "string") {
			return { results: [] };
		}

		if (this._settings?.asset && query.length < 3) {
			return { results: [this.createResult(this._settings.asset)] };
		}
		if (
			this._settings?.asset &&
			query.length >= 3 &&
			this._settings.asset.title.toLowerCase().includes(query.toLowerCase())
		) {
			return { results: [this.createResult(this._settings.asset)] };
		}

		return {
			results: []
		};
	}

	/**
	 * An entry has been selected.
	 * @param result The dispatched result.
	 * @returns True if the item was handled.
	 */
	public async itemSelection(result: HomeDispatchedSearchResult): Promise<boolean> {
		if (
			result.action.name === ExcelIntegration._EXCEL_PROVIDER_OPEN_KEY_ACTION &&
			result.action.trigger === "user-action" &&
			result.data.workbook
		) {
			await launchExcel(result.data as ExcelAssetSettings);
			return true;
		}

		return false;
	}

	/**
	 * Create a search result.
	 * @param excelAsset The excel document asset alias.
	 * @returns The search result.
	 */
	private createResult(excelAsset: ExcelAssetSettings): HomeSearchResult {
		return {
			key: `excel-${excelAsset.workbook}`,
			title: excelAsset.title,
			label: "Excel",
			icon: this._settings?.icon,
			actions: [
				{
					name: ExcelIntegration._EXCEL_PROVIDER_OPEN_KEY_ACTION,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: "excel",
				...excelAsset
			},
			template: CLITemplate.SimpleText,
			templateContent: excelAsset.description
		};
	}
}
