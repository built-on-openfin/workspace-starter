import path from "path";
import { loadConfig, type OpenFinConfig } from "@openfin/automation-core";

/**
 * Resolved HERE automation config and derived constants.
 *
 * Because `loadConfig` is async, this module exposes a `loadOpenFinConfig()`
 * function that resolves the config once and caches it. ESM consumers can
 * `await` it at the top level.
 */

/** Hardcoded fallbacks matching the CLI's built-in defaults. */
const DEFAULT_DEVTOOLS_PORT = 9090;
const DEFAULT_MANIFEST_URL = "http://localhost:8080/manifest.fin.json";
const DEFAULT_PRELAUNCH_COMMAND = "npm run start:static --prefix ../../fixtures/platform";

export interface OpenFinCdpConfig {
	/** Remote-debugging port OpenFin is launched with; the CDP endpoint host. */
	devToolsPort: number;
	/** Folder used by the RVM launch for any offline/runtime storage. */
	storageFolder: string;
	/** The manifest URL to launch. */
	manifestUrl: string;
	/** Command to start the local fixture platform (only used for local URLs). */
	preLaunchCommand: string;
	/** Workspace version for DOS settings. */
	workspaceVersion: string;
	/** Notifications version for DOS settings. */
	notificationsVersion: string;
	/** Path to the config file, if found. */
	configPath: string | undefined;
	/** Directory containing the config file (for resolving relative preLaunch paths). */
	configDir: string | undefined;
}

let cached: OpenFinCdpConfig | undefined;

/**
 * Load the HERE automation config and resolve all values needed by the
 * Playwright test suite. Results are cached after the first call.
 */
export async function loadOpenFinConfig(): Promise<OpenFinCdpConfig> {
	if (cached) {
		return cached;
	}

	const configResult = await loadConfig(process.cwd());
	const config: OpenFinConfig | undefined = configResult?.config;
	const configPath = configResult?.configPath;
	const configDir = configPath ? path.dirname(configPath) : undefined;

	cached = {
		devToolsPort: config?.cli?.devToolsPort ?? DEFAULT_DEVTOOLS_PORT,
		storageFolder: "./storage",
		manifestUrl:
			process.env.MANIFEST_URL ??
			config?.platform?.manifestUrl ??
			DEFAULT_MANIFEST_URL,
		preLaunchCommand: config?.platform?.preLaunch ?? DEFAULT_PRELAUNCH_COMMAND,
		workspaceVersion: config?.versions?.workspace ?? "stable",
		notificationsVersion: config?.versions?.notifications ?? "stable",
		configPath,
		configDir
	};

	return cached;
}
