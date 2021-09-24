import {
    ContentStoreLandingPage,
    ContentStoreNavigationSection,
    ContentStoreFooter,
    App,
    ContentStoreProvider,
} from "@openfin/workspace/shapes";
import { launchApp } from "@openfin/workspace";
import {
    apps,
    navigationSections,
    landingPage,
    footer,
} from "./content-store-data";
import * as faker from "faker";

const getNavigation = async (): Promise<
    [ContentStoreNavigationSection?, ContentStoreNavigationSection?]
> => {
    return navigationSections;
};

const getLandingPage = async (): Promise<ContentStoreLandingPage> => {
    return landingPage;
};

const getFooter = async (): Promise<ContentStoreFooter> => {
    return footer;
};

const getApps = async (): Promise<App[]> => {
    return apps;
};

const getContentStoreProvider = (): ContentStoreProvider => ({
    id: faker.datatype.uuid(),
    title: faker.lorem.words(2),
    getNavigation,
    getLandingPage,
    getFooter,
    getApps,
    launchApp,
});

export default getContentStoreProvider;
