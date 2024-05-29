import type { AppIdentifier, AppMetadata } from "@finos/fdc3";
import type { PlatformApp } from "workspace-platform-starter/shapes/app-shapes";
import type { AppMetadata as AppMetadataV1Point2 } from "workspace-platform-starter/shapes/fdc3-1-2-shapes";

/**
 * Gets app meta data in the right format based on the version.
 * @param apps the apps to get the meta data for.
 * @param version the version of the meta data to get.
 * @param appToV1Point2 the function to convert the app to v1.2 meta data.
 * @param appTpV2Point0 the function to convert the app to v2.0 meta data.
 * @param findInstances the function to find the instances of an app so you can add them to the meta data.
 * @returns the app meta data.
 */
export async function getAppsMetaData(
	apps: PlatformApp[],
	version: string,
	appToV1Point2: (app: PlatformApp) => AppMetadataV1Point2,
	appTpV2Point0: (app: PlatformApp) => AppMetadata,
	findInstances: (appId: string) => Promise<AppIdentifier[]>
): Promise<AppMetadata[] | AppMetadataV1Point2[]> {
	const appsMetaData: AppMetadata[] = [];
	const appsMetaDataV1Point2: AppMetadataV1Point2[] = [];

	if (version === "1.2") {
		for (const app of apps) {
			const appData = appToV1Point2(app);
			appsMetaDataV1Point2.push(appData);
		}
		return appsMetaDataV1Point2;
	}
	for (const app of apps) {
		const appData = appTpV2Point0(app);
		const instances = await findInstances(app.appId);
		appsMetaData.push(appData);
		for (const instance of instances) {
			const instanceAppEntry = { ...appData, instanceId: instance.instanceId };
			appsMetaData.push(instanceAppEntry);
		}
	}
	return appsMetaData;
}
