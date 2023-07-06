const changeTitle = document.querySelector('#change-title');
const addContextListener = document.querySelector('#add-context-listener');
const removeContextListener = document.querySelector('#remove-context-listener');
const broadcastContext = document.querySelector('#broadcast-context');
const contextTypeReceivedLabel = document.querySelector('#context-type-received');

const originalTitle = document.title;
let contextListener;

changeTitle.addEventListener('click', () => {
	document.title = `${originalTitle} - ${Date.now()}`;
});

addContextListener.addEventListener('click', async () => {
	if (window.fdc3) {
		contextListener = await window.fdc3.addContextListener(null, (context, metaInfo) => {
			if (context !== undefined) {
				console.log('Context Received:', context);
				console.log('MetaInfo Received:', metaInfo);
				contextTypeReceivedLabel.textContent = context.type;
			}
		});
		addContextListener.disabled = true;
		removeContextListener.disabled = false;
	} else {
		console.log('FDC3 is not available.');
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
		console.log('FDC3 is not available.');
	}
});

if (window.fdc3) {
	console.log('FDC3 API available on load.');
} else {
	window.addEventListener('fdc3Ready', () => {
		console.log('FDC3 API is now available.');
	});
}
