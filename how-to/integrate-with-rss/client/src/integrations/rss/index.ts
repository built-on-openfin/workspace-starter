import { RssIntegrationProvider } from "./integration-provider";

export const entryPoints: { [id: string]: RssIntegrationProvider } = {
	integrations: new RssIntegrationProvider()
};
