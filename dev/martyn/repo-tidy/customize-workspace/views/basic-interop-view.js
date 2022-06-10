/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
const showInstrument = document.querySelector('#selectInstrument');

showInstrument.addEventListener('click', () => {
  document.querySelector('#myDropdown').classList.toggle('show');
});

// Close the dropdown menu if the user clicks outside of it
window.addEventListener('click', (event) => {
  if (!event.target.matches('.dropbtn')) {
    const selectedInstrument = event.target.dataset.ticker;

    if (selectedInstrument !== null) {
      console.log(`Instrument selected: ${selectedInstrument}`);
      if (window.fin !== undefined) {
        window.fin.me.interop.setContext({
          type: 'fdc3.instrument',
          id: { ticker: selectedInstrument }
        });
      }
    }
    const dropdowns = document.querySelectorAll('.dropdown-content');
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
});

function setInstrument(ctx) {
  const container = document.querySelector('#instrument-container');
  const instrumentMap = {
    TSLA: 'TESLA',
    MSFT: 'Microsoft',
    AAPL: 'Apple'
  };
  const name = document.querySelector('#name');
  const ticker = document.querySelector('#ticker');
  const type = document.querySelector('#type');

  container.style.display = 'unset';
  if (ctx.id !== undefined && ctx.id.ticker !== undefined) {
    name.textContent = instrumentMap[ctx.id.ticker] || ctx.id.ticker;
    ticker.textContent = ctx.id.ticker;
    type.textContent = ctx.type;
  } else {
    name.textContent = '';
    ticker.textContent = '';
    type.textContent = '';
  }
}

async function init() {
  if (window.fin !== undefined) {
    const contextHandler = (ctx) => {
      console.log('Context Received:', ctx);
      if (ctx.type === 'instrument' || ctx.type === 'fdc3.instrument') {
        setInstrument(ctx);
      }
    };

    window.fin.me.interop.addContextHandler(contextHandler);

    await fin.me.interop.registerIntentHandler((intent) => {
      contextHandler(intent.context);
    }, 'ShowInstrument');
    await fin.me.interop.registerIntentHandler((intent) => {
      contextHandler(intent.context);
    }, 'ShowInstrumentForPage');
  }
}

window.test = (ctx) => {
  setInstrument(ctx);
};
document.addEventListener('DOMContentLoaded', () => {
  init();
});
