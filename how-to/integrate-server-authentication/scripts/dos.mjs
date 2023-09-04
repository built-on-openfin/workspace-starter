/* eslint-disable unicorn/no-process-exit */
/**
 * This script will read the registry to see if there is a setting for DOS (Desktop Owner Settings)
 * If there is you can either abort or overwrite it with the value served from the local dev server.
 */
import { spawnSync } from 'child_process';

// The common location for the DOS settings when running the local dev examples
const DOS_URL = 'http://localhost:8080/common/dos.json';

/**
 * Run the process.
 */
async function run() {
	console.log('Configure DOS');
	console.log('=============');
	console.log();
	console.log(`Platform: ${process.platform}`);

	/**
	 * Wait for a keypress.
	 * @param keyCode The key code to look for.
	 * @returns Nothing.
	 */
	function waitForKey(keyCode) {
		process.stdin.setRawMode(true);
		return new Promise((resolve) => {
			process.stdin.on('data', (chunk) => {
				if (chunk[0] === keyCode) {
					console.error();
					console.error('Set DOS cancelled');
					process.exit(1);
				}
				process.stdin.setRawMode(false);
				resolve();
			});
		});
	}

	if (process.platform === 'win32') {
		const res = spawnSync(`reg query "HKCU\\Software\\OpenFin\\RVM\\Settings" -v "DesktopOwnerSettings"`, {
			shell: true
		});
		const output = res.output.toString();
		if (!output.includes('ERROR')) {
			console.warn();
			console.warn('Warning: You already have a desktop owner settings value as shown below.');
			console.warn();
			const valIndex = output.indexOf('REG_SZ');
			const valIndexEnd = output.indexOf('\n', valIndex);
			console.warn('DOS:', output.slice(valIndex + 6, valIndexEnd).trim());
			console.warn();
			console.warn('If you choose to overwrite this value, you will need to restore it later.');
			console.warn('More Information: https://developers.openfin.co/of-docs/docs/desktop-owner-settings');
			console.warn();
			console.warn(
				'To cancel this process, press Ctrl + C (Windows) or Command + C (Mac) to exit, or any other key to continue'
			);
			await waitForKey(3);
		}
		console.log();
		console.log('Setting DOS to', DOS_URL);
		console.log();
		spawnSync(
			`reg add "HKCU\\Software\\OpenFin\\RVM\\Settings" -f -v "DesktopOwnerSettings" -d "${DOS_URL}"`,
			{ shell: true }
		);
		process.exit(0);
	} else {
		console.error('DOS settings are not available on your platform');
	}
}

run().catch((err) => console.error(err));
