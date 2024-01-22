import express from "express";
import type {
	EndpointGetResponse,
	EndpointListResponse,
	EndpointSetRequest,
	PlatformStorageMetadata
} from "workspace-platform-starter/shapes/platform-shapes";

// This code demonstrates the implementation of a storage service.
// used by the endpoints workspace-list, workspace-get, workspace-set, workspace-remove, page-list, page-get, page-set, page-remove
// it stores the values in memory, which will be lost when the server is restarted
// This should be considered a development tool and not used in a production environment

/**
 * Storage entry.
 */
interface StorageEntry {
	/**
	 * The platform versions it was originally saved against
	 */
	platform: string;
	/**
	 * The storage entry metadata.
	 */
	metaData: PlatformStorageMetadata;
	/**
	 * The storage entry payload.
	 */
	payload: unknown;
}

// Create a map to store json objects
const jsonStore: { [type: string]: { [id: string]: StorageEntry } } = {
	page: {},
	workspace: {}
};

/**
 * Initialize the storage service.
 * @param app The express app to extend.
 */
export function init(app: express.Application): void {
	// POST endpoint to store json object.
	app.post("/api/storage/:type", express.json(), (request, response) => {
		const type = request.params.type;
		const data: EndpointSetRequest = request.body;

		console.log("Storage::Storing entry with id:", data.id);

		const typeStore = jsonStore[type];
		if (typeStore) {
			typeStore[data.id] = {
				platform: data.platform,
				metaData: data.metaData,
				payload: data.payload
			};
		}

		response.sendStatus(200);
	});

	// GET endpoint to retrieve all json objects
	app.get("/api/storage/:type", express.json(), (request, response) => {
		const type = request.params.type;
		console.log("Storage::Retrieving all entries");

		const responseObject: EndpointListResponse = {};

		const typeStore = jsonStore[type];
		if (typeStore) {
			const keys = Object.keys(typeStore);
			console.log("Storage::Keys", keys);
			for (const id of keys) {
				responseObject[id] = {
					metaData: typeStore[id].metaData,
					payload: typeStore[id].payload
				};
			}
		}

		response.json(responseObject);
	});

	// GET endpoint to retrieve json object
	app.get("/api/storage/:type/:id", express.json(), (request, response) => {
		const type = request.params.type;
		const id = request.params.id;

		console.log("Storage::Retrieving entry with id:", id);

		const typeStore = jsonStore[type];
		let data: StorageEntry | undefined;
		if (typeStore) {
			data = typeStore[id];
		}

		if (!data) {
			return response.json({});
		}

		const responseObject: EndpointGetResponse = {
			metaData: data.metaData,
			payload: data.payload
		};

		response.json(responseObject);
	});

	// DELETE endpoint to remove json object
	app.delete("/api/storage/:type/:id", express.json(), (request, response) => {
		const type = request.params.type;
		const id = request.params.id;

		console.log("Storage::Deleting entry with id:", id);

		const typeStore = jsonStore[type];
		if (typeStore) {
			delete typeStore[id];
		}

		response.sendStatus(200);
	});
}
