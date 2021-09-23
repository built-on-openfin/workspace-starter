import {
    ContentStoreLandingPage,
    ContentStoreNavigationSection,
    ContentStoreFooter,
    App,
    ContentStoreProvider,
} from "@openfin/workspace/shapes";
import { launchApp } from "@openfin/workspace";

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

const getApps = async (): Promise<App[]> => {
    return [];
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
