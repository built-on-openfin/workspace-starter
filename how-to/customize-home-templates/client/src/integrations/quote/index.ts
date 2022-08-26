import { QuoteIntegrationProvider } from "./integration-provider";

export const entryPoints: { [id: string]: QuoteIntegrationProvider } = {
	integrations: new QuoteIntegrationProvider()
};
