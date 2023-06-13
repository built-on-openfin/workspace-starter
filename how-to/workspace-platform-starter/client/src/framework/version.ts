import type OpenFin from "@openfin/core";
import { createLogger } from "./logger-provider";
import type { EndpointProvider } from "./shapes";
import type {
	MaximumVersion,
	MinimumVersion,
	VersionInfo,
	VersionProviderOptions,
	VersionRequest,
	VersionResponse,
	VersionStatus,
	VersionStatusData,
	VersionType
} from "./shapes/version-shapes";
import { isEmpty, isInteger } from "./utils";

const versionInfo: VersionInfo = {};
let versionOptions: VersionProviderOptions;
let minVersion: MinimumVersion | undefined;
let maxVersion: MaximumVersion | undefined;
let versionWindowConfiguration: OpenFin.WindowOptions | undefined;
let endpointProvider: EndpointProvider | undefined;
let endpointId: string | undefined;
let minFail: VersionType[] = [];
let maxFail: VersionType[] = [];
let settingsBasedWindowConfiguration = false;
let isMonitoringEnabled = false;
let monitoringId: number | undefined;
let versionCheckIntervalInSeconds: number;

const logger = createLogger("VersionProvider");

/**
 * Initialize the Version Provider.
 * @param options The options that guide how this version provider behaves
 * @param initEndpointProvider The provider that allows the setting and retrieval of data without needing to know about the implementation
 */
export async function init(
	options?: VersionProviderOptions,
	initEndpointProvider?: EndpointProvider
): Promise<void> {
	if (isEmpty(options)) {
		logger.info("Version provider options not passed");
	} else {
		versionOptions = options;
		versionInfo.app = options.appVersion;
		minVersion = options.minVersion;
		maxVersion = options.maxVersion;
		versionWindowConfiguration = options.versionWindow as OpenFin.WindowOptions;
		endpointId = options.endpointId;
		settingsBasedWindowConfiguration = !isEmpty(versionWindowConfiguration);

		if (isInteger(options.versionCheckIntervalInSeconds)) {
			versionCheckIntervalInSeconds = options.versionCheckIntervalInSeconds;
		}

		if (initEndpointProvider) {
			isMonitoringEnabled =
				!isEmpty(versionCheckIntervalInSeconds) &&
				!isEmpty(options.endpointId) &&
				initEndpointProvider.hasEndpoint(options.endpointId);
		}
		logger.info("Initialized with the following settings", options);
	}
	endpointProvider = initEndpointProvider;
}

/**
 * The version provider does not look up all the versioning information as this can
 * come from multiple sources. It does know what sources it supports and allows the platform
 * to feed this information to the provider.
 * @param versionType The type of version number you want to set (e.g. workspace)
 * @param versionNumber The number you wish to assign against this version
 */
export function setVersion(versionType: VersionType, versionNumber: string): void {
	let versionLabel: string | undefined;
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
			setVersionNumber = isEmpty(versionInfo.notificationCenter);
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
			setVersionNumber = isEmpty(versionInfo.platformClient);
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
			setVersionNumber = isEmpty(versionInfo.rvm);
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
			setVersionNumber = isEmpty(versionInfo.runtime);
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
			setVersionNumber = isEmpty(versionInfo.workspacePlatformClient);
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
			setVersionNumber = isEmpty(versionInfo.workspace);
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
			setVersionNumber = isEmpty(versionInfo.workspaceClient);
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
 * Version information can be set against the version provider and easily retrieved using this function.
 * @returns VersionInfo - an object containing information related to this platform and it's dependencies
 */
export async function getVersionInfo(): Promise<VersionInfo> {
	return versionInfo;
}

/**
 * Inspect the platform and platform requirements and return a status to indicate version state.
 * @returns The version status.
 */
export async function getVersionStatus(): Promise<VersionStatus> {
	if (isEmpty(minVersion)) {
		logger.info("No minimum versions have been specified.");
	} else {
		const checks = Object.keys(minVersion) as VersionType[];

		for (const check of checks) {
			const versionToCheck = check;
			if (!isEmpty(versionInfo[versionToCheck])) {
				const currentVersion: string | undefined = versionInfo[versionToCheck];
				const limitVersion: string | undefined = minVersion[versionToCheck];
				compareVersion(versionToCheck, true, currentVersion, limitVersion);
			}
		}
	}

	if (isEmpty(maxVersion)) {
		logger.info("No maximum versions have been specified.");
	} else {
		const checks = Object.keys(maxVersion) as VersionType[];

		for (const check of checks) {
			const versionToCheck = check;
			if (!isEmpty(versionInfo[versionToCheck])) {
				const currentVersion: string | undefined = versionInfo[versionToCheck];
				const limitVersion: string | undefined = maxVersion[versionToCheck];
				compareVersion(versionToCheck, false, currentVersion, limitVersion);
			}
		}
	}

	if (!isEmpty(endpointId) && !isEmpty(endpointProvider) && endpointProvider.hasEndpoint(endpointId)) {
		try {
			const response = await endpointProvider.requestResponse<VersionRequest, VersionResponse>(
				endpointId,
				getVersionStatusData()
			);
			logger.info("Response received from version endpoint: ", response);
			const status = response?.status;
			if (!isEmpty(status)) {
				if (Array.isArray(status.minFail)) {
					minFail = status?.minFail;
				}
				if (Array.isArray(status.maxFail)) {
					maxFail = status.maxFail;
				}
			}
			if (status?.minVersion) {
				minVersion = status.minVersion;
			}
			if (status?.maxVersion) {
				maxVersion = status.maxVersion;
			}
			const windowOptions = response?.windowOptions;
			if (!isEmpty(windowOptions)) {
				settingsBasedWindowConfiguration = false;
				versionWindowConfiguration = validateVersionWindow(windowOptions);
				logger.info("Fetched version window configuration from endpoint:", endpointId);
			}
		} catch (error) {
			logger.error("Error while checking for version status.", error);
		}
	} else if (versionOptions) {
		settingsBasedWindowConfiguration = true;
		versionWindowConfiguration = validateVersionWindow(versionOptions.versionWindow as OpenFin.WindowOptions);
	}

	let status: VersionStatus;
	if (minFail.includes("app")) {
		status = "upgradeable";
	} else {
		status = minFail.length === 0 && maxFail.length === 0 ? "compatible" : "incompatible";
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
	if (status !== "compatible") {
		const windowOptions = validateVersionWindow(versionWindowConfiguration);
		if (isEmpty(windowOptions)) {
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

/**
 * If configured via Version Provider Settings, this method will start monitoring to see if an upgrade is available.
 */
export async function MonitorVersionStatus(): Promise<void> {
	if (isMonitoringEnabled) {
		if (isEmpty(monitoringId)) {
			logger.info("Monitoring is enabled and not running. Starting the monitoring process.");
			await startMonitoring();
		} else {
			logger.info("Monitoring has been requested but is already running.");
		}
	} else {
		logger.warn("Monitoring is not setup via the version provider settings.");
	}
}

/**
 * Start monitoring the versions.
 */
async function startMonitoring(): Promise<void> {
	if (!isEmpty(monitoringId)) {
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
	}, versionCheckIntervalInSeconds * 1000);
}

/**
 * Validate the version window options.
 * @param windowOptionsToValidate The window options to validate.
 * @returns The validate window options.
 */
function validateVersionWindow(
	windowOptionsToValidate: OpenFin.WindowOptions | undefined
): OpenFin.WindowOptions | undefined {
	if (isEmpty(windowOptionsToValidate)) {
		logger.info("No version window configuration provided.");
		return undefined;
	}

	const validatedWindowOptions = { ...windowOptionsToValidate };

	if (isEmpty(validatedWindowOptions.url)) {
		logger.error(
			"A version window configuration was set but a url was not provided. A window cannot be launched."
		);
		return undefined;
	}
	if (isEmpty(validatedWindowOptions.name)) {
		validatedWindowOptions.name = `${fin.me.identity.uuid}-versioning`;
	}

	if (settingsBasedWindowConfiguration) {
		if (!isEmpty(validatedWindowOptions.customData)) {
			logger.info("Enriching customData provided by version window configuration.");
			validatedWindowOptions.customData = {
				...validatedWindowOptions.customData,
				...getVersionStatusData()
			};
		} else {
			logger.info("Setting customData for version window configuration.");
			validatedWindowOptions.customData = getVersionStatusData();
		}
	}

	logger.info("Returning version window configuration.");
	return validatedWindowOptions;
}

/**
 * Get the version data as an object.
 * @returns The combined version data.
 */
function getVersionStatusData(): VersionStatusData {
	return { minVersion, maxVersion, versionInfo, minFail, maxFail };
}

/**
 * Check the version to see if it is in range.
 * @param versionToCheck The version to compare.
 * @param isMinLimit Is this a minimum limit version check.
 * @param type The type of version being checked.
 * @param baseVersion The base version to compare to.
 * @param limitVersion The limit of the version being checked.
 * @returns True if the version is out of range.
 */
function isGreaterThanOrLessThan(
	versionToCheck: string,
	isMinLimit: boolean,
	type: string,
	baseVersion: string,
	limitVersion: string
): boolean | undefined {
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
}

/**
 * Compare the versions.
 * @param versionToCheck The version to compare.
 * @param isMinLimit Is this a minimum limit version check.
 * @param currentVersion The current version to compare to.
 * @param limitVersion The limit of the version being checked.
 * @returns True if the version is out of range.
 */
function compareVersion(
	versionToCheck: VersionType,
	isMinLimit: boolean,
	currentVersion: string | undefined,
	limitVersion: string | undefined
): boolean | undefined {
	if (isEmpty(currentVersion) || isEmpty(limitVersion)) {
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

		if (!isEmpty(isValid)) {
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
