
import { init as initialisePlatform } from './platform';
import { init as bootstrap } from './bootstrapper';
import { fin } from 'openfin-adapter/src/mock';

window.addEventListener('DOMContentLoaded', async () => {
  const platform = fin.Platform.getCurrentSync();
  platform.once('platform-api-ready', bootstrap.bind(this));
  try {
    await initialisePlatform();
  } catch (err) {
    const title = 'Failed to start Workspace platform';
    const body = `<p>An error has occurred during Workspace platform initialization:</p><p class="error">${(err as Error).message}.</p><p>Please check your configuration and try again.</p>`;
    const window = await fin.Window.create({
      alwaysOnTop: true,
      maximizable: false,
      minimizable: false,
      autoShow: true,
      defaultCentered: true,
      defaultHeight: 250,
      defaultWidth: 500,
      includeInSnapshots: false,
      name: 'popup',
      resizable: false,
      saveWindowState: false,
      shadow: true,
      smallWindow: true,
      showTaskbarIcon: false,
      url: `/popup.html?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`,
    });
    window.addListener('closed', () => platform.Application.close(true));
    await window.focus();
  }
});