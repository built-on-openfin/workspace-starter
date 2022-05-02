import { initFdc3Listener, loadTeamData } from "../common/common.js";

document.addEventListener("DOMContentLoaded", () => {
    init();
});

let teamData;

async function init() {
    teamData = await loadTeamData();

    initDom();

    await initFdc3Listener(handleContext);

    updateMember();
}

function initDom() {
    document.querySelector("#btnReview").addEventListener("click", async () => {
        let plat = fin.Platform.getCurrentSync();
        await plat.createView({ target: null, url: "https://www.expensify.com/reports" });
    });
}

function handleContext(ctx) {
    if (ctx.type === "fdc3.contact") {
        updateMember(ctx)
    }
}

function updateMember(fcd3Contact) {
    const teamMember = fcd3Contact ? teamData.find(m => m.id === fcd3Contact.id.FDS_ID) : undefined;

    const firstName = teamMember?.name ? teamMember?.name.split(" ")[0] : "";

    console.log(firstName)

    const expenseDescription = document.querySelector("#expenseDescription");
    if (firstName) {
        expenseDescription.innerText = firstName + " has submitted a new travel expense!";
    } else {
        expenseDescription.innerText = "Manage your expenses";
    }
}

