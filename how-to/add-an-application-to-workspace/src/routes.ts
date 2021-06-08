import * as express from "express";

const router = express.Router();
export default router;

/**
 * In order for Home to make the cross origin request to our server,
 * we must allow CORS on Home's domains.
 */
const allowedCorsDomains = ["https://home-staging.openfin.co", "https://home.openfin.co", "https://cdn.openfin.co"];
const corsMiddleware: express.Handler = (req, res, next) => {
    const origin = req.get('origin');
    if (allowedCorsDomains.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Credentials", "true");
    }
    next();
};

/**
 * Serve all files in the 'public' directory permitting CORS on Home domains.
 */
router.get("*", corsMiddleware, express.static("public"));