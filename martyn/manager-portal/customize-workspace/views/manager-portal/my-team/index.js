import { broadcastFdc3, buildUrl, loadTeamData } from "../common/common.js";

document.addEventListener("DOMContentLoaded", () => {
    init();
});

let teamData;

async function init() {
    teamData = await loadTeamData();
    await initDom();
}

async function initDom() {
    const memberListElem = document.querySelector(".team-member-list");

    for (const teamMember of teamData) {
        const memberElem = document.createElement("div");
        memberElem.classList.add("row");
        memberElem.classList.add("gap10");
        memberElem.classList.add("middle");
        memberElem.classList.add("team-member-tile");

        const memberImageElem = document.createElement("img");
        memberImageElem.classList.add("team-member-avatar");
        memberImageElem.src = buildUrl("images/avatars", "avatar-" + teamMember.id + ".jpg");

        const memberInfoElem = document.createElement("div");
        memberInfoElem.classList.add("col");
        memberInfoElem.classList.add("fill");
        memberInfoElem.classList.add("gap5");

        const memberNavigateElement = document.createElement("button");
        memberNavigateElement.classList.add("team-member-navigate");
        memberNavigateElement.innerText = ">";
        memberNavigateElement.addEventListener("click", () => selectTeamMember(teamMember))

        memberElem.appendChild(memberImageElem);
        memberElem.appendChild(memberInfoElem);
        memberElem.appendChild(memberNavigateElement);

        const memberNameElem = document.createElement("button");
        memberNameElem.classList.add("team-member-name")
        memberNameElem.innerText = teamMember.name;
        memberNameElem.addEventListener("click", () => {
            fin.System.openUrlWithBrowser("mailto:" + teamMember.email);
        });
        // memberNameElem.setAttribute("href", "mailto:" + teamMember.email);

        const memberRoleElem = document.createElement("div");
        memberRoleElem.classList.add("team-member-role")
        memberRoleElem.innerText = teamMember.role;

        memberInfoElem.appendChild(memberNameElem);
        memberInfoElem.appendChild(memberRoleElem);

        memberListElem.appendChild(memberElem);
    }
}

async function selectTeamMember(member) {
    if (window.fdc3) {
        const fdc3Contact = {
            type: "fdc3.contact",
            name: member.name,
            id: {
                FDS_ID: member.id,
                email: member.email
            }
        }

        await broadcastFdc3(fdc3Contact)
    }
}