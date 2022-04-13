import * as express from "express";
import fetch from "node-fetch";

const router = express.Router();
export default router;

router.use(express.json());

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

/**
 * Serve all files in the 'public' directory permitting CORS on Home domains.
 */
router.get("*", corsMiddleware, express.static("public"));

router.post("/external", async (request, response) => {
    let status = 400;
    let returnData;

    if (request.body) {
        try {
            const params: {
                url: string;
                method?: string;
                headers?: { [id: string]: string };
                body?: any;
            } = request.body;

            if (params.url) {
                params.headers = params.headers ?? {};
                if (params.method === "post" && !params.headers.contentType) {
                    params.headers.contentType = "application/json";
                }

                const fetchResponse = await fetch(params.url, {
                    method: params.method ?? "get",
                    headers: params.headers,
                    body: params.body
                });

                status = fetchResponse.status;
                returnData = await fetchResponse.json();
            }
        } catch (err) {
            returnData = err.message;
        }
    }

    response.status(status).header("content-type", "application/json").send(returnData);
});