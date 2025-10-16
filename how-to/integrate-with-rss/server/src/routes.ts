import express from "express";

const router = express.Router();

/**
 * Custom error class for URL validation errors.
 */
class UrlValidationError extends Error {
	/**
	 * Creates a new URL validation error.
	 * @param message The error message.
	 */
	constructor(message: string) {
		super(message);
		this.name = "UrlValidationError";
	}
}

/**
 * Validates that a URL is safe for proxy requests (prevents SSRF attacks).
 * @param urlString The URL string to validate.
 * @returns The validated URL object.
 * @throws UrlValidationError if the URL is not safe.
 */
function validateUrl(urlString: string): URL {
	const url = new URL(urlString);

	// Only allow HTTP and HTTPS protocols
	if (!["http:", "https:"].includes(url.protocol)) {
		throw new UrlValidationError("Only HTTP and HTTPS protocols are allowed");
	}

	// Block private/internal IP addresses and localhost
	const hostname = url.hostname.toLowerCase();
	if (
		hostname === "localhost" ||
		hostname === "127.0.0.1" ||
		hostname === "0.0.0.0" ||
		hostname.startsWith("192.168.") ||
		hostname.startsWith("10.") ||
		hostname.startsWith("172.") ||
		hostname.endsWith(".local") ||
		hostname.endsWith(".internal")
	) {
		throw new UrlValidationError("Access to private/internal addresses is not allowed");
	}

	return url;
}

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
				// Validate URL to prevent SSRF attacks
				const validatedUrl = validateUrl(params.url);

				params.headers = params.headers ?? {};
				if (params.method === "post" && !params.headers.contentType) {
					params.headers.contentType = "application/json";
				}

				const fetchResponse = await fetch(validatedUrl.toString(), {
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
			// Log the full error for debugging but don't expose it to the client
			console.error("Proxy request failed:", err);

			// Return generic error message to prevent information disclosure
			if (err instanceof UrlValidationError) {
				// Validation errors are safe to expose to the client
				returnData = err.message;
			} else {
				// Return a generic error message to prevent information exposure
				returnData = "Request failed. Please check the URL and try again.";
			}
		}
	}

	response.status(status);
	response.send(returnData);
});

export default router;
