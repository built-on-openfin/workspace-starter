import type { Image } from "@openfin/workspace";
import type { AppDefinition, AppIcon, AppImage } from "./fdc3-1-2-shapes";

export function getIcons(icons: AppIcon[]): Image[] {
	const appIcons: Image[] = [];
	if (!Array.isArray(icons)) {
		return appIcons;
	}
	for (const appIcon of icons) {
		appIcons.push({ src: appIcon.icon });
	}
	return appIcons;
}

export function getImages(images: AppImage[]): Image[] {
	const appImages: Image[] = [];
	if (!Array.isArray(images)) {
		return appImages;
	}
	for (const appImage of images) {
		appImages.push({ src: appImage.url });
	}
	return appImages;
}

export function getManifest(app: AppDefinition): unknown {
	if (typeof app.manifest === "string" && app.manifest.startsWith("{")) {
		return JSON.parse(app.manifest);
	}

	return app.manifest;
}

export function getTags(app: AppDefinition): string[] {
	// eslint-disable-next-line @typescript-eslint/dot-notation
	const tags: string[] = app["tags"] ?? [];
	if (tags.length === 0) {
		tags.push(app.manifestType);
	}

	return tags;
}

export function getPrivate(app: AppDefinition): boolean {
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
