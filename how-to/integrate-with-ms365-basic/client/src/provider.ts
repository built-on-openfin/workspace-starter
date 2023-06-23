import type { User } from "@microsoft/microsoft-graph-types";
import { TeamsConnection, connect, type Microsoft365Connection } from "@openfin/microsoft365";
import type { GraphListResponse } from "@openfin/microsoft365/types/rest-api/rest-api.types";

// The CLIENT_ID and TENANT_ID need to be populated with values that can be
// used to access your MS365 deployment
const CLIENT_ID: string = "";
const TENANT_ID: string = "";
const REDIRECT_URL: string = "http://localhost:8080/oauth_redirect.html";

// Connection and current list of users
let ms365Connection: Microsoft365Connection | undefined;
let users: User[] = [];

// The DOM elements
let errorStatus: HTMLDivElement | null;
let btnConnect: HTMLButtonElement | null;
let btnDisconnect: HTMLButtonElement | null;
let connectionStatus: HTMLParagraphElement | null;
let btnQuery: HTMLButtonElement | null;
let txtQuery: HTMLInputElement | null;
let tableResults: HTMLTableElement | null;
let bodyResults: HTMLTableSectionElement | null;
let username: HTMLDivElement | null;

// Wait for the DOM to finish loading
window.addEventListener("DOMContentLoaded", async () => {
	// Platform has loaded so initialize the DOM
	await initializeDOM();
});

/**
 * Initialize the DOM elements.
 */
async function initializeDOM(): Promise<void> {
	errorStatus = document.querySelector<HTMLDivElement>("#errorStatus");
	btnConnect = document.querySelector<HTMLButtonElement>("#btnConnect");
	btnDisconnect = document.querySelector<HTMLButtonElement>("#btnDisconnect");
	connectionStatus = document.querySelector<HTMLParagraphElement>("#connectionStatus");
	btnQuery = document.querySelector<HTMLButtonElement>("#btnQuery");
	txtQuery = document.querySelector<HTMLInputElement>("#txtQuery");
	tableResults = document.querySelector<HTMLTableElement>("#tableResults");
	bodyResults = document.querySelector<HTMLTableSectionElement>("#bodyResults");
	username = document.querySelector<HTMLDivElement>("#username");

	if (
		errorStatus &&
		btnConnect &&
		btnDisconnect &&
		connectionStatus &&
		btnQuery &&
		txtQuery &&
		tableResults &&
		bodyResults &&
		username
	) {
		updateConnectionStatus();
		if (CLIENT_ID === "" || TENANT_ID === "") {
			errorStatus.textContent =
				"You must complete the CLIENT_ID and TENANT_ID in settings.ts before the example will function";
			btnConnect.disabled = true;
			return;
		}

		btnConnect.addEventListener("click", async () => {
			ms365Connection = undefined;
			updateConnectionStatus();

			try {
				users = [];
				if (btnConnect) {
					btnConnect.disabled = true;
				}
				if (connectionStatus) {
					connectionStatus.textContent = "Microsoft 365 is connecting";
				}
				ms365Connection = await connect(CLIENT_ID, TENANT_ID, REDIRECT_URL);

				if (username && ms365Connection.currentUser.displayName) {
					username.textContent = ms365Connection.currentUser.displayName;
				}
			} catch (err) {
				if (errorStatus) {
					errorStatus.textContent = `Error connecting to Microsoft 365\n${formatError(err)}`;
				}
			}
			updateConnectionStatus();
		});

		btnDisconnect.addEventListener("click", async () => {
			try {
				users = [];
				if (txtQuery) {
					txtQuery.value = "";
				}
				if (ms365Connection) {
					await ms365Connection.disconnect();
				}
			} catch {
			} finally {
				if (username) {
					username.textContent = "Not connected";
				}
			}
			ms365Connection = undefined;
			updateConnectionStatus();
		});

		btnQuery.addEventListener("click", async () => {
			if (btnQuery && txtQuery && ms365Connection && errorStatus) {
				try {
					btnQuery.disabled = true;
					txtQuery.disabled = true;

					users = [];
					updateUserTable();

					const query = encodeURIComponent(txtQuery.value);

					const userSearchFields: (keyof User)[] = [
						"displayName",
						"givenName",
						"surname",
						"department",
						"jobTitle",
						"mobilePhone"
					];
					const userSearchQuery = userSearchFields.map((s) => `"${s}:${query}"`).join(" OR ");

					const response = await ms365Connection.executeApiRequest<GraphListResponse<User>>(
						`/v1.0/users?$search=${userSearchQuery}&$top=10`,
						"GET",
						undefined,
						{
							ConsistencyLevel: "eventual"
						}
					);

					if (response.data?.value?.length) {
						users = response.data.value;
						updateUserTable();
					}
				} catch (err) {
					errorStatus.textContent = `Error querying Microsoft 365\n${formatError(err)}`;
				} finally {
					btnQuery.disabled = false;
					txtQuery.disabled = false;
				}
			}
		});
	}
}

/**
 * Format an error to a readable string.
 * @param err The error to format.
 * @returns The formatted error.
 */
function formatError(err: unknown): string {
	if (err instanceof Error) {
		return err.message;
	} else if (typeof err === "string") {
		return err;
	}
	return JSON.stringify(err);
}

/**
 * Update the DOM elements with the state of the connection.
 */
function updateConnectionStatus(): void {
	if (errorStatus && btnConnect && btnDisconnect && connectionStatus && btnQuery && txtQuery) {
		if (ms365Connection) {
			connectionStatus.textContent = `Microsoft 365 is connected as ${ms365Connection.currentUser.displayName}`;
			btnConnect.disabled = true;
			btnDisconnect.disabled = false;
			btnQuery.disabled = false;
			txtQuery.disabled = false;
		} else {
			connectionStatus.textContent = "Microsoft 365 is disconnected";
			btnConnect.disabled = false;
			btnDisconnect.disabled = true;
			btnQuery.disabled = true;
			txtQuery.disabled = true;
		}
		updateUserTable();
	}
}

/**
 * Update the table with the list of users.
 */
function updateUserTable(): void {
	if (tableResults && bodyResults) {
		tableResults.style.display = users.length > 0 ? "table" : "none";

		if (users.length === 0) {
			bodyResults.innerHTML = "";
		} else {
			for (const user of users) {
				const nameCell = document.createElement("td");
				nameCell.textContent = user.displayName ?? "";

				const emailCell = document.createElement("td");
				emailCell.textContent = user.mail ?? "";

				const buttonCell = document.createElement("td");

				if (user?.mail) {
					const chatButton = document.createElement("button");
					chatButton.textContent = "Chat";
					chatButton.type = "button";
					chatButton.classList.add("small");
					chatButton.addEventListener("click", async () => {
						if (ms365Connection && user?.mail) {
							const teamsConnection = new TeamsConnection(ms365Connection);
							await teamsConnection.startChat({ emailAddresses: [user.mail] });
						}
					});
					buttonCell.append(chatButton);
				}

				const row = document.createElement("tr");
				row.append(nameCell);
				row.append(emailCell);
				row.append(buttonCell);
				bodyResults.append(row);
			}
		}
	}
}
