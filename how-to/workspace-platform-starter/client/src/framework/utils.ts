/**
 * Test if a value is a undefined or null.
 * @param value The value to test.
 * @returns True if the value is null or undefined.
 */
export function isEmpty(value: unknown): value is null | undefined {
	// eslint-disable-next-line no-restricted-syntax
	return value === undefined || value === null;
}

/**
 * Test if a value is an object.
 * @param value The value to test.
 * @returns True if the value is an object.
 */
export function isObject(value: unknown): value is object {
	// eslint-disable-next-line no-restricted-syntax
	return value !== undefined && value !== null && typeof value === "object" && !Array.isArray(value);
}

/**
 * Test if a value is a string.
 * @param value The value to test.
 * @returns True if the value is a string.
 */
export function isString(value: unknown): value is string {
	// eslint-disable-next-line no-restricted-syntax
	return value !== undefined && value !== null && typeof value === "string";
}

/**
 * Test if a value is a string that is not empty.
 * @param value The value to test.
 * @returns True if the value is a string that is not empty.
 */
export function isStringValue(value: unknown): value is string {
	return isString(value) && value.trim().length > 0;
}

/**
 * Test if a value is a number.
 * @param value The value to test.
 * @returns True if the value is a number.
 */
export function isNumber(value: unknown): value is number {
	// eslint-disable-next-line no-restricted-syntax
	return value !== undefined && value !== null && typeof value === "number";
}

/**
 * Test if a value is a number with a real value i.e. not NaN or Infinite.
 * @param value The value to test.
 * @returns True if the value is a number.
 */
export function isNumberValue(value: unknown): value is number {
	return isNumber(value) && !Number.isNaN(value) && Number.isFinite(value);
}

/**
 * Test if a value is a boolean.
 * @param value The value to test.
 * @returns True if the value is a boolean.
 */
export function isBoolean(value: unknown): value is boolean {
	// eslint-disable-next-line no-restricted-syntax
	return value !== undefined && value !== null && typeof value === "boolean";
}

/**
 * Test if a value is an integer.
 * @param value The value to test.
 * @returns True if the value is an integer.
 */
export function isInteger(value: unknown): value is number {
	return isNumber(value) && Number.isInteger(value);
}

/**
 * Deep clone an object.
 * @param obj The object to clone.
 * @returns The clone of the object.
 */
export function objectClone<T>(obj: T): T {
	// eslint-disable-next-line no-restricted-syntax
	return obj === undefined ? undefined : JSON.parse(JSON.stringify(obj));
}

/**
 * Do a deep comparison of the objects.
 * @param obj1 The first object to compare.
 * @param obj2 The second object to compare.
 * @param matchPropertyOrder If true the properties must be in the same order.
 * @returns True if the objects are the same.
 */
export function deepEqual(obj1: unknown, obj2: unknown, matchPropertyOrder: boolean = true): boolean {
	if (isObject(obj1) && isObject(obj2)) {
		const objKeys1 = Object.keys(obj1);
		const objKeys2 = Object.keys(obj2);

		if (objKeys1.length !== objKeys2.length) {
			return false;
		}

		if (matchPropertyOrder && JSON.stringify(objKeys1) !== JSON.stringify(objKeys2)) {
			return false;
		}

		for (const key of objKeys1) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const value1 = (obj1 as any)[key];
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const value2 = (obj2 as any)[key];

			if (!deepEqual(value1, value2, matchPropertyOrder)) {
				return false;
			}
		}
		return true;
	} else if (Array.isArray(obj1) && Array.isArray(obj2)) {
		if (obj1.length !== obj2.length) {
			return false;
		}
		for (let i = 0; i < obj1.length; i++) {
			if (!deepEqual(obj1[i], obj2[i], matchPropertyOrder)) {
				return false;
			}
		}
	}

	return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * Deep merge two objects.
 * @param target The object to be merged into.
 * @param sources The objects to merge into the target.
 * @returns The merged object.
 */
export function deepMerge<T = unknown>(target: T, ...sources: T[]): T {
	if (!Array.isArray(sources) || sources.length === 0) {
		return target;
	}

	const targetAsMap = target as { [id: string]: unknown };
	const source = sources.shift();

	let keys;
	if (isObject(targetAsMap) && isObject(source)) {
		keys = Object.keys(source);
	} else if (Array.isArray(source)) {
		if (!Array.isArray(target)) {
			return source;
		}
		keys = Object.keys(source).map((k) => Number.parseInt(k, 10));
	}

	if (keys) {
		const sourceAsMap = source as { [id: string]: unknown };
		for (const key of keys) {
			const value = sourceAsMap[key];
			if (isObject(value)) {
				if (isEmpty(targetAsMap[key])) {
					targetAsMap[key] = {};
				}
				deepMerge(targetAsMap[key], value);
			} else if (Array.isArray(value)) {
				if (isEmpty(targetAsMap[key])) {
					targetAsMap[key] = [];
				}
				deepMerge(targetAsMap[key], value);
			} else {
				targetAsMap[key] = value;
			}
		}
	}

	return deepMerge(target, ...sources);
}

/**
 * Polyfills randomUUID if running in a non-secure context.
 * @returns The random UUID.
 */
export function randomUUID(): string {
	if ("randomUUID" in globalThis.crypto) {
		// eslint-disable-next-line no-restricted-syntax
		return globalThis.crypto.randomUUID();
	}
	// Polyfill the window.crypto.randomUUID if we are running in a non secure context that doesn't have it
	// we are still using window.crypto.getRandomValues which is always available
	// https://stackoverflow.com/a/2117523/2800218
	/**
	 * Get random hex value.
	 * @param c The number to base the random value on.
	 * @returns The random value.
	 */
	function getRandomHex(c: string): string {
		// eslint-disable-next-line no-bitwise
		const rnd = globalThis.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4));
		return (
			// eslint-disable-next-line no-bitwise
			(Number(c) ^ rnd).toString(16)
		);
	}
	return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, getRandomHex);
}

/**
 * Format an error to a readable string.
 * @param err The error to format.
 * @returns The formatted error.
 */
export function formatError(err: unknown): string {
	if (isEmpty(err)) {
		return "";
	} else if (err instanceof Error) {
		return err.message;
	} else if (isStringValue(err)) {
		return err;
	} else if (isObject(err) && "message" in err && isString(err.message)) {
		return err.message;
	}
	return JSON.stringify(err);
}

/**
 * A basic string sanitize function that removes angle brackets <> from a string.
 * @param content the content to sanitize
 * @returns a string without angle brackets <>
 */
export function sanitizeString(content: unknown): string {
	if (isStringValue(content)) {
		return content
			.replace(/<[^>]*>?/gm, "")
			.replace(/&gt;/g, ">")
			.replace(/&lt;/g, "<")
			.replace(/&amp;/g, "&")
			.replace(/&nbsp;/g, " ")
			.replace(/\n\s*\n/g, "\n");
	}
	return "";
}

/**
 * Get the command line arguments from a command line string.
 * Examples of command line strings: arg1 key1=value1 key2="value with spaces" key3='value3' key4='value with more spaces'`.
 * @param commandLine The command line string.
 * @returns The command line arguments or an empty array if none
 */
export function getCommandLineArgs(commandLine: string): string[] {
	if (!isStringValue(commandLine)) {
		return [];
	}
	const matches = commandLine.match(/(\w+=)?("[^"]*"|'[^']*'|[^ ]+)/g);
	if (isEmpty(matches)) {
		return [];
	}
	return matches;
}
