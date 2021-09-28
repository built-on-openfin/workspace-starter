import * as faker from "faker";
import {
    App,
    StorefrontFooter,
    StorefrontLandingPage,
    StorefrontNavigationSection,
    StorefrontTemplate,
} from "@openfin/workspace/shapes";

const getRandomImage = () =>
    faker.random.arrayElement([
        faker.image.city(),
        faker.image.animals(),
        faker.image.business(),
        faker.image.nature(),
        faker.image.technics(),
        faker.image.cats(),
        faker.image.transport(),
    ]);

const getApp = (): App => ({
    appId: faker.datatype.uuid(),
    title: faker.lorem.word(),
    manifestType: "view",
    manifest: `https://openfin-iex.experolabs.com/openfin/manifests/cash-flow.json`,
    icons: [
        {
            src: getRandomImage(),
        },
    ],
    contactEmail: faker.internet.email(),
    supportEmail: faker.internet.email(),
    publisher: faker.lorem.word(),
    tags: [],
    images: [],
    intents: [],
});

export const apps = [
    getApp(),
    getApp(),
    getApp(),
    getApp(),
    getApp(),
    getApp(),
];

const getNavigationItem = () => ({
    id: faker.datatype.uuid(),
    title: faker.lorem.word(),
    templateId: "appGrid" as StorefrontTemplate.AppGrid,
    templateData: {
        apps: faker.random.arrayElements(apps, 6),
    },
});

const navigationItems = [
    getNavigationItem(),
    getNavigationItem(),
    getNavigationItem(),
    getNavigationItem(),
    getNavigationItem(),
    getNavigationItem(),
];

const detailedNavigationItems = [
    {
        ...faker.random.arrayElement(navigationItems),
        description: faker.lorem.word(),
        image: { src: getRandomImage() },
    },
    {
        ...faker.random.arrayElement(navigationItems),
        description: faker.lorem.word(),
        image: { src: getRandomImage() },
    },
    {
        ...faker.random.arrayElement(navigationItems),
        description: faker.lorem.word(),
        image: { src: getRandomImage() },
    },
];

export const navigationSections: [
    StorefrontNavigationSection,
    StorefrontNavigationSection
] = [
    {
        id: faker.datatype.uuid(),
        title: faker.lorem.word(),
        items: [navigationItems[0], navigationItems[1], navigationItems[2]],
    },
    {
        id: faker.datatype.uuid(),
        title: faker.lorem.word(),
        items: [navigationItems[3], navigationItems[4], navigationItems[5]],
    },
];

const getLandingPage = (): StorefrontLandingPage => ({
    hero: {
        title: faker.lorem.word(),
        description: faker.lorem.sentences(),
        cta: navigationItems[0],
        image: {
            src: faker.image.city(),
        },
    },
    topRow: {
        title: faker.lorem.word(),
        items: faker.random.arrayElements(detailedNavigationItems, 2) as any,
    },
    middleRow: {
        title: faker.lorem.word(),
        apps: faker.random.arrayElements(apps, 3) as any,
    },
    bottomRow: {
        title: faker.lorem.word(),
        items: faker.random.arrayElements(detailedNavigationItems, 2) as any,
    },
});

export const landingPage = getLandingPage();

const getFooter = (): StorefrontFooter => ({
    logo: { src: faker.image.abstract(), size: "32" },
    text: faker.lorem.sentence(),
    links: [
        { title: faker.lorem.word(), url: faker.internet.url() },
        { title: faker.lorem.word(), url: faker.internet.url() },
    ],
});

export const footer = getFooter();
