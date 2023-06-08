/**
 * Test if a value is a undefined or null.
 * @param value The value to test.
 * @returns True if the value is null or undefined.
 */
export function isEmpty(value: unknown): value is null | undefined {
	return value === undefined || value === null;
}

/**
 * Test if a value is an object.
 * @param value The value to test.
 * @returns True if the value is an object.
 */
export function isObject(value: unknown): value is object {
	return value !== undefined && value !== null && typeof value === "object";
}

/**
 * Test if a value is a string.
 * @param value The value to test.
 * @returns True if the value is a string.
 */
export function isString(value: unknown): value is string {
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
	return value !== undefined && value !== null && typeof value === "number";
}

/**
 * Test if a value is a boolean.
 * @param value The value to test.
 * @returns True if the value is a boolean.
 */
export function isBoolean(value: unknown): value is boolean {
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
	return obj === undefined ? undefined : JSON.parse(JSON.stringify(obj));
}

/**
 * Polyfills randomUUID if running in a non-secure context.
 * @returns The random UUID.
 */
export function randomUUID(): string {
	if ("randomUUID" in window.crypto) {
		// eslint-disable-next-line no-restricted-syntax
		return window.crypto.randomUUID();
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
		const rnd = window.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4));
		return (
			// eslint-disable-next-line no-bitwise
			(Number(c) ^ rnd).toString(16)
		);
	}
	return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, getRandomHex);
}
