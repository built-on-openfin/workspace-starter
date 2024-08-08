import * as usersModule from '../common/contacts.js';

window.addEventListener('DOMContentLoaded', initializeDOM);

/**
 * Initialize the DOM.
 */
async function initializeDOM() {
	const contextPicker = document.querySelector('#context-group-picker');
	if (window.fin) {
		contextPicker.style.display = fin.me.isWindow ? 'block' : 'none';
	}

	if (window.fdc3 !== undefined) {
		setupListeners();
	} else {
		window.addEventListener('fdc3Ready', async () => {
			setupListeners();
		});
	}
}

/**
 * Sets up the related fdc3 listeners once fdc3 is available.
 */
async function setupListeners() {
	try {
		await usersModule.initialize();

		window.fdc3.addContextListener(contextHandler);
		window.fdc3.addIntentListener('ViewContact', contextHandler);
		window.fdc3.addIntentListener('ViewProfile', contextHandler);
	} catch (error) {
		console.error('There was an error while setting up all of the fdc3 listeners', error);
	}
}

/**
 * Handler for setting the context.
 * @param ctx The FDC3 context.
 */
function contextHandler(ctx) {
	console.log('Context Received:', ctx);
	if (ctx.type === 'fdc3.contact') {
		setContact(ctx);
	}
}

/**
 * Update the contact details.
 * @param ctx The FDC3 context.
 */
function setContact(ctx) {
	document.title = `Participant Summary - ${ctx.name}`;
	const username = ctx.name;
	const email = ctx.id?.email;

	const user = usersModule.findUserByEmail(email);

	if (user) {
		const profilePic = document.querySelector('#profile-pic');
		profilePic.src = usersModule.getProfilePic(user);

		const ssn = document.querySelector('#ssn');
		ssn.textContent = user.ssn;

		const gender = document.querySelector('#gender');
		gender.textContent = user.gender;

		const age = document.querySelector('#age');
		age.textContent = user.age;

		const dob = document.querySelector('#dob');
		dob.textContent = user.age;

		const maritalStatus = document.querySelector('#marital-status');
		maritalStatus.textContent = user.maritalStatus;
	}

	const userNameContainers = document.querySelectorAll('#username');
	const emailContainers = document.querySelectorAll('#email');

	for (const element of userNameContainers) {
		element.textContent = username;
	}

	for (const element of emailContainers) {
		element.textContent = email;
	}
}
