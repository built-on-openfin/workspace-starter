/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
let showInstrument = document.getElementById("selectInstrument");

showInstrument.onclick = () => {
  document.getElementById("myDropdown").classList.toggle("show");
};

// Close the dropdown menu if the user clicks outside of it
window.onclick = async function (event) {
  if (!event.target.matches(".dropbtn")) {
    let selectedInstrument = event.target.getAttribute("data-ticker");

    if (selectedInstrument !== null) {
      console.log("Instrument selected: " + selectedInstrument);
      if (window.fin !== undefined) {
        let latestContext = {
          type: "fdc3.instrument",
          id: { ticker: selectedInstrument }
        };

        let fdc3SystemChannel = await fdc3.getCurrentChannel();
        if (fdc3SystemChannel !== null) {
          window.fdc3.broadcast(latestContext);
        }

        // get app channel
        const appChannel = await window.fdc3.getOrCreateChannel("application-specific-channel");
        appChannel.broadcast(latestContext);
      }
    }
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function setInstrument(ctx) {
  let container = document.getElementById("instrument-container");
  let instrumentMap = {
    TSLA: "TESLA",
    MSFT: "Microsoft",
    AAPL: "Apple"
  };
  let name = document.getElementById("name");
  let ticker = document.getElementById("ticker");
  let type = document.getElementById("type");

  container.style.display = "unset";
  if (ctx.id !== undefined && ctx.id.ticker !== undefined) {
    name.innerText = instrumentMap[ctx.id.ticker] || ctx.id.ticker;
    ticker.innerText = ctx.id.ticker;
    type.innerText = ctx.type;
  } else {
    name.innerText = "";
    ticker.innerText = "";
    type.innerText = "";
  }
}

async function init() {
  if (window.fdc3 !== undefined) {
    const contextHandler = ctx => {
      console.log("Context Received: ", ctx);
      if (ctx.type === "instrument" || ctx.type === "fdc3.instrument") {
        setInstrument(ctx);
      }
    };

    const contextListener = window.fdc3.addContextListener(contextHandler);

    const intentListener = window.fdc3.addIntentListener("ShowInstrument", contextHandler);
    const intentPageListener = window.fdc3.addIntentListener("ShowInstrumentForPage", contextHandler);

    // create application specific channel that works across views
    const appChannel = await window.fdc3.getOrCreateChannel("application-specific-channel");
    // get the current context of the channel
    const current = await appChannel.getCurrentContext();

    if (current !== undefined && current !== null) {
      contextHandler(current);
    }

    // add a listener
    appChannel.addContextListener(null, contextHandler);
  }
}

window.test = ctx => {
  setInstrument(ctx);
};
document.addEventListener("DOMContentLoaded", () => {
  init();
});
