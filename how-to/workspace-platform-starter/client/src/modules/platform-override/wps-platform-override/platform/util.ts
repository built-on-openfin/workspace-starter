import type { OpenFin } from "@openfin/core";
import type { BrowserCreateWindowRequest, Page } from "@openfin/workspace-platform";
import type { BrowserProviderOptions } from "workspace-platform-starter/shapes/browser-shapes";
import { deepMerge, isEmpty, isStringValue, randomUUID } from "workspace-platform-starter/utils";

let defaultOptions:
	| {
			window: Partial<BrowserCreateWindowRequest> | undefined;
			page: Partial<Page> | undefined;
			view: Partial<OpenFin.ViewOptions> | undefined;
	  }
	| undefined;

/**
 * Takes a layout and walks through all the nodes and applies logic to nodes that have
 * a url and a name that matches a pattern. Updates the name to make it unique (if applicable)
 * while retaining information related to an application's identity if present.
 * @param layout The layout to duplicate
 * @returns The duplicated layout.
 */
export function duplicateLayout<T>(layout: T): T {
	return JSON.parse(
		JSON.stringify(layout, (_, nestedValue) => {
			// check to ensure that we have a name field and that we also have a url field in this object (in case name was added to a random part of the layout)
			if (isStringValue(nestedValue?.name) && !isEmpty(nestedValue.url)) {
				if (/\/[\d,a-z-]{36}$/.test(nestedValue.name)) {
					nestedValue.name = nestedValue.name.replace(/([\d,a-z-]{36}$)/, randomUUID());
				}
				// case: internal-generated-view-<uuid>
				if (/-[\d,a-z-]{36}$/.test(nestedValue.name)) {
					nestedValue.name = nestedValue.name.replace(/(-[\d,a-z-]{36}$)/, randomUUID());
				}
			}
			return nestedValue as unknown;
		})
	);
}

/**
 * Build the default options for the window, page and view.
 * @param browserProvider The browser provider options.
 * @returns The default options.
 */
export async function buildDefaultOptions(browserProvider?: BrowserProviderOptions): Promise<{
	window: Partial<BrowserCreateWindowRequest> | undefined;
	page: Partial<Page> | undefined;
	view: Partial<OpenFin.ViewOptions> | undefined;
}> {
	if (defaultOptions) {
		return defaultOptions;
	}
	const app = await fin.Application.getCurrent();
	const manifest = await app.getManifest();

	return {
		window: deepMerge(
			{},
			manifest.platform?.defaultWindowOptions as Partial<BrowserCreateWindowRequest>,
			browserProvider?.defaultWindowOptions
		),
		page: deepMerge({}, browserProvider?.defaultPageOptions),
		view: deepMerge({}, manifest.platform?.defaultViewOptions, browserProvider?.defaultViewOptions)
	};
}
