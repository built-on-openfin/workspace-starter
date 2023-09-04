window.addEventListener('DOMContentLoaded', async () => {
	const changeTitle = document.querySelector('#change-title');
	const addContextListener = document.querySelector('#add-context-listener');
	const removeContextListener = document.querySelector('#remove-context-listener');
	const broadcastContext = document.querySelector('#broadcast-context');
	const contextTypeReceivedLabel = document.querySelector('#context-type-received');
	const pageTitle = document.querySelector('#title');

	const title = window.fin === undefined ? 'Framed App Example (No API Injection)' : 'Framed App Example';
	document.title = title;
	pageTitle.textContent = title;
	let contextListener;

	changeTitle.addEventListener('click', () => {
		document.title = `${title} - ${Date.now()}`;
	});

	addContextListener.addEventListener('click', async () => {
		if (window.fdc3) {
			contextListener = await window.fdc3.addContextListener(null, (context, metaInfo) => {
				if (context !== undefined) {
					console.log('Example: Context Received:', context);
					console.log('Example: MetaInfo Received:', metaInfo);
					contextTypeReceivedLabel.textContent = context.type;
				}
			});
			addContextListener.disabled = true;
			removeContextListener.disabled = false;
		} else {
			console.log('Example: FDC3 is not available.');
		}
	});
	removeContextListener.disabled = true;
	removeContextListener.addEventListener('click', () => {
		if (contextListener !== undefined) {
			contextListener.unsubscribe();
			addContextListener.disabled = false;
			removeContextListener.disabled = true;
		}
	});

	broadcastContext.addEventListener('click', async () => {
		if (window.fdc3) {
			window.fdc3.broadcast({
				type: 'fdc3.instrument',
				name: 'Tesla Inc',
				id: {
					ticker: 'TSLA',
					ISIN: 'US88160R1014',
					random: `${Date.now()}`
				}
			});
		} else {
			console.log('Example: FDC3 is not available.');
		}
	});

	if (window.fdc3) {
		console.log('Example: FDC3 API available on load.');
	} else {
		window.addEventListener('fdc3Ready', () => {
			console.log('Example: FDC3 API is now available.');
		});
	}
});
