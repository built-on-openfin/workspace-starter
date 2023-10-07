/* eslint-disable wrap-iife */
window.addEventListener('load', (event) => {
	if (fdc3 !== undefined) {
		(async function wrap() {
			const getOrCreateChannel = fdc3.getOrCreateChannel;
			const getOrCreate = getOrCreateChannel.bind(fdc3);
			fdc3.getOrCreateChannel = async (channelId) => {
				if (channelId !== undefined && channelId.startsWith('0.')) {
					throw new Error('AccessDenied');
				}
				return getOrCreate(channelId);
			};
		})();
	}
});
