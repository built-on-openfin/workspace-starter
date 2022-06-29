function init() {
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

		for (let i = 0; i < actionButtons.length; i++) {
            if (i % 2 === 0) {
			    actionButtons[i].addEventListener('click', (e) => selectParticipant(e, contacts));
            } else {
                actionButtons[i].addEventListener('click', (e) => raiseIntent(e, contacts));
            }
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
