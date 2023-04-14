import { TreeQueryIntegrationProvider } from "./integration-provider";

export const entryPoints: { [id: string]: TreeQueryIntegrationProvider } = {
	integrations: new TreeQueryIntegrationProvider()
};
