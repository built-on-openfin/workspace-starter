import fs from "fs";
import path from "path";

const targets = process.argv.slice(2);

if (targets.length === 0) {
	console.error("Usage: node scripts/clean.mjs <name> [<name> ...]");
	console.error("Example: node scripts/clean.mjs node_modules package-lock.json");
	process.exit(1);
}

const targetSet = new Set(targets);
let removed = 0;

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
			fs.rmSync(fullPath, { recursive: true, force: true });
			console.log(`Removed: ${fullPath}`);
			removed++;
			continue;
		}

		if (entry.isDirectory() && entry.name !== ".git") {
			walk(fullPath);
		}
	}
}

walk(".");
console.log(`\nDone. Removed ${removed} item(s).`);
