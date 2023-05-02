export function randomUUID(): string {
	if ("randomUUID" in window.crypto) {
		// eslint-disable-next-line no-restricted-syntax
		return window.crypto.randomUUID();
	}
	// Polyfill the window.crypto.randomUUID if we are running in a non secure context that doesn't have it
	// we are still using window.crypto.getRandomValues which is always available
	// https://stackoverflow.com/a/2117523/2800218
	const getRandomHex = (c) =>
		// eslint-disable-next-line no-bitwise, no-mixed-operators
		(c ^ (window.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16);
	return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, getRandomHex);
}
