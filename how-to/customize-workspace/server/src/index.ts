import express from "express";
import path from "path";

const app = express();

const mainPath = path.join(__dirname, "..", "..", "public");
const commonPath = path.join(__dirname, "..", "..", "..", "common", "public");
const port = 8080;

console.log(`Main Path / = ${mainPath}`);
console.log(`Common Path /common = ${commonPath}`);
console.log("Root path checks both the main and common directories.");
app.use(express.static(mainPath));
app.use("/common", express.static(commonPath));

if (process.argv.length >= 3) {
	// There are additional command line options so add them as additional paths
	for (const additional of process.argv.slice(2)) {
		const parts = additional.split(":");
		if (parts.length === 2) {
			const additionalPath = path.join(__dirname, "..", "..", parts[1]);
			console.log(`Serving additional path /${parts[0]} pointing to ${additionalPath}`);
			app.use(`/${parts[0]}`, express.static(additionalPath));
		}
	}
}

app.listen(port, () => {
	console.log("server is listening on port", port);
});
