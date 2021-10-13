import {
    StorefrontLandingPage,
    StorefrontNavigationSection,
    StorefrontFooter,
    App,
    StorefrontProvider,
} from "@openfin/workspace/shapes";
import { launchApp } from "@openfin/workspace";
import {
    apps,
    navigationSections,
    landingPage,
    footer,
} from "./store";

const getNavigation = async (): Promise<
    [StorefrontNavigationSection?, StorefrontNavigationSection?]
> => {
    return navigationSections;
};

const getLandingPage = async (): Promise<StorefrontLandingPage> => {
    return landingPage;
};

const getFooter = async (): Promise<StorefrontFooter> => {
    return footer;
};

const getApps = async (): Promise<App[]> => {
    return apps;
};

const getStorefrontProvider = (): StorefrontProvider => ({
    id: faker.datatype.uuid(),
    title: faker.lorem.words(2),
    getNavigation,
    getLandingPage,
    getFooter,
    getApps,
    launchApp,
});

export default getStorefrontProvider;