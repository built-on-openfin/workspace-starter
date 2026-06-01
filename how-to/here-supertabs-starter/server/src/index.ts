import cors from "cors";
import express from "express";
import path from "path";
import { init as registerShareService } from "./share";
import { init as registerStorageService } from "./storage";
import { init as registerVersionService } from "./version";

const app = express();
// Disable X-Powered-By header for security
app.disable("x-powered-by");
app.use(cors({ origin: "*" }));

const mainPath = path.join(__dirname, "..", "..", "public");
const port = 8080;
const baseUrl = `http://localhost:${port}`;

console.log(`Main Path / = ${mainPath}`);
console.log("Root path checks both the main and common directories.");
app.use(express.static(mainPath));

registerShareService(app, baseUrl);
registerVersionService(app);
registerStorageService(app);

const server = app.listen(port, () => {
	console.log("server is listening on port", port);
});

server.on("error", (err: NodeJS.ErrnoException) => {
	if (err.code === "EADDRINUSE") {
		console.error(
			`Port ${port} is already in use. Stop the other process (e.g. an earlier npm start) or free the port, then try again.\n` +
				`  macOS/Linux: lsof -i :${port}   then kill <PID>`
		);
	} else {
		console.error(err);
	}
	// eslint-disable-next-line unicorn/no-process-exit -- fatal listen/bind failure; explicit exit code for npm/CI
	process.exit(1);
});
