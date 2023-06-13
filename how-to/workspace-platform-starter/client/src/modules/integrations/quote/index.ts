import { QuoteIntegrationProvider } from "./integration";

export const entryPoints: { [id: string]: QuoteIntegrationProvider } = {
	integrations: new QuoteIntegrationProvider()
};
