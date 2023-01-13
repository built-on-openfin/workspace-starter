import { createLogger } from "./logger-provider";
import type { EndpointProvider } from "./shapes";
import type {
	MaximumVersion,
	MinimumVersion,
	VersionInfo,
	VersionProviderOptions,
	VersionResponse,
	VersionStatus,
	VersionStatusData,
	VersionType
} from "./shapes/version-shapes";

const versionInfo: VersionInfo = {};
let versionOptions: VersionProviderOptions;
let minVersion: MinimumVersion;
let maxVersion: MaximumVersion;
let versionWindowConfiguration: OpenFin.WindowOptions;
let endpoints: EndpointProvider;
let endpointId: string;
let minFail: VersionType[] = [];
let maxFail: VersionType[] = [];
let settingsBasedWindowConfiguration = false;
let isMonitoringEnabled = false;
let monitoringId: number;

const logger = createLogger("VersionProvider");

/**
 * Initialize the Version Provider
 * @param versionProviderOptions The options that guide how this version provider behaves
 * @param endpointProvider The provider that allows the setting and retrieval of data without needing to know about the implementation
 */
export async function init(
	versionProviderOptions?: VersionProviderOptions,
	endpointProvider?: EndpointProvider
): Promise<void> {
	if (versionProviderOptions === undefined) {
		logger.info("Version provider options not passed");
	} else {
		versionOptions = versionProviderOptions;
		versionInfo.app = versionProviderOptions.appVersion;
		minVersion = versionProviderOptions.minimumVersion;
		maxVersion = versionProviderOptions.maximumVersion;
		versionWindowConfiguration = versionProviderOptions.versionWindow as OpenFin.WindowOptions;
		endpointId = versionProviderOptions.endpointId;
		settingsBasedWindowConfiguration = versionWindowConfiguration !== undefined;
		isMonitoringEnabled =
			versionProviderOptions.versionCheckInterval !== undefined &&
			versionProviderOptions.endpointId !== undefined &&
			endpointProvider.hasEndpoint(versionProviderOptions.endpointId);
		logger.info("Initialized with the following settings", versionProviderOptions);
	}
	this.endpoints = endpointProvider;
}

/**
 * The version provider does not look up all the versioning information as this can
 * come from multiple sources. It does know what sources it supports and allows the platform
 * to feed this information to the provider.
 * @param versionType The type of version number you want to set (e.g. workspace)
 * @param versionNumber The number you wish to assign against this version
 */
export function setVersion(versionType: VersionType, versionNumber: string): void {
	let versionLabel: string;
	let setVersionNumber = false;

	switch (versionType) {
		case "app": {
			logger.warn(
				"You cannot set the version for app as this can only be specified via the settings provided on application launch inside of the version provider settings."
			);
			break;
		}
		case "notificationCenter": {
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
		case "platformClient": {
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
		case "rvm": {
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
		case "runtime": {
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
		case "workspacePlatformClient": {
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
		case "workspace": {
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
		case "workspaceClient": {
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

/**
 * Version information can be set against the version provider and easily retrieved using this function
 * @returns VersionInfo - an object containing information related to this platform and it's dependencies
 */
export async function getVersionInfo(): Promise<VersionInfo> {
	return versionInfo;
}

/** Inspect the platform and platform requirements and return a status to indicate version state */
export async function getVersionStatus(): Promise<VersionStatus> {
	if (minVersion === undefined) {
		logger.info("No minimum versions have been specified.");
	} else {
		const checks = Object.keys(minVersion) as VersionType[];

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
		const checks = Object.keys(maxVersion) as VersionType[];

		for (let i = 0; i < checks.length; i++) {
			const versionToCheck = checks[i];
			if (versionInfo[versionToCheck] !== undefined) {
				const currentVersion: string = versionInfo[versionToCheck];
				const limitVersion: string = maxVersion[versionToCheck];
				compareVersion(versionToCheck, false, currentVersion, limitVersion);
			}
		}
	}

	if (endpointId !== undefined && endpoints !== undefined && endpoints.hasEndpoint(endpointId)) {
		const response = await endpoints.requestResponse<VersionStatusData, VersionResponse>(
			endpointId,
			getVersionStatusData()
		);
		minFail = response.status.minFail;
		minVersion = response.status.minVersion;
		maxFail = response.status.maxFail;
		maxVersion = response.status.maxVersion;
		if (response.windowOptions !== undefined) {
			settingsBasedWindowConfiguration = false;
			versionWindowConfiguration = validateVersionWindow(response.windowOptions);
			logger.info("Fetched version window configuration from endpoint:", endpointId);
		}
	} else {
		settingsBasedWindowConfiguration = true;
		versionWindowConfiguration = validateVersionWindow(versionOptions.versionWindow as OpenFin.WindowOptions);
	}

	let status: VersionStatus;
	if (minFail.includes("app")) {
		status = "UPGRADABLE";
	} else {
		status = minFail.length === 0 && maxFail.length === 0 ? "COMPATIBLE" : "INCOMPATIBLE";
	}

	logger.info("Current version status: ", status);
	return status;
}

/**
 * This method checks a passed status and reacts according to the rules of the version provider
 * If the status is not valid then it will need to be managed and true will be returned.
 * Otherwise the platform is in a valid state version wise and false will be returned as nothing
 * needed to be managed.
 * @param status The status that came from the getVersionStatus function
 * @returns true if the status indicates that it is not compatible and that an action was needed.
 */
export async function manageVersionStatus(status: VersionStatus): Promise<boolean> {
	if (status !== "COMPATIBLE") {
		const windowOptions = validateVersionWindow(versionWindowConfiguration);
		if (windowOptions === undefined) {
			logger.warn(
				"The status of the platform version is in a non compatible state but we do not have a window to launch to react to this state."
			);
			// we still return that the state had to be managed even though we were unable to do so as we do not want the platform to continue running
			// or polling of the endpoint to continue if an action to execute is not being returned.
			return true;
		}
		const openWarningWindow = await fin.Window.create(windowOptions);
		if (windowOptions.autoShow) {
			await openWarningWindow.setAsForeground();
		}
		return true;
	}
	return false;
}

/** If configured via Version Provider Settings, this method will start monitoring to see if an upgrade is available */
export async function MonitorVersionStatus() {
	if (isMonitoringEnabled) {
		if (monitoringId === undefined) {
			logger.info("Monitoring is enabled and not running. Starting the monitoring process.");
			await startMonitoring();
		} else {
			logger.info("Monitoring has been requested but is already running.");
		}
	} else {
		logger.warn("Monitoring is not setup via the version provider settings.");
	}
}

async function startMonitoring() {
	if (monitoringId !== undefined) {
		clearTimeout(monitoringId);
		monitoringId = undefined;
	}
	monitoringId = window.setTimeout(async () => {
		const status = await getVersionStatus();
		const neededManagement = await manageVersionStatus(status);
		if (!neededManagement) {
			logger.info(`Version status is good: ${status}. Continuing monitoring.`);
			await startMonitoring();
		} else {
			logger.info(`Version status needed management: ${status}. Stopping monitoring.`);
		}
	}, versionOptions.versionCheckInterval * 1000);
}

function validateVersionWindow(windowOptionsToValidate: OpenFin.WindowOptions): OpenFin.WindowOptions {
	if (windowOptionsToValidate === undefined) {
		logger.info("No version window configuration provided.");
		return undefined;
	}

	if (versionWindowConfiguration.url === undefined) {
		logger.error(
			"A version window configuration was set but a url was not provided. A window cannot be launched."
		);
		return undefined;
	}
	if (versionWindowConfiguration.name === undefined) {
		versionWindowConfiguration.name = `${fin.me.identity.uuid}-versioning`;
	}

	if (settingsBasedWindowConfiguration) {
		if (versionWindowConfiguration.customData !== undefined) {
			logger.info("Enriching customData provided by version window configuration.");
			versionWindowConfiguration.customData = {
				...versionWindowConfiguration.customData,
				...getVersionStatusData()
			};
		} else {
			logger.info("Setting customData for version window configuration.");
			versionWindowConfiguration.customData = getVersionStatusData();
		}
	}

	logger.info("Returning version window configuration.");
	return versionWindowConfiguration;
}

function getVersionStatusData(): VersionStatusData {
	return { minVersion, maxVersion, versionInfo, minFail, maxFail };
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
	versionToCheck: VersionType,
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
