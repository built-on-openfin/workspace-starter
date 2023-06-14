import * as fs from "fs/promises";
import path from "path";

console.log('Generate Module');
console.log('===============');
console.log();

const TEMPLATES_ROOT = path.resolve(path.join("./templates/src"));
const MODULES_ROOT = path.resolve(path.join("./client/src/modules"));
const WEBPACK_CONFIG = path.resolve(path.join("./client/webpack.config.js"));

const MODULE_TYPES = ["analytics", "actions", "auth", "conditions", "endpoint", "initOptions", "integrations", "lifecycle", "log", "menus"];

const launchArgs = process.argv.slice(2);

const argModuleType = launchArgs[0];
const argModuleName = launchArgs[1];
const invalidModuleType = argModuleType && !MODULE_TYPES.includes(argModuleType);

if (launchArgs.length < 2 || launchArgs[0] === "--help" || invalidModuleType) {
	console.log("generate-module <type> <moduleName>");
	console.log("   type:");
	for (const mType of MODULE_TYPES) {
		console.log(`         ${mType}`);
	}
	console.log("   moduleName: Title case name for module");
	console.log();
	console.log("e.g. generate-module log 'My Logger'");
	console.log()
}

if (launchArgs.length < 2) {
	console.error("Error: Not enough params");
} else if (invalidModuleType) {
	console.error("Error: Invalid module type", argModuleType);
} else {
	console.log("Modules Root:", MODULES_ROOT);
	console.log("Templates Root:", TEMPLATES_ROOT);
	console.log("WebPack Config:", WEBPACK_CONFIG);
	console.log("Module Type:", argModuleType)
	console.log("Module Name:", argModuleName);

	generateModule(argModuleType, argModuleName)
		.catch((err) => console.error(err));
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
	return input
		.split(" ")
		.join('-')
		.toLowerCase();
}

/**
 * Convert a title case string to pascal case.
 * @param input The input name to convert.
 * @returns The name in camel case.
 */
function titleCaseToPascalCase(input) {
	return input
		.split(" ")
		.map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
		.join("");
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
	const moduleOutputDir = path.join(MODULES_ROOT, moduleType, kebabName);

	console.log();
	console.log("Module Output Directory", moduleOutputDir);
	console.log();

	const dirExists = await directoryExists(moduleOutputDir);

	if (dirExists) {
		console.error("Error: Module already exists at", moduleOutputDir);
		return;
	}
	console.log();

	console.log("Creating directory", moduleOutputDir);
	await fs.mkdir(moduleOutputDir, { recursive: true });

	const files = ["index.ts", `${kebabType}.ts`, "shapes.ts"];

	for (const file of files) {
		const templateFilename = path.join(TEMPLATES_ROOT, kebabType, file);
		console.log("Processing template file", templateFilename);
		let content = await fs.readFile(templateFilename, "utf8")

		content = content.replace(new RegExp(`Example${pascalType}`, "g"), pascalName);
		content = content.replace(new RegExp(`example ${titleType.toLowerCase()}`, "g"), `${moduleNameTitleCase.toLowerCase()} ${titleType.toLowerCase()}`);

		const outputFilename = path.join(moduleOutputDir, file);
		console.log("Storing output", outputFilename);

		await fs.writeFile(outputFilename, content);
		console.log();
	}

	const webPackConfig = await fs.readFile(WEBPACK_CONFIG, "utf8");
	// eslint-disable-next-line no-div-regex
	const entriesRegEx = /= \[([\S\s]*)];/;
	let entries = entriesRegEx.exec(webPackConfig)[1].trim();
	entries += `,
	{
		entry: './${path.relative(".", path.join(moduleOutputDir, "index.ts")).replace(/\\/g, "/")}',
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
			extensions: ['.tsx', '.ts', '.js']
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

	await fs.writeFile(WEBPACK_CONFIG, webPackConfig.replace(entriesRegEx, `= [${entries}];`), "utf8");
}
