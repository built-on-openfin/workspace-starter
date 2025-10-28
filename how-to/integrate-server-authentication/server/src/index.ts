import cookieParser from "cookie-parser";
import { doubleCsrf } from "csrf-csrf";
import express from "express";
import router from "./routes";

const app = express();

// Disable X-Powered-By header to hide Express framework information
app.disable("x-powered-by");

app.use(cookieParser());
app.use(express.json());

// CSRF protection configuration
const csrfConfig = {
	getSecret: (): string => "your-secret-key-here", // In production, use a proper secret from environment variables
	getSessionIdentifier: (req: express.Request): string => req.cookies?.["app-session-id"] || "anonymous"
};

const { doubleCsrfProtection, generateCsrfToken } = doubleCsrf(csrfConfig);

// Apply CSRF protection to all routes except login-related routes
app.use((req, res, next) => {
	// Skip CSRF for login-related routes (user not authenticated yet)
	if (
		(req.method === "GET" && req.path === "/app/login") ||
		(req.method === "POST" && req.path === "/app/login")
	) {
		return next();
	}
	// Apply CSRF protection to all other routes
	return doubleCsrfProtection(req, res, next);
});

// Make CSRF token generation available to routes
app.use((req, res, next): void => {
	const reqWithCsrf = req as express.Request & { generateCsrfToken: () => string };
	reqWithCsrf.generateCsrfToken = (): string => generateCsrfToken(req, res);
	next();
});

app.use(router);
const port = 8080;

app.listen(port, () => {
	console.log("server is listening on port", port);
});
