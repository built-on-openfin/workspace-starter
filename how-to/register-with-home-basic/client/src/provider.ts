import { init as workspacePlatformInit } from "@openfin/workspace-platform";
import { register, show, hide, deregister } from "./home";

async function init() {
  await workspacePlatformInit({
    browser: {}
  });
  const registerHome = document.querySelector<HTMLButtonElement>("#register");
  const deregisterHome = document.querySelector<HTMLButtonElement>("#deregister");
  const showHome = document.querySelector<HTMLButtonElement>("#show");
  const hideHome = document.querySelector<HTMLButtonElement>("#hide");

  registerHome.addEventListener("click", async () => {
    await register();
    showHome.style.display = "unset";
    hideHome.style.display = "unset";
    deregisterHome.style.display = "unset";
    registerHome.style.display = "none";
  });

  deregisterHome.addEventListener("click", async () => {
    showHome.style.display = "none";
    hideHome.style.display = "none";
    deregisterHome.style.display = "none";
    registerHome.style.display = "unset";
    await deregister();
  });

  showHome.addEventListener("click", async () => {
    await show();
  });

  hideHome.addEventListener("click", async () => {
    await hide();
  });
}

window.addEventListener("DOMContentLoaded", async () => {
  await init();
});
