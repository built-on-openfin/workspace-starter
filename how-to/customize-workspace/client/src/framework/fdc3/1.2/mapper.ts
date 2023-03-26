import type { Image } from "@openfin/workspace";
import type { PlatformApp } from "customize-workspace/shapes";
import type { AppInterop, AppIntents as FDC3TwoPointZeroAppIntents } from "customize-workspace/shapes/fdc3-2-0-shapes";
import type { AppDefinition, AppIcon, AppImage, AppIntents } from "../../shapes/fdc3-1-2-shapes";

function getIcons(icons: AppIcon[]): Image[] {
	const appIcons: Image[] = [];
	if (!Array.isArray(icons)) {
		return appIcons;
	}
	for (const appIcon of icons) {
		appIcons.push({ src: appIcon.icon });
	}
	return appIcons;
}

function getImages(images: AppImage[]): Image[] {
	const appImages: Image[] = [];
	if (!Array.isArray(images)) {
		return appImages;
	}
	for (const appImage of images) {
		appImages.push({ src: appImage.url });
	}
	return appImages;
}

function getManifest(app: AppDefinition): unknown {
	if (typeof app.manifest === "string" && app.manifest.startsWith("{")) {
		return JSON.parse(app.manifest);
	}

	return app.manifest;
}

function getTags(app: AppDefinition): string[] {
	// eslint-disable-next-line @typescript-eslint/dot-notation
	const tags: string[] = app["tags"] ?? [];
	if (tags.length === 0) {
		tags.push(app.manifestType);
	}

	return tags;
}

function getPrivate(app: AppDefinition): boolean {
	if (app?.customConfig?.private !== undefined) {
		switch (app?.customConfig?.private) {
			case "False":
			case "false":
			case false:
				return false;
			default:
				// if someone has defined private then the likely hood was to override the default of false.
				return true;
		}
	}
}

export function getInterop(intents: AppIntents[]): AppInterop {
    const listensFor: { [key: string]: FDC3TwoPointZeroAppIntents } = {};

    for(const intent of intents) {
        listensFor[intent.name] = {
            contexts: intent.contexts,
            customConfig: intent.customConfig,
            displayName: intent.displayName
        };
    }

    const interop: AppInterop = {
        intents: { listensFor }
    };

    return interop;
}

export function mapToPlatformApp(app: AppDefinition): PlatformApp {
    const platformApp: PlatformApp = {
        appId: app.appId,
        title: app.title || app.name,
        manifestType: app.manifestType,
        manifest: getManifest(app) as string,
        description: app.description,
        customConfig: app.customConfig,
        intents: app.intents,
        interop: getInterop(app.intents),
        tags: getTags(app),
        version: app.version,
        publisher: app.publisher,
        contactEmail: app.contactEmail,
        supportEmail: app.supportEmail,
        icons: getIcons(app.icons),
        images: getImages(app.images),
        private: getPrivate(app),
        instanceMode: app.customConfig?.instanceMode,
        tooltip: app.tooltip
    };
    return platformApp;
}

export function mapToPlatformApps(apps: AppDefinition[]): PlatformApp[] {
	const platformApps: PlatformApp[] = [];

	for(const app of apps) {
		platformApps.push(mapToPlatformApp(app));
	}

	return platformApps;
}
