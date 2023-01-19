import { WorkspacesProvider } from "./integration-provider";

export const entryPoints: { [id: string]: WorkspacesProvider } = {
	integrations: new WorkspacesProvider()
};
