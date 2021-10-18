import { Storefront, launchApp } from "@openfin/workspace";
import {
  StorefrontLandingPage,
  StorefrontNavigationSection,
  StorefrontFooter,
  StorefrontProvider,
  StorefrontTemplate,
} from "@openfin/workspace/shapes";
import {
  getApps,
  experoApp,
  notificationStudio,
  processManager,
  developerContent,
} from "./apps";

let storeCount = 0;

export async function init() {
  console.log("Initialising the storefront provider.");
  let provider = await getStoreProvider();
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

export async function show() {
  console.log("Showing the store.");
  return Storefront.show();
}

export async function hide() {
  console.log("Hiding the store.");
  return Storefront.show();
}

async function getStoreProvider(): Promise<StorefrontProvider> {
  console.log("Getting the store provider.");
  storeCount++;
  return {
    id: "my-basic-store-" + storeCount,
    title: "Basic Store "  + storeCount,
    getNavigation: getNavigation.bind(this),
    getLandingPage: getLandingPage.bind(this),
    getFooter: getFooter.bind(this),
    getApps,
    launchApp: launchApp,
  };
}

async function getNavigation(): Promise<
  [StorefrontNavigationSection?, StorefrontNavigationSection?]
> {
  console.log("Showing the store navigation.");

  let navigationSections: [
    StorefrontNavigationSection?,
    StorefrontNavigationSection?
  ] = [
    {
      id: "apps",
      title: "Apps",
      items: [
        {
          id: "view",
          title: "Views",
          templateId: "appGrid" as StorefrontTemplate.AppGrid,
          templateData: {
            apps: [experoApp],
          },
        },
        {
          id: "page",
          title: "Pages",
          templateId: "appGrid" as StorefrontTemplate.AppGrid,
          templateData: {
            apps: [developerContent],
          },
        },
        {
          id: "manifest",
          title: "Web Apps",
          templateId: "appGrid" as StorefrontTemplate.AppGrid,
          templateData: {
            apps: [notificationStudio, processManager],
          },
        },
      ],
    },
  ];

  return navigationSections;
}

async function getLandingPage(): Promise<StorefrontLandingPage> {
  console.log("Getting the store landing page.");

  let landingPage: StorefrontLandingPage = {
    hero: {
      title: "Custom Hero Title",
      description:
        "This is a demonstration of the hero section that you can configure for your store.",
      cta: {
        id: "hero-1",
        title: "Hero Apps!",
        templateId: "appGrid" as StorefrontTemplate.AppGrid,
        templateData: {
          apps: [notificationStudio, processManager],
        },
      },
      image: {
        src: "http://localhost:8080/images/superhero-unsplash.jpg",
      },
    },
    topRow: {
      title: "Custom Top Row Content",
      items: [
        {
          id: "top-row-item-1",
          title: "Expero",
          description:
            "A collection of example views from Expero showing the power of interop and context sharing.",
          image: {
            src: "http://localhost:8080/images/coding-1-unsplash.jpg",
          },
          templateId: "appGrid" as StorefrontTemplate.AppGrid,
          templateData: {
            apps: [experoApp],
          },
        },
        {
          id: "top-row-item-2",
          title: "Dev Tools",
          description:
            "A collection of developer tools that can aid with building and debugging OpenFin applications.",
          image: {
            src: "http://localhost:8080/images/coding-2-unsplash.jpg",
          },
          templateId: "appGrid" as StorefrontTemplate.AppGrid,
          templateData: {
            apps: [notificationStudio, processManager],
          },
        },
      ],
    },
    middleRow: {
      title:
        "A collection of simple views that show how to share context using the Interop API.",
      apps: [experoApp],
    },
    bottomRow: {
      title: "Quick Access",
      items: [
        {
          id: "bottom-row-item-1",
          title: "Views",
          description:
            "A collection of views made available through our catalog.",
          image: {
            src: "http://localhost:8080/images/coding-4-unsplash.jpg",
          },
          templateId: "appGrid" as StorefrontTemplate.AppGrid,
          templateData: {
            apps: [experoApp],
          },
        },
        {
          id: "bottom-row-item-2",
          title: "Web Apps",
          description: "A collection of web apps built using OpenFin.",
          image: {
            src: "http://localhost:8080/images/coding-5-unsplash.jpg",
          },
          templateId: "appGrid" as StorefrontTemplate.AppGrid,
          templateData: {
            apps: [notificationStudio, processManager],
          },
        },
      ],
    },
  };

  return landingPage;
}

async function getFooter(): Promise<StorefrontFooter> {
  console.log("Getting the store footer.");
  return {
    logo: { src: "http://localhost:8080/favicon.ico", size: "32" },
    text: "Welcome to the OpenFin Sample Footer",
    links: [
      {
        title: "Github",
        url: "https://github.com/openfin/workspace-starter",
      },
      {
        title: "YouTube",
        url: "https://www.youtube.com/user/OpenFinTech",
      },
    ],
  };
}
