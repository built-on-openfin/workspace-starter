import { ExcelIntegrationProvider } from "./integration-provider";

export const entryPoints: { [id: string]: ExcelIntegrationProvider } = {
	integrations: new ExcelIntegrationProvider()
};
