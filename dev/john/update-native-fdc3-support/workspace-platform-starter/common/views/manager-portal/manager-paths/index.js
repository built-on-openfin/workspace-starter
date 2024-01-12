import { initFdc3Listener, addUserDates } from '../common/common.js';
import * as usersModule from '../common/contacts.js';

document.addEventListener('DOMContentLoaded', async () => {
	try {
		await usersModule.initialize();
		const users = usersModule.getUsers();
		await addUserDates(users);
		await initDom();
		// Select the first team member by default, this will get overridden
		// by any context update
		updateMember(usersModule.userToFdc3Context(users[0]));
		await initFdc3Listener(handleContext);
	} catch (err) {
		console.error(err);
	}
});

/**
 * Initialize the DOM.
 */
function initDom() {
	document.querySelector('#btnReview').addEventListener('click', async () => {
		const plat = fin.Platform.getCurrentSync();
		await plat.createView({ target: null, url: 'https://www.expensify.com/reports' });
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
	const teamMember = usersModule.findUserByContext(fcd3Contact);

	const firstName = teamMember?.name ? teamMember?.name.split(' ')[0] : '';

	const expenseDescription = document.querySelector('#expenseDescription');
	if (firstName) {
		expenseDescription.textContent = `${firstName} has submitted a new travel expense!`;
	} else {
		expenseDescription.textContent = 'Manage your expenses';
	}
}
