import { TreeInlineIntegrationProvider } from "./integration-provider";

export const entryPoints: { [id: string]: TreeInlineIntegrationProvider } = {
	integrations: new TreeInlineIntegrationProvider()
};
