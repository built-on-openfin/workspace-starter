import { broadcastFdc3, buildUrl, initFdc3Listener, loadTeamData } from '../common/common.js';

document.addEventListener('DOMContentLoaded', () => {
	init();
});

let teamData;

/**
 * Initialize the view.
 */
async function init() {
	teamData = await loadTeamData();
	await initDom();
	await initFdc3Listener(handleContext);
}

/**
 * Initialize the DOM components.
 */
async function initDom() {
	const memberListElem = document.querySelector('.team-member-list');

	for (const teamMember of teamData) {
		const memberElem = document.createElement('div');
		memberElem.classList.add('row');
		memberElem.classList.add('gap10');
		memberElem.classList.add('middle');
		memberElem.classList.add('team-member-tile');

		const memberImageElem = document.createElement('img');
		memberImageElem.classList.add('team-member-avatar');
		memberImageElem.src = buildUrl('images/avatars', `avatar-${teamMember.id}.jpg`);

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
		const fdc3Contact = {
			type: 'fdc3.contact',
			name: member.name,
			id: {
				FDS_ID: member.id,
				email: member.email
			}
		};

		await broadcastFdc3(fdc3Contact);
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
	const teamMemberIndex = fcd3Contact ? teamData.findIndex((m) => m.id === fcd3Contact.id.FDS_ID) : -1;

	if (teamMemberIndex >= 0) {
		const memberListElem = document.querySelector('.team-member-list');
		visualSelectMemberElem(memberListElem.childNodes[teamMemberIndex]);
	}
}
