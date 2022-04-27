import {
  Home,
  CLIProvider,
  CLISearchListenerRequest,
  CLISearchListenerResponse,
  CLISearchResponse,
  CLIDispatchedSearchResult,
} from "@openfin/workspace";
import { emojiProviderGetResults, providerId as emojiProviderId, emojiProviderHandleAction } from "./emojiProvider";
import { quoteProviderGetResults, providerId as quoteProviderId, quoteProviderHandleAction } from "./quoteProvider";
import { getSettings } from "./settings";

let isHomeRegistered = false;

export async function register() {
  console.log("Initialising home.");
  let settings = await getSettings();
  if (
    settings.homeProvider === undefined ||
    settings.homeProvider.id === undefined ||
    settings.homeProvider.title === undefined
  ) {
    console.warn(
      "homeProvider: not configured in the customSettings of your manifest correctly. Ensure you have the homeProvider object defined in customSettings with the following defined: id, title"
    );
    return;
  }

  let lastResponse: CLISearchListenerResponse;

  const onUserInput = async (
    request: CLISearchListenerRequest,
    response: CLISearchListenerResponse
  ): Promise<CLISearchResponse> => {
    let query = request.query.toLowerCase();
    if (lastResponse !== undefined) {
      lastResponse.close();
    }
    lastResponse = response;
    lastResponse.open();

    const quoteResponses = await quoteProviderGetResults(settings, query);
    const emojiResponses = await emojiProviderGetResults(settings, query);

    return {
      results: quoteResponses.results.concat(emojiResponses.results)
    };
  };

  const onSelection = async (result: CLIDispatchedSearchResult) => {
    if (result.data !== undefined) {
      if (result.data.providerId === quoteProviderId) {
        quoteProviderHandleAction(result);
      } else if (result.data.providerId === emojiProviderId) {
        emojiProviderHandleAction(result);
      }
    } else {
      console.warn("Unable to execute result without data being passed");
    }
  };

  const cliProvider: CLIProvider = {
    title: settings.homeProvider.title,
    id: settings.homeProvider.id,
    icon: settings.homeProvider.icon,
    onUserInput: onUserInput,
    onResultDispatch: onSelection,
  };

  await Home.register(cliProvider);
  isHomeRegistered = true;
  console.log("Home configured.");
}

export async function show() {
  return Home.show();
}

export async function hide() {
  return Home.hide();
}

export async function deregister() {
  if (isHomeRegistered) {
    let settings = await getSettings();
    return Home.deregister(settings.homeProvider.id);
  } else {
    console.warn("Unable to deregister home as there is an indication it was never registered");
  }
}

