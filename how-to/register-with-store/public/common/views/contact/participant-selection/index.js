/**
 * Initialize the DOM.
 */
function initializeDOM() {
	if (window.fdc3) {
		const actionButtons = document.querySelectorAll('[data-contact]');

		const contacts = {
			john: {
				type: 'fdc3.contact',
				name: 'John McHugh',
				id: {
					email: 'john.mchugh@gmail.com'
				}
			},
			james: {
				type: 'fdc3.contact',
				name: 'James Bond',
				id: {
					email: 'bond_james@grandhotels.com'
				}
			},
			avi: {
				type: 'fdc3.contact',
				name: 'Avi Green',
				id: {
					email: 'avi.green@3rnfnf.onmicrosoft.com'
				}
			},
			ashley: {
				type: 'fdc3.contact',
				name: 'Ashley James',
				id: {
					email: 'ashley.james@3rnfnf.onmicrosoft.com'
				}
			}
		};

		for (let i = 0; i < actionButtons.length; i++) {
			if (i % 2 === 0) {
				actionButtons[i].addEventListener('click', (e) => selectParticipant(e, contacts));
			} else {
				actionButtons[i].addEventListener('click', (e) => raiseIntent(e, contacts));
			}
		}
	}
}

/**
 * Update the participant.
 * @param event The event.
 * @param contacts The contacts data.
 */
function selectParticipant(event, contacts) {
	const contact = contacts[event.target.dataset.contact];
	if (contact !== undefined) {
		window.fdc3.broadcast(contact);
	}
}

/**
 * Raise the intent for the contact.
 * @param event The event being raised.
 * @param contacts The contacts.
 */
function raiseIntent(event, contacts) {
	const contact = contacts[event.target.dataset.contact];
	if (contact !== undefined) {
		window.fdc3.raiseIntent('ViewContact', contact);
	}
}

window.addEventListener('DOMContentLoaded', initializeDOM);
