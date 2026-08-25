module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	testMatch: ['**/*.spec.ts'],
	moduleFileExtensions: ['ts', 'js'],
	moduleNameMapper: {
		'^workspace-platform-starter/(.*)$': '<rootDir>/client/src/framework/$1'
	},
	transform: {
		'^.+\\.(ts|tsx)?$': [
			'ts-jest',
			{ tsconfig: '<rootDir>/tsconfig.jest.json', diagnostics: { ignoreCodes: ['TS151001'] } }
		]
	},
	verbose: true,
	collectCoverage: true,
	coverageProvider: 'v8',
	coverageReporters: ['text-summary'],
	setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
	roots: ['<rootDir>/test']
};
