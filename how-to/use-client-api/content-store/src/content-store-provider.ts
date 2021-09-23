import {
    ContentStoreLandingPage,
    ContentStoreNavigationSection,
    ContentStoreFooter,
    App,
    ContentStoreProvider,
} from "@openfin/workspace/shapes";
import { launchApp } from "@openfin/workspace";
import * as faker from "faker";

const getNavigation = async (): Promise<
    [ContentStoreNavigationSection?, ContentStoreNavigationSection?]
> => {
    return [];
};

const getLandingPage = async (): Promise<ContentStoreLandingPage> => {
    return {
        topRow: {
            title: "Top Row",
            items: [],
        },
        middleRow: {
            title: "Middle Row",
            apps: [],
        },
        bottomRow: {
            title: "Bottom Row",
            items: [],
        },
    };
};

const getFooter = async (): Promise<ContentStoreFooter> => {
    return {
        logo: { src: "" },
        links: [],
        text: "Footer",
    };
};

const app: App = {
    appId: faker.datatype.uuid(),
    title: faker.lorem.word(),
    manifestType: "view",
    manifest: `https://www.google.com/search?q=${faker.lorem.word()}`,
    icons: [{ src: faker.image.city() }],
    contactEmail: faker.internet.email(),
    supportEmail: faker.internet.email(),
    publisher: faker.lorem.word(),
    tags: [],
    images: [],
    intents: [],
};
const getApps = async (): Promise<App[]> => {
    return [app];
};

const contentStoreProvider: ContentStoreProvider = {
    id: "new-store",
    title: "New Store",
    getNavigation,
    getLandingPage,
    getFooter,
    getApps,
    launchApp,
};

export default contentStoreProvider;
