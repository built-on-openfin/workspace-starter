
import { init as register, show, hide } from './store';

async function init() {
  let registerStore = document.getElementById("register");
  let showStore = document.getElementById("show");
  let hideStore = document.getElementById("hide");

  registerStore.onclick = async ()=> {
    await register();
    showStore.style.display = "unset";
    hideStore.style.display = "unset";
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