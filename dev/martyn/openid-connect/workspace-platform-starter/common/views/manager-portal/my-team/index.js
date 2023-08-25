import { addUserDates, broadcastFdc3, initFdc3Listener } from '../common/common.js';
import * as usersModule from '../common/contacts.js';

document.addEventListener('DOMContentLoaded', async () => {
	try {
		await usersModule.initialize();
		await addUserDates(usersModule.getUsers());
		await initDom();
		await initFdc3Listener(handleContext);
	} catch (err) {
		console.error(err);
	}
});

/**
 * Initialize the DOM components.
 */
async function initDom() {
	const memberListElem = document.querySelector('.team-member-list');

	const teamData = usersModule.getUsers();

	for (const teamMember of teamData) {
		const memberElem = document.createElement('div');
		memberElem.classList.add('row');
		memberElem.classList.add('gap10');
		memberElem.classList.add('middle');
		memberElem.classList.add('team-member-tile');

		const memberImageElem = document.createElement('img');
		memberImageElem.classList.add('team-member-avatar');
		memberImageElem.src = usersModule.getProfilePic(teamMember);

		const memberInfoElem = document.createElement('div');
		memberInfoElem.classList.add('col');
		memberInfoElem.classList.add('fill');
		memberInfoElem.classList.add('gap5');

		const memberNavigateElement = document.createElement('button');
		memberNavigateElement.classList.add('team-member-navigate');
		memberNavigateElement.textContent = '>';
		memberNavigateElement.addEventListener('click', async () => {
			visualSelectMemberElem(memberElem);
			await selectTeamMember(teamMember);
		});

		memberElem.append(memberImageElem);
		memberElem.append(memberInfoElem);
		memberElem.append(memberNavigateElement);

		const memberNameElem = document.createElement('button');
		memberNameElem.classList.add('team-member-name');
		memberNameElem.textContent = teamMember.name;
		memberNameElem.addEventListener('click', () => {
			fin.System.openUrlWithBrowser(`mailto:${teamMember.email}`);
		});

		const memberRoleElem = document.createElement('div');
		memberRoleElem.classList.add('team-member-role');
		memberRoleElem.textContent = teamMember.role;

		memberInfoElem.append(memberNameElem);
		memberInfoElem.append(memberRoleElem);

		memberListElem.append(memberElem);
	}

	// Select the first team member by default, this will get overridden
	// if there is a context value set
	visualSelectMemberElem(memberListElem.childNodes[0]);
	await selectTeamMember(teamData[0]);
}

/**
 * Select a team member.
 * @param member The member to select.
 */
async function selectTeamMember(member) {
	if (window.fdc3) {
		await broadcastFdc3(usersModule.userToFdc3Context(member));
	}
}

/**
 * Set the aria state for the selected member.
 * @param memberElem The member to select.
 */
function visualSelectMemberElem(memberElem) {
	const memberListElem = document.querySelector('.team-member-list');

	for (const child of memberListElem.childNodes) {
		child.setAttribute('aria-selected', false);
	}
	memberElem.setAttribute('aria-selected', true);
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

	if (teamMember) {
		const teamData = usersModule.getUsers();
		const memberListElem = document.querySelector('.team-member-list');
		visualSelectMemberElem(memberListElem.childNodes[teamData.indexOf(teamMember)]);
	}
}
