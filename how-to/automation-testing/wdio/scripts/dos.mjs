import { spawnSync } from 'child_process';
import os from 'os';
import path from 'path';
import fs from 'fs';

const tempDir = os.tmpdir();
const tempDosFile = path.join(tempDir, `openfin-dos-${Date.now()}.json`);

const DOS = {
	desktopSettings: {
		securedAPIDefaultPermission: 'allow',
		systemApps: {
			workspace: {
				version: '9.0.14'
			}
		}
	}
};

fs.writeFileSync(tempDosFile, JSON.stringify(DOS));

spawnSync(
	`Echo Y|reg add "HKCU\\Software\\OpenFin\\RVM\\Settings" -v "DesktopOwnerSettings" -d "file:\\\\\\${tempDosFile}"`,
	{ shell: true }
);
