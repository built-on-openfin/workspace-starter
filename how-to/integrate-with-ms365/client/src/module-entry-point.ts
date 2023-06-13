import { Microsoft365Integration } from "./ms365-integration";

/**
 * This entry point is used by webpack to create a module file which can be consumed
 * by the workspace-platform-starter example.
 */
export const entryPoints: { [id: string]: Microsoft365Integration } = {
	integrations: new Microsoft365Integration()
};
