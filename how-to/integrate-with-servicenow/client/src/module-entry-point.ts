import { ServiceNowIntegration } from "./servicenow-integration";

/**
 * This entry point is used by webpack to create a module file which can be consumed
 * by the workspace-platform-starter example.
 */
export const entryPoints: { [id: string]: ServiceNowIntegration } = {
	integrations: new ServiceNowIntegration()
};
