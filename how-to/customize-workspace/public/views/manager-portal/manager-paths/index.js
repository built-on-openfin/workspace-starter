import { initFdc3Listener, loadTeamData } from "../common/common.js";

document.addEventListener("DOMContentLoaded", () => {
    init();
});

let teamData;

async function init() {
    teamData = await loadTeamData();

    await initFdc3Listener(handleContext);
}

function handleContext(ctx) {
    if (ctx.type === "fdc3.contact") {
        updateMember(ctx)
    }
}

function updateMember(fcd3Contact) {
    const teamMember = teamData.find(m => m.id === fcd3Contact.id.FDS_ID);

    const firstName = teamMember?.name ? teamMember?.name.split(" ")[0] : "";

    document.querySelector("#firstName").innerText = firstName;
    document.querySelector("#reviewExpenses").style.display = firstName ? "flex" : "none";
}

