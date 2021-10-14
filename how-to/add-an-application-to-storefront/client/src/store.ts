import { Storefront } from "@openfin/workspace";
import {
  StorefrontLandingPage,
  StorefrontNavigationSection,
  StorefrontFooter,
  App,
  StorefrontProvider,
  StorefrontTemplate,
  StorefrontNavigationItem,
  StorefrontDetailedNavigationItem,
} from "@openfin/workspace/shapes";
import { getApps, getAppsByTag } from "./apps";
import { launch } from "./launch";
import { getSettings } from "./settings";
import { StorefrontSettingsLandingPageRow } from "./shapes";

export async function init() {
  console.log("Initialising the storefront provier.");
  let provider = await getStoreProvider();
  if (provider !== null) {
    try {
      await Storefront.register(provider);
      console.log("Storefront provider initialised.");
    } catch (err) {
      console.error(
        "An error was encountered while trying to register the content store provider",
        err
      );
    }
  }
}

export async function show() {
  console.log("Showing the store.");
  return Storefront.show();
}

export async function hide() {
  console.log("Hiding the store.");
  return Storefront.show();
}

function getId(title:string, tags:string []) {
    const search = ' ';
    const replaceWith = '-';
    let result = title.replaceAll(search, replaceWith);
    result += "-" + tags.join('-');
    return result.toLowerCase();
}

async function getStoreProvider(): Promise<StorefrontProvider> {
  console.log("Getting the store provider.");
  let settings = await getSettings();
  if (
    settings?.storefrontProvider?.id !== undefined &&
    settings?.storefrontProvider?.title !== undefined &&
    settings?.storefrontProvider?.footer !== undefined &&
    settings?.storefrontProvider?.landingPage !== undefined &&
    settings?.storefrontProvider?.navigation !== undefined
  ) {
    return {
      id: settings.storefrontProvider.id,
      title: settings.storefrontProvider.title,
      getNavigation: getNavigation.bind(this),
      getLandingPage: getLandingPage.bind(this),
      getFooter: getFooter.bind(this),
      getApps,
      launchApp: launch,
    };
  }
  console.warn(
    "StorefrontProvider is not correctly configured in the customSettings of this manifest."
  );
  return null;
}

async function getNavigation(): Promise<
  [StorefrontNavigationSection?, StorefrontNavigationSection?]
> {
  console.log("Showing the store navigation.");
  let settings = await getSettings();
  let navigationSections: [
    StorefrontNavigationSection?,
    StorefrontNavigationSection?
  ] = [];

  if (settings?.storefrontProvider?.navigation === undefined) {
    return [];
  }

  for (let i = 0; i < settings.storefrontProvider.navigation.length; i++) {
    if (navigationSections.length === 2) {
      console.log(
        "More than 2 navigation sections defined in StorefrontProvider settings. Only two are taken."
      );
      break;
    }
    let navigationSection: StorefrontNavigationSection = {
      id: settings.storefrontProvider.navigation[i].title.toLowerCase().replaceAll(" ", "-"),
      title: settings.storefrontProvider.navigation[i].title,
      items: (await getNavigationItems(
        settings.storefrontProvider.navigation[i].items,
        5
      )) as [
        StorefrontNavigationItem,
        StorefrontNavigationItem?,
        StorefrontNavigationItem?,
        StorefrontNavigationItem?,
        StorefrontNavigationItem?
      ],
    };
    navigationSections.push(navigationSection);
  }

  return navigationSections;
}

async function getLandingPage(): Promise<StorefrontLandingPage> {
  console.log("Getting the store landing page.");
  let landingPage: StorefrontLandingPage = {
    topRow: null,
    middleRow: null,
    bottomRow: null,
  };

  let settings = await getSettings();

  if (settings?.storefrontProvider?.landingPage?.hero !== undefined) {
    let hero = settings.storefrontProvider.landingPage.hero;
    let cta = await getNavigationItem(
      hero.cta.title,
      hero.cta.tags
    );
    landingPage.hero = {
      title: hero.title,
      image: hero.image,
      description: hero.description,
      cta,
    };
  }

  if (settings?.storefrontProvider?.landingPage?.topRow !== undefined) {
    landingPage.topRow = await getLandingPageRow(
      settings?.storefrontProvider?.landingPage?.topRow,
      4
    );
  } else {
    console.error("You need to have a topRow defined in your landing page.");
  }

  if (settings?.storefrontProvider?.landingPage?.middleRow !== undefined) {
    let middleRow = settings.storefrontProvider.landingPage.middleRow;
    let middleRowApps = (await getAppsByTag(middleRow.tags)).slice(0, 6) as [
      App?,
      App?,
      App?,
      App?,
      App?,
      App?
    ];
    landingPage.middleRow = {
      title: middleRow.title,
      apps: middleRowApps,
    };
  } else {
    console.error("You need to have a middleRow defined in your landing page.");
  }

  if (settings?.storefrontProvider?.landingPage?.bottomRow !== undefined) {
    landingPage.bottomRow = await getLandingPageRow(
      settings.storefrontProvider.landingPage.bottomRow,
      3
    );
  } else {
    console.error("You need to have a bottomRow defined in your landing page.");
  }

  return landingPage;
}

async function getFooter(): Promise<StorefrontFooter> {
  console.log("Getting the store footer.");
  let settings = await getSettings();
  if (settings?.storefrontProvider?.footer !== undefined) {
    return settings.storefrontProvider.footer;
  } else {
    console.error(
      "Storefront is being initialised without a footer configured."
    );
    return null;
  }
}

async function getNavigationItem(
  title: string,
  tags: string[]
): Promise<StorefrontNavigationItem> {
  let navigationItem: StorefrontNavigationItem = {
    id: getId(title, tags),
    title,
    templateId: "appGrid" as StorefrontTemplate.AppGrid,
    templateData: {
      apps: [],
    },
  };

  let apps = await getAppsByTag(tags);

  if (apps !== undefined && apps.length > 0) {
    navigationItem.templateData.apps = apps;
  }

  return navigationItem;
}

async function getNavigationItems(
  items: { title: string; tags: string[] }[],
  limit: number
) {
  let navigationItems: StorefrontNavigationItem[] = [];

  for (let i = 0; i < items.length; i++) {
    let navigationItem = await getNavigationItem(
      items[i].title,
      items[i].tags
    );
    navigationItems.push(navigationItem);
  }

  return navigationItems.slice(0, limit);
}

async function getLandingPageRow(
  definition: StorefrontSettingsLandingPageRow,
  limit: number
) {
  let items: StorefrontDetailedNavigationItem[] = [];

  for (let i = 0; i < definition.items.length; i++) {
    let navigationItem = await getNavigationItem(
      definition.items[i].title,
      definition.items[i].tags
    );
    let item: StorefrontDetailedNavigationItem = {
      description: definition.items[i].description,
      image: definition.items[i].image,
      ...navigationItem,
    };
    items.push(item);
  }

  let detailedNavigationItems = items.slice(0, limit) as any;

  return {
    title: definition.title,
    items: detailedNavigationItems,
  };
}
