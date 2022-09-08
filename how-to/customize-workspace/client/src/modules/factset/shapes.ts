export const CUSTOM_HOME_NAME = "custom home";

export interface FactSetAuthOptions {
	authenticatedUrl: string;
	checkLoginStatusInSeconds: number | undefined;
}

export interface FactSetActionsOptions {
	homeSnapshot: string;
}

export interface FactSetLifecycleOptions {
	homeSnapshot: string;
}

export interface FactSetIntegrationOptions {
	rootUrl: string;
	apiEndpoint: string;
	userId: string;
	apiKey: string;
	iconMap: { [id in "busy" | "result"]?: string };
}

/**
 * The response from the data API request.
 */
export interface FactSetResponse {
	data?: {
		template: string;
		templateData: FactSetTemplateData;
		title: string;
	};
	errors?: FactSetError[];
}

/**
 * FactSet error from API.
 */
export interface FactSetError {
	id: string;
	code: string;
	title: string;
	links: {
		about: string;
	};
	details: string;
	source: {
		pointer: string;
		parameter: string;
	};
}

/**
 * FactSet Template data from API response.
 */
export interface FactSetTemplateData {
	headline?: string;
	value?:
		| string
		| {
				text: string;
				color: string;
		  };
	valueChange?: {
		color: string;
		absoluteChange: string;
		percentageChange: string;
	};
	label?: string;
	text?: string;
	date?: string;
	body?: string;
	footer?: string;
	applicationLinks?: FactSetApplicationLink[];
	fdc3Context?: Fdc3ContextOrganization | Fdc3ContextInstrument;
	table?: {
		headers?: string[];
		rows?: {
			additionalData: string[];
			applicationLink?: FactSetApplicationLink;
			entity: FactSetEntity;
			rank: number;
		}[];
	} & FactSetTableSet;
	table1?: FactSetTableSet;
	table2?: FactSetTableSet;
	list?: { label: string; value: string }[];
}

/**
 * FactSet table set.
 */
export interface FactSetTableSet {
	tableHeaders?: string[];
	tableRows?: string[][];
	tableData?: string[][];
	tableFooters?: string[];
}

/**
 * FactSet application link.
 */
export interface FactSetApplicationLink {
	name: string;
	workstationLink: string;
	webLink: string;
}

/**
 * FactSet entity.
 */
export interface FactSetEntity {
	identifier: string;
	name: string;
}

/**
 * FactSet FDC3 context organization response.
 */
export interface Fdc3ContextOrganization {
	type: "fdc3.organization";
	id: {
		FDS_ID: string;
	};
	name: string;
}

/**
 * FactSet FDC3 context instrument response.
 */
export interface Fdc3ContextInstrument {
	type: "fdc3.instrument";
	id: {
		CUSIP: string;
		FDS_ID: string;
		ISIN: string;
		SEDOL: string;
		ticker: string;
		FDS_TICKER_EXCHANGE: string;
		FDS_TICKER_REGION: string;
	};
	name: string;
	exchangeMic: string;
	exchangeMicFds: string;
}
