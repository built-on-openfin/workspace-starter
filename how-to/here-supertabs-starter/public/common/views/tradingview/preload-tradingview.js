if (window === window.top) {
	console.log('Trading view preload loaded');

	window.addEventListener('DOMContentLoaded', async () => {
		if (window.fin !== undefined && window.fdc3 !== undefined) {
			window.fdc3.addContextListener((ctx) => {
				console.log('Received context:', ctx);
				if (ctx.type === 'instrument' || ctx.type === 'fdc3.instrument') {
					const view = fin.View.getCurrentSync();
					navigate(view, ctx.id.ticker);
				}
			});
		}
	});
}

/**
 * Navigate to the specified ticker.
 * @param view The view to navigate.
 * @param ticker The ticker to use.
 */
function navigate(view, ticker) {
	const urlParams = new URLSearchParams(window.location.search);
	const currentSymbol = urlParams.get('symbol');
	console.log(`Navigate called. currentSymbol: ${currentSymbol}`);
	if (
		currentSymbol !== undefined &&
		currentSymbol !== null &&
		currentSymbol.length > 0 &&
		currentSymbol.toLowerCase() !== ticker.toLowerCase()
	) {
		view
			.navigate(`https://www.tradingview.com/chart/?symbol=${ticker}`)
			.then((x) => console.log(`Navigated view to ticker: ${ticker}`))
			.catch((err) => console.log(`error navigating view to ticker: ${ticker} error: ${err}`));
	}
}
