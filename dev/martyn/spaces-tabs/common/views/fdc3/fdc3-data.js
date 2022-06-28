export function getDefaultFDC3ContextData() {
	return {
		'fdc3.instrument': [
			{ type: 'fdc3.instrument', name: 'Tesla', id: { ticker: 'TSLA' } },
			{ type: 'fdc3.instrument', name: 'Apple', id: { ticker: 'AAPL' } },
			{ type: 'fdc3.instrument', name: 'Microsoft', id: { ticker: 'MSFT' } }
		],
		'fdc3.instrumentList': [
			{
				type: 'fdc3.instrumentList',
				name: 'Interesting instruments...',
				id: { customId: '5464' },
				instruments: [
					{
						type: 'fdc3.instrument',
						id: {
							ticker: 'AAPL'
						}
					},
					{
						type: 'fdc3.instrument',
						id: {
							ticker: 'MSFT'
						}
					}
				]
			}
		],
		'fdc3.position': [
			{
				type: 'fdc3.position',
				name: 'My Apple shares',
				id: { positionId: '6475' },
				instrument: {
					type: 'fdc3.instrument',
					id: {
						ticker: 'AAPL'
					}
				},
				holding: 2000000
			}
		],
		'fdc3.portfolio': [
			{
				type: 'fdc3.portfolio',
				name: 'My share portfolio',
				id: { portfolioId: '7381' },
				positions: [
					{
						type: 'fdc3.position',
						instrument: { type: 'fdc3.instrument', id: { ticker: 'AAPL' } },
						holding: 2000000
					},
					{
						type: 'fdc3.position',
						instrument: { type: 'fdc3.instrument', id: { ticker: 'MSFT' } },
						holding: 1500000
					},
					{
						type: 'fdc3.position',
						instrument: { type: 'fdc3.instrument', id: { ticker: 'TSLA' } },
						holding: 3000000
					}
				]
			}
		],
		'fdc3.contact': [
			{
				type: 'fdc3.contact',
				name: 'John McHugh',
				id: { email: 'john.mchugh@gmail.com' }
			},
			{
				type: 'fdc3.contact',
				name: 'James Bond',
				id: { email: 'bond_james@grandhotels.com' }
			},
			{
				type: 'fdc3.contact',
				name: 'Ashley James',
				id: { email: 'ajames@uog.com' }
			},
			{
				type: 'fdc3.contact',
				name: 'Avi Green',
				id: { email: 'agreen@uog.com' }
			}
		],
		'fdc3.contactList': [
			{
				type: 'fdc3.contactList',
				name: 'My address book',
				id: { customId: '5576' },
				contacts: [
					{
						type: 'fdc3.contact',
						name: 'Ashley James',
						id: { email: 'ajames@uog.com' }
					},
					{
						type: 'fdc3.contact',
						name: 'Avi Green',
						id: { email: 'agreen@uog.com' }
					}
				]
			}
		],
		'fdc3.organization': [
			{
				type: 'fdc3.organization',
				name: 'Cargill, Incorporated',
				id: {
					LEI: 'QXZYQNMR4JZ5RIRN4T31',
					FDS_ID: '00161G-E'
				}
			}
		],
		'fdc3.country': [
			{
				type: 'fdc3.country',
				name: 'Sweden',
				id: {
					ISOALPHA3: 'SWE'
				}
			}
		]
	};
}

export function getDefaultFDC3IntentData() {
	return {
		StartCall: ['fdc3.contact', 'fdc3.contactList'],
		StartChat: ['fdc3.contact', 'fdc3.contactList'],
		ViewChart: ['fdc3.instrument', 'fdc3.instrumentList', 'fdc3.portfolio', 'fdc3.position'],
		ViewContact: ['fdc3.contact'],
		ViewQuote: ['fdc3.instrument'],
		ViewNews: [
			'fdc3.country',
			'fdc3.instrument',
			'fdc3.instrumentList',
			'fdc3.organization',
			'fdc3.portfolio'
		],
		ViewAnalysis: ['fdc3.instrument', 'fdc3.organization', 'fdc3.portfolio'],
		ViewInstrument: ['fdc3.instrument']
	};
}
