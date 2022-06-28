function init() {
  if (window.fdc3) {
    const contextHandler = (ctx) => {
      console.log('Context Received:', ctx);
      if (ctx.type === 'fdc3.contact') {
        setContact(ctx);
      }
    };

    window.fdc3.addContextListener(contextHandler);

    window.fdc3.addIntentListener('ViewContact', contextHandler);
  }
}

function setContact(ctx) {
  const username = ctx.name;
  const email = ctx.id?.email;

  const userNameContainers = document.querySelectorAll('.username');
  const emailContainers = document.querySelectorAll('.email');

  for (let i = 0; i < userNameContainers.length; i++) {
    userNameContainers[i].textContent = username;
  }

  for (let i = 0; i < emailContainers.length; i++) {
    emailContainers[i].textContent = email;
  }
}

window.addEventListener('DOMContentLoaded', init);
