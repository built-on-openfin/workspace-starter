function init() {
	if (window.fdc3) {
		const selectButtons = document.querySelectorAll('.action-select');
		const raiseIntentButtons = document.querySelectorAll('.action-raise-intent');

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
					email: 'agreen@uog.com'
				}
			},
			ashley: {
				type: 'fdc3.contact',
				name: 'Ashley James',
				id: {
					email: 'ajames@uog.com'
				}
			}
		};

		for (let i = 0; i < selectButtons.length; i++) {
			selectButtons[i].addEventListener('click', (e) => selectParticipant(e, contacts));
		}

		for (let i = 0; i < raiseIntentButtons.length; i++) {
			raiseIntentButtons[i].addEventListener('click', (e) => raiseIntent(e, contacts));
		}
	}
}

function selectParticipant(event, contacts) {
	const contact = contacts[event.target.dataset.contact];
	if (contact !== undefined) {
		window.fdc3.broadcast(contact);
	}
}

function raiseIntent(event, contacts) {
	const contact = contacts[event.target.dataset.contact];
	if (contact !== undefined) {
		window.fdc3.raiseIntent('ViewContact', contact);
	}
}

window.addEventListener('DOMContentLoaded', init);
