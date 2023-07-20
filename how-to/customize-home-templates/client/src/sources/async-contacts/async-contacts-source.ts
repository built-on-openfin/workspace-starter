import {
	CLITemplate,
	type CLIFilter,
	type HomeDispatchedSearchResult,
	type HomeSearchListenerResponse,
	type HomeSearchResponse,
	type HomeSearchResult,
	type ListPairs
} from "@openfin/workspace";
import type { AsyncSettings, Contact, ContactFull, ContactsResult } from "./shapes";

/**
 * Implement the source for async contact results.
 */
export class AsyncContactsSource {
	/**
	 * The key to use for a async result.
	 * @internal
	 */
	private static readonly _ASYNC_PROVIDER_DETAILS_ACTION = "Async Details";

	/**
	 * The helpers for the source.
	 * @internal
	 */
	private _helpers: { openUrl: (url: string) => Promise<void> } | undefined;

	/**
	 * The definition for the source.
	 * @internal
	 */
	private _definition: { id: string; data?: AsyncSettings } | undefined;

	/**
	 * The settings for the source.
	 * @internal
	 */
	private _settings: AsyncSettings | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param definition.id The id for the module.
	 * @param definition.data The custom data for the module.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods from the platform.
	 * @param helpers.openUrl Method for opening a url.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: { id: string; data?: AsyncSettings },
		loggerCreator: () => void,
		helpers: { openUrl: (url: string) => Promise<void> }
	): Promise<void> {
		this._definition = definition;
		this._settings = definition.data;
		this._helpers = helpers;
	}

	/**
	 * Get a list of the static help entries.
	 * @returns The list of help entries.
	 */
	public async getHelpSearchEntries(): Promise<HomeSearchResult[]> {
		return [
			{
				key: `${this._definition?.id}-help1`,
				title: "/contacts-sync",
				label: "Help",
				actions: [],
				data: {
					providerId: this._definition?.id,
					populateQuery: "/contacts-sync "
				},
				template: CLITemplate.Custom,
				templateContent: {
					layout: {
						type: "Container",
						style: { display: "flex", flexDirection: "column", padding: "10px" },
						children: [
							{
								type: "Text",
								dataKey: "title",
								style: {
									color: "#FFFFFF",
									fontSize: "16px",
									fontWeight: "bold",
									marginBottom: "10px",
									borderBottom: "1px solid #53565F"
								}
							},
							{ type: "Text", dataKey: "desc-0", style: { fontSize: "12px", padding: "6px 0px" } },
							{ type: "Text", dataKey: "desc-1", style: { fontSize: "12px", padding: "6px 0px" } },
							{ type: "Text", dataKey: "desc-2", style: { fontSize: "12px", padding: "6px 0px" } },
							{
								type: "Container",
								style: {
									display: "flex",
									flexDirection: "column",
									padding: "10px",
									marginTop: "6px",
									backgroundColor: "#53565F",
									color: "#FFFFFF",
									borderRadius: "5px",
									overflow: "auto"
								},
								children: [
									{
										type: "Text",
										dataKey: "line-0",
										style: { fontSize: "12px", fontFamily: "monospace", whiteSpace: "nowrap" }
									}
								]
							}
						]
					},
					data: {
						title: "/contacts-sync",
						"desc-0": "The contacts-sync command can be used to search for a contact.",
						"desc-1":
							"It demonstrates how a long running retrieval would have to wait for the response before anything is display.",
						"desc-2": "For example to search for a contact containing the letter a.",
						"line-0": "/contacts-sync a"
					}
				}
			},
			{
				key: `${this._definition?.id}-help2`,
				title: "/contacts-partial",
				label: "Help",
				actions: [],
				data: {
					providerId: this._definition?.id,
					populateQuery: "/contacts-partial "
				},
				template: CLITemplate.Custom,
				templateContent: {
					layout: {
						type: "Container",
						style: { display: "flex", flexDirection: "column", padding: "10px" },
						children: [
							{
								type: "Text",
								dataKey: "title",
								style: {
									color: "#FFFFFF",
									fontSize: "16px",
									fontWeight: "bold",
									marginBottom: "10px",
									borderBottom: "1px solid #53565F"
								}
							},
							{ type: "Text", dataKey: "desc-0", style: { fontSize: "12px", padding: "6px 0px" } },
							{ type: "Text", dataKey: "desc-1", style: { fontSize: "12px", padding: "6px 0px" } },
							{ type: "Text", dataKey: "desc-2", style: { fontSize: "12px", padding: "6px 0px" } },
							{
								type: "Container",
								style: {
									display: "flex",
									flexDirection: "column",
									padding: "10px",
									marginTop: "6px",
									backgroundColor: "#53565F",
									color: "#FFFFFF",
									borderRadius: "5px",
									overflow: "auto"
								},
								children: [
									{
										type: "Text",
										dataKey: "line-0",
										style: { fontSize: "12px", fontFamily: "monospace", whiteSpace: "nowrap" }
									}
								]
							}
						]
					},
					data: {
						title: "/contacts-partial",
						"desc-0": "The contacts-partial command can be used to search for a contact.",
						"desc-1":
							"It demonstrates how we would display results instantly while asynchronously retrieving all the results.",
						"desc-2": "For example to search for a contact containing the letter a.",
						"line-0": "/contacts-partial a"
					}
				}
			},
			{
				key: `${this._definition?.id}-help3`,
				title: "/contacts",
				label: "Help",
				actions: [],
				data: {
					providerId: this._definition?.id,
					populateQuery: "/contacts "
				},
				template: CLITemplate.Custom,
				templateContent: {
					layout: {
						type: "Container",
						style: { display: "flex", flexDirection: "column", padding: "10px" },
						children: [
							{
								type: "Text",
								dataKey: "title",
								style: {
									color: "#FFFFFF",
									fontSize: "16px",
									fontWeight: "bold",
									marginBottom: "10px",
									borderBottom: "1px solid #53565F"
								}
							},
							{ type: "Text", dataKey: "desc-0", style: { fontSize: "12px", padding: "6px 0px" } },
							{ type: "Text", dataKey: "desc-1", style: { fontSize: "12px", padding: "6px 0px" } },
							{ type: "Text", dataKey: "desc-2", style: { fontSize: "12px", padding: "6px 0px" } },
							{ type: "Text", dataKey: "desc-3", style: { fontSize: "12px", padding: "6px 0px" } },
							{
								type: "Container",
								style: {
									display: "flex",
									flexDirection: "column",
									padding: "10px",
									marginTop: "6px",
									backgroundColor: "#53565F",
									color: "#FFFFFF",
									borderRadius: "5px",
									overflow: "auto"
								},
								children: [
									{
										type: "Text",
										dataKey: "line-0",
										style: { fontSize: "12px", fontFamily: "monospace", whiteSpace: "nowrap" }
									},
									{
										type: "Text",
										dataKey: "line-1",
										style: { fontSize: "12px", fontFamily: "monospace", whiteSpace: "nowrap" }
									}
								]
							}
						]
					},
					data: {
						title: "/contacts",
						"desc-0": "The contacts command can be used to search for a contact.",
						"desc-1":
							"It demonstrates how we would display results instantly and only retrieve full data on entry selection.",
						"desc-2": "Contacts starting with E will show error on first load.",
						"desc-3": "For example to search for a contact containing the letter a.",
						"line-0": "/contacts a",
						"line-1": "/contacts e"
					}
				}
			}
		];
	}

	/**
	 * Get a list of search results based on the query and filters.
	 * @param query The query to search for.
	 * @param filters The filters to apply.
	 * @param lastResponse The last search response used for updating existing results.
	 * @returns The list of results and new filters.
	 */
	public async getSearchResults(
		query: string,
		filters: CLIFilter[],
		lastResponse: HomeSearchListenerResponse
	): Promise<HomeSearchResponse> {
		const results: HomeSearchResult[] = [];

		if (query.startsWith("/contacts-sync ")) {
			await this.contactsSync(query.slice(15), results);
		} else if (query.startsWith("/contacts-partial ")) {
			await this.contactsPartial(query.slice(18), results, lastResponse);
		} else if (query.startsWith("/contacts ")) {
			await this.contactsAsync(query.slice(10), results, lastResponse);
		}

		return {
			results
		};
	}

	/**
	 * An entry has been selected.
	 * @param result The dispatched result.
	 * @param lastResponse The last response.
	 * @returns True if the item was handled.
	 */
	public async itemSelection(
		result: HomeDispatchedSearchResult,
		lastResponse: HomeSearchListenerResponse
	): Promise<boolean> {
		const data: { url?: string } = result.data;

		if (
			result.action.trigger === "user-action" &&
			result.action.name === AsyncContactsSource._ASYNC_PROVIDER_DETAILS_ACTION &&
			this._helpers?.openUrl &&
			data.url
		) {
			await this._helpers?.openUrl(data.url);
			return true;
		} else if (
			(result.action.trigger === "focus-change" && result.data?.state === "loading") ||
			(result.action.trigger === "reload" && result.data?.state === "error")
		) {
			setTimeout(async () => {
				const contactResponse = await fetch(`${this._settings?.rootUrl}${result.data.contact.id}.json`);

				const contactFull: ContactFull = await contactResponse.json();

				lastResponse.respond([this.createResult(contactFull)]);
			}, 0);
		}

		return false;
	}

	/**
	 * Retrieve the contacts in a synchronous manner.
	 * @param query The query to search for
	 * @param results The result list to populate.
	 */
	private async contactsSync(query: string, results: HomeSearchResult[]): Promise<void> {
		const wildcard = query.trim().toLowerCase();

		if (wildcard.length > 0) {
			try {
				const response = await fetch(`${this._settings?.rootUrl}index.json`);

				const json: ContactsResult = await response.json();

				for (const contact of json.data) {
					if (
						contact.firstName.toLowerCase().includes(wildcard) ||
						contact.lastName.toLowerCase().includes(wildcard)
					) {
						const contactResponse = await fetch(`${this._settings?.rootUrl}${contact.id}.json`);

						const contactFull: ContactFull = await contactResponse.json();

						results.push(this.createResult(contactFull));
					}
				}
			} catch (err) {
				console.error(err);
			}
		}
	}

	/**
	 * Retrieve the contacts in a partially asynchronous manner.
	 * @param query The query to search for
	 * @param results The result list to populate.
	 * @param lastResponse The last response to use for updating results.
	 */
	private async contactsPartial(
		query: string,
		results: HomeSearchResult[],
		lastResponse: HomeSearchListenerResponse
	): Promise<void> {
		const wildcard = query.trim().toLowerCase();

		if (wildcard.length > 0) {
			try {
				const response = await fetch(`${this._settings?.rootUrl}index.json`);

				const json: ContactsResult = await response.json();
				const finalContacts: Contact[] = [];

				for (const contact of json.data) {
					if (
						contact.firstName.toLowerCase().includes(wildcard) ||
						contact.lastName.toLowerCase().includes(wildcard)
					) {
						finalContacts.push(contact);
						results.push(this.createResult(contact));
					}
				}

				setTimeout(async () => {
					for (const contact of finalContacts) {
						const contactResponse = await fetch(`${this._settings?.rootUrl}${contact.id}.json`);

						const contactFull: ContactFull = await contactResponse.json();

						lastResponse.respond([this.createResult(contactFull)]);
					}
				}, 0);
			} catch (err) {
				console.error(err);
			}
		}
	}

	/**
	 * Retrieve the contacts in an asynchronous manner.
	 * @param query The query to search for
	 * @param results The result list to populate.
	 * @param lastResponse The last response to use for updating results.
	 */
	private async contactsAsync(
		query: string,
		results: HomeSearchResult[],
		lastResponse: HomeSearchListenerResponse
	): Promise<void> {
		const wildcard = query.trim().toLowerCase();

		if (wildcard.length > 0) {
			try {
				const response = await fetch(`${this._settings?.rootUrl}index.json`);

				const json: ContactsResult = await response.json();

				for (const contact of json.data) {
					if (
						contact.firstName.toLowerCase().includes(wildcard) ||
						contact.lastName.toLowerCase().includes(wildcard)
					) {
						// If a contact starts with E show it in errored state
						if (contact.firstName.startsWith("E")) {
							results.push(this.createResultErrored(contact));
						} else {
							results.push(this.createResultLoading(contact));
						}
					}
				}
			} catch (err) {
				console.error(err);
			}
		}
	}

	/**
	 * Create a search result.
	 * @param contact The contact.
	 * @returns The search result.
	 */
	private createResult(contact: Partial<ContactFull>): HomeSearchResult {
		const fullName = `${contact.firstName} ${contact.lastName}`;
		const details: ListPairs[] = [];
		if (contact.email) {
			details.push([["E-mail", contact.email]]);
		}
		return {
			key: `contact-${contact.id}`,
			title: fullName,
			label: "Information",
			actions: [],
			data: {
				providerId: this._definition?.id,
				contact
			},
			template: CLITemplate.Contact,
			templateContent: {
				name: fullName,
				details
			}
		};
	}

	/**
	 * Create a search result in loading state.
	 * @param contact The contact.
	 * @returns The search result.
	 */
	private createResultLoading(contact: Contact): HomeSearchResult {
		const fullName = `${contact.firstName} ${contact.lastName}`;
		return {
			key: `contact-${contact.id}`,
			title: fullName,
			label: "Information",
			actions: [],
			data: {
				providerId: this._definition?.id,
				contact,
				state: "loading"
			},
			template: CLITemplate.Loading,
			templateContent: ""
		};
	}

	/**
	 * Create a search result in errored state.
	 * @param contact The contact.
	 * @returns The search result.
	 */
	private createResultErrored(contact: Contact): HomeSearchResult {
		const fullName = `${contact.firstName} ${contact.lastName}`;
		return {
			key: `contact-${contact.id}`,
			title: fullName,
			label: "Information",
			actions: [],
			data: {
				providerId: this._definition?.id,
				contact,
				state: "error"
			},
			template: CLITemplate.Error,
			templateContent: "Unable to load data"
		};
	}
}
