/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
const showInstrument = document.querySelector('#selectInstrument');

showInstrument.addEventListener('click', () => {
  document.querySelector('#myDropdown').classList.toggle('show');
});

// Close the dropdown menu if the user clicks outside of it
window.addEventListener('click', async (event) => {
  if (!event.target.matches('.dropbtn')) {
    const selectedInstrument = event.target.dataset.ticker;

    if (selectedInstrument !== null) {
      console.log(`Instrument selected: ${selectedInstrument}`);
      if (window.fin !== undefined) {
        const latestContext = {
          type: 'fdc3.instrument',
          id: { ticker: selectedInstrument }
        };

        const fdc3SystemChannel = await fdc3.getCurrentChannel();
        if (fdc3SystemChannel !== null) {
          window.fdc3.broadcast(latestContext);
        }

        // get app channel
        const appChannel = await window.fdc3.getOrCreateChannel('application-specific-channel');
        appChannel.broadcast(latestContext);
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
  if (window.fdc3 !== undefined) {
    const contextHandler = (ctx) => {
      console.log('Context Received:', ctx);
      if (ctx.type === 'instrument' || ctx.type === 'fdc3.instrument') {
        setInstrument(ctx);
      }
    };

    window.fdc3.addContextListener(contextHandler);

    window.fdc3.addIntentListener('ShowInstrument', contextHandler);
    window.fdc3.addIntentListener('ShowInstrumentForPage', contextHandler);

    // create application specific channel that works across views
    const appChannel = await window.fdc3.getOrCreateChannel('application-specific-channel');
    // get the current context of the channel
    const current = await appChannel.getCurrentContext();

    if (current !== undefined && current !== null) {
      contextHandler(current);
    }

    // add a listener
    appChannel.addContextListener(null, contextHandler);
  }
}

window.test = (ctx) => {
  setInstrument(ctx);
};
document.addEventListener('DOMContentLoaded', () => {
  init();
});
