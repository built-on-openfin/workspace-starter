import {
	downloadOpenFinRVM,
	getApplicationFolder,
	isWindows,
	quoteShellArg,
	sleep
} from "@openfin/automation-helpers";
import { execFile, spawn } from "node:child_process";
import { access } from "node:fs/promises";
import path from "node:path";
import { parseArgs, promisify } from "node:util";
import {
	listPages,
	loadManifest,
	loadSettings,
	type EnterpriseBrowserManifest,
	type PageTarget
} from "../environment.ts";

/**
 * Start Enterprise Browser with remote debugging on the suite's DevTools port, so that
 * `npm test` can attach to it. Launches through the RVM as a `fins://` link would, so an
 * installed browser reuses its existing HERE ID sign-in. Nothing is killed: if the browser is
 * already running without the port, the RVM would hand the launch to that instance and the
 * port would never open, so the script asks for it to be quit first.
 *
 * `--devToolsPort <number>` overrides cli.devToolsPort, as it does for `npm test`.
 */

/**
 * List the pages on the DevTools port.
 * @param port The DevTools port.
 * @returns The pages, or undefined if nothing answers on the port.
 */
async function tryListPages(port: number): Promise<PageTarget[] | undefined> {
	try {
		return await listPages(port);
	} catch {
		return undefined;
	}
}

/**
 * Is the platform provider from the manifest among the pages.
 * @param pages The pages, or undefined if nothing answers on the port.
 * @param providerUrl The provider url from the manifest.
 * @returns True if the provider page is loaded.
 */
function hasProvider(pages: PageTarget[] | undefined, providerUrl: string): boolean {
	return pages?.some((page) => page.url.split(/[#?]/)[0] === providerUrl) ?? false;
}

/**
 * Does the manifest turn on storage encryption, which stops recent runtimes opening a
 * DevTools port.
 * @param manifest The manifest.
 * @returns True if the runtime arguments include --storage-encryption=on.
 */
function hasStorageEncryption(manifest: EnterpriseBrowserManifest): boolean {
	return /(^|\s)--storage-encryption=on(\s|$)/.test(manifest.runtime?.arguments ?? "");
}

/**
 * The RVM executable. Run directly rather than through `open` on macOS, which ignores the
 * arguments when the RVM is already running.
 * @returns The path to the RVM executable.
 */
function rvmExecutable(): string {
	return isWindows()
		? path.join(getApplicationFolder(), "OpenFin", "OpenFinRVM.exe")
		: path.join(getApplicationFolder(), "OpenFinRVM.app", "Contents", "MacOS", "OpenFinRVM");
}

/**
 * Is a runtime already running the manifest. The runtime is started with
 * `--startup-url=<manifest>`, whichever executable hosts it.
 * @param manifestUrl The manifest url.
 * @returns True if it is running, false if not or if the process list cannot be read.
 */
async function isManifestRunning(manifestUrl: string): Promise<boolean> {
	const [command, args] = isWindows()
		? [
				"powershell.exe",
				[
					"-NoProfile",
					"-NonInteractive",
					"-Command",
					"Get-CimInstance Win32_Process | ForEach-Object { $_.CommandLine }"
				]
			]
		: ["ps", ["-axww", "-o", "args="]];
	try {
		const { stdout } = await promisify(execFile)(command, args, { maxBuffer: 16 * 1024 * 1024 });
		return stdout.split(/\r?\n/).some((line) => line.includes("--startup-url") && line.includes(manifestUrl));
	} catch {
		return false;
	}
}

/**
 * Launch Enterprise Browser and wait for its provider to load on the DevTools port.
 * @throws If the browser cannot be launched with the DevTools port open.
 */
async function main(): Promise<void> {
	const settings = await loadSettings();
	const { values } = parseArgs({ options: { devToolsPort: { type: "string" } } });
	const port = values.devToolsPort ? Number.parseInt(values.devToolsPort, 10) : settings.devToolsPort;
	console.log(`Manifest: ${settings.manifestUrl}`);
	console.log(`DevTools port: ${port}`);

	const { manifest, providerUrl } = await loadManifest(settings.manifestUrl);
	// A manifest that pins a port wins over the one passed on the command line.
	if (manifest.devtools_port !== undefined && manifest.devtools_port !== port) {
		throw new Error(
			`The manifest pins devtools_port ${manifest.devtools_port}. Set cli.devToolsPort to ${manifest.devtools_port} in here-automation.config.json.`
		);
	}

	const existing = await tryListPages(port);
	if (hasProvider(existing, providerUrl)) {
		console.log("Enterprise Browser is already running on that port.");
		return;
	}
	if (existing) {
		throw new Error(
			`Another application is using DevTools port ${port}. Close it or change cli.devToolsPort.`
		);
	}
	if (await isManifestRunning(settings.manifestUrl)) {
		throw new Error(
			"Enterprise Browser is already running without remote debugging. Quit it from its menu, then run this again."
		);
	}

	const rvm = rvmExecutable();
	try {
		await access(rvm);
	} catch {
		await downloadOpenFinRVM(settings.manifestUrl);
	}

	console.log("Launching Enterprise Browser...");
	// The same command line launchOpenFinRVM builds for the CLI, through a shell, so the RVM
	// receives --runtime-arguments quoted exactly as it does there.
	const command = [
		quoteShellArg(rvm),
		`--config=${quoteShellArg(settings.manifestUrl)}`,
		`--runtime-arguments="--remote-debugging-port=${port} --enable-automation"`
	].join(" ");
	spawn(command, { shell: true, detached: true, stdio: "ignore", windowsHide: true }).unref();

	const launchTimeoutMs = settings.launchTimeoutSeconds * 1000;
	const deadline = Date.now() + launchTimeoutMs;
	let pages: PageTarget[] | undefined;
	do {
		await sleep(1000);
		pages = await tryListPages(port);
	} while (!hasProvider(pages, providerUrl) && Date.now() < deadline);

	if (!pages) {
		const advice = [`DevTools port ${port} did not open within ${settings.launchTimeoutSeconds}s.`];
		if (hasStorageEncryption(manifest)) {
			advice.push(
				`The manifest runs runtime ${manifest.runtime?.version} with --storage-encryption=on. From runtime 45.150.200, an official runtime refuses remote debugging while storage encryption is on (its debug.log records "remote-debugging-refused"), and no switch overrides it. Use a manifest without --storage-encryption, or an earlier runtime.`
			);
		}
		throw new Error(advice.join("\n"));
	}
	if (!hasProvider(pages, providerUrl)) {
		throw new Error(`DevTools port ${port} is open, but the provider ${providerUrl} did not load.`);
	}
	console.log("Enterprise Browser is running. Sign in if prompted, then run: npm test");
}

main().catch((err: unknown) => {
	console.error(err instanceof Error ? err.message : err);
	process.exitCode = 1;
});
