module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/*.spec.ts'],
	moduleFileExtensions: ['ts', 'js'],
	transform: {
		'^.+\\.(ts|tsx)?$': ['ts-jest', { diagnostics: { ignoreCodes: ['TS151001'] } }]
	},
	verbose: true,
	collectCoverage: true,
	coverageReporters: ['text-summary'],
	setupFilesAfterEnv: ['<rootDir>/test/setup.ts']
};
