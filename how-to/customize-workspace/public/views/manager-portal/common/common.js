export const MANAGER_PORTAL_CHANNEL = "manager-portal-channel";

export function buildUrl(folder, filename) {
    const path = window.location.pathname.split("/");
    path.pop(); // Remove the index.html
    path.pop(); // Remove the current view folder
    path.push(folder); // Add data folder
    path.push(filename); // Add filename
    return path.join("/");
}

export async function loadData(filename) {
    const response = await fetch(buildUrl("data", filename));
    return response.json();
}

export async function loadTeamData() {
    return loadData("team.json");
}

export async function loadCompanyComms() {
    return loadData("company-comms.json");
}

export async function initFdc3Listener(contextHandler) {
    if (window.fdc3 !== undefined) {
        // create application specific channel that works across views
        const appChannel = await window.fdc3.getOrCreateChannel(MANAGER_PORTAL_CHANNEL);

        // add a listener
        appChannel.addContextListener(null, contextHandler);
    }
}

export async function broadcastFdc3(context) {
    if (window.fdc3 !== undefined) {
        const appChannel = await window.fdc3.getOrCreateChannel(MANAGER_PORTAL_CHANNEL);
        appChannel.broadcast(context);
    }
}
