#!/usr/bin/env node

import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { loadEnvFile } from "node:process";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const suiteDir = path.resolve(scriptDir, "..");
const envFile = path.join(scriptDir, ".env");
const configFile = path.join(scriptDir, "here-automation.eb.config.json");

try {
	loadEnvFile(envFile);
} catch (err: unknown) {
	const detail = err instanceof Error ? err.message : String(err);
	console.error(`Could not read ${envFile}`);
	console.error(detail);
	console.error("Create that file with MANIFEST_URL, HERE_ID_USER, and HERE_ID_PASSWORD. Do not commit it.");
	process.exit(1);
}

/**
 * Minimal manifest fields needed by this runner.
 */
interface OpenFinManifest {
	/**
	 * OpenFin's supported Chromium DevTools port.
	 */
	// eslint-disable-next-line camelcase -- OpenFin manifest wire format
	devtools_port?: number;
}

/**
 * Read the DevTools port the CLI is configured to use.
 * @returns Port from the EB config, or 9090.
 */
async function readDevToolsPort(): Promise<number> {
	const config = JSON.parse(await fs.readFile(configFile, "utf8")) as {
		cli?: { devToolsPort?: number };
	};
	return config.cli?.devToolsPort ?? 9090;
}

/**
 * Verify that a Windows launch manifest explicitly enables DevTools.
 * Runtime 45 / Chromium 150 can ignore an injected remote-debugging switch;
 * `devtools_port` is the supported OpenFin manifest setting.
 * @param manifestUrl Tenant manifest URL.
 * @param expectedPort Port expected by HERE Automation.
 */
async function validateWindowsManifest(manifestUrl: string, expectedPort: number): Promise<void> {
	const response = await fetch(manifestUrl);
	if (!response.ok) {
		throw new Error(`Unable to validate ${manifestUrl}: HTTP ${response.status}`);
	}
	const manifest = (await response.json()) as OpenFinManifest;
	if (manifest.devtools_port !== expectedPort) {
		throw new Error(
			`The Windows manifest must include top-level "devtools_port": ${expectedPort}. ` +
				`The current value is ${manifest.devtools_port ?? "missing"}. ` +
				"Update the tenant manifest endpoint before running this suite."
		);
	}
	console.log(`[eb] manifest devtools_port=${manifest.devtools_port}`);
}

/**
 * Validate configuration and invoke the automation CLI without relying on
 * platform-specific shell glob expansion.
 */
async function main(): Promise<void> {
	const requiredVariables = ["MANIFEST_URL", "HERE_ID_USER", "HERE_ID_PASSWORD"];
	const missingVariables = requiredVariables.filter((name) => !process.env[name]);
	if (missingVariables.length > 0) {
		throw new Error(`Missing required variables in eb/.env: ${missingVariables.join(", ")}`);
	}

	const manifestUrl = new URL(process.env.MANIFEST_URL as string);
	const devToolsPort = await readDevToolsPort();
	console.log(`[eb] platform=${process.platform} arch=${process.arch} node=${process.version}`);
	console.log(`[eb] manifest host=${manifestUrl.host}`);

	if (process.platform === "win32") {
		await validateWindowsManifest(manifestUrl.href, devToolsPort);
	}
	console.log("[eb] using the stock HERE Automation RVM launcher");

	process.chdir(suiteDir);
	const { run } = require("@openfin/automation-cli") as {
		run: (argv: string[]) => Promise<{ exitCode: number }>;
	};
	const result = await run([
		process.execPath,
		"here-automation",
		"eb/**/*.spec.ts",
		"--config",
		path.join("eb", "here-automation.eb.config.json")
	]);
	process.exit(result.exitCode);
}

main().catch((err: unknown) => {
	console.error(err);
	process.exit(1);
});
