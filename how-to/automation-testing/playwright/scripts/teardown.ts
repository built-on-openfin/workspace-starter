import { exec } from "child_process";

export default async function globalTeardown() {
	console.log("Kill All OpenFin Tasks");
	console.log("======================");
	console.log();

	console.log(`Platform: ${process.platform}`);

	const isWindows = process.platform.startsWith("win");
	console.log("Running on Windows:", isWindows);

	const cmd = isWindows
		? `cmd.exe /c taskkill /F /IM OpenFin.exe /T & cmd.exe /c taskkill /F /IM OpenFinRVM.exe /T`
		: `pkill -9 OpenFin`;

	console.log();
	console.log("Command:", cmd);
	console.log();

	exec(cmd, (error, stdout, stderr) => {
		if (error) {
			console.log(error.message);
			return;
		}
		if (stderr) {
			console.log(stderr);
			return;
		}
		console.log(stdout);
	});
}
