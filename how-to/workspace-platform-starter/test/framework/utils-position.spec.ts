import { findMonitorContainingPoint, pointInRect } from "../../client/src/framework/utils-position";
import { PRIMARY_MONITOR_RECT, SECONDARY_MONITOR_RECT, TERTIARY_MONITOR_RECT } from "../common";

describe("utils-position", () => {
	describe("pointInRect", () => {
		it("should return false if point is outside rect to the left", () => {
			expect(pointInRect({ x: 0, y: 1 }, { left: 1, top: 1, right: 10, bottom: 10 })).toEqual(false);
		});

		it("should return false if point is outside rect to the right", () => {
			expect(pointInRect({ x: 11, y: 1 }, { left: 1, top: 1, right: 10, bottom: 10 })).toEqual(false);
		});

		it("should return false if point is outside rect to the top", () => {
			expect(pointInRect({ x: 1, y: 0 }, { left: 1, top: 1, right: 10, bottom: 10 })).toEqual(false);
		});

		it("should return false if point is outside rect to the bottom", () => {
			expect(pointInRect({ x: 1, y: 11 }, { left: 1, top: 1, right: 10, bottom: 10 })).toEqual(false);
		});

		it("should return true if point is on the left edge", () => {
			expect(pointInRect({ x: 1, y: 1 }, { left: 1, top: 1, right: 10, bottom: 10 })).toEqual(true);
		});

		it("should return true if point is on the right edge", () => {
			expect(pointInRect({ x: 10, y: 1 }, { left: 1, top: 1, right: 10, bottom: 10 })).toEqual(true);
		});

		it("should return true if point is on the top edge", () => {
			expect(pointInRect({ x: 1, y: 1 }, { left: 1, top: 1, right: 10, bottom: 10 })).toEqual(true);
		});

		it("should return true if point is on the bottom edge", () => {
			expect(pointInRect({ x: 1, y: 10 }, { left: 1, top: 1, right: 10, bottom: 10 })).toEqual(true);
		});

		it("should return true if point is inside horizontally", () => {
			expect(pointInRect({ x: 2, y: 1 }, { left: 1, top: 1, right: 10, bottom: 10 })).toEqual(true);
		});

		it("should return true if point is inside vertically", () => {
			expect(pointInRect({ x: 1, y: 2 }, { left: 1, top: 1, right: 10, bottom: 10 })).toEqual(true);
		});
	});

	describe("findMonitorContainingPoint", () => {
		it("should return primary monitor if point is undefined", async () => {
			const res = await findMonitorContainingPoint({});
			expect(res.monitorRect).toEqual(PRIMARY_MONITOR_RECT);
		});

		it("should return primary monitor if point is outside bounds", async () => {
			const res = await findMonitorContainingPoint({ x: 10000, y: 10 });
			expect(res.monitorRect).toEqual(PRIMARY_MONITOR_RECT);
		});

		it("should return primary monitor if point is in primary", async () => {
			const res = await findMonitorContainingPoint({ x: 10, y: 10 });
			expect(res.monitorRect).toEqual(PRIMARY_MONITOR_RECT);
		});

		it("should return secondary monitor if point is in secondary", async () => {
			const res = await findMonitorContainingPoint({ x: 1200, y: 10 });
			expect(res.monitorRect).toEqual(SECONDARY_MONITOR_RECT);
		});

		it("should return tertiary monitor if point is in tertiary", async () => {
			const res = await findMonitorContainingPoint({ x: 2500, y: 10 });
			expect(res.monitorRect).toEqual(TERTIARY_MONITOR_RECT);
		});
	});
});
