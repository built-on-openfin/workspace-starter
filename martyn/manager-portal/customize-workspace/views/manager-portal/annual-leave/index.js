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

    updateMember();
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
    const teamMember = fcd3Contact ? teamData.find(m => m.id === fcd3Contact.id.FDS_ID) : undefined;

    smallCalendar.setDayStates(teamMember?.leave?.approved, teamMember?.leave?.awaitingApproval)
    largeCalendar.setDayStates(teamMember?.leave?.approved, teamMember?.leave?.awaitingApproval)

    const todayFull = new Date();
    const today = (new Date(todayFull.getFullYear(), todayFull.getMonth(), todayFull.getDate())).getTime();

    const alloted = teamMember?.leave?.alloted ?? 0;
    const approved = teamMember?.leave?.approved?.length ?? 0;
    const awaitingApproval = teamMember?.leave?.awaitingApproval?.length ?? 0;

    let used = 0;
    let nextOnLeave = -1;
    if (approved > 0) {
        for (const approvedDate of teamMember?.leave?.approved) {
            const dt = approvedDate.split("-");
            const date = new Date(Number.parseInt(dt[0], 10), Number.parseInt(dt[1], 10) - 1, Number.parseInt(dt[2], 10));

            const t = date.getTime();
            if (t < today) {
                used++;
            } else if (nextOnLeave === -1 || t < nextOnLeave) {
                nextOnLeave = t;
            }
        }
    }

    document.querySelector("#remainingLeaveDays").innerText = alloted - approved;
    document.querySelector("#allotedLeaveDays").innerText = alloted;
    document.querySelector("#leaveDays").innerText = used;
    document.querySelector("#awaitingApproval").innerText = awaitingApproval;

    const lastUpdated = teamMember?.leave?.lastUpdated ?? 0;
    document.querySelector("#lastUpdated").innerText = lastUpdated > 0 ? `Last Updated: ${new Date(lastUpdated).toLocaleString()}` : "";

    let nextOnLeaveText = "";
    if (nextOnLeave >= 0) {
        const diff = Math.ceil((nextOnLeave - today) / 86400000);
        nextOnLeaveText = `Next on leave in ${diff} days`;
    }

    document.querySelector("#nextOnLeave").innerText = nextOnLeaveText;

    smallCalendar.reset();
    largeCalendar.reset();
}

