import { TreeIntegrationProvider } from "./integration-provider";

export const entryPoints: { [id: string]: TreeIntegrationProvider } = {
	integrations: new TreeIntegrationProvider()
};
