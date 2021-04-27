import { subscribe } from "@openfin/search-api";

import { SearchTopic } from './search-topics';
import { browserPlatformUUID } from "./browser";

import pullSearchProvider from "./search-providers/pull";
import pushSearchProvider from "./search-providers/push";
import appsSearchProvider from "./search-providers/apps";

(async () => {
  /**
   * When the app starts, subscribe to the default search topic for Home/Browser.
   */
  const searchTopic = await subscribe({ uuid: browserPlatformUUID, topic: SearchTopic.All });

  /**
   * Register our all general search providers for the sample application.
   * 
   * In general, search providers can return data in two fashions. The first registered
   * search provider uses a pull architecture, while the second uses a push architecture.
   */
  await searchTopic.register(pullSearchProvider);
  await searchTopic.register(pushSearchProvider);

  /**
   * Also subscribe to the apps search topic for Home/Browser.
   */
  const appsSearchTopic = await subscribe({ uuid: browserPlatformUUID, topic: SearchTopic.Apps });

  /**
   * Register the apps search provider so a user can launch the Emojipedia app
   * from the Home `Launch` view.
   */
  await appsSearchTopic.register(appsSearchProvider);
})();
