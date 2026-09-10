import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Resolve the browser static assets from the @openfin/enterprise-api package (e.g. enterprise-api/browser when main is in out/).
const mainDir = dirname(fileURLToPath(import.meta.resolve('@openfin/here-supertabs')));
const enterpriseApiPath = resolve(mainDir, './browser');

if (!existsSync(enterpriseApiPath)) {
	throw new Error(
		`Enterprise Browser static assets not found at ${enterpriseApiPath}. Ensure @openfin/here-supertabs is installed and has a browser folder (run npm install).`
	);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const enterprisePath = resolve(__dirname, 'public/platform/enterprise');
if (existsSync(enterprisePath)) {
	rmSync(enterprisePath, { recursive: true });
}
mkdirSync(enterprisePath, { recursive: true });

if (process.platform === 'win32') {
	execSync(`xcopy ${enterpriseApiPath} ${enterprisePath} /E /I /Y`, { stdio: 'inherit' });
} else {
	execSync(`cp -r ${enterpriseApiPath}/* ${enterprisePath}`, { stdio: 'inherit' });
}

console.log('Enterprise Browser static assets copied successfully');
