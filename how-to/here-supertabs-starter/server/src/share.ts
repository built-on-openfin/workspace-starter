import { randomUUID } from "crypto";
import express from "express";

// Create a map to store json objects
const jsonStore: Map<string, unknown> = new Map<string, unknown>();

/**
 * Initialize the share service.
 * @param app The express app to extend.
 * @param baseUrl The base url of the server.
 */
export function init(app: express.Application, baseUrl: string): void {
	// POST endpoint to store json object.
	app.post("/api/share", express.json(), (request, response) => {
		const id = randomUUID();
		const data = request.body;

		console.log("Share::Storing data with id:", id);

		jsonStore.set(id, data);

		const responseObject = {
			id,
			url: `${baseUrl}/api/share/${id}`
		};

		response.json(responseObject);
	});

	// GET endpoint to retrieve json object
	app.get("/api/share/:id", express.json(), (request, response) => {
		const id = request.params.id;
		const data = jsonStore.get(id);

		console.log("Share::Retrieving data with id:", id);

		if (!data) {
			return response.status(404).json({ error: "Data not found" });
		}

		response.json(data);
	});
}
