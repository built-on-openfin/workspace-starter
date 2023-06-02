/**
 * This script is used to update this example with some of the common source files
 * shared across all the examples. The source of all the files is the customize-workspace
 * example project.
 */
import FastGlob from 'fast-glob';
import fs from 'fs/promises';
import path from 'path';

/**
 * Execute the process.
 */
async function run() {
	console.log('Common Update');
	console.log('=============');
	console.log();
	console.log(`Platform: ${process.platform}`);
	console.log();

	const commonFilesRaw = await fs.readFile('./scripts/common-files.json', 'utf8');
	const commonFiles = JSON.parse(commonFilesRaw);

	for (const commonFileGroup of commonFiles) {
		console.log();
		console.log('Processing', commonFileGroup.name);
		console.log();

		for (const fileGroup of commonFileGroup.fileGroups) {
			for (const fileSpec of fileGroup.files) {
				let expandedFiles = [];
				if (fileSpec.includes('*')) {
					const specFolder = path.join(fileGroup.srcFolder, fileSpec).replace(/\\/g, '/');
					const specFiles = await FastGlob(specFolder);
					expandedFiles = specFiles.map((f) => path.relative(fileGroup.srcFolder, f));
				} else {
					expandedFiles = [fileSpec];
				}

				for (const expandedFile of expandedFiles) {
					const src = path.resolve(path.join(fileGroup.srcFolder, expandedFile));
					const dest = path.resolve(path.join('.', fileGroup.destFolder, expandedFile));
					console.log('Copying', src);
					console.log('  To', dest);

					try {
						await fs.mkdir(path.dirname(dest), { recursive: true });
					} catch {}

					await fs.copyFile(src, dest);
				}
			}
		}
	}
}

run().catch((err) => console.error(err));
