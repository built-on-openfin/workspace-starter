const { execSync } = require('child_process');
const fg = require('fast-glob');
const fs = require('fs-extra');
const replace = require('replace-in-file');
const yargs = require('yargs');
const packageJson = require('../package.json');

const DEFAULT_PORT = '8080';
const DEFAULT_FOLDER = 'workspace-starter';
const DEFAULT_PATH = 'workspace';
const ENV_NAME = 'PKG_HOWTOS';

const URLBaseMap = new Map([
	['github', 'https://built-on-openfin.github.io'],
	['aws', 'https://samples.openfin.co']
]);

const args = yargs(process.argv.slice(2))
	.usage('$0 [args]')
	.env(ENV_NAME)
	.option('l', {
		alias: 'location',
		choices: Array.from(URLBaseMap.keys()),
		default: 'github',
		type: 'string',
		description: 'Publish location for which the package(s) should be adapted.'
	})
	.option('p', {
		alias: 'path',
		default: '',
		type: 'string',
		description: `Path under which the ${ENV_NAME.replace(
			'PKG_',
			''
		).toLowerCase()} should be placed in the publish location.`
	})
	.options('legacy', {
		default: false,
		type: 'boolean',
		description: "Package for github in the 'public/' folder."
	})
	.help()
	.alias('help', 'h').argv;

/**
 * Package the items.
 * @param cliArgs The CLI arguments.
 */
function packageItems(cliArgs) {
	let publishDir = `public-${cliArgs.location}`;

	if (cliArgs.legacy) {
		publishDir = 'public';
		cliArgs.location = 'github';
		cliArgs.l = cliArgs.location;
	}

	const baseURL = URLBaseMap.get(cliArgs.location);
	let hostFolder = cliArgs.path || `${DEFAULT_PATH}/v${packageJson.version}`;

	if (packageJson.packageCustomFolder !== undefined && packageJson.packageCustomFolder !== '') {
		hostFolder = packageJson.packageCustomFolder;
	}

	// Make a publish location specific copy to allow multiple package runs
	// for different locations.
	fs.rmSync(publishDir, { recursive: true, force: true });

	let workspaces = fg.sync(packageJson.workspaces, { onlyDirectories: true });
	if (packageJson.packageExclude) {
		workspaces = workspaces.filter((item) => !packageJson.packageExclude.includes(item));
	}

	for (const workspace of workspaces) {
		let item = workspace.split('/')[1];

		if (cliArgs.legacy) {
			execSync('npm run build-client', {
				cwd: workspace,
				stdio: 'inherit'
			});
		}

		const sourceDir = [workspace, 'public'].join('/');
		let targetDir;

		if (fs.existsSync(sourceDir)) {
			const parts = sourceDir.split('/');
			if (parts.length === 4) {
				item += `-${parts[2]}`;
			}
			targetDir = [publishDir, item].join('/');
			fs.copySync(sourceDir, targetDir);
		}

		try {
			const workspaceUrl = [baseURL, DEFAULT_FOLDER, hostFolder, workspace.replace('how-to/', '')]
				.filter(Boolean)
				.join('/');
			const commonUrl = [baseURL, DEFAULT_FOLDER, hostFolder, 'common'].filter(Boolean).join('/');
			const commonOptions = [
				{
					files: [`${targetDir}/**/*.json`, `${targetDir}/**/*.js`],
					from: new RegExp(`http://localhost:${DEFAULT_PORT}/common`, 'g'),
					to: commonUrl
				},
				{
					files: [`${targetDir}/**/*.json`, `${targetDir}/**/*.js`],
					from: new RegExp(`http://localhost:${DEFAULT_PORT}`, 'g'),
					to: workspaceUrl
				},
				{
					files: `${targetDir}/**/*.html`,
					from: /(src|href)="\/common/g,
					to: `$1="${commonUrl}`
				}
			];

			for (const common of commonOptions) {
				const replaceResults = replace.sync(common);
				console.log('Replacement results for:', replaceResults);
				console.log(`Workspace URLs replaced with: ${workspaceUrl}`);
				console.log(`Common URLs replaced with: ${commonUrl}`);
			}

			const rootUrl = [baseURL, DEFAULT_FOLDER, hostFolder, item].filter(Boolean).join('/');
			const options = {
				files: `${targetDir}/**/*.json`,
				from: new RegExp(`http://localhost:${DEFAULT_PORT}`, 'g'),
				to: rootUrl
			};

			const results = replace.sync(options);
			console.log('Replacement results:', results);
			console.log(`URLs replaced with: ${rootUrl}`);
		} catch (error) {
			console.error('Error occurred:', error);
		}
	}
	console.log(`Packages prepared for publishing in: ${publishDir}/`);
}

packageItems(args);
