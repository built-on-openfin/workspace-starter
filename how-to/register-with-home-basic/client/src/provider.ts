import { init as workspacePlatformInit } from '@openfin/workspace-platform';
import { register, show, hide, deregister } from './home';

async function init() {
  await workspacePlatformInit({
    licenseKey: 'license-key-goes-here',
    browser: {}
  });
  let registerHome = document.getElementById("register");
  let deregisterHome = document.getElementById("deregister");
  let showHome = document.getElementById("show");
  let hideHome = document.getElementById("hide");

  registerHome.onclick = async ()=> {
    await register();
    showHome.style.display = "unset";
    hideHome.style.display = "unset";
    deregisterHome.style.display = "unset"
    registerHome.style.display = "none";
  };

  deregisterHome.onclick = async ()=> {
    showHome.style.display = "none";
    hideHome.style.display = "none";
    deregisterHome.style.display = "none"
    registerHome.style.display = "unset";
    await deregister();
  }

  showHome.onclick = async ()=> {
    await show();
  };

  hideHome.onclick = async ()=> {
    await hide();
  };
}

window.addEventListener('DOMContentLoaded', async () => {
  await init();
});