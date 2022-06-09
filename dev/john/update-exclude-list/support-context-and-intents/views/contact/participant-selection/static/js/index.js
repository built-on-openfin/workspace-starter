    function init() {
        if (window.fdc3) {

            let selectButtons = document.getElementsByClassName("action-select");
            let raiseIntentButtons = document.getElementsByClassName("action-raise-intent");
            let contacts = {
              "john": {
                type: "fdc3.contact",
                name: "John McHugh",
                id: {
                  email: "john.mchugh@gmail.com"
                }
              },
              "james": {
                type: "fdc3.contact",
                name: "James Bond",
                id: {
                  email: "bond_james@grandhotels.com"
                }
              },
              "avi": {
                type: "fdc3.contact",
                name: "Avi Green",
                id: {
                  email: "agreen@uog.com"
                }
              },
              "ashley": {
                type: "fdc3.contact",
                name: "Ashley James",
                id: {
                  email: "ajames@uog.com"
                }
              }
            };
            function selectParticipant(event) {
              let contact = contacts[event.target.dataset.contact];
              if(contact !== undefined){
                window.fdc3.broadcast(contact);
              }
            }

            function raiseIntent(event) {
              let contact = contacts[event.target.dataset.contact];
              if(contact !== undefined){
                window.fdc3.raiseIntent("ViewContact", contact);
              }
            }

            for(let i = 0; i < selectButtons.length; i++) {
              selectButtons[i].onclick = selectParticipant;
            }

            for(let i = 0; i < raiseIntentButtons.length; i++) {
              raiseIntentButtons[i].onclick = raiseIntent;
            }
        }
      }
    window.addEventListener('DOMContentLoaded', init);