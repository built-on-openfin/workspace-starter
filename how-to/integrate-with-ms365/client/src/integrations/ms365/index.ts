import { Microsoft365Provider } from "./integration-provider";

export const entryPoints: { [id: string]: Microsoft365Provider } = {
	integrations: new Microsoft365Provider()
};
