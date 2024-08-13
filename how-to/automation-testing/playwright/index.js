const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const server = http.createServer((req, res) => {
	const parsedUrl = url.parse(req.url, true);
	const pathname = parsedUrl.pathname;

	if (pathname === "/" || pathname === "/index.html") {
		const filePath = path.join(__dirname, "public/index.html");
		fs.readFile(filePath, (err, data) => {
			if (err) {
				res.writeHead(500, { "Content-Type": "text/plain" });
				res.end("500 - Internal Server Error");
				return;
			}
			res.writeHead(200, { "Content-Type": "text/html" });
			res.end(data);
		});
	} else if (pathname === "/manifest.json") {
		const filePath = path.join(__dirname, "public/manifest.json");
		fs.readFile(filePath, (err, data) => {
			if (err) {
				res.writeHead(500, { "Content-Type": "text/plain" });
				res.end("500 - Internal Server Error");
				return;
			}
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(data);
		});
	} else {
		res.writeHead(404, { "Content-Type": "text/plain" });
		res.end("404 - Not Found");
	}
});

const port = 3000;

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
