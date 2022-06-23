function init() {
    if (window.fdc3) {

        let userNameContainers = document.getElementsByClassName("username");
        let emailContainers = document.getElementsByClassName("email");

        function setContact(ctx) {
            let username = ctx.name;
            let email = ctx.id?.email;

            for(let i = 0; i < userNameContainers.length; i++) {
                userNameContainers[i].innerText = username;
            }

            for(let i = 0; i < emailContainers.length; i++) {
                emailContainers[i].innerText = email;
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