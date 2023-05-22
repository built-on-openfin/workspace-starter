import { SalesforceIntegration } from "./salesforce-integration";

/**
 * This entry point is used by webpack to create a module file which can be consumed
 * by the customize-workspace example.
 */
export const entryPoints: { [type: string]: SalesforceIntegration } = {
	integrations: new SalesforceIntegration()
};
