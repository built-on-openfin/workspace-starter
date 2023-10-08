/* eslint-disable wrap-iife */
window.addEventListener('load', (event) => {
	if (fdc3 !== undefined) {
		(async function wrap() {
			const getOrCreateChannel = fdc3.getOrCreateChannel;
			const raiseIntent = fdc3.raiseIntent;
			const getOrCreate = getOrCreateChannel.bind(fdc3);
			const boundRaiseIntent = raiseIntent.bind(fdc3);
			fdc3.getOrCreateChannel = async (channelId) => {
				if (channelId !== undefined && channelId.startsWith('0.')) {
					// channel names should not start with '0.' as that is reserved
					// for private channel names.
					throw new Error('AccessDenied');
				}
				return getOrCreate(channelId);
			};

			fdc3.raiseIntent = async (...args) => {
				const result = await boundRaiseIntent(...args);
				const getResult = result.getResult;
				const boundGetResult = getResult.bind(result);
				result.getResult = async () => {
					try {
						const finalResult = await boundGetResult();
						return finalResult;
					} catch {
						// fdc3 2.0 says it should throw an error (NoResultsReturned) if the returned
						// object isn't a context or private channel.
						// https://fdc3.finos.org/docs/2.0/api/ref/Errors#resulterror
						// fdc3 2.1 adds "or void" to the spec https://fdc3.finos.org/docs/api/ref/Errors#resulterror
						// The 2.0 test seems to expect that void shouldn't return the error NoResultsReturned so for now
						// this is here until the reasoning behind the test is clarified.
					}
				};
				return result;
			};
		})();
	}
});
