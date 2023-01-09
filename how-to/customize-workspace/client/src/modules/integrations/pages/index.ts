import { PagesProvider } from "./integration-provider";

export const entryPoints: { [id: string]: PagesProvider } = {
	integrations: new PagesProvider()
};
