import type { Image } from "@openfin/workspace";
import type { AppDefinition, AppIcon, AppImage } from "./fdc3-1-2-shapes";

export function getIcons(icons: AppIcon[]): Image[] {
	const appIcons: Image[] = [];
	if (icons === undefined) {
		return appIcons;
	}
	for (const appIcon of icons) {
		appIcons.push({ src: appIcon.icon });
	}
	return appIcons;
}

export function getImages(images: AppImage[]): Image[] {
	const appImages: Image[] = [];
	if (images === undefined) {
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
