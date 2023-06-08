import { Calendar } from '../common/calendar.js';
import { initFdc3Listener, loadTeamData } from '../common/common.js';

document.addEventListener('DOMContentLoaded', () => {
	init();
});

let teamData;
const smallCalendar = new Calendar('smallCalendar', 'small');
const largeCalendar = new Calendar('largeCalendar', 'large');

/**
 * Initialize the view.
 */
async function init() {
	teamData = await loadTeamData();

	await initDom();
	await initFdc3Listener(handleContext);

	updateMember();
}

/**
 * Initialize the DOM.
 */
async function initDom() {
	smallCalendar.init((year, month, day, monthNamesLong) => {
		document.querySelector('.currentMonthYear').textContent = `${monthNamesLong[month]} ${year}`;
	});
	largeCalendar.init();

	document.querySelector('#monthYearPrevious').addEventListener('click', () => {
		smallCalendar.monthIncrement(-1);
		largeCalendar.monthIncrement(-1);
	});
	document.querySelector('#monthYearNext').addEventListener('click', () => {
		smallCalendar.monthIncrement(1);
		largeCalendar.monthIncrement(1);
	});
}

/**
 * Handle a context.
 * @param ctx The context.
 */
function handleContext(ctx) {
	if (ctx.type === 'fdc3.contact') {
		updateMember(ctx);
	}
}

/**
 * Update a member.
 * @param fcd3Contact The contact to update.
 */
function updateMember(fcd3Contact) {
	const teamMember = fcd3Contact ? teamData.find((m) => m.id === fcd3Contact.id.FDS_ID) : undefined;

	smallCalendar.setDayStates(teamMember?.leave?.approved, teamMember?.leave?.awaitingApproval);
	largeCalendar.setDayStates(teamMember?.leave?.approved, teamMember?.leave?.awaitingApproval);

	const todayFull = new Date();
	const today = new Date(todayFull.getFullYear(), todayFull.getMonth(), todayFull.getDate()).getTime();

	const alloted = teamMember?.leave?.alloted ?? 0;
	const approved = teamMember?.leave?.approved?.length ?? 0;
	const awaitingApproval = teamMember?.leave?.awaitingApproval?.length ?? 0;

	let used = 0;
	let nextOnLeave = -1;
	if (approved > 0 && teamMember?.leave) {
		for (const approvedDate of teamMember.leave.approved) {
			const dt = approvedDate.split('-');
			const date = new Date(
				Number.parseInt(dt[0], 10),
				Number.parseInt(dt[1], 10) - 1,
				Number.parseInt(dt[2], 10)
			);

			const t = date.getTime();
			if (t < today) {
				used++;
			} else if (nextOnLeave === -1 || t < nextOnLeave) {
				nextOnLeave = t;
			}
		}
	}

	document.querySelector('#remainingLeaveDays').textContent = alloted - approved;
	document.querySelector('#allotedLeaveDays').textContent = alloted;
	document.querySelector('#leaveDays').textContent = used;
	document.querySelector('#awaitingApproval').textContent = awaitingApproval;

	const lastUpdated = teamMember?.leave?.lastUpdated ?? 0;
	document.querySelector('#lastUpdated').textContent =
		lastUpdated > 0 ? `Last Updated: ${new Date(lastUpdated).toLocaleString()}` : '';

	let nextOnLeaveText = '';
	if (nextOnLeave >= 0) {
		const diff = Math.ceil((nextOnLeave - today) / 86400000);
		nextOnLeaveText = `Next on leave in ${diff} days`;
	}

	document.querySelector('#nextOnLeave').textContent = nextOnLeaveText;

	smallCalendar.reset();
	largeCalendar.reset();
}
