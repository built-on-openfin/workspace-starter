
import { init as workspacePlatformInit } from '@openfin/workspace-platform';
import { register, deregister, show, hide } from './store';

async function init() {
  await workspacePlatformInit({
    browser: {}
  });
  let registerStore = document.getElementById("register");
  let showStore = document.getElementById("show");
  let hideStore = document.getElementById("hide");
  let deregisterStore = document.getElementById("deregister");

  registerStore.onclick = async ()=> {
    await register();
    showStore.style.display = "unset";
    hideStore.style.display = "unset";
    deregisterStore.style.display = "unset";
    registerStore.style.display = "none";
  };

  deregisterStore.onclick = async ()=> {
    showStore.style.display = "none";
    hideStore.style.display = "none";
    deregisterStore.style.display = "none";
    registerStore.style.display = "unset";
    await deregister();
  };

  showStore.onclick = async ()=> {
    await show();
  };

  hideStore.onclick = async ()=> {
    await hide();
  };
}

window.addEventListener('DOMContentLoaded', async () => {
  await init();
});