import * as usersModule from '../common/contacts.js';

window.addEventListener('DOMContentLoaded', initializeDOM);

/**
 * Initialize the DOM.
 */
async function initializeDOM() {
	if (window.fdc3) {
		await usersModule.initialize();

		const users = usersModule.getUsers();

		const tbody = document.querySelector('tbody');

		for (const user of users) {
			const image = document.createElement('img');
			image.src = usersModule.getProfilePic(user);
			image.width = 28;
			image.height = 28;
			image.classList.add('profile-pic');
			image.style.borderRadius = '5px';

			const imageCell = document.createElement('td');
			imageCell.append(image);

			const dateCell = document.createElement('td');
			dateCell.textContent = user.interactionDate;

			const nameCell = document.createElement('td');
			nameCell.textContent = user.name;

			const emailCell = document.createElement('td');
			emailCell.textContent = user.email;

			const typeCell = document.createElement('td');
			typeCell.textContent = user.interactionType;

			const actionRow = document.createElement('div');
			actionRow.classList.add('row');
			actionRow.classList.add('gap10');

			const selectButton = document.createElement('button');
			selectButton.textContent = 'Select';
			selectButton.classList.add('small');
			selectButton.addEventListener('click', () => selectParticipant(user));

			const raiseIntentButton = document.createElement('button');
			raiseIntentButton.textContent = 'Raise Intent';
			raiseIntentButton.classList.add('small');
			raiseIntentButton.classList.add('secondary');
			raiseIntentButton.addEventListener('click', () => raiseIntent(user));

			const actionCell = document.createElement('td');
			actionCell.append(actionRow);

			const row = document.createElement('tr');
			row.append(imageCell);
			row.append(dateCell);
			row.append(nameCell);
			row.append(emailCell);
			row.append(typeCell);
			row.append(actionCell);

			actionRow.append(selectButton);
			actionRow.append(raiseIntentButton);

			tbody.append(row);
		}
	}
}

/**
 * Update the participant.
 * @param user The selected user.
 */
function selectParticipant(user) {
	const contact = usersModule.userToFdc3Context(user);
	if (contact !== undefined) {
		window.fdc3.broadcast(contact);
	}
}

/**
 * Raise the intent for the contact.
 * @param user The selected user.
 */
function raiseIntent(user) {
	const contact = usersModule.userToFdc3Context(user);
	if (contact !== undefined) {
		window.fdc3.raiseIntent('ViewContact', contact);
	}
}
