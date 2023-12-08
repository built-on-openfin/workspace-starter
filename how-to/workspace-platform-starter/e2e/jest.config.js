module.exports = {
	transform: {
		'^.+\\.(ts|tsx)?$': ['ts-jest', { diagnostics: { ignoreCodes: ['TS151001'] } }]
	}
};
