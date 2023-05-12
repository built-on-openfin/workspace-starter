import express from "express";
import fetch from "node-fetch";

const router = express.Router();

/**
 * Proxy REST calls so that we can avoid issues with CORS in the chromium runtime.
 */
router.post("/proxy", async (request, response) => {
	let status = 400;
	let returnData;

	if (request.body) {
		try {
			console.log("Proxying request", request.body);

			const params: {
				url: string;
				method?: string;
				headers?: { [id: string]: string };
				body?: unknown;
			} = request.body;

			if (params.url) {
				params.headers = params.headers ?? {};
				if (params.method === "post" && !params.headers.contentType) {
					params.headers.contentType = "application/json";
				}

				const fetchResponse = await fetch(params.url, {
					method: params.method ?? "get",
					headers: params.headers,
					body: params.body ? JSON.stringify(params.body) : undefined
				});

				console.log("Proxy response", {
					ok: fetchResponse.ok,
					status: fetchResponse.status,
					statusText: fetchResponse.statusText
				});

				if (fetchResponse.ok) {
					response.status(fetchResponse.status);

					const content = await fetchResponse.arrayBuffer();
					const text = Buffer.from(content).toString();

					response.header("content-type", text.includes("<?xml") ? "application/xml" : "application/json");
					response.header("content-length", text.length.toString());
					response.send(text);
					return;
				}
				status = fetchResponse.status;
				returnData = fetchResponse.statusText;
			}
		} catch (err) {
			if (err instanceof Error) {
				returnData = err.message;
			} else if (typeof err === "string") {
				returnData = err;
			} else {
				returnData = JSON.stringify(err);
			}
		}
	}

	response.status(status);
	response.send(returnData);
});

export default router;
