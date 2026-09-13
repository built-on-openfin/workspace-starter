module.exports = {
	overrides: [
		{
			// The shared config parses as ES2020; wdio.conf.mjs uses top-level await
			// and the specs import chai 5, whose source needs ES2022 to parse.
			files: ['*.mjs'],
			parserOptions: {
				ecmaVersion: 2022
			}
		}
	]
};
