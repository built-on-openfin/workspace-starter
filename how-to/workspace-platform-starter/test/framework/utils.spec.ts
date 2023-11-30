import {
	isBoolean,
	isEmpty,
	isObject,
	isInteger,
	isNumber,
	isNumberValue,
	isString,
	isStringValue,
	objectClone,
	randomUUID,
	formatError,
	sanitizeString
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
});
