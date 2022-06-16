
import { init as initialisePlatform } from './platform';
import { init as bootstrap } from './bootstrapper';
import { fin } from 'openfin-adapter/src/mock';

window.addEventListener('DOMContentLoaded', async () => {
  let platform = fin.Platform.getCurrentSync();
  platform.once('platform-api-ready', bootstrap.bind(this));
  const connectPayload = { payload: 'token' };

  (async () => {
    const provider = await fin.InterApplicationBus.Channel.create('channelName');

    await provider.register('provider-action', (payload, identity) => {
      console.log('Action dispatched by client: ', identity);
      console.log('Payload sent in dispatch: ', payload);

      return { echo: "hello Prom provider" };
    });
  })();

  await initialisePlatform();
});