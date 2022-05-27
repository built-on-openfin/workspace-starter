
import { init as initialisePlatform } from './platform';
import { init as bootstrap } from './bootstrapper';
import { fin } from 'openfin-adapter/src/mock';

window.addEventListener('DOMContentLoaded', async () => {
  let platform = fin.Platform.getCurrentSync();
  platform.once('platform-api-ready', bootstrap.bind(this));
  await initialisePlatform();
});