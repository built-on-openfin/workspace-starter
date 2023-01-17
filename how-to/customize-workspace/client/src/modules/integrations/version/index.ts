import { VersionProvider } from "./integration-provider";

export const entryPoints: { [id: string]: VersionProvider } = {
	integrations: new VersionProvider()
};
