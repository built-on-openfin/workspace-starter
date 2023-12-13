import cors from "cors";
import express from "express";
import path from "path";
import { init as registerShareService } from "./share";
import { init as registerStorageService } from "./storage";
import { init as registerVersionService } from "./version";

const app = express();
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

app.listen(port, () => {
	console.log("server is listening on port", port);
});
