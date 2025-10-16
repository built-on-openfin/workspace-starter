import express from "express";
import rateLimit from "express-rate-limit";
import { readFileSync } from "fs";
import path from "path";

/**
 * Initialize the routes for the versioning info.
 * @param app The express app to extend.
 */
export function init(app: express.Application): void {
	console.log(
		"Configuring the /version service. This can be specified as an endpoint in the endpoint provider:",
		`
		{
			"id": "version",
			"type": "fetch",
			"options": {
				"method": "POST",
				"url": "http://localhost:8080/version",
				"headers": { "Content-Type": "application/json" }
			}
		}`
	);
	console.log(
		"You can then add this to your local workspace platform's versionProvider configuration:",
		`
	{
		"endpointId": "version",
		"versionCheckInterval": 30000
	}`
	);
	const configPath = path.join(__dirname, "..", "config", "version.json");
	console.log(
		"You can then enable different modes and different settings through the example version service configuration found here:",
		configPath
	);

	// Rate limiting middleware to prevent DoS attacks
	const versionRateLimit = rateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100, // Limit each IP to 100 requests per windowMs
		message: {
			error: "Too many requests from this IP, please try again later.",
			retryAfter: "15 minutes"
		},
		standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
		legacyHeaders: false // Disable the `X-RateLimit-*` headers
	});

	app.post("/version", versionRateLimit, express.json(), (request, response) => {
		console.log(request.body); // your JSON
		const configText = readFileSync(configPath, "utf8");
		const config = JSON.parse(configText);
		console.log("Version test server configuration loaded from:", configPath);
		const modeConfig = config?.modes[config.mode] ?? {};
		const modeConfigStatus = modeConfig?.status ?? {};
		const status = { ...request.body, ...modeConfigStatus };
		let windowOptions;
		if (modeConfig.windowOptions !== undefined) {
			windowOptions = modeConfig.windowOptions;
			windowOptions.customData = { ...status, ...windowOptions.customData };
		}
		const versionResponse = { status, windowOptions };
		const stringVersionResponse = JSON.stringify(versionResponse, undefined, 5);
		switch (config.mode) {
			case "compatible": {
				console.log("Sending back compatible response", stringVersionResponse);
				break;
			}
			case "incompatibleMessage": {
				console.log(
					"Sending back incompatible response that should trigger a message to the user and stop the platform.",
					stringVersionResponse
				);
				break;
			}
			case "incompatibleManifest": {
				console.log(
					"Sending back incompatible response that should trigger a launch of a supported manifest.",
					stringVersionResponse
				);
				break;
			}
			case "upgrade": {
				console.log(
					"Sending back upgrade response that should trigger a message to the user that they should restart.",
					stringVersionResponse
				);
				break;
			}
			default: {
				console.log("No match to configured mode. Returning sent status.", stringVersionResponse);
				break;
			}
		}
		response.send(versionResponse);
	});
}
