  function init() {
    if (window.fdc3) {
        let userNameContainers = document.getElementsByClassName("username");

        function setContact(ctx) {
            for(let i = 0; i < userNameContainers.length; i++) {
                userNameContainers[i].innerText = ctx.name;
            }
        }

        const contextHandler = (ctx) => {
          console.log("Context Received: ", ctx);
          if (ctx.type === "fdc3.contact") {
            setContact(ctx);
          }
        };
    
        const contextListener = window.fdc3.addContextListener(contextHandler);
    
        const intentListener = window.fdc3.addIntentListener('ViewContact', contextHandler);
    }
  }
window.addEventListener('DOMContentLoaded', init);