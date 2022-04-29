export const MANAGER_PORTAL_CHANNEL = "manager-portal-channel";

export async function loadTeamData() {
    const response = await fetch(window.location.origin + "/data/team.json");
    return response.json();
}

export async function loadCompanyComms() {
    const response = await fetch(window.location.origin + "/data/company-comms.json");
    return response.json();
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
