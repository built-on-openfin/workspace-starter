
import { fin } from 'openfin-adapter/src/mock';

window.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get('title');
  if (title) {
    document.querySelector('title').textContent = decodeURIComponent(title);
  }
  const body = urlParams.get('body');
  if (body) {
    (document.querySelector('#body') as HTMLParagraphElement).innerHTML = decodeURIComponent(body).replace(/\n/g, '<br />');
  }
  
  // Attach close button click handler
  const platform = fin.Platform.getCurrentSync();
  const closeButton = document.querySelector('#close-btn') as HTMLButtonElement;
  closeButton.addEventListener('click', () => platform.Application.close(true));
});