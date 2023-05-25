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
	const teamData = loadData('team.json');
	return await teamData.then((team) => {
		const teamMembers = team;
		const updatedTeamMembers = [];
		// For each teamMember, randomize some dates for them.
		for (const member of teamMembers) {
			const updated = member;
			const approvedDays = member.leave.approved
			const awaitingDays = member.leave.awaitingApproval
			updated.leave.approved = modifyDates(approvedDays);
			updated.leave.awaitingApproval = modifyDates(awaitingDays);
			updated.leave.lastUpdated = new Date();
			updatedTeamMembers.push(updated);
		}
		return updatedTeamMembers;
	}).catch((err) => {
		console.log(err);
		return teamData; // If all else fails, return the original file contents.
	});
}

function modifyDates(dateArray) {
	const newDates = []
	for (let i = 0; i < dateArray.length; i++) {
		const referenceDate = new Date();
		const thisYear = referenceDate.getFullYear(); // Should be the current year.
		const newMonthToUse = getRandomNum(11); // A random number from 1-12
		const newDayToUse = getRandomNum(28); // A random number from 1-28
		const newDateString = `${thisYear}-${newMonthToUse}-${newDayToUse}`;
		newDates.push(newDateString);
	}
	return newDates;
}

function getRandomNum(upperBound) {
	const random = Math.floor(Math.random() * upperBound) + 1;
	return zeroPadding(random, 2);
}

function zeroPadding(num, placeCount) {
	return String(num).padStart(placeCount, '0')
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
