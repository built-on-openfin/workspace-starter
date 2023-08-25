/**
 * Build a url.
 * @param folder The folder to include.
 * @param filename The filename to include.
 * @returns The new url.
 */
export function buildUrl(folder, filename) {
	const path = window.location.pathname.split('/');
	path.pop(); // Remove the index.html
	path.pop(); // Remove the current view folder
	path.push(folder); // Add data folder
	path.push(filename); // Add filename
	return path.join('/');
}

/**
 * Load the data.
 * @param filename The filename to load for data.
 * @returns The data.
 */
export async function loadData(filename) {
	const response = await fetch(buildUrl('data', filename));
	return response.json();
}

/**
 * Use the user data to create a team list.
 * @param users The user data.
 * @returns The team data.
 */
export async function addUserDates(users) {
	// For each teamMember, randomize some dates for them.
	for (const user of users) {
		user.leave = {
			alloted: 20,
			approved: [
				'2022-10-01',
				'2022-10-02',
				'2022-11-09',
				'2022-11-10',
				'2022-11-11',
				'2022-12-28',
				'2022-12-29'
			],
			awaitingApproval: ['2023-01-01'],
			lastUpdated: 1651155329598
		};
		user.role = 'CFA';

		user.leave.approved = modifyDates(user.leave.approved);
		user.leave.awaitingApproval = modifyDates(user.leave.awaitingApproval);
		user.leave.lastUpdated = Date.now();
	}
}

/**
 * Modify the dates to be based from the current date.
 * @param dateArray The dates to update.
 * @returns The updated dates.
 */
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

/**
 * Generate a random number between 0 and the upper bound.
 * @param upperBound The upper bound.
 * @returns The random number.
 */
function getRandomNum(upperBound) {
	return Math.floor(Math.random() * upperBound) + 1;
}

/**
 * Pad a string at the start with zeros.
 * @param num The number of digits to have in the string.
 * @returns The padded string.
 */
function zeroPadding(num) {
	return String(num).padStart(2, '0');
}

/**
 * Load the company comms information.
 * @returns The data.
 */
export async function loadCompanyComms() {
	return loadData('company-comms.json');
}

/**
 * Initialize the FDC3 listener.
 * @param contextHandler The handler.
 */
export async function initFdc3Listener(contextHandler) {
	if (window.fdc3 !== undefined) {
		// add a listener
		window.fdc3.addContextListener(contextHandler);
	}
}

/**
 * Broadcast an FDC3 context.
 * @param context The context to broadcast.
 */
export async function broadcastFdc3(context) {
	if (window.fdc3 !== undefined) {
		window.fdc3.broadcast(context);
	}
}
