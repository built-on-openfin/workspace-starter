if (window === window.top) {
	console.log('Google preload loaded');

	const navigate = (view, ticker) => {
		const urlParams = new URLSearchParams(window.location.search);
		const currentSymbol = urlParams.get('q');
		console.log(`Navigate called. currentQuery: ${currentSymbol}`);
		if (
			currentSymbol !== undefined &&
			currentSymbol !== null &&
			currentSymbol.length > 0 &&
			currentSymbol.toLowerCase() !== ticker.toLowerCase()
		) {
			view
				.navigate(`https://www.google.com/search?q=${ticker}`)
				.then((x) => console.log(`Navigated view to ticker: ${ticker}`))
				.catch((err) => console.log(`error navigating view to ticker: ${ticker} error: ${err}`));
		}
	};

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

console.log('Google preload loaded');

const navigate = (view, ticker) => {
	const urlParams = new URLSearchParams(window.location.search);
	const currentSymbol = urlParams.get('q');
	console.log(`Navigate called. currentQuery: ${currentSymbol}`);
	if (
		currentSymbol !== undefined &&
		currentSymbol !== null &&
		currentSymbol.length > 0 &&
		!currentSymbol.toLowerCase().includes(ticker.toLowerCase())
	) {
		view
			.navigate(`https://www.google.com/search?q=${ticker}`)
			.then((x) => console.log(`Navigated view to ticker: ${ticker}`))
			.catch((err) => console.log(`error navigating view to ticker: ${ticker} error: ${err}`));
	}
};

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
