import { AppProvider } from "./integration";

export const entryPoints: { [id: string]: AppProvider } = {
	integrations: new AppProvider()
};
