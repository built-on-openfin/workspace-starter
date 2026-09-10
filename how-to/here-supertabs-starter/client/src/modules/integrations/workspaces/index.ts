import { WorkspacesProvider } from "./integration";

export const entryPoints: { [id: string]: WorkspacesProvider } = {
	integrations: new WorkspacesProvider()
};
