import fs from "fs";
import path from "path";

const targets = process.argv.slice(2);

if (targets.length === 0) {
	console.error("Usage: node scripts/clean.mjs <name> [<name> ...]");
	console.error("Example: node scripts/clean.mjs node_modules package-lock.json");
	process.exit(1);
}

const targetSet = new Set(targets);
const failed = [];
let removed = 0;

const RM_OPTIONS = {
	recursive: true,
	force: true,
	maxRetries: 10,
	retryDelay: 100
};

function removePath(fullPath) {
	try {
		fs.rmSync(fullPath, RM_OPTIONS);
		return true;
	} catch (err) {
		return err.code === "ENOENT";
	}
}

function walk(dir) {
	let entries;
	try {
		entries = fs.readdirSync(dir, { withFileTypes: true });
	} catch {
		return;
	}

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);

		if (targetSet.has(entry.name)) {
			if (removePath(fullPath)) {
				console.log(`Removed: ${fullPath}`);
				removed++;
			} else {
				console.error(`Failed to remove: ${fullPath}`);
				failed.push(fullPath);
			}
			continue;
		}

		if (entry.isDirectory() && entry.name !== ".git") {
			walk(fullPath);
		}
	}
}

walk(".");

if (failed.length > 0) {
	console.log(`\nRetrying ${failed.length} failed path(s)...`);
	const stillFailed = [];
	for (const fullPath of failed) {
		if (removePath(fullPath)) {
			console.log(`Removed: ${fullPath}`);
			removed++;
		} else {
			console.error(`Failed to remove: ${fullPath}`);
			stillFailed.push(fullPath);
		}
	}

	if (stillFailed.length > 0) {
		console.error(
			`\nDone. Removed ${removed} item(s). ${stillFailed.length} path(s) could not be removed (files may be in use):`
		);
		for (const fullPath of stillFailed) {
			console.error(`  ${fullPath}`);
		}
		process.exit(1);
	}
}

console.log(`\nDone. Removed ${removed} item(s).`);
