import * as fs from 'fs/promises';
import path from 'path';

console.log('Generate Module');
console.log('===============');
console.log();

const TEMPLATES_ROOT = path.resolve(path.join('./templates/src'));
const MODULES_ROOT = path.resolve(path.join('./client/src/modules'));
const WEBPACK_CONFIG_FILE = path.resolve(path.join('./client/webpack.config.js'));
const MANIFEST_FILE = path.resolve(path.join('./public/manifest.fin.json'));

const MODULE_TYPES = [
	'analytics',
	'actions',
	'auth',
	'conditions',
	'endpoint',
	'initOptions',
	'integrations',
	'lifecycle',
	'log',
	'menus'
];
const MANIFEST_TYPE_MAPPING = {
	analytics: 'analyticsProvider',
	actions: 'actionsProvider',
	auth: 'authProvider',
	conditions: 'conditionsProvider',
	endpoint: 'endpointProvider',
	initOptions: 'initOptionsProvider',
	integrations: 'integrationProvider',
	lifecycle: 'lifecycleProvider',
	log: 'loggerProvider',
	menus: 'menusProvider'
};

const launchArgs = process.argv.slice(2);

const argModuleType = launchArgs[0];
const argModuleName = launchArgs[1];
const invalidModuleType = argModuleType && !MODULE_TYPES.includes(argModuleType);

if (launchArgs.length < 2 || launchArgs[0] === '--help' || invalidModuleType) {
	console.log('generate-module <type> <moduleName>');
	console.log('   type:');
	for (const mType of MODULE_TYPES) {
		console.log(`         ${mType}`);
	}
	console.log('   moduleName: Title case name for module');
	console.log();
	console.log("e.g. generate-module log 'My Logger'");
	console.log();
}

if (launchArgs.length < 2) {
	console.error('Error: Not enough params');
} else if (invalidModuleType) {
	console.error('Error: Invalid module type', argModuleType);
} else {
	console.log('Modules Root:', MODULES_ROOT);
	console.log('Templates Root:', TEMPLATES_ROOT);
	console.log('WebPack Config:', WEBPACK_CONFIG_FILE);
	console.log('Manifest:', MANIFEST_FILE);
	console.log();
	console.log('Module Type:', argModuleType);
	console.log('Module Name:', argModuleName);

	generateModule(argModuleType, argModuleName).catch((err) => console.error(err));
}

/**
 * Does the specified directory exist.
 * @param directory The directory to check for existence.
 * @returns True if the directory exists.
 */
async function directoryExists(directory) {
	try {
		const stats = await fs.stat(directory);
		return stats.isDirectory();
	} catch {
		return false;
	}
}

/**
 * Convert a title case string to kebab case.
 * @param input The input name to convert.
 * @returns The name in kebab case.
 */
function titleCaseToKebabCase(input) {
	const words = input.split(' ');
	return words.join('-').toLowerCase();
}

/**
 * Convert a title case string to pascal case.
 * @param input The input name to convert.
 * @returns The name in camel case.
 */
function titleCaseToPascalCase(input) {
	const words = input.split(' ');
	return words.map((word) => `${word[0].toUpperCase()}${word.slice(1)}`).join('');
}

/**
 * Split an input string into words.
 * @param input The input string to split.
 * @returns The input in title case format.
 */
function camelCaseToTitleCase(input) {
	return input.replace(/([a-z])([A-Z])/g, '$1 $2');
}

/**
 * Process the generation request.
 * @param moduleType The type of module to create.
 * @param moduleNameTitleCase The title case name of the module.
 */
async function generateModule(moduleType, moduleNameTitleCase) {
	const titleType = camelCaseToTitleCase(moduleType);
	const pascalType = titleCaseToPascalCase(titleType);
	const kebabType = titleCaseToKebabCase(titleType);
	const kebabName = titleCaseToKebabCase(moduleNameTitleCase);
	const pascalName = titleCaseToPascalCase(moduleNameTitleCase);
	const moduleOutputDir = path.join(MODULES_ROOT, kebabType, kebabName);

	console.log();
	console.log('Module Output Directory', moduleOutputDir);
	console.log();

	const dirExists = await directoryExists(moduleOutputDir);
	if (dirExists) {
		console.error('Error: Module already exists at', moduleOutputDir);
		return;
	}

	console.log('Creating directory', moduleOutputDir);
	await fs.mkdir(moduleOutputDir, { recursive: true });

	const files = ['index.ts', `${kebabType}.ts`, 'shapes.ts'];

	for (const file of files) {
		const templateFilename = path.join(TEMPLATES_ROOT, kebabType, file);
		console.log('Processing template file', templateFilename);
		let content = await fs.readFile(templateFilename, 'utf8');

		content = content.replace(new RegExp(`Example${pascalType}`, 'g'), pascalName);
		content = content.replace(
			new RegExp(`example ${titleType.toLowerCase()}`, 'g'),
			`${moduleNameTitleCase.toLowerCase()} ${titleType.toLowerCase()}`
		);

		const outputFilename = path.join(moduleOutputDir, file);
		console.log('Storing output', outputFilename);

		await fs.writeFile(outputFilename, content);
		console.log();
	}

	await addWebPackEntry(moduleOutputDir, kebabType, kebabName);

	await addManifestEntry(moduleType, moduleNameTitleCase, kebabType, kebabName);
}

/**
 * Add an entry to webpack for the new module.
 * @param moduleOutputDir The directory where the module has been created.
 * @param kebabType The type of the module in kebab format.
 * @param kebabName The name of the module in kebab format.
 */
async function addWebPackEntry(moduleOutputDir, kebabType, kebabName) {
	console.log('Adding WebPack Entry to', WEBPACK_CONFIG_FILE);
	console.log();
	const webPackConfig = await fs.readFile(WEBPACK_CONFIG_FILE, 'utf8');
	// eslint-disable-next-line no-div-regex
	const entriesRegEx = /= \[([\S\s]*)];/;
	let entries = entriesRegEx.exec(webPackConfig)[1].trim();
	entries += `,
	{
		entry: './${path.relative('.', path.join(moduleOutputDir, 'index.ts')).replace(/\\/g, '/')}',
		devtool: 'inline-source-map',
		module: {
			rules: [
				{
					test: /\\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/
				}
			]
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
			alias
		},
		externals: { fin: 'fin' },
		output: {
			filename: '${kebabName}.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', '${kebabType}')
		},
		experiments: {
			outputModule: true
		}
	}
`;

	await fs.writeFile(WEBPACK_CONFIG_FILE, webPackConfig.replace(entriesRegEx, `= [\n\t${entries}];`), 'utf8');
}

/**
 * Add an entry to the manifest for the new module.
 * @param moduleType The type of module to create.
 * @param moduleNameTitleCase The title case name of the module.
 * @param kebabType The type of the module in kebab format.
 * @param kebabName The name of the module in kebab format.
 */
async function addManifestEntry(moduleType, moduleNameTitleCase, kebabType, kebabName) {
	console.log('Adding Manifest Entry to', MANIFEST_FILE);
	console.log();
	const jsonContent = await fs.readFile(MANIFEST_FILE, 'utf8');

	const manifest = JSON.parse(jsonContent);

	if (!manifest.customSettings) {
		manifest.customSettings = {};
	}

	const settingsType = MANIFEST_TYPE_MAPPING[moduleType];

	if (!manifest.customSettings[settingsType]) {
		manifest.customSettings[settingsType] = {};
	}

	if (!manifest.customSettings[settingsType].modules) {
		manifest.customSettings[settingsType].modules = [];
	}

	console.log('Adding module entry to', `manifest.customSettings.${settingsType}.modules`);

	manifest.customSettings[settingsType].modules.push({
		id: kebabName,
		icon: 'http://localhost:8080/favicon.ico',
		title: moduleNameTitleCase,
		description: moduleNameTitleCase,
		enabled: true,
		url: `http://localhost:8080/js/modules/${kebabType}/${kebabName}.bundle.js`,
		data: {
			exampleProp: 'value'
		}
	});

	await fs.writeFile(MANIFEST_FILE, JSON.stringify(manifest, undefined, '\t'), 'utf8');
}
