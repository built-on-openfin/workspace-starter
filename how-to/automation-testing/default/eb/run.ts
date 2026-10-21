#!/usr/bin/env node

import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { loadEnvFile } from "node:process";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const require = createRequire(import.meta.url);
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const suiteDir = path.resolve(scriptDir, "..");
const envFile = path.join(scriptDir, ".env");
const configFile = path.join(scriptDir, "here-automation.eb.config.json");
const rvmRegKey = "HKCU\\Software\\OpenFin\\RVM";
const rvmRegValue = "runtimeArgs";

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
 * Cleanup for a temporary Windows registry change.
 */
interface RegistryCleanup {
	/**
	 * Restore the previous registry value.
	 */
	close: () => Promise<void>;
}

/**
 * Subset of the helpers module patched for a short DevTools diagnostic.
 */
interface AutomationHelpers {
	/**
	 * Waits until the runtime DevTools HTTP port answers.
	 */
	waitForDevToolsPort: (port: number, timeoutMs?: number) => Promise<void>;
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
 * Read a REG_SZ value, or undefined when it is absent.
 * @param key Registry key.
 * @param value Value name.
 * @returns Current string value.
 */
async function readRegSz(key: string, value: string): Promise<string | undefined> {
	try {
		const { stdout } = await execFileAsync("reg", ["query", key, "/v", value]);
		const match = new RegExp(`${value}\\s+REG_SZ\\s+(.*)$`, "im").exec(stdout);
		return match?.[1]?.trim();
	} catch {
		return undefined;
	}
}

/**
 * Ask the RVM to pass the DevTools port to the runtime.
 * The CLI's --runtime-arguments flag does not reach the runtime on Windows.
 * @param port DevTools port.
 * @returns Cleanup that restores the previous value.
 */
async function setRvmRuntimeArgs(port: number): Promise<RegistryCleanup> {
	const desired = `--remote-debugging-port=${port}`;
	const previous = await readRegSz(rvmRegKey, rvmRegValue);
	await execFileAsync("reg", ["add", rvmRegKey, "/v", rvmRegValue, "/t", "REG_SZ", "/d", desired, "/f"]);
	console.log(`[eb] set ${rvmRegKey}\\${rvmRegValue}=${desired}`);

	/**
	 * Restore the previous HKCU runtimeArgs value.
	 */
	async function close(): Promise<void> {
		try {
			if (previous === undefined) {
				await execFileAsync("reg", ["delete", rvmRegKey, "/v", rvmRegValue, "/f"]);
				console.log(`[eb] removed ${rvmRegKey}\\${rvmRegValue}`);
				return;
			}
			await execFileAsync("reg", ["add", rvmRegKey, "/v", rvmRegValue, "/t", "REG_SZ", "/d", previous, "/f"]);
			console.log(`[eb] restored ${rvmRegKey}\\${rvmRegValue}`);
		} catch (err: unknown) {
			const detail = err instanceof Error ? err.message : String(err);
			console.error(`[eb] could not restore runtimeArgs: ${detail}`);
		}
	}

	return { close };
}

/**
 * True when the DevTools HTTP endpoint answers.
 * @param port DevTools port.
 * @returns Whether /json/version responded.
 */
async function devToolsIsOpen(port: number): Promise<boolean> {
	try {
		const response = await fetch(`http://127.0.0.1:${port}/json/version`, {
			signal: AbortSignal.timeout(1500)
		});
		return response.ok;
	} catch {
		return false;
	}
}

/**
 * Log whether DevTools is open and whether the browser process received the flag.
 * @param port DevTools port.
 */
async function logDevToolsState(port: number): Promise<void> {
	const open = await devToolsIsOpen(port);
	console.log(`[eb] 127.0.0.1:${port} ${open ? "open" : "closed"}`);
	try {
		const { stdout } = await execFileAsync(
			"powershell.exe",
			[
				"-NoProfile",
				"-Command",
				"$p = Get-CimInstance Win32_Process -Filter \"Name = 'OpenFin.exe'\" | Where-Object { $_.CommandLine -and ($_.CommandLine -notmatch '--type=') } | Select-Object -First 1; if (-not $p) { 'missing' } elseif ($p.CommandLine -match 'remote-debugging-port') { 'present' } else { 'absent' }"
			],
			{ windowsHide: true }
		);
		console.log(`[eb] browser remote-debugging-port flag: ${stdout.trim() || "unknown"}`);
	} catch (err: unknown) {
		const detail = err instanceof Error ? err.message : String(err);
		console.log(`[eb] could not inspect OpenFin process: ${detail}`);
	}
}

/**
 * Replace the helpers' DevTools wait with one that prints a short status.
 * @param port DevTools port expected by the CLI.
 */
function installDevToolsDiagnostic(port: number): void {
	const helpers = require("@openfin/automation-helpers") as AutomationHelpers;
	helpers.waitForDevToolsPort = async (waitPort: number, timeoutMs = 60000): Promise<void> => {
		const targetPort = waitPort || port;
		console.log(`[eb] waiting for DevTools on 127.0.0.1:${targetPort}`);
		const start = Date.now();
		let logged = false;
		do {
			if (await devToolsIsOpen(targetPort)) {
				console.log(`[eb] DevTools ready on 127.0.0.1:${targetPort}`);
				return;
			}
			if (!logged && Date.now() - start > 8000) {
				await logDevToolsState(targetPort);
				logged = true;
			}
			await new Promise((resolve) => setTimeout(resolve, 1000));
		} while (Date.now() - start < timeoutMs);
		await logDevToolsState(targetPort);
		throw new Error(
			`OpenFin devtools port ${targetPort} did not become available within ${timeoutMs / 1000}s`
		);
	};
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

	let registryCleanup: RegistryCleanup | undefined;
	if (process.platform === "win32") {
		registryCleanup = await setRvmRuntimeArgs(devToolsPort);
		installDevToolsDiagnostic(devToolsPort);
	} else {
		console.log("[eb] using the stock HERE Automation RVM launcher");
	}

	process.chdir(suiteDir);
	const { run } = require("@openfin/automation-cli") as {
		run: (argv: string[]) => Promise<{ exitCode: number }>;
	};
	let exitCode = 1;
	try {
		const result = await run([
			process.execPath,
			"here-automation",
			"eb/**/*.spec.ts",
			"--config",
			path.join("eb", "here-automation.eb.config.json")
		]);
		exitCode = result.exitCode;
	} finally {
		if (registryCleanup) {
			await registryCleanup.close();
		}
	}
	process.exit(exitCode);
}

main().catch((err: unknown) => {
	console.error(err);
	process.exit(1);
});
