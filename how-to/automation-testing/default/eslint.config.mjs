import typescript from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";

export default [
	{
		files: ["tests/**/*.ts"],
		languageOptions: {
			parser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module"
			},
			globals: {
				fin: "readonly",
				OpenFin: "readonly",
				globalThis: "readonly",
				console: "readonly",
				describe: "readonly",
				it: "readonly",
				expect: "readonly",
				beforeAll: "readonly",
				afterAll: "readonly",
				beforeEach: "readonly",
				afterEach: "readonly"
			}
		},
		rules: {
			"no-unused-vars": ["warn", { args: "none" }],
			"no-console": "off",
			"no-debugger": "warn",
			eqeqeq: ["error", "always"],
			curly: "error"
		}
	},
	{
		plugins: {
			"@typescript-eslint": typescript
		}
	},
	{
		rules: {
			...prettier.rules
		}
	}
];
