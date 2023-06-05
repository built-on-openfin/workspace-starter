import { PlatformApp } from "./app-shapes";
import { FDC3VOnePointTwoAppDirectoryResponse } from "./fdc3-1-2-shapes";
import { FDC3VTwoPointZeroAppDirectoryResponse } from "./fdc3-2-0-shapes";

/**
 * Endpoint definition for a directory.
 */
export interface DirectoryEndpoint {
	/**
	 * The id of the endpoint.
	 */
	id: string;

	/**
	 * The url and credentials for the directory endpoint.
	 */
	url?: { path: string; credentials?: "omit" | "same-origin" | "include" };

	/**
	 * The endpoint id.
	 */
	endpointId?: string;

	/**
	 * Mapping for input and output ids.
	 */
	map?: {
		inputId: string;
		outputId?: string;
	};
}

export type DirectoryApps = PlatformApp[] | FDC3VTwoPointZeroAppDirectoryResponse | FDC3VOnePointTwoAppDirectoryResponse;
