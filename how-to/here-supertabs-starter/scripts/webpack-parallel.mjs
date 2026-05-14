import { spawn } from 'child_process';
import os from 'os';
import path from 'path';

/**
 * Run the process.
 * @param packageDir The directory for the package json.
 * @param configFile The config file to read.
 * @param buildTarget The build target to use.
 */
async function run(packageDir, configFile, buildTarget) {
	console.log('packagerDir:', packageDir);
	console.log('configFile:', configFile);
	console.log('buildTarget:', buildTarget);
	const serialTaskTarget = `build-${buildTarget}-serial`;

	const fullConfigFilename = path.join(packageDir, configFile);

	const configModule = await import(`file://${fullConfigFilename}`);
	console.log('numberConfigurations:', configModule.default.length);

	const chunkSize = Math.max(1, os.cpus().length / 2);
	console.log('numberCpus:', chunkSize);

	const numChunks = Math.ceil(configModule.default.length / chunkSize);

	for (let chunk = 0; chunk < numChunks; chunk++) {
		let promises = [];
		for (let i = chunk * chunkSize; i < Math.min(configModule.default.length, (chunk + 1) * chunkSize); i++) {
			promises.push(
				new Promise((resolve, reject) => {
					const sp = spawn('npm', ['run', serialTaskTarget], {
						stdio: 'inherit',
						env: { ...process.env, WEBPACK_CONFIG_INDEX: i },
						shell: true
					});
					sp.on('exit', (exitCode) => {
						if (Number.parseInt(exitCode, 10) !== 0) {
							reject(new Error('run failed'));
						} else {
							resolve();
						}
					});
				})
			);
		}
		try {
			await Promise.all(promises);
			promises = [];
		} catch {
			// eslint-disable-next-line unicorn/no-process-exit
			process.exit(1);
		}
	}
}

run(path.resolve(path.join(path.dirname(process.argv[1]), '..')), process.argv[2], process.argv[3]);
