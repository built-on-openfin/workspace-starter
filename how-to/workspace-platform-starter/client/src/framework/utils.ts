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
	return value !== undefined && value !== null && typeof value === "object";
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

/**
 * Format an error to a readable string.
 * @param err The error to format.
 * @returns The formatted error.
 */
export function formatError(err: unknown): string {
	if (err instanceof Error) {
		return err.message;
	} else if (typeof err === "string") {
		return err;
	}
	return JSON.stringify(err);
}

/**
 * A basic string sanitize function that removes angle brackets <> from a string.
 * @param content the content to sanitize
 * @returns a string without angle brackets <>
 */
export function sanitizeString(content: string): string {
	if (isString(content)) {
		return content
			.replace(/<[^>]*>?/gm, "")
			.replace(/&gt;/g, ">")
			.replace(/&lt;/g, "<")
			.replace(/&amp;/g, "&")
			.replace(/&nbsp;/g, " ")
			.replace(/\n\s*\n/g, "\n");
	}
	return content;
}

/**
 * A way of specify the rules around the validation.
 * DOMAIN means that the url must come from the same origin.
 * PAGE means that the urls must match the same origin and path.
 * ANY means you are allowed to replace one url with another without constrain.
 * NONE means you want to ensure that the url is not changed.
 */
export type ValidURLConstraint = "URL_DOMAIN"|"URL_PAGE"|"URL_ANY"|"URL_NONE";

/**
 * Validates the suggested url to see if it can replace the source url.
 * @param sourceUrl the original url to compare against.
 * @param suggestedUrl the suggested url to replace it with.
 * @param constraint the rules to apply against it.
 * @returns whether it is ok to replace the sourceUrl with the suggestedUrl
 */
export function isValidUrl(sourceUrl: string | undefined,
	suggestedUrl: string,
	constraint: ValidURLConstraint[] | undefined): boolean {
	if(isEmpty(suggestedUrl)) {
		return false;
	}
	if(!Array.isArray(constraint) || constraint.length === 0) {
		return true;
	}
	if(constraint.includes("URL_NONE")) {
		return false;
	}
	if(constraint.includes("URL_ANY")) {
		return true;
	}
	if(isEmpty(sourceUrl)) {
		// if we are about to do a domain related check then we need a source url
		return false;
	}
	const validatedSourceUrl = new URL(sourceUrl);
	const validatedSuggestedUrl = new URL(suggestedUrl);

	if(constraint.includes("URL_PAGE")) {
		return (validatedSourceUrl.origin + validatedSourceUrl.pathname).toLowerCase() ===
		(validatedSuggestedUrl.origin + validatedSuggestedUrl.pathname).toLowerCase();
	}

	if(constraint.includes("URL_DOMAIN")) {
		return validatedSourceUrl.origin === validatedSuggestedUrl.origin;
	}
	return true;
}
