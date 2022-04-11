import { exec } from "child_process";
import { platform as getPlatform } from "os";

console.log("Kill all requested");
const platform = getPlatform();
console.log("Platform: " + platform);
const isWindows = /^win/.test(platform);
console.log("Is windows: " + isWindows);
const cmd = isWindows ? `(cmd.exe /c taskkill /F /IM OpenFin.exe /T || true) && (cmd.exe /c taskkill /F /IM OpenFinRVM.exe /T || true)` : `pkill -9 OpenFin`;
console.log("Command: " + cmd);
exec(cmd, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
}); 