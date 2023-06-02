import express from "express";
import path from "path";
import { init as registerVersionService } from "./version";

const app = express();

const mainPath = path.join(__dirname, "..", "..", "public");
const port = 8080;

console.log(`Main Path / = ${mainPath}`);
console.log("Root path checks both the main and common directories.");
app.use(express.static(mainPath));

registerVersionService(app);

app.listen(port, () => {
	console.log("server is listening on port", port);
});
