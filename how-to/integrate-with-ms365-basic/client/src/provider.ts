import type { User } from "@microsoft/microsoft-graph-types";
import { connect, Microsoft365Connection, TeamsConnection } from "@openfin/microsoft365";
import { init as workspacePlatformInit } from "@openfin/workspace-platform";
import { TENANT_ID, CLIENT_ID, REDIRECT_URL } from "./settings";

export interface GraphListResponse<T> {
	value?: T[];
}

let ms365Connection: Microsoft365Connection;
let users: User[] = [];

let errorStatus: HTMLDivElement;
let btnConnect: HTMLButtonElement;
let btnDisconnect: HTMLButtonElement;
let connectionStatus: HTMLParagraphElement;
let btnQuery: HTMLButtonElement;
let txtQuery: HTMLInputElement;
let tableResults: HTMLTableElement;
let bodyResults: HTMLTableSectionElement;

async function init() {
	await workspacePlatformInit({
		browser: {}
	});
	errorStatus = document.querySelector<HTMLDivElement>("#errorStatus");
	btnConnect = document.querySelector<HTMLButtonElement>("#btnConnect");
	btnDisconnect = document.querySelector<HTMLButtonElement>("#btnDisconnect");
	connectionStatus = document.querySelector<HTMLParagraphElement>("#connectionStatus");
	btnQuery = document.querySelector<HTMLButtonElement>("#btnQuery");
	txtQuery = document.querySelector<HTMLInputElement>("#txtQuery");
	tableResults = document.querySelector<HTMLTableElement>("#tableResults");
	bodyResults = document.querySelector<HTMLTableSectionElement>("#bodyResults");

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
			btnConnect.disabled = true;
			connectionStatus.textContent = "Microsoft 365 is connecting";
			ms365Connection = await connect(CLIENT_ID, TENANT_ID, REDIRECT_URL);
		} catch (err) {
			errorStatus.textContent = `Error connecting to Microsoft 365\n${
				err instanceof Error ? err.message : JSON.stringify(err)
			}`;
		}
		updateConnectionStatus();
	});

	btnDisconnect.addEventListener("click", async () => {
		try {
			users = [];
			if (ms365Connection) {
				await ms365Connection.disconnect();
			}
		} catch {}
		ms365Connection = undefined;
		updateConnectionStatus();
	});

	btnQuery.addEventListener("click", async () => {
		try {
			btnQuery.disabled = true;
			txtQuery.disabled = true;

			users = [];
			updateTable();

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
				updateTable();
			}
		} catch (err) {
			errorStatus.textContent = `Error querying Microsoft 365\n${
				err instanceof Error ? err.message : JSON.stringify(err)
			}`;
		} finally {
			btnQuery.disabled = false;
			txtQuery.disabled = false;
		}
	});
}

function updateConnectionStatus() {
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
	updateTable();
}

function updateTable() {
	tableResults.style.display = users.length > 0 ? "table" : "none";

	if (users.length === 0) {
		bodyResults.innerHTML = "";
	} else {
		for (const user of users) {
			const nameCell = document.createElement("td");
			nameCell.textContent = user.displayName;

			const emailCell = document.createElement("td");
			emailCell.textContent = user.mail;

			const chatButton = document.createElement("button");
			chatButton.textContent = "Chat";
			chatButton.type = "button";
			chatButton.classList.add("small");
			chatButton.addEventListener("click", async () => {
				await chatUser(user);
			});

			const buttonCell = document.createElement("td");
			buttonCell.append(chatButton);

			const row = document.createElement("tr");
			row.append(nameCell);
			row.append(emailCell);
			row.append(buttonCell);
			bodyResults.append(row);
		}
	}
}

async function chatUser(contact: User) {
	const teamsConnection = new TeamsConnection(ms365Connection);
	await teamsConnection.startChat({ emailAddresses: [contact.mail] });
}

window.addEventListener("DOMContentLoaded", async () => {
	await init();
});
