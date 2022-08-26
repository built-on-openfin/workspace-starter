import { AsyncIntegrationProvider } from "./integration-provider";

export const entryPoints: { [id: string]: AsyncIntegrationProvider } = {
	integrations: new AsyncIntegrationProvider()
};
