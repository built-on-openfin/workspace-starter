/**
 * This script is used to perform actions across the whole repo.
 * It is much like using the --workspaces option for npm commands,
 * but it fails fast when there is an error.
 */
import { spawn } from 'child_process';
import FastGlob from 'fast-glob';
import fs from 'fs/promises';
import path from 'path';

/**
 * Execute the process.
 */
async function run() {
	console.log('Workspaces');
	console.log('==========');
	console.log();
	console.log(`Platform: ${process.platform}`);

	if (process.argv.length <= 2) {
		throw new Error('No command specified');
	}

	const command = process.argv[2];
	console.log(`Command: ${command}`);

	const packageJson = await loadJson('package.json');

	const workspaces = await FastGlob(packageJson.workspaces, { onlyDirectories: true });

	for (const workspace of workspaces) {
		const workspacePackageJsonFilename = path.join(workspace, 'package.json');
		if (await fileExists(workspacePackageJsonFilename)) {
			const workspacePackageJson = await loadJson(workspacePackageJsonFilename);
			if (workspacePackageJson?.scripts?.[command]) {
				await runShellCmd('npm', ['run', command], workspace);
			}
		}
	}
}

/**
 * Load a JSON file.
 * @param filePath The path th load as JSON.
 * @returns The loaded JSON.
 */
async function loadJson(filePath) {
	const content = await fs.readFile(filePath, 'utf8');

	return JSON.parse(content);
}

/**
 * Run a shell app.
 * @param app The app to run in the shell.
 * @param args The args for the app.
 * @param cwd The working directory to execute the command in.
 * @returns Promise to wait for command execution to complete.
 */
async function runShellCmd(app, args, cwd) {
	return new Promise((resolve, reject) => {
		console.log(`${app} ${args.join(' ')}`);

		const osCommand = process.platform.startsWith('win') ? `${app}.cmd` : app;

		const sp = spawn(osCommand, args, {
			stdio: 'inherit',
			shell: true,
			cwd
		});

		sp.on('exit', (exitCode, signals) => {
			if (Number.parseInt(exitCode, 10) !== 0 || signals?.length) {
				reject(new Error('Run failed'));
			} else {
				resolve();
			}
		});
	});
}

/**
 * Does the specified file exist.
 * @param filename The filename to check for existence.
 * @returns True if the file exists.
 */
async function fileExists(filename) {
	try {
		const stats = await fs.stat(filename);
		return stats.isFile();
	} catch {
		return false;
	}
}

run().catch((err) => console.error(err));
