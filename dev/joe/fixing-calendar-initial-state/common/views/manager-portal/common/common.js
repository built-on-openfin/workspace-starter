export const MANAGER_PORTAL_CHANNEL = 'manager-portal-channel';

export function buildUrl(folder, filename) {
	const path = window.location.pathname.split('/');
	path.pop(); // Remove the index.html
	path.pop(); // Remove the current view folder
	path.push(folder); // Add data folder
	path.push(filename); // Add filename
	return path.join('/');
}

export async function loadData(filename) {
	const response = await fetch(buildUrl('data', filename));
	return response.json();
}

export async function loadTeamData() {
	const teamData = await loadData('team.json');
	const updatedTeamMembers = [];
	// For each teamMember, randomize some dates for them.
	for (const member of teamData) {
		const updated = member;
		const approvedDays = member.leave.approved;
		const awaitingDays = member.leave.awaitingApproval;
		updated.leave.approved = modifyDates(approvedDays);
		updated.leave.awaitingApproval = modifyDates(awaitingDays);
		updated.leave.lastUpdated = new Date();
		updatedTeamMembers.push(updated);
	}
	return updatedTeamMembers;
}

function modifyDates(dateArray) {
	const newDates = [];
	let lastRandDay = 0;
	let lastRandMonth = 0;
	for (let i = 0; i < dateArray.length; i++) {
		const referenceDate = new Date();
		const thisYear = referenceDate.getFullYear(); // Should be the current year.
		const thisMonth = referenceDate.getMonth(); // Should be the current year.
		const newMonthToUse = thisMonth + getRandomNum(2); // This month, +/- 1-2 months for variablility
		const newDayToUse = getRandomNum(26); // A random number from 1-26
		let newDateString = `${thisYear}-${zeroPadding(newMonthToUse)}-${zeroPadding(newDayToUse)}`;
		if (dateArray.length > 4 && i > 3) {
			// If there are more than 4 days in the array and we're on the 4th element, start making the days consecutive.
			if (lastRandDay === 0 && lastRandMonth === 0) {
				lastRandDay = newDayToUse;
				lastRandMonth = newMonthToUse;
			}
			lastRandDay++;
			newDateString = `${thisYear}-${zeroPadding(lastRandMonth)}-${zeroPadding(lastRandDay)}`;
		}
		newDates.push(newDateString);
	}
	return newDates;
}

function getRandomNum(upperBound) {
	return Math.floor(Math.random() * upperBound) + 1;
}

function zeroPadding(num) {
	return String(num).padStart(2, '0');
}

export async function loadCompanyComms() {
	return loadData('company-comms.json');
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
