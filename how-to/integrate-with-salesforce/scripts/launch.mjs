/* eslint-disable unicorn/no-process-exit */
/**
 * This script will launch an OpenFin application.
 * It uses the OpenFin NodeJS adapter to launch the url specified on the command line.
 * Pressing Ctrl+C/Command+C will terminate the application.
 */
import { setDefaultResultOrder } from 'dns';
import { connect, launch } from 'openfin-adapter';

/**
 * Run the process.
 * @param manifestUrl The manifest to launch.
 */
async function run(manifestUrl) {
	try {
		let quitRequested = false;
		let quit;

		const fin = await launchFromNode(manifestUrl);

		if (fin) {
			const manifest = await fin.System.fetchManifest(manifestUrl);

			if (manifest.platform?.uuid !== undefined) {
				quit = async () => {
					try {
						if (!quitRequested) {
							quitRequested = true;
							console.log('Calling platform quit');
							const platform = fin.Platform.wrapSync({ uuid: manifest.platform.uuid });
							await platform.quit();
						}
					} catch (err) {
						console.error(err);
					}
				};
				console.log(`Wrapped target platform: ${manifest.platform.uuid}`);
			} else {
				quit = async () => {
					try {
						if (!quitRequested) {
							quitRequested = true;
							console.log('Calling application quit');
							const app = fin.Application.wrapSync({ uuid: manifest.startup_app.uuid });
							await app.quit();
						}
					} catch (err) {
						console.error(err);
					}
				};
				console.log(`Wrapped classic app: ${manifest.startup_app.uuid}`);
			}

			// do something when app is closing
			process.on('exit', async () => {
				console.log('Process exit called');
				await quit();
			});

			// catches ctrl+c event
			process.on('SIGINT', async () => {
				console.log('Ctrl + C called');
				await quit();
			});

			console.log(`You successfully connected to the manifest: ${manifestUrl}`);
			console.log(`Please wait while the sample loads.`);
			console.log();
			console.log(`If using browser use the Quit option from the main menu.`);
			console.log(`Otherwise press Ctrl + C (Windows) or Command + C (Mac) to exit and close the sample.`);
			console.log();
		}
	} catch (e) {
		console.error(`Error: Connection failed`);
		console.error(e.message);
	}
}

/**
 * Launch the manifest using the node adapter.
 * @param manifestUrl The manifest to launch.
 * @param exitMethod The method to call if the adapter connection exits.
 * @returns The fin object representing the connection.
 */
async function launchFromNode(manifestUrl, exitMethod) {
	try {
		console.log(`Launching manifest...`);
		console.log();

		const port = await launch({ manifestUrl });

		// We will use the port to connect from Node to determine when OpenFin exists.
		const fin = await connect({
			uuid: `dev-connection-${Date.now()}`, // Supply an addressable Id for the connection
			address: `ws://127.0.0.1:${port}`, // Connect to the given port.
			nonPersistent: true // We want OpenFin to exit as our application exists.
		});

		// Once OpenFin exits we shut down the process.
		fin.once('disconnected', () => {
			console.log('Platform disconnected');
			console.log('Exiting process');
			process.exit();
		});

		return fin;
	} catch (e) {
		console.error('Error: Failed launching manifest');
		console.error(e.message);
		if (e.message.includes('Could not locate')) {
			console.error('Is the web server running and the manifest JSON valid ?');
		}
	}
}

console.log('Launch Manifest');
console.log('===============');
console.log();
console.log(`Platform: ${process.platform}`);

const launchArgs = process.argv.slice(2);
const manifest = launchArgs.length > 0 ? launchArgs[0] : 'http://localhost:8080/manifest.fin.json';
console.log(`Manifest: ${manifest}`);

try {
	setDefaultResultOrder('ipv4first');
} catch {
	// Early versions of node do not support this method, but those earlier versions
	// also do not have the same issue with interface ordering, so it doesn't matter
	// that it hasn't been called.
}

run(manifest).catch((err) => console.error(err));
