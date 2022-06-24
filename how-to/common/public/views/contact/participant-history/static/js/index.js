    function init() {
        if (window.fdc3) {
            const getRandomId = () => (Math.random() * 1000000).toFixed(0);

            let userNameContainers = document.getElementsByClassName("username");
    
            function setContact(ctx) {
                let username = ctx.name + " (" + getRandomId() + ")";

                for(let i = 0; i < userNameContainers.length; i++) {
                    userNameContainers[i].innerText = username;
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