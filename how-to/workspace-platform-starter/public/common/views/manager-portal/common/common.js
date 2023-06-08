export const MANAGER_PORTAL_CHANNEL = 'manager-portal-channel';

/**
 * Build a url.
 * @param folder The folder to include.
 * @param filename The filename to include.
 * @returns The new url.
 */
export function buildUrl(folder, filename) {
	const path = window.location.pathname.split('/');
	path.pop(); // Remove the index.html
	path.pop(); // Remove the current view folder
	path.push(folder); // Add data folder
	path.push(filename); // Add filename
	return path.join('/');
}

/**
 * Load the data.
 * @param filename The filename to load for data.
 * @returns The data.
 */
export async function loadData(filename) {
	const response = await fetch(buildUrl('data', filename));
	return response.json();
}

/**
 * Load the team data.
 * @returns The team data.
 */
export async function loadTeamData() {
	return loadData('team.json');
}

/**
 * Load the company comms information.
 * @returns The data.
 */
export async function loadCompanyComms() {
	return loadData('company-comms.json');
}

/**
 * Initialize the FDC3 listener.
 * @param contextHandler The handler.
 */
export async function initFdc3Listener(contextHandler) {
	if (window.fdc3 !== undefined) {
		// create application specific channel that works across views
		const appChannel = await window.fdc3.getOrCreateChannel(MANAGER_PORTAL_CHANNEL);

		// add a listener
		appChannel.addContextListener(null, contextHandler);
	}
}

/**
 * Broadcast an FDC3 context.
 * @param context The context to broadcast.
 */
export async function broadcastFdc3(context) {
	if (window.fdc3 !== undefined) {
		const appChannel = await window.fdc3.getOrCreateChannel(MANAGER_PORTAL_CHANNEL);
		appChannel.broadcast(context);
	}
}
