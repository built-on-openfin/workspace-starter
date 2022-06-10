import express from "express";
import path from "path";

const router = express.Router();
export default router;

const sessionIds = {};
const SESSION_COOKIE_NAME = "app-session-id";
let requestedUrl: string;

const corsMiddleware: express.Handler = (req, res, next) => {
  // add logic here if you wish to support cors.
  next();
};

router.get("/platform/provider.html", (req, res, next) => {
  console.log("Received request for /platform/provider.html");
  if (req.cookies?.[SESSION_COOKIE_NAME] && sessionIds[req.cookies[SESSION_COOKIE_NAME]]) {
    console.log("Session cookie available. Navigating to /platform/provider.html");
    res.sendFile(path.join(__dirname, "..", "..", "public/platform/provider.html") as string);
  } else {
    console.log("Session cookie not available. Navigating to /app/login");
    requestedUrl = "/platform/provider.html";
    res.redirect("/app/login");
  }
});

router.get("/app", (req, res, next) => {
  console.log("Received request for /app");
  if (req.cookies?.[SESSION_COOKIE_NAME] && sessionIds[req.cookies[SESSION_COOKIE_NAME]]) {
    console.log("Session cookie available. Navigating to /app/app.html");
    res.sendFile(path.join(__dirname, "..", "..", "public/app/app.html") as string);
  } else {
    console.log("Session cookie not available. Navigating to /app/login");
    requestedUrl = "/app";
    res.redirect("/app/login");
  }
});

router.get("/app/login", (req, res, next) => {
  console.log("Received request for /app/login");
  if (req.cookies?.[SESSION_COOKIE_NAME]) {
    console.log("Session cookies available so clearing them as login has been requested.");
    delete sessionIds[req.cookies[SESSION_COOKIE_NAME]];
  }
  res.clearCookie(SESSION_COOKIE_NAME);
  console.log("Navigating to /app/login.html");
  res.sendFile(path.join(__dirname, "..", "..", "public/app/login.html") as string);
});

router.post("/app/logout", (req, res, next) => {
  console.log("Received request for /app/logout");
  if (req.cookies?.[SESSION_COOKIE_NAME]) {
    console.log("Session cookies available so clearing them as login has been requested.");
    delete sessionIds[req.cookies[SESSION_COOKIE_NAME]];
  }
  res.clearCookie(SESSION_COOKIE_NAME);
  console.log("Navigating to /app/login.html");
  res.redirect("/app/login");
});

router.post("/app/login", (req, res, next) => {
  console.log("Received post to /app/login.html");
  if (req.body?.email === "test@example.com" && req.body?.password === "pass1234") {
    const sessionId = Date.now();
    sessionIds[sessionId] = sessionId;
    res.cookie(SESSION_COOKIE_NAME, sessionId);
    console.log(
      `Login details test@example.com / pass1234 session cookies set. Redirecting to originally requested url: ${requestedUrl}`
    );
    res.redirect(requestedUrl);
  } else {
    console.log("Demo credentials not provided. You need username/password of test@example.com / pass1234 to login");
    res.clearCookie(SESSION_COOKIE_NAME);
    res.status(401).send("Unauthorized");
  }
});

/**
 * Serve all files in the 'public' directory permitting CORS on Home domains.
 */
router.get("*", corsMiddleware, express.static("public"));
