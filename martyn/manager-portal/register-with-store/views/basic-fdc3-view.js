/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
let showInstrument = document.getElementById("selectInstrument");

showInstrument.onclick = () => {
  document.getElementById("myDropdown").classList.toggle("show");
};

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    let selectedInstrument = event.target.getAttribute("data-ticker");

    if (selectedInstrument !== null) {
      console.log("Instrument selected: " + selectedInstrument);
      if (window.fin !== undefined) {
        window.fdc3.broadcast({
          type: "fdc3.instrument",
          id: { ticker: selectedInstrument }
        });
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
    "TSLA": "TESLA",
    "MSFT": "Microsoft",
    "AAPL": "Apple"
  };
  let name = document.getElementById("name");
  let ticker = document.getElementById("ticker");
  let type = document.getElementById("type");

  container.style.display = "unset";
  if (
    ctx.id !== undefined &&
    ctx.id.ticker !== undefined &&
    instrumentMap[ctx.id.ticker] !== undefined
  ) {
    name.innerText = instrumentMap[ctx.id.ticker];
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
    window.fdc3.addContextListener((ctx) => {
      if (ctx.type === "instrument" || ctx.type === "fdc3.instrument") {
        setInstrument(ctx);
      }
    });
  }
}

window.test = (ctx) => {
  setInstrument(ctx);
};
document.addEventListener("DOMContentLoaded", () => {
  init();
});