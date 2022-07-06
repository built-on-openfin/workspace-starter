// -------------------------------------------------
// Interop Functions
// -------------------------------------------------
export async function fireIntent(log, intent, context, app) {
	if (window.fin !== undefined) {
		log(`Firing intent ${intent} with context`, context);
		const intentRequest = {
			name: intent,
			context,
			metadata: {
				target: app
			}
		};
		const intentResolver = await fin.me.interop.fireIntent(intentRequest, app);
		if (intentResolver !== undefined) {
			log('Intent resolver received: ', intentResolver);
		}
	}
}

export async function fireIntentForContext(log, context, app) {
	if (window.fin !== undefined) {
		if (app === undefined) {
			log(`Firing intent for context ${context.type}:`, context);
		} else {
			log(`Firing intent for context ${context.type} and targeting app: ${app}. Context: `, context);
		}
		context.metadata = {
			target: app
		};

		const intentResolver = await fin.me.interop.fireIntentForContext(context);
		if (intentResolver !== undefined) {
			log('Intent resolver received: ', intentResolver);
		}
	}
}

export async function listen(log, intentList, onChange) {
	if (
		window.fin !== undefined &&
		// ----------------------------------------------------
		// Listening code
		// ----------------------------------------------------
		intentList.length > 0
	) {
		log('View Manifest/Defaults specified following intents: ', intentList);
		try {
			for (let i = 0; i < intentList.length; i++) {
				await fin.me.interop.registerIntentHandler((passedIntent) => {
					log(`Received Context For Intent: ${passedIntent.name}`, passedIntent.context);
					onChange();
				}, intentList[i]);
			}
		} catch (error) {
			log(
				'Error while trying to register an intent handler. It may be this platform does not have a custom broker implementation with Intent support.',
				error
			);
			onChange();
		}
	}
}
