import { initFdc3Listener, loadTeamData } from "../common/common.js";
import { Calendar } from "../common/calendar.js";

document.addEventListener("DOMContentLoaded", () => {
    init();
});

let teamData;
let smallCalendar = new Calendar("smallCalendar", "small");
let largeCalendar = new Calendar("largeCalendar", "large");

async function init() {
    teamData = await loadTeamData();

    await initDom();
    await initFdc3Listener(handleContext);
}

async function initDom() {
    smallCalendar.init((year, month, day, monthNamesLong) => {
        document.querySelector(".currentMonthYear").innerText = monthNamesLong[month] + " " + year;
    });
    largeCalendar.init();

    document.querySelector("#monthYearPrevious").addEventListener("click", () => {
        smallCalendar.monthIncrement(-1);
        largeCalendar.monthIncrement(-1);
    });
    document.querySelector("#monthYearNext").addEventListener("click", () => {
        smallCalendar.monthIncrement(1);
        largeCalendar.monthIncrement(1);
    })
}

function handleContext(ctx) {
    if (ctx.type === "fdc3.contact") {
        updateMember(ctx)
    }
}

function updateMember(fcd3Contact) {
    const teamMember = teamData.find(m => m.id === fcd3Contact.id.FDS_ID);

    smallCalendar.setDayStates(teamMember?.leave?.used, teamMember?.leave?.approved, teamMember?.leave?.awaitingApproval)
    largeCalendar.setDayStates(teamMember?.leave?.used, teamMember?.leave?.approved, teamMember?.leave?.awaitingApproval)

    const alloted = teamMember?.leave?.alloted ?? 0;
    const used = teamMember?.leave?.used?.length ?? 0;
    const approved = teamMember?.leave?.approved?.length ?? 0;
    const awaitingApproval = teamMember?.leave?.awaitingApproval?.length ?? 0;

    document.querySelector("#remainingLeaveDays").innerText = alloted - (used + approved);
    document.querySelector("#allotedLeaveDays").innerText = alloted;
    document.querySelector("#leaveDays").innerText = used;
    document.querySelector("#awaitingApproval").innerText = awaitingApproval;
    document.querySelector("#lastUpdated").innerText = alloted - (used + approved);

    const lastUpdated = teamMember?.leave?.lastUpdated ?? 0;
    document.querySelector("#lastUpdated").innerText = lastUpdated > 0 ? `Last Updated: ${new Date(lastUpdated).toLocaleString()}` : "";

    let nextOnLeave = teamMember?.leave?.approved?.length > 0 ? teamMember?.leave?.approved[0] : undefined;
    let nextOnLeaveText = "";
    if (nextOnLeave) {
        const nextDate = new Date(nextOnLeave).getTime();
        const now = Date.now();

        const diff = Math.ceil((nextDate - now) / 86400000);
        nextOnLeaveText = `Next on leave in ${diff} days`;
    }

    document.querySelector("#nextOnLeave").innerText = nextOnLeaveText;

    smallCalendar.reset();
    largeCalendar.reset();
}

