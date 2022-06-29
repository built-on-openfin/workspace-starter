export function getDefaultFDC3ContextData() {
	return {
		'fdc3.instrument': [
			{ type: 'fdc3.instrument', name: 'Tesla Inc', id: { ticker: 'TSLA', ISIN: 'US88160R1014' } },
			{ type: 'fdc3.instrument', name: 'Apple Inc.', id: { ticker: 'AAPL', ISIN: 'US0378331005' } },
			{
				type: 'fdc3.instrument',
				name: 'Microsoft Corporation',
				id: { ticker: 'MSFT', ISIN: 'US5949181045' }
			},
			{ type: 'fdc3.instrument', name: 'BAE Systems plc', id: { ticker: 'BA', ISIN: 'GB0002634946' } },
			{ type: 'fdc3.instrument', name: 'Admiral Group plc', id: { ticker: 'ADM', ISIN: 'GB00B02J6398' } },
			{ type: 'fdc3.instrument', name: 'HSBC Holdings Plc', id: { ticker: 'HSBA', ISIN: 'GB0005405286' } }
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
			},
			{
				type: 'fdc3.instrumentList',
				name: 'My Instruments...',
				instruments: [
					{
						type: 'fdc3.instrument',
						name: 'Apple Inc.',
						id: {
							ticker: 'AAPL',
							ISIN: 'US0378331005'
						},
						market: {
							MIC: 'XNAS'
						},
						customData: {
							CURRENCY_ISOCODE: 'USD',
							latest: 135.35,
							close: 132.643,
							day1: 128.5825,
							day2: 142.1175,
							year1: 101.5125,
							year2: 169.1875,
							cap: 2190664.25,
							vol: 99585048,
							pe: 5.614,
							yield: 0.67971920967102
						}
					},
					{
						type: 'fdc3.instrument',
						name: 'American Electric Power Company, Inc.',
						id: {
							ticker: 'AEP',
							ISIN: 'US0255371017'
						},
						market: {
							MIC: 'XNAS'
						},
						customData: {
							CURRENCY_ISOCODE: 'USD',
							latest: 90.31,
							close: 88.5038,
							day1: 85.7945,
							day2: 94.8255,
							year1: 67.7325,
							year2: 112.8875,
							cap: 46378.17578125,
							vol: 2909243.25,
							pe: 4.9585,
							yield: 3.45476675033569
						}
					},
					{
						type: 'fdc3.instrument',
						name: 'BAE Systems plc',
						id: {
							ticker: 'BA',
							ISIN: 'GB0002634946'
						},
						market: {
							MIC: 'XLON'
						},
						customData: {
							CURRENCY_ISOCODE: 'GBP',
							latest: 7.762,
							close: 7.60676,
							day1: 7.3739,
							day2: 8.1501,
							year1: 5.8215,
							year2: 9.7025,
							cap: 24503.333984375,
							vol: 9630534,
							pe: 0.5516,
							yield: 3.23286962509155
						}
					},
					{
						type: 'fdc3.instrument',
						name: 'Admiral Group plc',
						id: {
							ticker: 'ADM',
							ISIN: 'GB00B02J6398'
						},
						market: {
							MIC: 'XLON'
						},
						customData: {
							CURRENCY_ISOCODE: 'GBP',
							latest: 21.68,
							close: 21.2464,
							day1: 20.596,
							day2: 22.764,
							year1: 16.26,
							year2: 27.1,
							cap: 6483.6982421875,
							vol: 1038844.4375,
							pe: 1.9951,
							yield: 12.9047174453735
						}
					},
					{
						type: 'fdc3.instrument',
						name: 'Ashtead Group plc',
						id: {
							ticker: 'AHT',
							ISIN: 'GB0000536739'
						},
						market: {
							MIC: 'XLON'
						},
						customData: {
							CURRENCY_ISOCODE: 'GBP',
							latest: 33.13,
							close: 32.4674,
							day1: 31.4735,
							day2: 34.7865,
							year1: 24.8475,
							year2: 41.4125,
							cap: 14575.2822265625,
							vol: 1439510.75,
							pe: 1.557,
							yield: 1.98982167243957
						}
					},
					{
						type: 'fdc3.instrument',
						name: 'Antofagasta plc',
						id: {
							ticker: 'ANTO',
							ISIN: 'GB0000456144'
						},
						market: {
							MIC: 'XLON'
						},
						customData: {
							CURRENCY_ISOCODE: 'GBP',
							latest: 12.2,
							close: 11.956,
							day1: 11.59,
							day2: 12.81,
							year1: 9.15,
							year2: 15.25,
							cap: 11869.71484375,
							vol: 1681841.5,
							pe: 0.9516,
							yield: 9.70285892486572
						}
					},
					{
						type: 'fdc3.instrument',
						name: 'Shell PLC',
						id: {
							ticker: 'SHEL',
							ISIN: 'GB00BP6MXD84'
						},
						market: {
							MIC: 'XLON'
						},
						customData: {
							CURRENCY_ISOCODE: 'GBP',
							latest: 20.965,
							close: 20.5457,
							day1: 19.91675,
							day2: 22.01325,
							year1: 15.72375,
							year2: 26.20625,
							cap: 154367.234375,
							vol: 33128820,
							pe: 1.8831,
							yield: 3.80211472511291
						}
					},
					{
						type: 'fdc3.instrument',
						name: 'AstraZeneca PLC',
						id: {
							ticker: 'AZN',
							ISIN: 'GB0009895292'
						},
						market: {
							MIC: 'XLON'
						},
						customData: {
							CURRENCY_ISOCODE: 'GBP',
							latest: 103.22,
							close: 101.1556,
							day1: 98.059,
							day2: 108.381,
							year1: 77.415,
							year2: 129.025,
							cap: 159595.46875,
							vol: 2836965.25,
							pe: 0.0574,
							yield: 2.03980588912963
						}
					},
					{
						type: 'fdc3.instrument',
						name: 'Glencore plc',
						id: {
							ticker: 'GLEN',
							ISIN: 'JE00B4T3BW64'
						},
						market: {
							MIC: 'XLON'
						},
						customData: {
							CURRENCY_ISOCODE: 'GBP',
							latest: 4.5425,
							close: 4.45165,
							day1: 4.315375,
							day2: 4.769625,
							year1: 3.406875,
							year2: 5.678125,
							cap: 59170.87109375,
							vol: 51546956,
							pe: 0.2739,
							yield: 4.72720575332641
						}
					},
					{
						type: 'fdc3.instrument',
						name: 'HSBC Holdings Plc',
						id: {
							ticker: 'HSBA',
							ISIN: 'GB0005405286'
						},
						market: {
							MIC: 'XLON'
						},
						customData: {
							CURRENCY_ISOCODE: 'GBP',
							latest: 5.365,
							close: 5.2577,
							day1: 5.09675,
							day2: 5.63325,
							year1: 4.02375,
							year2: 6.70625,
							cap: 107363.3515625,
							vol: 44124864,
							pe: 0.4539,
							yield: 3.83158779144287
						}
					},
					{
						type: 'fdc3.instrument',
						name: 'Unilever PLC',
						id: {
							ticker: 'ULVR',
							ISIN: 'GB00B10RZP78'
						},
						market: {
							MIC: 'XLON'
						},
						customData: {
							CURRENCY_ISOCODE: 'GBP',
							latest: 35.845,
							close: 35.1281,
							day1: 34.05275,
							day2: 37.63725,
							year1: 26.88375,
							year2: 44.80625,
							cap: 91385.0078125,
							vol: 7197320.5,
							pe: 1.9996,
							yield: 4.0427074432373
						}
					},
					{
						type: 'fdc3.instrument',
						name: 'Diageo plc',
						id: {
							ticker: 'DGE',
							ISIN: 'GB0002374006'
						},
						market: {
							MIC: 'XLON'
						},
						customData: {
							CURRENCY_ISOCODE: 'GBP',
							latest: 35.575,
							close: 34.8635,
							day1: 33.79625,
							day2: 37.35375,
							year1: 26.68125,
							year2: 44.46875,
							cap: 80889.5078125,
							vol: 4515435,
							pe: 1.1382,
							yield: 2.0860366821289
						}
					},
					{
						type: 'fdc3.instrument',
						name: 'Rio Tinto plc',
						id: {
							ticker: 'RIO',
							ISIN: 'GB0007188757'
						},
						market: {
							MIC: 'XLON'
						},
						customData: {
							CURRENCY_ISOCODE: 'GBP',
							latest: 50.17,
							close: 49.1666,
							day1: 47.6615,
							day2: 52.6785,
							year1: 37.6275,
							year2: 62.7125,
							cap: 62383.30078125,
							vol: 3062881,
							pe: 9.4771,
							yield: 11.5662355422973
						}
					},
					{
						type: 'fdc3.instrument',
						name: 'GSK plc',
						id: {
							ticker: 'GSK',
							ISIN: 'GB0009252882'
						},
						market: {
							MIC: 'XLON'
						},
						customData: {
							CURRENCY_ISOCODE: 'GBP',
							latest: 17.22,
							close: 16.8756,
							day1: 16.359,
							day2: 18.081,
							year1: 12.915,
							year2: 21.525,
							cap: 87516.8203125,
							vol: 14166788,
							pe: 0.8765,
							yield: 3.02079677581787
						}
					},
					{
						type: 'fdc3.instrument',
						name: 'BP p.l.c.',
						id: {
							ticker: 'BP',
							ISIN: 'GB0007980591'
						},
						market: {
							MIC: 'XLON'
						},
						customData: {
							CURRENCY_ISOCODE: 'GBP',
							latest: 3.8835,
							close: 3.80583,
							day1: 3.689325,
							day2: 4.077675,
							year1: 2.912625,
							year2: 4.854375,
							cap: 74612.3984375,
							vol: 65025544,
							pe: 0.2732,
							yield: 4.61458110809326
						}
					},
					{
						type: 'fdc3.instrument',
						name: 'British American Tobacco p.l.c.',
						id: {
							ticker: 'BATS',
							ISIN: 'GB0002875804'
						},
						market: {
							MIC: 'XLON'
						},
						customData: {
							CURRENCY_ISOCODE: 'GBP',
							latest: 34.385,
							close: 33.6973,
							day1: 32.66575,
							day2: 36.10425,
							year1: 25.78875,
							year2: 42.98125,
							cap: 77646.3046875,
							vol: 4251691,
							pe: 2.9685,
							yield: 6.33784294128417
						}
					},
					{
						type: 'fdc3.instrument',
						name: 'Apple Inc.',
						id: {
							ticker: 'AAPL',
							ISIN: 'US0378331005'
						},
						market: {
							MIC: 'XNAS'
						},
						customData: {
							CURRENCY_ISOCODE: 'USD',
							latest: 135.35,
							close: 132.643,
							day1: 128.5825,
							day2: 142.1175,
							year1: 101.5125,
							year2: 169.1875,
							cap: 2190664.25,
							vol: 99585048,
							pe: 5.614,
							yield: 0.67971920967102
						}
					},
					{
						type: 'fdc3.instrument',
						name: 'Microsoft Corporation',
						id: {
							ticker: 'MSFT',
							ISIN: 'US5949181045'
						},
						market: {
							MIC: 'XNAS'
						},
						customData: {
							CURRENCY_ISOCODE: 'USD',
							latest: 253.13,
							close: 248.0674,
							day1: 240.4735,
							day2: 265.7865,
							year1: 189.8475,
							year2: 316.4125,
							cap: 1893167.75,
							vol: 32577570,
							pe: 8.0535,
							yield: 0.979733765125274
						}
					},
					{
						type: 'fdc3.instrument',
						name: 'Alphabet Inc. Class C',
						id: {
							ticker: 'GOOG',
							ISIN: 'US02079K1079'
						},
						market: {
							MIC: 'XNAS'
						},
						customData: {
							CURRENCY_ISOCODE: 'USD',
							latest: 2240.68,
							close: 2195.8664,
							day1: 2128.646,
							day2: 2352.714,
							year1: 1680.51,
							year2: 2800.85,
							cap: 1471813.7578125,
							vol: 1608903.75,
							pe: 112.197,
							yield: 0
						}
					},
					{
						type: 'fdc3.instrument',
						name: 'Amazon.com, Inc.',
						id: {
							ticker: 'AMZN',
							ISIN: 'US0231351067'
						},
						market: {
							MIC: 'XNAS'
						},
						customData: {
							CURRENCY_ISOCODE: 'USD',
							latest: 108.95,
							close: 106.771,
							day1: 103.5025,
							day2: 114.3975,
							year1: 81.7125,
							year2: 136.1875,
							cap: 1108501.875,
							vol: 95181224,
							pe: 3.2392,
							yield: 0
						}
					},
					{
						type: 'fdc3.instrument',
						name: 'Tesla Inc',
						id: {
							ticker: 'TSLA',
							ISIN: 'US88160R1014'
						},
						market: {
							MIC: 'XNAS'
						},
						customData: {
							CURRENCY_ISOCODE: 'USD',
							latest: 708.26,
							close: 694.0948,
							day1: 672.847,
							day2: 743.673,
							year1: 531.195,
							year2: 885.325,
							cap: 733764.375,
							vol: 32511286,
							pe: 4.8928,
							yield: 0
						}
					},
					{
						type: 'fdc3.instrument',
						name: 'Berkshire Hathaway Inc. Class A',
						id: {
							ticker: 'BRK.A',
							ISIN: 'US0846701086'
						},
						market: {
							MIC: 'XNYS'
						},
						customData: {
							CURRENCY_ISOCODE: 'USD',
							latest: 405649,
							close: 397536.02,
							day1: 385366.55,
							day2: 425931.45,
							year1: 304236.75,
							year2: 507061.25,
							cap: 595832.515625,
							vol: 2294.03344726562,
							pe: 59460,
							yield: 0
						}
					},
					{
						type: 'fdc3.instrument',
						name: 'Meta Platforms Inc. Class A',
						id: {
							ticker: 'META',
							ISIN: 'US30303M1027'
						},
						market: {
							MIC: 'XNAS'
						},
						customData: {
							CURRENCY_ISOCODE: 'USD',
							latest: 155.85,
							close: 152.733,
							day1: 148.0575,
							day2: 163.6425,
							year1: 116.8875,
							year2: 194.8125,
							cap: 421810.95703125,
							vol: 29728454,
							pe: 13.7706,
							yield: 0
						}
					},
					{
						type: 'fdc3.instrument',
						name: 'NVIDIA Corporation',
						id: {
							ticker: 'NVDA',
							ISIN: 'US67066G1040'
						},
						market: {
							MIC: 'XNAS'
						},
						customData: {
							CURRENCY_ISOCODE: 'USD',
							latest: 163.6,
							close: 160.328,
							day1: 155.42,
							day2: 171.78,
							year1: 122.7,
							year2: 204.5,
							cap: 409000,
							vol: 59316548,
							pe: 3.8469,
							yield: 0.0977995097637177
						}
					},
					{
						type: 'fdc3.instrument',
						name: 'Johnson & Johnson',
						id: {
							ticker: 'JNJ',
							ISIN: 'US4781601046'
						},
						market: {
							MIC: 'XNYS'
						},
						customData: {
							CURRENCY_ISOCODE: 'USD',
							latest: 175.74,
							close: 172.2252,
							day1: 166.953,
							day2: 184.527,
							year1: 131.805,
							year2: 219.675,
							cap: 462442.5625,
							vol: 7302015,
							pe: 7.8078,
							yield: 2.57198119163513
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
			},
			{
				type: 'fdc3.portfolio',
				name: 'Healthcare',
				id: {
					portfolioid: 'healthcare'
				},
				positions: [
					{
						type: 'fdc3.position',
						instrument: {
							type: 'fdc3.instrument',
							name: 'Apple Inc.',
							id: {
								ticker: 'AAPL',
								ISIN: 'US0378331005'
							},
							market: {
								MIC: 'XNAS'
							}
						},
						holding: 5000,
						price: 135.35
					},
					{
						type: 'fdc3.position',
						instrument: {
							type: 'fdc3.instrument',
							name: 'American Electric Power Company, Inc.',
							id: {
								ticker: 'AEP',
								ISIN: 'US0255371017'
							},
							market: {
								MIC: 'XNAS'
							}
						},
						holding: 1000,
						price: 90.31
					},
					{
						type: 'fdc3.position',
						instrument: {
							type: 'fdc3.instrument',
							name: 'BAE Systems plc',
							id: {
								ticker: 'BA',
								ISIN: 'GB0002634946'
							},
							market: {
								MIC: 'XLON'
							}
						},
						holding: 500,
						price: 7.762
					},
					{
						type: 'fdc3.position',
						instrument: {
							type: 'fdc3.instrument',
							name: 'Admiral Group plc',
							id: {
								ticker: 'ADM',
								ISIN: 'GB00B02J6398'
							},
							market: {
								MIC: 'XLON'
							}
						},
						holding: 2000,
						price: 21.68
					},
					{
						type: 'fdc3.position',
						instrument: {
							type: 'fdc3.instrument',
							name: 'Ashtead Group plc',
							id: {
								ticker: 'AHT',
								ISIN: 'GB0000536739'
							},
							market: {
								MIC: 'XLON'
							}
						},
						holding: 800,
						price: 33.13
					},
					{
						type: 'fdc3.position',
						instrument: {
							type: 'fdc3.instrument',
							name: 'Antofagasta plc',
							id: {
								ticker: 'ANTO',
								ISIN: 'GB0000456144'
							},
							market: {
								MIC: 'XLON'
							}
						},
						holding: 600,
						price: 12.2
					},
					{
						type: 'fdc3.position',
						instrument: {
							type: 'fdc3.instrument',
							name: 'Shell PLC',
							id: {
								ticker: 'SHEL',
								ISIN: 'GB00BP6MXD84'
							},
							market: {
								MIC: 'XLON'
							}
						},
						holding: 5000,
						price: 20.965
					},
					{
						type: 'fdc3.position',
						instrument: {
							type: 'fdc3.instrument',
							name: 'AstraZeneca PLC',
							id: {
								ticker: 'AZN',
								ISIN: 'GB0009895292'
							},
							market: {
								MIC: 'XLON'
							}
						},
						holding: 1000,
						price: 103.22
					},
					{
						type: 'fdc3.position',
						instrument: {
							type: 'fdc3.instrument',
							name: 'Glencore plc',
							id: {
								ticker: 'GLEN',
								ISIN: 'JE00B4T3BW64'
							},
							market: {
								MIC: 'XLON'
							}
						},
						holding: 400,
						price: 4.5425
					},
					{
						type: 'fdc3.position',
						instrument: {
							type: 'fdc3.instrument',
							name: 'HSBC Holdings Plc',
							id: {
								ticker: 'HSBA',
								ISIN: 'GB0005405286'
							},
							market: {
								MIC: 'XLON'
							}
						},
						holding: 950,
						price: 5.365
					},
					{
						type: 'fdc3.position',
						instrument: {
							type: 'fdc3.instrument',
							name: 'Unilever PLC',
							id: {
								ticker: 'ULVR',
								ISIN: 'GB00B10RZP78'
							},
							market: {
								MIC: 'XLON'
							}
						},
						holding: 8200,
						price: 35.845
					},
					{
						type: 'fdc3.position',
						instrument: {
							type: 'fdc3.instrument',
							name: 'Diageo plc',
							id: {
								ticker: 'DGE',
								ISIN: 'GB0002374006'
							},
							market: {
								MIC: 'XLON'
							}
						},
						holding: 3600,
						price: 35.575
					},
					{
						type: 'fdc3.position',
						instrument: {
							type: 'fdc3.instrument',
							name: 'Rio Tinto plc',
							id: {
								ticker: 'RIO',
								ISIN: 'GB0007188757'
							},
							market: {
								MIC: 'XLON'
							}
						},
						holding: 700,
						price: 50.17
					},
					{
						type: 'fdc3.position',
						instrument: {
							type: 'fdc3.instrument',
							name: 'GSK plc',
							id: {
								ticker: 'GSK',
								ISIN: 'GB0009252882'
							},
							market: {
								MIC: 'XLON'
							}
						},
						holding: 5600,
						price: 17.22
					}
				]
			},
			{
				type: 'fdc3.portfolio',
				name: 'Technology',
				id: {
					portfolioid: 'technology'
				},
				positions: [
					{
						type: 'fdc3.position',
						instrument: {
							type: 'fdc3.instrument',
							name: 'BP p.l.c.',
							id: {
								ticker: 'BP',
								ISIN: 'GB0007980591'
							},
							market: {
								MIC: 'XLON'
							}
						},
						holding: 2800,
						price: 3.8835
					},
					{
						type: 'fdc3.position',
						instrument: {
							type: 'fdc3.instrument',
							name: 'British American Tobacco p.l.c.',
							id: {
								ticker: 'BATS',
								ISIN: 'GB0002875804'
							},
							market: {
								MIC: 'XLON'
							}
						},
						holding: 4700,
						price: 34.385
					},
					{
						type: 'fdc3.position',
						instrument: {
							type: 'fdc3.instrument',
							name: 'Apple Inc.',
							id: {
								ticker: 'AAPL',
								ISIN: 'US0378331005'
							},
							market: {
								MIC: 'XNAS'
							}
						},
						holding: 650,
						price: 135.35
					},
					{
						type: 'fdc3.position',
						instrument: {
							type: 'fdc3.instrument',
							name: 'Microsoft Corporation',
							id: {
								ticker: 'MSFT',
								ISIN: 'US5949181045'
							},
							market: {
								MIC: 'XNAS'
							}
						},
						holding: 850,
						price: 253.13
					},
					{
						type: 'fdc3.position',
						instrument: {
							type: 'fdc3.instrument',
							name: 'Alphabet Inc. Class C',
							id: {
								ticker: 'GOOG',
								ISIN: 'US02079K1079'
							},
							market: {
								MIC: 'XNAS'
							}
						},
						holding: 1000,
						price: 2240.68
					},
					{
						type: 'fdc3.position',
						instrument: {
							type: 'fdc3.instrument',
							name: 'Amazon.com, Inc.',
							id: {
								ticker: 'AMZN',
								ISIN: 'US0231351067'
							},
							market: {
								MIC: 'XNAS'
							}
						},
						holding: 350,
						price: 108.95
					},
					{
						type: 'fdc3.position',
						instrument: {
							type: 'fdc3.instrument',
							name: 'Tesla Inc',
							id: {
								ticker: 'TSLA',
								ISIN: 'US88160R1014'
							},
							market: {
								MIC: 'XNAS'
							}
						},
						holding: 570,
						price: 708.26
					},
					{
						type: 'fdc3.position',
						instrument: {
							type: 'fdc3.instrument',
							name: 'Berkshire Hathaway Inc. Class A',
							id: {
								ticker: 'BRK.A',
								ISIN: 'US0846701086'
							},
							market: {
								MIC: 'XNYS'
							}
						},
						holding: 200,
						price: 405649
					},
					{
						type: 'fdc3.position',
						instrument: {
							type: 'fdc3.instrument',
							name: 'Meta Platforms Inc. Class A',
							id: {
								ticker: 'META',
								ISIN: 'US30303M1027'
							},
							market: {
								MIC: 'XNAS'
							}
						},
						holding: 600,
						price: 155.85
					},
					{
						type: 'fdc3.position',
						instrument: {
							type: 'fdc3.instrument',
							name: 'NVIDIA Corporation',
							id: {
								ticker: 'NVDA',
								ISIN: 'US67066G1040'
							},
							market: {
								MIC: 'XNAS'
							}
						},
						holding: 500,
						price: 163.6
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
		],
		custom: [
			{
				type: 'custom',
				name: 'Custom Context',
				data: { custom: 'object' }
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
		ViewInstrument: ['fdc3.instrument'],
		Custom: [
			'fdc3.contact',
			'fdc3.contactList',
			'fdc3.country',
			'fdc3.instrument',
			'fdc3.instrumentList',
			'fdc3.organization',
			'fdc3.portfolio',
			'fdc3.position',
			'fdc3.organization',
			'custom'
		]
	};
}
