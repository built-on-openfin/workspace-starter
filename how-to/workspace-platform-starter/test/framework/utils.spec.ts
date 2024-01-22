import {
	deepEqual,
	deepMerge,
	formatError,
	isBoolean,
	isEmpty,
	isInteger,
	isNumber,
	isNumberValue,
	isObject,
	isString,
	isStringValue,
	objectClone,
	randomUUID,
	sanitizeString,
	getCommandLineArgs
} from "../../client/src/framework/utils";

describe("utils", () => {
	describe("isEmpty", () => {
		it("should return true for null value", () => {
			expect(isEmpty(null)).toEqual(true);
		});

		it("should return true for undefined value", () => {
			expect(isEmpty(undefined)).toEqual(true);
		});

		it("should return false for non-null and non-undefined value as empty string", () => {
			expect(isEmpty("")).toEqual(false);
		});

		it("should return false for non-null and non-undefined value as string", () => {
			expect(isEmpty("test")).toEqual(false);
		});

		it("should return false for non-null and non-undefined value as number", () => {
			expect(isEmpty(10)).toEqual(false);
		});

		it("should return false for boolean false", () => {
			expect(isEmpty(false)).toEqual(false);
		});

		it("should return false for boolean true", () => {
			expect(isEmpty(true)).toEqual(false);
		});
	});

	describe("isObject", () => {
		it("should return false for null value", () => {
			expect(isObject(null)).toEqual(false);
		});

		it("should return false for undefined value", () => {
			expect(isObject(undefined)).toEqual(false);
		});

		it("should return false for string value", () => {
			expect(isObject("foo")).toEqual(false);
		});

		it("should return false for boolean false", () => {
			expect(isObject(false)).toEqual(false);
		});

		it("should return false for boolean true", () => {
			expect(isObject(true)).toEqual(false);
		});

		it("should return false for array", () => {
			expect(isObject([])).toEqual(false);
		});

		it("should return true for object", () => {
			expect(isObject({})).toEqual(true);
		});
	});

	describe("isString", () => {
		it("should return false for null value", () => {
			expect(isString(null)).toEqual(false);
		});

		it("should return false for undefined value", () => {
			expect(isString(undefined)).toEqual(false);
		});

		it("should return false for object", () => {
			expect(isString({})).toEqual(false);
		});

		it("should return false for boolean false", () => {
			expect(isString(false)).toEqual(false);
		});

		it("should return false for boolean true", () => {
			expect(isString(true)).toEqual(false);
		});

		it("should return true for empty value", () => {
			expect(isString("")).toEqual(true);
		});

		it("should return true for string value", () => {
			expect(isString("foo")).toEqual(true);
		});
	});

	describe("isStringValue", () => {
		it("should return false for null value", () => {
			expect(isStringValue(null)).toEqual(false);
		});

		it("should return false for undefined value", () => {
			expect(isStringValue(undefined)).toEqual(false);
		});

		it("should return false for object", () => {
			expect(isStringValue({})).toEqual(false);
		});

		it("should return false for boolean false", () => {
			expect(isStringValue(false)).toEqual(false);
		});

		it("should return false for boolean true", () => {
			expect(isStringValue(true)).toEqual(false);
		});

		it("should return false for empty value", () => {
			expect(isStringValue("")).toEqual(false);
		});

		it("should return true for string value", () => {
			expect(isStringValue("foo")).toEqual(true);
		});
	});

	describe("isNumber", () => {
		it("should return false for null value", () => {
			expect(isNumber(null)).toEqual(false);
		});

		it("should return false for undefined value", () => {
			expect(isNumber(undefined)).toEqual(false);
		});

		it("should return false for object", () => {
			expect(isNumber({})).toEqual(false);
		});

		it("should return false for boolean false", () => {
			expect(isNumber(false)).toEqual(false);
		});

		it("should return false for boolean true", () => {
			expect(isNumber(true)).toEqual(false);
		});

		it("should return false for empty value", () => {
			expect(isNumber("")).toEqual(false);
		});

		it("should return false for string value", () => {
			expect(isNumber("foo")).toEqual(false);
		});

		it("should return true for nan", () => {
			expect(isNumber(Number.NaN)).toEqual(true);
		});

		it("should return true for positive infinite", () => {
			expect(isNumber(Number.POSITIVE_INFINITY)).toEqual(true);
		});

		it("should return true for negative infinite", () => {
			expect(isNumber(Number.NEGATIVE_INFINITY)).toEqual(true);
		});

		it("should return true for number value", () => {
			expect(isNumber(1)).toEqual(true);
		});
	});

	describe("isNumberValue", () => {
		it("should return false for null value", () => {
			expect(isNumberValue(null)).toEqual(false);
		});

		it("should return false for undefined value", () => {
			expect(isNumberValue(undefined)).toEqual(false);
		});

		it("should return false for object", () => {
			expect(isNumberValue({})).toEqual(false);
		});

		it("should return false for boolean false", () => {
			expect(isNumberValue(false)).toEqual(false);
		});

		it("should return false for boolean true", () => {
			expect(isNumberValue(true)).toEqual(false);
		});

		it("should return false for empty value", () => {
			expect(isNumberValue("")).toEqual(false);
		});

		it("should return false for string value", () => {
			expect(isNumberValue("foo")).toEqual(false);
		});

		it("should return false for nan", () => {
			expect(isNumberValue(Number.NaN)).toEqual(false);
		});

		it("should return false for positive infinite", () => {
			expect(isNumberValue(Number.POSITIVE_INFINITY)).toEqual(false);
		});

		it("should return false for negative infinite", () => {
			expect(isNumberValue(Number.NEGATIVE_INFINITY)).toEqual(false);
		});

		it("should return true for number value", () => {
			expect(isNumberValue(1)).toEqual(true);
		});
	});

	describe("isInteger", () => {
		it("should return false for null value", () => {
			expect(isInteger(null)).toEqual(false);
		});

		it("should return false for undefined value", () => {
			expect(isInteger(undefined)).toEqual(false);
		});

		it("should return false for object", () => {
			expect(isInteger({})).toEqual(false);
		});

		it("should return false for boolean false", () => {
			expect(isInteger(false)).toEqual(false);
		});

		it("should return false for boolean true", () => {
			expect(isInteger(true)).toEqual(false);
		});

		it("should return false for empty value", () => {
			expect(isInteger("")).toEqual(false);
		});

		it("should return false for string value", () => {
			expect(isInteger("foo")).toEqual(false);
		});

		it("should return false for nan", () => {
			expect(isInteger(Number.NaN)).toEqual(false);
		});

		it("should return false for positive infinite", () => {
			expect(isInteger(Number.POSITIVE_INFINITY)).toEqual(false);
		});

		it("should return false for negative infinite", () => {
			expect(isInteger(Number.NEGATIVE_INFINITY)).toEqual(false);
		});

		it("should return false for float value", () => {
			expect(isInteger(1.23)).toEqual(false);
		});

		it("should return true for 0", () => {
			expect(isInteger(0)).toEqual(true);
		});

		it("should return true for integer value", () => {
			expect(isInteger(1)).toEqual(true);
		});
	});

	describe("isBoolean", () => {
		it("should return false for null value", () => {
			expect(isBoolean(null)).toEqual(false);
		});

		it("should return false for undefined value", () => {
			expect(isBoolean(undefined)).toEqual(false);
		});

		it("should return false for object", () => {
			expect(isBoolean({})).toEqual(false);
		});

		it("should return false for empty value", () => {
			expect(isBoolean("")).toEqual(false);
		});

		it("should return false for string value", () => {
			expect(isNumberValue("foo")).toEqual(false);
		});

		it("should return false for number value", () => {
			expect(isBoolean(0)).toEqual(false);
		});

		it("should return false for number value", () => {
			expect(isBoolean(1)).toEqual(false);
		});

		it("should return true for boolean false", () => {
			expect(isBoolean(false)).toEqual(true);
		});

		it("should return true for boolean true", () => {
			expect(isBoolean(true)).toEqual(true);
		});
	});

	describe("objectClone", () => {
		it("should return undefined for undefined", () => {
			expect(objectClone(undefined)).toEqual(undefined);
		});

		it("should return null for null", () => {
			expect(objectClone(null)).toEqual(null);
		});

		it("should return string for string", () => {
			expect(objectClone("")).toEqual("");
		});

		it("should return string value for string value", () => {
			expect(objectClone("foo")).toEqual("foo");
		});

		it("should return bool for bool", () => {
			expect(objectClone(true)).toEqual(true);
		});

		it("should return number for number", () => {
			expect(objectClone(1)).toEqual(1);
		});

		it("should return object for object", () => {
			expect(objectClone({})).toEqual({});
		});

		it("should return object with values for object with values", () => {
			expect(objectClone({ a: true, b: "foo", c: { d: 1, e: null } })).toEqual({
				a: true,
				b: "foo",
				c: { d: 1, e: null }
			});
		});
	});

	describe("deepEqual", () => {
		it("should return true for two undefined values", () => {
			expect(deepEqual(undefined, undefined)).toEqual(true);
		});

		it("should return false for one undefined and one null value", () => {
			expect(deepEqual(undefined, null)).toEqual(false);
		});

		it("should return true for two null values", () => {
			expect(deepEqual(null, null)).toEqual(true);
		});

		it("should return false for an undefined and object", () => {
			expect(deepEqual(undefined, {})).toEqual(false);
		});

		it("should return true for two plain objects", () => {
			expect(deepEqual({}, {})).toEqual(true);
		});

		it("should return true for two objects with single matching props", () => {
			expect(deepEqual({ a: "foo" }, { a: "foo" })).toEqual(true);
		});

		it("should return false for two objects with single unmatched props", () => {
			expect(deepEqual({ a: "foo" }, { a: "goo" })).toEqual(false);
		});

		it("should return false for two objects with single unmatched props", () => {
			expect(deepEqual({ a: "foo" }, { b: "foo" })).toEqual(false);
		});

		it("should return false for two objects with different number of props in first object", () => {
			expect(deepEqual({ a: "foo", c: "aaa" }, { b: "foo" })).toEqual(false);
		});

		it("should return false for two objects with different number of props in second object", () => {
			expect(deepEqual({ a: "foo" }, { b: "foo", c: "aaa" })).toEqual(false);
		});

		it("should return false for two objects with two props in different order with match order flag", () => {
			expect(deepEqual({ a: "foo", b: "goo" }, { b: "goo", ab: "foo" }, true)).toEqual(false);
		});

		it("should return true for two objects with two props in different order with no match order flag", () => {
			expect(deepEqual({ a: "foo", b: "goo" }, { b: "goo", a: "foo" }, false)).toEqual(true);
		});

		it("should return true for two empty arrays", () => {
			expect(deepEqual([], [])).toEqual(true);
		});

		it("should return true for arrays with the same values", () => {
			expect(deepEqual([1], [1])).toEqual(true);
		});

		it("should return false for arrays with the different lengths", () => {
			expect(deepEqual([1], [1, 2])).toEqual(false);
		});

		it("should return false for arrays with the same values in different order", () => {
			expect(deepEqual([1, 2], [2, 1])).toEqual(false);
		});

		it("should return false for arrays with the same values in different order with match order flag", () => {
			expect(deepEqual([1, 2], [2, 1], true)).toEqual(false);
		});

		it("should return false for arrays containing unmatched objects", () => {
			expect(deepEqual([{ a: "foo" }], [{ a: "goo" }])).toEqual(false);
		});

		it("should return true for arrays containing matched objects", () => {
			expect(deepEqual([{ a: "foo" }], [{ a: "foo" }])).toEqual(true);
		});

		it("should return true for 2 numbers", () => {
			expect(deepEqual(1, 1)).toEqual(true);
		});

		it("should return false for 2 different numbers", () => {
			expect(deepEqual(1, 2)).toEqual(false);
		});

		it("should return true for 2 booleans", () => {
			expect(deepEqual(true, true)).toEqual(true);
		});

		it("should return false for 2 different booleans", () => {
			expect(deepEqual(true, false)).toEqual(false);
		});

		it("should return true for 2 strings", () => {
			expect(deepEqual("aaa", "aaa")).toEqual(true);
		});

		it("should return false for 2 different strings", () => {
			expect(deepEqual("aaa", "aa")).toEqual(false);
		});

		it("should return false for different recursive objects", () => {
			expect(deepEqual({ a: { b: true } }, { a: { b: false } })).toEqual(false);
		});

		it("should return true for matching recursive objects", () => {
			expect(deepEqual({ a: { b: true } }, { a: { b: true } })).toEqual(true);
		});
	});

	describe("deepMerge", () => {
		it("should return undefined when merging 2 undefined objects", () => {
			expect(deepMerge(undefined, undefined)).toEqual(undefined);
		});

		it("should return null when merging 2 null objects", () => {
			expect(deepMerge(null, null)).toEqual(null);
		});

		it("should return an empty object when merging undefined", () => {
			expect(deepMerge({}, undefined)).toEqual({});
		});

		it("should return an empty object when merging null", () => {
			expect(deepMerge({}, null)).toEqual({});
		});

		it("should return undefined when merging object to undefined", () => {
			expect(deepMerge(undefined, {})).toEqual(undefined);
		});

		it("should return null when merging object to null", () => {
			expect(deepMerge(null, {})).toEqual(null);
		});

		it("should return object with replaced properties", () => {
			expect(deepMerge({ a: "foo" }, { a: "bar" })).toEqual({ a: "bar" });
		});

		it("should return object with combined properties", () => {
			expect(deepMerge({ a: "foo" }, { b: "bar" })).toEqual({ a: "foo", b: "bar" });
		});

		it("should return array replaced with new value", () => {
			expect(deepMerge([1, 2, 3], [4, 5, 6])).toEqual([4, 5, 6]);
		});

		it("should return object containing array replaced with new value", () => {
			expect(deepMerge({ a: [1, 2, 3] }, { a: [4, 5, 6] })).toEqual({ a: [4, 5, 6] });
		});

		it("should return merge objects in an array", () => {
			expect(deepMerge([{ a: "foo" }], [{ b: "bar" }])).toEqual([{ a: "foo", b: "bar" }]);
		});

		it("should return object containing array replaced with new sub values", () => {
			expect(deepMerge({ a: [{ b: "foo" }] }, { a: [{ c: "bar" }] })).toEqual({
				a: [{ b: "foo", c: "bar" }]
			});
		});
	});

	describe("randomUUID", () => {
		it("should return a random guid with the inbuilt method", () => {
			const originalGlobalCrypto = globalThis.crypto;
			Object.defineProperty(globalThis, "crypto", {
				value: {
					randomUUID: (arr) => "00000000-0000-0000-0000-000000000000"
				}
			});
			expect(randomUUID().length).toEqual(36);
			Object.defineProperty(globalThis, "crypto", {
				value: originalGlobalCrypto
			});
		});

		it("should return a random guid with the long hand method", () => {
			expect(randomUUID().length).toEqual(36);
		});
	});

	describe("formatError", () => {
		it("should return an empty string for undefined", () => {
			expect(formatError(undefined)).toEqual("");
		});

		it("should return an empty string for null", () => {
			expect(formatError(null)).toEqual("");
		});

		it("should return the message for an error", () => {
			expect(formatError(new Error("foo"))).toEqual("foo");
		});

		it("should return the content for a string", () => {
			expect(formatError("foo")).toEqual("foo");
		});

		it("should return the message for an object shaped like an error", () => {
			expect(formatError({ message: "foo" })).toEqual("foo");
		});

		it("should return the JSON stringified version for an object", () => {
			expect(formatError({ err: "foo" })).toEqual('{"err":"foo"}');
		});
	});

	describe("sanitizeString", () => {
		it("should return an empty string for undefined", () => {
			expect(sanitizeString(undefined)).toEqual("");
		});

		it("should return an empty string for null", () => {
			expect(sanitizeString(null)).toEqual("");
		});

		it("should return an empty string for an empty string", () => {
			expect(sanitizeString("")).toEqual("");
		});

		it("should return an sanitized string for a string containing non sanitary html content", () => {
			expect(sanitizeString('<b attrib="blah">foo</b> <b attrib="blah">foo</b>')).toEqual("foo foo");
		});

		it("should return an sanitized string for a string containing non sanitary >", () => {
			expect(sanitizeString("&gt; foo &gt;")).toEqual("> foo >");
		});

		it("should return an sanitized string for a string containing non sanitary <", () => {
			expect(sanitizeString("&lt; foo &lt;")).toEqual("< foo <");
		});

		it("should return an sanitized string for a string containing non sanitary &", () => {
			expect(sanitizeString("&amp; foo &amp;")).toEqual("& foo &");
		});

		it("should return an sanitized string for a string containing non sanitary non breaking space", () => {
			expect(sanitizeString("&nbsp; foo &nbsp;")).toEqual("  foo  ");
		});

		it("should return an sanitized string for a string containing multiple line breaks", () => {
			expect(sanitizeString("\n\n\n\nfoo\n\n\n\n")).toEqual("\nfoo\n");
		});
	});

	describe("getCommandLineArgs", () => {
		it("should return an empty array if passed an empty string", () => {
			expect(getCommandLineArgs("").length).toEqual(0);
		});

		it("should return a single arg", () => {
			expect(getCommandLineArgs("arg").length).toEqual(1);
		});

		it("should return a single value for a name value pair no quotes", () => {
			expect(getCommandLineArgs("arg=value").length).toEqual(1);
		});

		it("should return a single value for a name value pair with single quotes", () => {
			expect(getCommandLineArgs("arg='value'").length).toEqual(1);
		});

		it("should return a single value for a name value pair with double quotes", () => {
			expect(getCommandLineArgs('arg="value"').length).toEqual(1);
		});

		it("should return a two values for two args", () => {
			expect(getCommandLineArgs("arg1 arg2").length).toEqual(2);
		});

		it("should return a two values for two name value pairs", () => {
			// eslint-disable-next-line @typescript-eslint/quotes
			expect(getCommandLineArgs(`arg1='value1' arg2="value2"`).length).toEqual(2);
		});

		it("should return a three values for two name value pairs and a single arg", () => {
			// eslint-disable-next-line @typescript-eslint/quotes
			expect(getCommandLineArgs(`arg1='value1' arg2="value2" arg3`).length).toEqual(3);
		});
	});
});
