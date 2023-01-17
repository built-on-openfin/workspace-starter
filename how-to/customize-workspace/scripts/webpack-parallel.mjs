import { spawn } from 'child_process';
import path from 'path';

async function run(packageDir, configFile) {
	console.log('packagerDir:', packageDir);
	console.log('configFile:', configFile);

	const fullConfigFilename = path.join(packageDir, configFile);

	const configModule = await import(`file://${fullConfigFilename}`);
	console.log('numberConfigurations:', configModule.default.length);

	for (let i = 0; i < configModule.default.length; i++) {
		spawn('npm', ['run', 'build-client-serial'], {
			stdio: 'inherit',
			env: { ...process.env, WEBPACK_CONFIG_INDEX: i },
			shell: true
		});
	}
}

run(path.resolve(path.join(path.dirname(process.argv[1]), '..')), process.argv[2]);
