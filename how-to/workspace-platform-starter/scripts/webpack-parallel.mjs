import { spawn } from 'child_process';
import os from 'os';
import path from 'path';

/**
 * Run the process.
 * @param packageDir The directory for the package json.
 * @param configFile The config file to read.
 */
async function run(packageDir, configFile) {
	console.log('packagerDir:', packageDir);
	console.log('configFile:', configFile);

	const fullConfigFilename = path.join(packageDir, configFile);

	const configModule = await import(`file://${fullConfigFilename}`);
	console.log('numberConfigurations:', configModule.default.length);

	const chunkSize = Math.max(1, os.cpus().length / 2);
	console.log('numberCpus:', chunkSize);

	const numChunks = Math.ceil(configModule.default.length / chunkSize);

	for (let chunk = 0; chunk < numChunks; chunk++) {
		for (let i = chunk * chunkSize; i < Math.min(configModule.default.length, (chunk + 1) * chunkSize); i++) {
			spawn('npm', ['run', 'build-client-serial'], {
				stdio: 'inherit',
				env: { ...process.env, WEBPACK_CONFIG_INDEX: i },
				shell: true
			});
		}
	}
}

run(path.resolve(path.join(path.dirname(process.argv[1]), '..')), process.argv[2]);
