import liveServer from "live-server";
import path from "path";

const mainPath = path.join(__dirname, "..", "..", "public");
const commonPath = path.join(__dirname, "..", "..", "..", "common", "public");

console.log(`Main Path / = ${mainPath}`);
console.log(`Common Path /common = ${commonPath}`);
console.log("Root path checks both the main and common directories.");

liveServer.start({
	port: 8080,
	root: mainPath,
	mount: [["/common", commonPath]],
	ignore: ["**/*.fin.json"],
	logLevel: 10,
	noBrowser: true
});
