import express, { type NextFunction, type Request, type Response } from "express";
import { readFile } from "fs/promises";
import path from "path";

const router = express.Router();
export default router;

const sessionIds: { [id: string]: string } = {};
const stuckUsers: { [id: string]: boolean } = {};
const SESSION_COOKIE_NAME = "app-session-id";

/**
 * Middleware hook for CORS handling.
 * @param req The request.
 * @param res The response.
 * @param next The next hook to call.
 */
function corsMiddleware(req: Request, res: Response, next: NextFunction): void {
	// add logic here if you wish to support cors.
	next();
}

/**
 * Clears the session dictionary of the given session id.
 * @param sessionId The session id to clear.
 */
function clearSessionDictionary(sessionId: string): void {
	if (sessionId) {
		delete stuckUsers[sessionId];
		delete sessionIds[sessionId];
	}
}

/**
 * Get the platform provider.html, if the user has no authentication cookie
 * then instead redirect to the login route.
 */
router.get("/platform/provider.html", (req, res, next) => {
	console.log("Received request for /platform/provider.html");
	if (req.cookies?.[SESSION_COOKIE_NAME] && sessionIds[req.cookies[SESSION_COOKIE_NAME]]) {
		const sessionId = sessionIds[req.cookies[SESSION_COOKIE_NAME]];
		const isStuckUser = stuckUsers[sessionId];
		if (isStuckUser) {
			console.log("Stuck user detected. Navigating to /app/stuck");
			res.redirect("/app/stuck");
		} else {
			console.log("Session cookie available. Navigating to /platform/provider.html");
			res.sendFile(path.join(__dirname, "..", "..", "public/platform/provider.html"));
		}
	} else {
		console.log("Session cookie not available. Navigating to /app/login");
		res.redirect("/app/login?return=/platform/provider.html");
	}
});

/**
 * The stuck page represents a page that is intended to be a redirect where encountered an error and stopped.
 */
router.get("/app/stuck", (req, res, next) => {
	console.log("Received request for /app/stuck");
	res.sendFile(path.join(__dirname, "..", "..", "public/app/stuck.html"));
});

/**
 * The friendly error page is something shown to users if something has gone wrong e.g. they are stuck before the provider is loaded.
 */
router.get("/app/friendly-error", (req, res, next) => {
	console.log("Received request for /app/friendly-error");
	res.sendFile(path.join(__dirname, "..", "..", "public/app/friendly-error.html"));
});

/**
 * Get the app.html content, if not authentication redirect to the login page.
 */
router.get("/app", (req, res, next) => {
	console.log("Received request for /app");
	if (req.cookies?.[SESSION_COOKIE_NAME] && sessionIds[req.cookies[SESSION_COOKIE_NAME]]) {
		console.log("Session cookie available. Navigating to /app/app.html");
		res.sendFile(path.join(__dirname, "..", "..", "public/app/app.html"));
	} else {
		console.log("Session cookie not available. Navigating to /app/login");
		res.redirect("/app/login?return=/app");
	}
});

/**
 * Don't allow direct access to the app.html page
 */
router.get("/app/app.html", (req, res, next) => {
	console.log("Access to raw html denied. Navigating to /app");
	res.redirect("/app");
});

/**
 * Don't allow direct access to the login.html page
 */
router.get("/app/login.html", (req, res, next) => {
	console.log("Access to raw html denied. Navigating to /app/login");
	res.redirect("/app/login");
});

/**
 * When the login.html page is requested we substitute in the return url from the query
 * params, that way on a successful login the login page can redirect to the original
 * requested location.
 */
router.get("/app/login", async (req, res, next) => {
	console.log("Received request for /app/login");
	if (req.cookies?.[SESSION_COOKIE_NAME]) {
		console.log("Session cookies available so clearing them as login has been requested.");
		const sessionId = sessionIds[req.cookies[SESSION_COOKIE_NAME]];
		clearSessionDictionary(sessionId);
	}
	res.clearCookie(SESSION_COOKIE_NAME);
	console.log("Navigating to /app/login.html");
	const loginHtml = await readFile(path.join(__dirname, "..", "..", "public/app/login.html"), "utf8");
	res.send(loginHtml.replace("{RETURN_URL}", (req.query.return as string) ?? "/platform/provider.html"));
});

/**
 * When a logout is requested we clear all the cookies and redirect to the login page.
 */
router.post("/app/logout", (req, res, next) => {
	console.log("Received request for /app/logout");
	if (req.cookies?.[SESSION_COOKIE_NAME]) {
		console.log("Session cookies available so clearing them as login has been requested.");
		const sessionId = sessionIds[req.cookies[SESSION_COOKIE_NAME]];
		clearSessionDictionary(sessionId);
	}
	res.clearCookie(SESSION_COOKIE_NAME);
	console.log("Navigating to /app/login.html");
	res.redirect("/app/login");
});

/**
 * A request to login with form data the returnUrl is used to redirect after successful login.
 */
router.post("/app/login", (req, res, next) => {
	console.log("Received post to /app/login.html");
	if (req.body?.email === "test@example.com" && req.body?.password === "pass1234") {
		const sessionId = `${Date.now()}`;
		sessionIds[sessionId] = sessionId;
		res.cookie(SESSION_COOKIE_NAME, sessionId);
		const returnUrl = req.body?.returnUrl as string;
		console.log(
			`Login details test@example.com / pass1234 session cookies set. Redirecting to originally requested url: ${returnUrl}`
		);
		res.redirect(returnUrl);
	} else if (req.body?.email === "stuck@example.com" && req.body?.password === "pass1234") {
		const sessionId = `${Date.now()}`;
		sessionIds[sessionId] = sessionId;
		stuckUsers[sessionId] = true;
		res.cookie(SESSION_COOKIE_NAME, sessionId);
		const returnUrl = req.body?.returnUrl as string;
		console.log(
			`Login details stuck@example.com / pass1234 session cookies set. Redirecting to stuck url: /stuck instead of ${returnUrl}`
		);
		res.redirect("/app/stuck");
	} else {
		console.log(
			"Demo credentials not provided. You need username/password of test@example.com / pass1234 to login or stuck@example.com / pass1234 to get authenticated and stuck."
		);
		const sessionId = sessionIds[req.cookies[SESSION_COOKIE_NAME]];
		clearSessionDictionary(sessionId);
		res.clearCookie(SESSION_COOKIE_NAME);
		res.status(401).send("Unauthorized");
	}
});

/**
 * Serve all files in the 'public' directory permitting CORS on Home domains.
 */
router.get("*", corsMiddleware, express.static("public"));
