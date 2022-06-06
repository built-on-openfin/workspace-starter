import * as express from "express";
import crypto = require("crypto");
import path = require("path");

const router = express.Router();
export default router;

const sessionIds = {};
const SESSION_COOKIE_NAME = "app-session-id";

/**
 * In order for Home to make the cross origin request to our server,
 * we must allow CORS on Home's domains.
 */
const allowedCorsDomains = ["https://cdn.openfin.co"];
const corsMiddleware: express.Handler = (req, res, next) => {
    const origin = req.get('origin');
    if (allowedCorsDomains.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Credentials", "true");
    }
    next();
};

router.get("/app", (req, res, next) => {
    if (req.cookies && req.cookies[SESSION_COOKIE_NAME] && sessionIds[req.cookies[SESSION_COOKIE_NAME]]) {
        res.sendFile(path.join(__dirname, "..", "..", "public/app/app.html"));
    } else {
        res.redirect("/app/login");
    }
});

router.get("/app/login", (req, res, next) => {
    if (req.cookies && req.cookies[SESSION_COOKIE_NAME]) {
        delete sessionIds[req.cookies[SESSION_COOKIE_NAME]];
    }
    res.clearCookie(SESSION_COOKIE_NAME);
    res.sendFile(path.join(__dirname, "..", "..", "public/app/login.html"));
});

router.post("/app/logout", (req, res, next) => {
    if (req.cookies && req.cookies[SESSION_COOKIE_NAME]) {
        delete sessionIds[req.cookies[SESSION_COOKIE_NAME]];
    }
    res.clearCookie(SESSION_COOKIE_NAME);
    res.redirect("/app/login");
});

router.post("/app/login", (req, res, next) => {
    if (req.body?.email === "test@example.com" && req.body?.password === "pass1234") {
        const sessionId = crypto.randomUUID();
        sessionIds[sessionId] = Date.now();
        res.cookie(SESSION_COOKIE_NAME, sessionId);
        res.redirect("/app");
    } else {
        res.clearCookie(SESSION_COOKIE_NAME);
        res.status(401).send("Unauthorized");
    }
});

/**
 * Serve all files in the 'public' directory permitting CORS on Home domains.
 */
router.get("*", corsMiddleware, express.static("public"));

