import { PagesProvider } from "./integration";

export const entryPoints: { [id: string]: PagesProvider } = {
	integrations: new PagesProvider()
};
