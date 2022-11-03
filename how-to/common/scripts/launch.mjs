import chokidar from 'chokidar';
import { connect, launch } from 'openfin-adapter';
import path from 'path';

async function launchFromNode(manifestUrl, exitMethod) {
	try {
		console.log(`Launching manifest: ${manifestUrl}`);

		const port = await launch({ manifestUrl });

		// We will use the port to connect from Node to determine when OpenFin exists.
		const fin = await connect({
			uuid: `dev-connection-${Date.now()}`, // Supply an addressable Id for the connection
			address: `ws://127.0.0.1:${port}`, // Connect to the given port.
			nonPersistent: true // We want OpenFin to exit as our application exists.
		});

		// Once OpenFin exits we shut down the process.
		fin.once('disconnected', exitMethod);
		return fin;
	} catch (e) {
		throw new Error(`Error: \n${e}`);
	}
}

async function run(manifestUrl, manifestFiles) {
	try {
		let quitRequested = false;
		let restartRequested = false;
		let quit;

		const fin = await launchFromNode(manifestUrl, () => {
			console.log('Disconnected');
			if (!restartRequested) {
				console.log('Exiting');
				// eslint-disable-next-line unicorn/no-process-exit
				process.exit();
			}
		});

		const manifest = await fin.System.fetchManifest(manifestUrl);

		if (manifest.platform?.uuid !== undefined) {
			quit = async () => {
				try {
					if (!quitRequested) {
						quitRequested = true;
						console.log('Platform quit');
						const platform = fin.Platform.wrapSync({ uuid: manifest.platform.uuid });
						await platform.quit();
					}
				} catch {}
			};
			console.log(`Wrapped target platform: ${manifest.platform.uuid}`);
		} else {
			quit = async () => {
				try {
					if (!quitRequested) {
						quitRequested = true;
						console.log('App quit');
						const app = fin.Application.wrapSync({ uuid: manifest.startup_app.uuid });
						await app.quit();
					}
				} catch {}
			};
			console.log(`Wrapped classic app: ${manifest.startup_app.uuid}`);
		}

		// do something when app is closing
		process.on('exit', async () => {
			console.log('Exit called');
			await quit();
		});

		// catches ctrl+c event
		process.on('SIGINT', async () => {
			console.log('Ctrl + C called');
			await quit();
			process.exit();
		});

		// Monitor any manifest files for changes, and relaunch if changed
		if (manifestFiles) {
			console.log('Watch Files', manifestFiles);
			chokidar.watch(manifestFiles).once('change', async () => {
				console.log('Manifest changed, restarting');
				restartRequested = true;
				await quit();

				console.log('Restart platform');
				process.removeAllListeners();
				await run(manifestUrl, manifestFiles);
				restartRequested = false;
			});
		}
		console.log(`You successfully connected to the manifest: ${manifestUrl}`);
		console.log(`Please wait while the sample loads.`);
		console.log(`If using browser use the Quit option from the main menu.`);
		console.log(`Otherwise press Ctrl + C (Windows) or Command + C (Mac) to exit and close the sample.`);
	} catch (e) {
		throw new Error(`Error connecting: \n${e}`);
	}
}

(async () => {
	const launchArgs = process.argv.slice(2);

	let manifestUrl = 'http://localhost:8080/manifest.fin.json';
	let manifestFiles;
	let delayStartup;

	if (launchArgs.length > 0) {
		manifestUrl = launchArgs[0];
	}

	if (launchArgs.length > 1) {
		// If we have manifest files to watch we are in dev mode, so we perform a
		// delayed startup to allow the live server to startup, to serve the manifest
		manifestFiles = path.resolve(path.join(process.env.INIT_CWD, launchArgs[1]));
		delayStartup = 2000;
	}

	setTimeout(async () => {
		await run(manifestUrl, manifestFiles);
	}, delayStartup ?? 0);
})();
