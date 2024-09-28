import { chromium } from "@playwright/test";

const manifestUrl = "http://localhost:3000/manifest.json";

export default async function globalSetup() {
	const browser = await chromium.launch({ headless: false });

	// Open the Fins link in a new page (which will start the OpenFin app)
	console.log("Launching OpenFin with manifestUrl:", manifestUrl);
	const launcher = await browser.newPage();
	await launcher.goto("https://start.openfin.co/?manifest=" + manifestUrl, {
		waitUntil: "networkidle",
	});

	// Wait for OpenFin to launch
	await new Promise((resolve) => setTimeout(resolve, 10000));
}
