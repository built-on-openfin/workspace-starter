import { createLogger } from "./logger-provider";
import type {
	MaximumVersion,
	MinimumVersion,
	VersionInfo,
	VersionProviderOptions,
	VersionType
} from "./shapes/version-shapes";

const versionInfo: VersionInfo = {};
let minVersion: MinimumVersion;
let maxVersion: MaximumVersion;
let versionWindowConfiguration: OpenFin.WindowOptions;
const minFail: string[] = [];
const maxFail: string[] = [];

const logger = createLogger("VersionProvider");

export async function init(versionProviderOptions?: VersionProviderOptions): Promise<void> {
	if (versionProviderOptions === undefined) {
		logger.info("Version provider options not passed");
	} else {
		versionInfo.app = versionProviderOptions.appVersion;
		minVersion = versionProviderOptions.minimumVersion;
		maxVersion = versionProviderOptions.maximumVersion;
		versionWindowConfiguration = versionProviderOptions.versionWindow as OpenFin.WindowOptions;
		logger.info("Initialized with the following settings", versionProviderOptions);
	}
}

export function setVersion(versionType: VersionType, versionNumber: string): void {
	let versionLabel: string;
	let setVersionNumber = false;

	switch (versionType) {
		case "NotificationCenter": {
			versionLabel = "Notification Center Version";
			setVersionNumber = versionInfo.notificationCenter === undefined;
			if (setVersionNumber) {
				versionInfo.notificationCenter = versionNumber;
			} else {
				logger.warn(
					`${versionLabel} already set to: ${versionInfo.notificationCenter} so we are unable to set it to ${versionNumber}`
				);
			}
			break;
		}
		case "PlatformClient": {
			versionLabel = "Platform Client Version";
			setVersionNumber = versionInfo.platformClient === undefined;
			if (setVersionNumber) {
				versionInfo.platformClient = versionNumber;
			} else {
				logger.warn(
					`${versionLabel} already set to: ${versionInfo.platformClient} so we are unable to set it to ${versionNumber}`
				);
			}
			break;
		}
		case "RVM": {
			versionLabel = "RVM Version";
			setVersionNumber = versionInfo.rvm === undefined;
			if (setVersionNumber) {
				versionInfo.rvm = versionNumber;
			} else {
				logger.warn(
					`${versionLabel} already set to: ${versionInfo.rvm} so we are unable to set it to ${versionNumber}`
				);
			}
			break;
		}
		case "Runtime": {
			versionLabel = "Runtime Version";
			setVersionNumber = versionInfo.runtime === undefined;
			if (setVersionNumber) {
				versionInfo.runtime = versionNumber;
			} else {
				logger.warn(
					`${versionLabel} already set to: ${versionInfo.runtime} so we are unable to set it to ${versionNumber}`
				);
			}
			break;
		}
		case "WorkspacePlatformClient": {
			versionLabel = "Workspace Platform Client Version";
			setVersionNumber = versionInfo.workspacePlatformClient === undefined;
			if (setVersionNumber) {
				versionInfo.workspacePlatformClient = versionNumber;
			} else {
				logger.warn(
					`${versionLabel} already set to: ${versionInfo.workspacePlatformClient} so we are unable to set it to ${versionNumber}`
				);
			}
			break;
		}
		case "Workspace": {
			versionLabel = "Workspace Version";
			setVersionNumber = versionInfo.workspace === undefined;
			if (setVersionNumber) {
				versionInfo.workspace = versionNumber;
			} else {
				logger.warn(
					`${versionLabel} already set to: ${versionInfo.workspace} so we are unable to set it to ${versionNumber}`
				);
			}
			break;
		}
		case "WorkspaceClient": {
			versionLabel = "Workspace Client Version";
			setVersionNumber = versionInfo.workspaceClient === undefined;
			if (setVersionNumber) {
				versionInfo.workspaceClient = versionNumber;
			} else {
				logger.warn(
					`${versionLabel} already set to: ${versionInfo.workspaceClient} so we are unable to set it to ${versionNumber}`
				);
			}
			break;
		}
	}

	if (setVersionNumber) {
		logger.info(`${versionLabel} has been set to ${versionNumber}`);
	}
}

export async function getVersionInfo(): Promise<VersionInfo> {
	return versionInfo;
}

export function isSupported(): boolean {
	if (minVersion === undefined) {
		logger.info("No minimum versions have been specified.");
	} else {
		const checks = Object.keys(minVersion);

		for (let i = 0; i < checks.length; i++) {
			const versionToCheck = checks[i];
			if (versionInfo[versionToCheck] !== undefined) {
				const currentVersion: string = versionInfo[versionToCheck];
				const limitVersion: string = minVersion[versionToCheck];
				compareVersion(versionToCheck, true, currentVersion, limitVersion);
			}
		}
	}

	if (maxVersion === undefined) {
		logger.info("No maximum versions have been specified.");
	} else {
		const checks = Object.keys(maxVersion);

		for (let i = 0; i < checks.length; i++) {
			const versionToCheck = checks[i];
			if (versionInfo[versionToCheck] !== undefined) {
				const currentVersion: string = versionInfo[versionToCheck];
				const limitVersion: string = maxVersion[versionToCheck];
				compareVersion(versionToCheck, false, currentVersion, limitVersion);
			}
		}
	}

	return minFail.length === 0 && maxFail.length === 0;
}

export function getVersionWindowConfiguration(): OpenFin.WindowOptions {
	if (versionWindowConfiguration === undefined) {
		logger.info("No version window configuration provided.");
		return versionWindowConfiguration;
	}
	if (versionWindowConfiguration.url === undefined) {
		logger.error(
			"A version window configuration was set in the versionProvider settings but a url was not provided. A window cannot be shown."
		);
		return undefined;
	}
	if (versionWindowConfiguration.name === undefined) {
		versionWindowConfiguration.name = `${fin.me.identity.uuid}-versioning`;
	}

	const supportingCustomData = { minVersion, maxVersion, versionInfo, minFail, maxFail };
	if (versionWindowConfiguration.customData !== undefined) {
		logger.info("Enriching customData provided by version window configuration.");
		versionWindowConfiguration.customData = {
			...versionWindowConfiguration.customData,
			...supportingCustomData
		};
	} else {
		logger.info("Setting customData for version window configuration.");
		versionWindowConfiguration.customData = supportingCustomData;
	}
	logger.info("Returning version window configuration.");
	return versionWindowConfiguration;
}

function isGreaterThanOrLessThan(
	versionToCheck: string,
	isMinLimit: boolean,
	type: string,
	baseVersion: string,
	limitVersion: string
) {
	const maxOrMinLabel = isMinLimit ? "minimum" : "maximum";
	if (Number.parseInt(baseVersion, 10) > Number.parseInt(limitVersion, 10)) {
		logger.info(
			`Finished check for ${versionToCheck}. Current ${type} version: ${baseVersion} is greater than ${maxOrMinLabel} ${type} version: ${limitVersion}`
		);
		if (isMinLimit) {
			return true;
		}
		return false;
	} else if (Number.parseInt(baseVersion, 10) < Number.parseInt(limitVersion, 10)) {
		logger.info(
			`Finished check for ${versionToCheck}. Current ${type} version: ${baseVersion} is less than ${maxOrMinLabel} ${type} version: ${limitVersion}`
		);
		if (isMinLimit) {
			return false;
		}
		return true;
	}
	return null;
}

function compareVersion(
	versionToCheck: string,
	isMinLimit: boolean,
	currentVersion: string,
	limitVersion: string
): boolean {
	if (
		currentVersion === undefined ||
		currentVersion === null ||
		limitVersion === undefined ||
		limitVersion === null
	) {
		logger.warn(
			`A check was requested for ${versionToCheck} but either the base version or limit version was not specified.`
		);
		return true;
	}
	const currentVersionList = currentVersion.split(".");
	const limitVersionList = limitVersion.split(".");

	const maxOrMinLimit = isMinLimit ? "minimum" : "maximum";

	if (limitVersionList.length !== currentVersionList.length) {
		logger.warn(
			`A current version ${currentVersion} and ${maxOrMinLimit} version ${limitVersion} for ${versionToCheck} was specified but both need to have the same number of digits.`
		);
		return true;
	}

	const versionParts = ["Major", "Minor", "Patch", "Build"];

	for (let i = 0; i < currentVersion.length; i++) {
		const isValid = isGreaterThanOrLessThan(
			versionToCheck,
			isMinLimit,
			versionParts[i],
			currentVersionList[i],
			limitVersionList[i]
		);

		if (isValid !== null) {
			if (!isValid) {
				if (isMinLimit) {
					minFail.push(versionToCheck);
				} else {
					maxFail.push(versionToCheck);
				}
			}
			return isValid;
		}
	}

	return true;
}
