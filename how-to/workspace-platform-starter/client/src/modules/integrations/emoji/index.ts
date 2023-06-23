import { EmojiIntegrationProvider } from "./integration";

export const entryPoints: { [id: string]: EmojiIntegrationProvider } = {
	integrations: new EmojiIntegrationProvider()
};
