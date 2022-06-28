import {
  CLITemplate,
  type HomeDispatchedSearchResult,
  type CLIFilter,
  type HomeSearchListenerResponse,
  type HomeSearchResponse,
  type HomeSearchResult
} from "@openfin/workspace";
import type { Integration, IntegrationManager, IntegrationModule } from "../../integrations-shapes";
import { createHelp } from "../../templates";
import type { AsyncSettings, Contact, ContactFull, ContactsResult } from "./shapes";

/**
 * Implement the integration provider for async results.
 */
export class AsyncIntegrationProvider implements IntegrationModule<AsyncSettings> {
  /**
   * Provider id.
   * @internal
   */
  private static readonly _PROVIDER_ID = "async";

  /**
   * The key to use for a async result.
   * @internal
   */
  private static readonly _ASYNC_PROVIDER_DETAILS_ACTION = "Async Details";

  /**
   * The integration manager.
   * @internal
   */
  private _integrationManager: IntegrationManager | undefined;

  /**
   * The module is being registered.
   * @param integrationManager The manager for the integration.
   * @param integration The integration details.
   * @returns Nothing.
   */
  public async register(
    integrationManager: IntegrationManager,
    integration: Integration<AsyncSettings>
  ): Promise<void> {
    this._integrationManager = integrationManager;
  }

  /**
   * The module is being deregistered.
   * @param integration The integration details.
   * @returns Nothing.
   */
  public async deregister(integration: Integration<AsyncSettings>): Promise<void> {}

  /**
   * Get a list of the static application entries.
   * @param integration The integration details.
   * @returns The list of application entries.
   */
  public async getAppSearchEntries(integration: Integration<AsyncSettings>): Promise<HomeSearchResult[]> {
    return [];
  }

  /**
   * Get a list of the static help entries.
   * @param integration The integration details.
   * @returns The list of help entries.
   */
  public async getHelpSearchEntries?(integration: Integration<AsyncSettings>): Promise<HomeSearchResult[]> {
    return [
      {
        key: `${AsyncIntegrationProvider._PROVIDER_ID}-help1`,
        title: "/contacts-sync",
        label: "Help",
        actions: [],
        data: {
          providerId: AsyncIntegrationProvider._PROVIDER_ID
        },
        template: CLITemplate.Custom,
        templateContent: createHelp(
          "/contacts-sync",
          [
            "The contacts-sync command can be used to search for a contact.",
            "It demonstrates how a long running retrieval would have to wait for the response before anything is display.",
            "For example to search for a contact containing the letter a."
          ],
          ["/contacts-sync a"]
        )
      },
      {
        key: `${AsyncIntegrationProvider._PROVIDER_ID}-help2`,
        title: "/contacts-partial",
        label: "Help",
        actions: [],
        data: {
          providerId: AsyncIntegrationProvider._PROVIDER_ID
        },
        template: CLITemplate.Custom,
        templateContent: createHelp(
          "/contacts-partial",
          [
            "The contacts-partial command can be used to search for a contact.",
            "It demonstrates how we would display results instantly while asynchronously retrieving all the results.",
            "For example to search for a contact containing the letter a."
          ],
          ["/contacts-partial a"]
        )
      },
      {
        key: `${AsyncIntegrationProvider._PROVIDER_ID}-help3`,
        title: "/contacts",
        label: "Help",
        actions: [],
        data: {
          providerId: AsyncIntegrationProvider._PROVIDER_ID
        },
        template: CLITemplate.Custom,
        templateContent: createHelp(
          "/contacts",
          [
            "The contacts command can be used to search for a contact.",
            "It demonstrates how we would display results instantly and only retrieve full data on entry selection.",
            "Contacts starting with E will show error on first load.",
            "For example to search for a contact containing the letter a."
          ],
          ["/contacts a", "/contacts e"]
        )
      }
    ];
  }

  /**
   * An entry has been selected.
   * @param integration The integration details.
   * @param result The dispatched result.
   * @param lastResponse The last response.
   * @returns True if the item was handled.
   */
  public async itemSelection(
    integration: Integration<AsyncSettings>,
    result: HomeDispatchedSearchResult,
    lastResponse: HomeSearchListenerResponse
  ): Promise<boolean> {
    const data: { url?: string } = result.data;

    if (
      result.action.trigger === "user-action" &&
      result.action.name === AsyncIntegrationProvider._ASYNC_PROVIDER_DETAILS_ACTION &&
      data.url &&
      this._integrationManager.openUrl
    ) {
      await this._integrationManager.openUrl(data.url);
      return true;
    } else if (
      (result.action.trigger === "focus-change" && result.data?.state === "loading") ||
      (result.action.trigger === "reload" && result.data?.state === "error")
    ) {
      setTimeout(async () => {
        const contactResponse = await fetch(`${integration.data?.rootUrl}${result.data.contact.id}.json`);

        const contactFull: ContactFull = await contactResponse.json();

        lastResponse.respond([this.createResult(contactFull)]);
      }, 0);
    }

    return false;
  }

  /**
   * Get a list of search results based on the query and filters.
   * @param integration The integration details.
   * @param query The query to search for.
   * @param filters The filters to apply.
   * @param lastResponse The last search response used for updating existing results.
   * @returns The list of results and new filters.
   */
  public async getSearchResults(
    integration: Integration<AsyncSettings>,
    query: string,
    filters: CLIFilter[],
    lastResponse: HomeSearchListenerResponse
  ): Promise<HomeSearchResponse> {
    const results: HomeSearchResult[] = [];

    if (query.startsWith("/contacts-sync ")) {
      await this.contactsSync(query.slice(15), integration, results);
    } else if (query.startsWith("/contacts-partial ")) {
      await this.contactsPartial(query.slice(18), integration, results, lastResponse);
    } else if (query.startsWith("/contacts ")) {
      await this.contactsAsync(query.slice(10), integration, results, lastResponse);
    }

    return {
      results
    };
  }

  /**
   * Retrieve the contacts in a synchronous manner.
   * @param query The query to search for
   * @param integration The integration details.
   * @param results The result list to populate.
   */
  private async contactsSync(query: string, integration: Integration<AsyncSettings>, results: HomeSearchResult[]) {
    const wildcard = query.trim().toLowerCase();

    if (wildcard.length > 0) {
      try {
        const response = await fetch(`${integration.data?.rootUrl}index.json`);

        const json: ContactsResult = await response.json();

        for (const contact of json.data) {
          if (contact.firstName.toLowerCase().includes(wildcard) || contact.lastName.toLowerCase().includes(wildcard)) {
            const contactResponse = await fetch(`${integration.data?.rootUrl}${contact.id}.json`);

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
   * @param integration The integration details.
   * @param results The result list to populate.
   * @param lastResponse The last response to use for updating results.
   */
  private async contactsPartial(
    query: string,
    integration: Integration<AsyncSettings>,
    results: HomeSearchResult[],
    lastResponse: HomeSearchListenerResponse
  ) {
    const wildcard = query.trim().toLowerCase();

    if (wildcard.length > 0) {
      try {
        const response = await fetch(`${integration.data?.rootUrl}index.json`);

        const json: ContactsResult = await response.json();
        const finalContacts = [];

        for (const contact of json.data) {
          if (contact.firstName.toLowerCase().includes(wildcard) || contact.lastName.toLowerCase().includes(wildcard)) {
            finalContacts.push(contact);
            results.push(this.createResult(contact));
          }
        }

        setTimeout(async () => {
          for (const contact of finalContacts) {
            const contactResponse = await fetch(`${integration.data?.rootUrl}${contact.id}.json`);

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
   * @param integration The integration details.
   * @param results The result list to populate.
   * @param lastResponse The last response to use for updating results.
   */
  private async contactsAsync(
    query: string,
    integration: Integration<AsyncSettings>,
    results: HomeSearchResult[],
    lastResponse: HomeSearchListenerResponse
  ) {
    const wildcard = query.trim().toLowerCase();

    if (wildcard.length > 0) {
      try {
        const response = await fetch(`${integration.data?.rootUrl}index.json`);

        const json: ContactsResult = await response.json();
        const finalContacts = [];

        for (const contact of json.data) {
          if (contact.firstName.toLowerCase().includes(wildcard) || contact.lastName.toLowerCase().includes(wildcard)) {
            finalContacts.push(contact);
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
    const details = [];
    if (contact.email) {
      details.push(["E-mail", contact.email]);
    }
    return {
      key: `contact-${contact.id}`,
      title: fullName,
      label: "Information",
      actions: [],
      data: {
        providerId: AsyncIntegrationProvider._PROVIDER_ID,
        contact
      },
      template: CLITemplate.Contact,
      templateContent: {
        name: fullName,
        details: [details]
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
        providerId: AsyncIntegrationProvider._PROVIDER_ID,
        contact,
        state: "loading"
      },
      template: CLITemplate.Loading,
      templateContent: undefined
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
        providerId: AsyncIntegrationProvider._PROVIDER_ID,
        contact,
        state: "error"
      },
      template: CLITemplate.Error,
      templateContent: "Unable to load data"
    };
  }
}
