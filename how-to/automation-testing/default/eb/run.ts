#!/usr/bin/env node

import { createRequire } from "node:module";
import path from "node:path";
import { loadEnvFile } from "node:process";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const suiteDir = path.resolve(scriptDir, "..");
const envFile = path.join(scriptDir, ".env");

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
	console.log(`[eb] platform=${process.platform} arch=${process.arch} node=${process.version}`);
	console.log(`[eb] manifest host=${manifestUrl.host}`);
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
