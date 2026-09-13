import fsPromises from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const {
	OpenFinSystem,
	NodeWebDriver,
	fetchJson,
	loadConfig,
	loadManifest,
	resolveRuntimeVersion,
	getChromeDriver,
	startChromeDriver,
	launchOpenFinRVM,
	waitForChromeDriverStopped,
	waitForDevToolsPort,
	waitForPortFree,
	waitForProviderReady,
	closeOpenFinRVM,
	preLaunch,
	isLocalUrl,
	holdChromeDriverSession,
	killProcessByImage,
	isWindows
} = require('@openfin/automation-helpers');

const storageFolder = './storage';

// Versions and platform settings come from here-automation.config.json (single source of truth).
const configResult = await loadConfig(process.cwd());

// Manifest target: MANIFEST_URL env var > config platform.manifestUrl > local fixture default.
const manifestUrl =
	process.env.MANIFEST_URL ??
	configResult?.config?.platform?.manifestUrl ??
	'http://localhost:8080/manifest.fin.json';
const versions = configResult?.config?.versions ?? {};
const defaultRuntimeVersion = versions.runtime ?? 'stable';
const workspaceVersion = versions.workspace ?? 'stable';
const notificationsVersion = versions.notifications ?? 'stable';

const chromeDriverPort = configResult?.config?.cli?.chromeDriverPort ?? 4444;
const devToolsPort = configResult?.config?.cli?.devToolsPort ?? 9090;
const chromeDriverImage = isWindows() ? 'chromedriver.exe' : 'chromedriver';

// Pre-launch command: from config platform.preLaunch, or hardcoded default for this suite.
const fixtureStartCommand =
	configResult?.config?.platform?.preLaunch ?? 'npm run start:static --prefix ../platform-fixture';

let fixtureServer;

// @wdio/local-runner forks each spec attempt (the initial run and every specFileRetries
// retry) into its own OS process, which re-imports this config file from scratch. So
// `onPrepare` runs in the launcher process and cannot hand state to `beforeSession` or
// `before`, which run in the worker — module-level variables are not shared across that
// process boundary, and a value assigned in onPrepare reads as undefined in `before`.
//
// All runtime bring-up (manifest/version/chromedriver resolution, RVM launch, ChromeDriver
// start, readiness waits) therefore lives in beforeSession, which runs once per worker for
// the initial attempt and again for every retry. launchParams then lives in the same
// process as `before`, and a retry gets a genuinely fresh runtime rather than a new
// WebDriver session reattached to whatever the previous attempt left behind.
let launchParams;

// The DevTools endpoint answering once is not enough — a runtime that is
// about to exit still answers. Require it to keep answering across a short
// settle window so a dying runtime is caught here, where we can relaunch,
// instead of during WDIO's session creation, where we can't.
/**
 * Check the DevTools endpoint keeps answering for a settle window.
 * @param port The DevTools port.
 * @param windowMs How long the endpoint must keep answering.
 * @returns True if it answered throughout the window.
 */
async function confirmDevToolsStable(port, windowMs) {
	const end = Date.now() + windowMs;
	while (Date.now() < end) {
		try {
			await fetchJson(`http://localhost:${port}/json/version`);
		} catch {
			return false;
		}
		await new Promise((resolve) => setTimeout(resolve, 500));
	}
	return true;
}

// The runtime's browser-wide DevTools connection is unreliable in a window
// roughly 3–7 seconds after the provider reports ready. Every observed CI
// attach failure falls in that window, in one of two shapes ChromeDriver
// cannot survive (it retries internally for only ~2.5s, and WDIO does not
// put a session-creation failure through specFileRetries):
//   - the browser websocket refuses connections during the window
//     ("Browser-wide DevTools client failed to connect: ... unable to
//     connect to renderer" → "session not created"), or
//   - a session attaches just before the window and its connection drops
//     inside it ("invalid session id" on the first command, observed even on
//     the run's very first launch, so this is not old-runtime interference).
// Detect the condition directly: over the browser-wide DevTools websocket
// (ChromeDriver's own first connection), attach to every page target and
// require a Runtime.evaluate round-trip from each — the closest read-only
// emulation of what ChromeDriver needs at session creation. Retry the sweep
// until every target answers. Approaches tried and rejected:
//   - probe session via ChromeDriver AND DELETING IT: made CI worse. Probe-and-HOLD
//     is the fix used below - the value is in keeping the session, not taking it;
//   - target-list settling: detects nothing (failure occurs with a stable,
//     fully-URL'd target list);
//   - holding the browser websocket open: stays connected right through the
//     failure (only command round-trips reveal it);
//   - Browser.getVersion round-trips: stay fast through bring-up — the wedge
//     is per-target, not browser-wide.
/**
 * Attach to every DevTools page target and require a command round-trip from each.
 * @param port The DevTools port.
 * @returns True if every page target is attachable and fully loaded.
 */
async function sweepTargetsResponsive(port) {
	let info;
	try {
		info = await fetchJson(`http://localhost:${port}/json/version`);
	} catch {
		return false;
	}
	const wsUrl = info?.webSocketDebuggerUrl;
	if (!wsUrl) {
		return false;
	}
	return new Promise((resolve) => {
		const ws = new WebSocket(wsUrl);
		let nextId = 0;
		const waiters = new Map();
		let finished = false;
		/**
		 * Settle the sweep once, closing the socket.
		 * @param ok The sweep result.
		 */
		function finish(ok) {
			if (!finished) {
				finished = true;
				try {
					ws.close();
				} catch {}
				resolve(ok);
			}
		}
		const overallTimer = setTimeout(() => finish(false), 20000);
		/**
		 * Send a DevTools command and wait for its reply.
		 * @param method The DevTools method.
		 * @param params The method parameters.
		 * @param sessionId The target session to address, if any.
		 * @returns The reply, or undefined if none arrived in time.
		 */
		function send(method, params, sessionId) {
			const { promise, resolve: settle } = Promise.withResolvers();
			const msgId = ++nextId;
			const timer = setTimeout(() => {
				waiters.delete(msgId);
				settle();
			}, 4000);
			waiters.set(msgId, { res: settle, timer });
			try {
				ws.send(JSON.stringify({ id: msgId, method, params, sessionId }));
			} catch {
				clearTimeout(timer);
				waiters.delete(msgId);
				settle();
			}
			return promise;
		}
		ws.addEventListener('message', (ev) => {
			let msg;
			try {
				msg = JSON.parse(ev.data);
			} catch {
				return;
			}
			const waiter = waiters.get(msg.id);
			if (waiter) {
				clearTimeout(waiter.timer);
				waiters.delete(msg.id);
				waiter.res(msg);
			}
		});
		ws.addEventListener('close', () => finish(false));
		ws.addEventListener('error', () => finish(false));
		ws.addEventListener('open', async () => {
			const targets = await send('Target.getTargets');
			const pages = targets?.result?.targetInfos?.filter((t) => t.type === 'page');
			if (!pages || pages.length === 0) {
				return finish(false);
			}
			for (const page of pages) {
				const attached = await send('Target.attachToTarget', { targetId: page.targetId, flatten: true });
				const sessionId = attached?.result?.sessionId;
				if (!sessionId) {
					console.log(`Target not attachable yet: ${String(page.url).slice(0, 80)}`);
					return finish(false);
				}
				// Require the document to have finished loading, not just answer:
				// a mid-load (CDN-served) page wedges recurrently, so a single
				// answered command is no guarantee it stays responsive through
				// ChromeDriver's attach moments later. A fully loaded page is.
				const evaluated = await send(
					'Runtime.evaluate',
					{ expression: 'document.readyState', returnByValue: true },
					sessionId
				);
				await send('Target.detachFromTarget', { sessionId });
				if (evaluated?.result?.result?.value !== 'complete') {
					console.log(
						`Target not ready yet (${evaluated?.result?.result?.value ?? 'no response'}): ${String(page.url).slice(0, 80)}`
					);
					return finish(false);
				}
			}
			clearTimeout(overallTimer);
			finish(true);
		});
	});
}

/**
 * Sweep the DevTools targets until two consecutive sweeps are clean.
 * @param port The DevTools port.
 * @param timeoutMs How long to keep sweeping.
 * @returns True if the targets settled, false if the timeout was reached.
 */
async function waitForTargetsResponsive(port, timeoutMs) {
	const deadline = Date.now() + timeoutMs;
	let attempt = 0;
	let consecutiveClean = 0;
	do {
		attempt++;
		if (await sweepTargetsResponsive(port)) {
			consecutiveClean++;
			// One clean sweep is not enough — a still-settling runtime can wedge
			// again between the sweep and ChromeDriver's attach (observed on CI:
			// attach failed 2s after a passing sweep). Require two in a row.
			if (consecutiveClean >= 2) {
				if (attempt > 2) {
					console.log(`All DevTools targets ready after ${attempt} sweeps`);
				}
				return true;
			}
			await new Promise((resolve) => setTimeout(resolve, 1500));
		} else {
			consecutiveClean = 0;
			await new Promise((resolve) => setTimeout(resolve, 2000));
		}
	} while (Date.now() < deadline);
	console.log('Warning: DevTools targets never all ready; attaching anyway');
	return false;
}

// Take a ChromeDriver session and never release it, BEFORE the readiness gates below
// spend their ~11s. A driver's first POST /session must land before the Workspace windows
// park their renderers, or it refuses every session for the rest of its life. The gates are
// deliberately kept (they stop tests racing Workspace bring-up); holding a session means
// their delay cannot cost us the attach. holdChromeDriverSession carries the full mechanism
// and the measurements; see also §1 of docs/stability/runner-stability-and-traps.md.
//
// Nothing releases it: the runtime and driver are both torn down per spec by the next
// launchRuntime() and by onComplete, which takes the held session with them.

/**
 * Launch a fresh OpenFin runtime and ChromeDriver, retrying when the pair is not attachable.
 */
async function launchRuntime() {
	// WDIO does not put a session-creation failure through specFileRetries — a
	// worker whose attach fails is marked FAILED with no retry attempts (observed
	// on CI: dock.spec.js "✖ Failed to create a session: invalid session id"
	// 3 seconds after RUNNING, then straight on to the next spec). So any
	// recovery from an unstable runtime has to happen here, before WDIO attaches.
	const maxAttempts = 3;
	for (let attempt = 1; attempt <= maxAttempts; attempt++) {
		console.log('Removing any existing OpenFin/ChromeDriver processes');
		await closeOpenFinRVM(false);
		await killProcessByImage(chromeDriverImage, true);

		// killProcessByImage can return before the OS releases ChromeDriver's
		// listening socket, so startChromeDriver below fails to bind the port
		// ("Only one usage of each socket address" on Windows) and the whole
		// relaunch attempt aborts. This suite relaunches per spec, so it drives
		// startChromeDriver far more often than the others and is the most exposed.
		await waitForChromeDriverStopped(chromeDriverPort);

		// The previous worker's runtime can still be releasing the DevTools port
		// when this worker relaunches. If the new runtime starts while the port is
		// held it cannot bind DevTools, so the readiness checks below pass against
		// the old, dying runtime — ChromeDriver then attaches to that runtime and
		// the session dies moments later ("invalid session id" at session
		// creation). The here-automation CLI already waits for the port after
		// cleanup; this suite relaunches per spec, so it matters most here.
		await waitForPortFree(devToolsPort);

		const manifest = await loadManifest(manifestUrl, defaultRuntimeVersion);
		const resolved = await resolveRuntimeVersion(manifest.runtime.version, storageFolder, false);
		const chromeDriverPath = await getChromeDriver(resolved.chrome, storageFolder, false);

		launchParams = await launchOpenFinRVM(
			manifestUrl,
			devToolsPort,
			storageFolder,
			false,
			workspaceVersion,
			notificationsVersion
		);

		await startChromeDriver(chromeDriverPath, chromeDriverPort);
		await waitForDevToolsPort(devToolsPort);

		// Wait for the platform provider page to be a live, titled DevTools target
		// before WDIO attaches its session via debuggerAddress. Without this, ChromeDriver
		// can attach to a runtime with no drivable target (POST /session timeout) or one
		// whose fin.Workspace isn't initialised yet. Mirrors the here-automation CLI flow.
		if (manifest.platform?.providerUrl) {
			await waitForProviderReady(devToolsPort, 'provider.html');
		}

		// Take and hold the first session on this ChromeDriver NOW, before the readiness
		// gates below spend ~11s and before the Workspace windows park their renderers.
		const heldSessionId = await holdChromeDriverSession(chromeDriverPort, devToolsPort);
		if (heldSessionId) {
			if (await confirmDevToolsStable(devToolsPort, 2500)) {
				await waitForTargetsResponsive(devToolsPort, 90000);
				return;
			}
			console.log(`Runtime did not stay up after launch (attempt ${attempt} of ${maxAttempts})`);
		} else {
			// Attach is already broken for this runtime+driver pair, so the worker's session
			// would be refused too. Relaunch both rather than letting WDIO fail to create a
			// session - which it does NOT put through specFileRetries.
			console.log(`Could not hold a ChromeDriver session (attempt ${attempt} of ${maxAttempts})`);
		}
	}
	throw new Error(`OpenFin runtime did not remain available after ${maxAttempts} launch attempts`);
}

export const config = {
	// Top-level maxInstances is what serializes spec files in @wdio/cli v9. It defaults
	// to 100, so an unset value let WDIO spawn both spec files' workers concurrently.
	// With two spec files (system.spec.js, home.spec.js) that each drive a single shared
	// OpenFin runtime + ChromeDriver on a fixed port via beforeSession, that concurrency
	// meant the second worker's beforeSession tore down/relaunched the runtime out from
	// under the first, and both ChromeDriver instances raced for the same port. Pin this
	// to 1 so spec files run strictly one after another.
	maxInstances: 1,
	specs: ['./test/**/*.mjs'],
	capabilities: [
		{
			// Bounds per-capability concurrency. In @wdio/cli v9 the scheduler reads
			// `capabilities["wdio:maxInstances"] || config.maxInstancesPerCapability || 100`
			// — the plain `maxInstances` key inside a capability is ignored — so this must
			// be the namespaced `wdio:` key to have any effect. Only one capability exists
			// today (top-level maxInstances above already serializes everything); this is
			// defense-in-depth if a second capability is ever added.
			'wdio:maxInstances': 1,
			browserName: 'chrome',
			'goog:chromeOptions': {
				debuggerAddress: `localhost:${devToolsPort}`
			}
		}
	],
	services: [],
	// The OpenFin runtime + Workspace bring-up is intermittently flaky on CI in several
	// ways (session attach racing the renderer, Workspace Home not opening). The runtime
	// itself is sound — the default CLI suite passes reliably on the same runner — so re-run
	// the whole spec in a fresh session when a worker flakes rather than failing the build.
	// Bumped from 2: with two spec files now running sequentially (see maxInstances above),
	// the second worker's runtime relaunch occasionally proceeds past a "provider may not be
	// fully loaded" warning and then fails to attach a ChromeDriver session; observed this
	// exhausting 2 retries outright in local runs, so give it more headroom.
	specFileRetries: 4,
	specFileRetriesDeferred: false,
	hostname: 'localhost',
	port: chromeDriverPort,
	logLevel: 'silent',
	framework: 'mocha',
	reporters: ['spec'],
	mochaOpts: {
		ui: 'bdd',
		// Must exceed the longest per-test wait (Home open budget below). The Workspace
		// Home component is CDN-served and can take >60s to open on a cold CI runner;
		// keeping Mocha's timeout above OpenFinHome.show() lets show() return cleanly
		// instead of Mocha aborting the test with a bare "Timeout".
		timeout: 120000
	},
	onPrepare: async () => {
		// Runs once in the launcher process, before any worker is spawned. Only handles
		// setup that's genuinely shared/one-time and doesn't need to reach a worker process:
		// logging, starting the fixture platform's HTTP server, and clearing old screenshots.
		// Actually launching the OpenFin runtime happens per-attempt in beforeSession (see
		// comment above launchRuntime for why).
		console.log('Manifest Url', manifestUrl);
		if (configResult) {
			console.log('Config', configResult.configPath);
		}
		console.log('DevTools Port', devToolsPort);
		console.log('ChromeDriver Port', chromeDriverPort);

		// Start the local fixture platform when targeting a local manifest.
		// When the preLaunch command comes from the config file, run it with CWD
		// set to the config directory so relative paths resolve correctly.
		if (isLocalUrl(manifestUrl)) {
			const configDir = configResult?.configPath ? path.dirname(configResult.configPath) : undefined;
			const preLaunchCwd = configResult?.config?.platform?.preLaunch ? configDir : undefined;
			console.log('Starting local fixture platform:', fixtureStartCommand);
			fixtureServer = await preLaunch(fixtureStartCommand, manifestUrl, undefined, preLaunchCwd);
		}

		try {
			await fsPromises.rm('./reports/screenshots/', { recursive: true, force: true });
		} catch {}
	},
	// Runs in the worker process, once for the initial attempt and again for every
	// specFileRetries retry — see the comment above launchRuntime.
	beforeSession: async () => {
		await launchRuntime();
	},
	before: async (_, __, browser) => {
		globalThis.webDriver = new NodeWebDriver(browser);
		console.log('Starting Web Driver session');

		await globalThis.webDriver.startSession(
			devToolsPort,
			chromeDriverPort,
			'debug',
			'./reports/screenshots',
			launchParams.openFinRVMPath,
			{
				workspaceVersion,
				notificationsVersion
			}
		);
		console.log('Waiting for OpenFin runtime to be available...');
		await OpenFinSystem.waitForReady(60000);
		console.log('Running Tests...');
	},
	beforeTest: async (test) => {
		globalThis.automation = globalThis.automation ?? {};
		globalThis.automation.currentTestName = test.title;
	},
	onComplete: async () => {
		console.log('Closing the OpenFin runtime');
		try {
			await closeOpenFinRVM(false);
		} catch {}
		try {
			await killProcessByImage(chromeDriverImage, true);
		} catch {}

		if (fixtureServer) {
			console.log('Stopping local fixture platform');
			try {
				await fixtureServer.cleanup();
			} catch {}
		}
	}
};
