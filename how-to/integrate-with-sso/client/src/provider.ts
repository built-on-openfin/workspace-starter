
import { init as initialisePlatform } from './platform';
import { init as bootstrap } from './bootstrapper';
import { fin } from '@openfin/core';

window.addEventListener('DOMContentLoaded', async () => {
  const platform = fin.Platform.getCurrentSync();

  await platform.once('platform-api-ready', bootstrap.bind(this));

  await initialisePlatform();
});

export function logInformation(info: string) {
  const logElem = document.querySelector("#logOutput");

  logElem.textContent = logElem.textContent + "\n" + info;
  logElem.scrollTop = logElem.scrollHeight;
}