// -------------------------------------------------
// FDC3 Functions
// -------------------------------------------------
export async function systemSetContext(log, context) {
	if (window.fin !== undefined) {
		try {
			log(`set context being called on system channel:`, context);
			fin.me.interop.setContext(context);
		} catch (error) {
			log('You are not bound to a system channel and are unable to set context:', error);
		}
	}
}

export async function sessionSetContext(log, appSessionContextGroupName, context) {
	if (window.fin !== undefined && appSessionContextGroupName !== undefined) {
		const appSessionContextGroup = await fin.me.interop.joinSessionContextGroup(appSessionContextGroupName);
		log(`Setting context on session context group ${appSessionContextGroupName}`, context);
		appSessionContextGroup.setContext(context);
	}
}

export async function listenToSystemContext(log, onContextReceived) {
	if (window.fin !== undefined) {
		const systemHandler = (ctx) => {
			log('System Context Received: ', ctx);
			onContextReceived();
		};

		log('Listening for system context.');
		fin.me.interop.addContextHandler(systemHandler);
	}
}

export async function listenToSessionContext(log, appSessionContextGroupName, onContextReceived) {
	if (window.fin !== undefined && appSessionContextGroupName !== undefined) {
		// listen to a defined session context group
		const appHandler = (ctx) => {
			log('App Session Context Received: ', ctx);
			onContextReceived();
		};

		await fin.me.interop.joinSessionContextGroup(appSessionContextGroupName);

		// listen for new app channel messages
		log(`Listening for app session context group: ${appSessionContextGroupName} context.`);
		appSessionContextGroup.addContextHandler(appHandler);
	}
}
