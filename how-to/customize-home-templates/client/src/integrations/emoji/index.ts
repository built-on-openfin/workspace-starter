import { EmojiIntegrationProvider } from "./integration-provider";

export const entryPoints: { [id: string]: EmojiIntegrationProvider } = {
	integrations: new EmojiIntegrationProvider()
};
