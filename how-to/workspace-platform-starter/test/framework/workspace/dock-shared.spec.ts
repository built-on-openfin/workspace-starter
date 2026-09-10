import type { WorkspaceButton } from "@openfin/workspace";

// `@openfin/workspace-platform` subscribes to the InterApplicationBus as a side effect of being
// imported, which requires a much bigger `fin` mock than these tests need. dock-shared.ts only
// uses `getCurrentSync` from it (in code paths not touched by these tests), so a lightweight stub
// is enough to let the module load.
jest.mock("@openfin/workspace-platform", () => ({
	getCurrentSync: jest.fn()
}));

import {
	buildWorkspaceButtons,
	orderByIds,
	setDockProviderOptions,
	setRegisteredBootstrapOptions
} from "../../../client/src/framework/workspace/dock-shared";

describe("dock-shared", () => {
	describe("buildWorkspaceButtons", () => {
		beforeEach(() => {
			setDockProviderOptions(undefined);
			setRegisteredBootstrapOptions(undefined);
		});

		it("should never include contentMenu when includeDock3OnlyButtons is omitted, even if hideContentButton is false", () => {
			// This is the exact regression that broke dockType: "1" - dock1 must never ask for a
			// v3-only button, regardless of the workspaceComponents configuration.
			setDockProviderOptions({
				id: "dock",
				title: "Dock",
				icon: "icon.png",
				workspaceComponents: { hideContentButton: false }
			});

			const buttons = buildWorkspaceButtons();

			expect(buttons).not.toContain("contentMenu");
		});

		it("should never include contentMenu when includeDock3OnlyButtons is explicitly false", () => {
			setDockProviderOptions({
				id: "dock",
				title: "Dock",
				icon: "icon.png",
				workspaceComponents: { hideContentButton: false }
			});

			const buttons = buildWorkspaceButtons(undefined, false);

			expect(buttons).not.toContain("contentMenu");
		});

		it("should include contentMenu when includeDock3OnlyButtons is true and hideContentButton is false", () => {
			setDockProviderOptions({
				id: "dock",
				title: "Dock",
				icon: "icon.png",
				workspaceComponents: { hideContentButton: false }
			});

			const buttons = buildWorkspaceButtons(undefined, true);

			expect(buttons).toContain("contentMenu");
		});

		it("should exclude contentMenu when includeDock3OnlyButtons is true but hideContentButton is true", () => {
			setDockProviderOptions({
				id: "dock",
				title: "Dock",
				icon: "icon.png",
				workspaceComponents: { hideContentButton: true }
			});

			const buttons = buildWorkspaceButtons(undefined, true);

			expect(buttons).not.toContain("contentMenu");
		});

		it("should include switchWorkspace by default", () => {
			const buttons = buildWorkspaceButtons();

			expect(buttons).toContain("switchWorkspace");
		});

		it("should exclude switchWorkspace when hideWorkspacesButton is true", () => {
			setDockProviderOptions({
				id: "dock",
				title: "Dock",
				icon: "icon.png",
				workspaceComponents: { hideWorkspacesButton: true }
			});

			const buttons = buildWorkspaceButtons();

			expect(buttons).not.toContain("switchWorkspace");
		});

		it("should exclude home when the home component was not bootstrapped even if not hidden", () => {
			setRegisteredBootstrapOptions({ home: false });

			const buttons = buildWorkspaceButtons();

			expect(buttons).not.toContain("home");
		});

		it("should include home when the home component was bootstrapped and not hidden", () => {
			setRegisteredBootstrapOptions({ home: true });

			const buttons = buildWorkspaceButtons();

			expect(buttons).toContain("home");
		});

		it("should exclude home when the home component was bootstrapped but hideHomeButton is true", () => {
			setDockProviderOptions({
				id: "dock",
				title: "Dock",
				icon: "icon.png",
				workspaceComponents: { hideHomeButton: true }
			});
			setRegisteredBootstrapOptions({ home: true });

			const buttons = buildWorkspaceButtons();

			expect(buttons).not.toContain("home");
		});

		it("should exclude notifications when the notifications component was not bootstrapped", () => {
			setRegisteredBootstrapOptions({ notifications: false });

			const buttons = buildWorkspaceButtons();

			expect(buttons).not.toContain("notifications");
		});

		it("should include notifications when the notifications component was bootstrapped and not hidden", () => {
			setRegisteredBootstrapOptions({ notifications: true });

			const buttons = buildWorkspaceButtons();

			expect(buttons).toContain("notifications");
		});

		it("should exclude notifications when bootstrapped but hideNotificationsButton is true", () => {
			setDockProviderOptions({
				id: "dock",
				title: "Dock",
				icon: "icon.png",
				workspaceComponents: { hideNotificationsButton: true }
			});
			setRegisteredBootstrapOptions({ notifications: true });

			const buttons = buildWorkspaceButtons();

			expect(buttons).not.toContain("notifications");
		});

		it("should exclude store when the store component was not bootstrapped", () => {
			setRegisteredBootstrapOptions({ store: false });

			const buttons = buildWorkspaceButtons();

			expect(buttons).not.toContain("store");
		});

		it("should include store when the store component was bootstrapped and not hidden", () => {
			setRegisteredBootstrapOptions({ store: true });

			const buttons = buildWorkspaceButtons();

			expect(buttons).toContain("store");
		});

		it("should exclude store when bootstrapped but hideStorefrontButton is true", () => {
			setDockProviderOptions({
				id: "dock",
				title: "Dock",
				icon: "icon.png",
				workspaceComponents: { hideStorefrontButton: true }
			});
			setRegisteredBootstrapOptions({ store: true });

			const buttons = buildWorkspaceButtons();

			expect(buttons).not.toContain("store");
		});

		it("should preserve the previous order for buttons that are still enabled", () => {
			setRegisteredBootstrapOptions({ home: true, notifications: true, store: true });

			const previousOrder: WorkspaceButton[] = ["store", "home", "switchWorkspace", "notifications"];

			const buttons = buildWorkspaceButtons(previousOrder);

			expect(buttons).toEqual(["store", "home", "switchWorkspace", "notifications"]);
		});

		it("should append newly enabled buttons that are not in the previous order", () => {
			setRegisteredBootstrapOptions({ home: true });

			const previousOrder: WorkspaceButton[] = ["switchWorkspace"];

			const buttons = buildWorkspaceButtons(previousOrder);

			expect(buttons).toEqual(["switchWorkspace", "home"]);
		});

		it("should drop buttons from the previous order that are no longer enabled", () => {
			setDockProviderOptions({
				id: "dock",
				title: "Dock",
				icon: "icon.png",
				workspaceComponents: { hideWorkspacesButton: true }
			});
			setRegisteredBootstrapOptions({ home: true });

			const previousOrder: WorkspaceButton[] = ["switchWorkspace", "home"];

			const buttons = buildWorkspaceButtons(previousOrder);

			expect(buttons).toEqual(["home"]);
		});
	});

	describe("orderByIds", () => {
		it("should order entries per the given id list", () => {
			const entries = [{ id: "a" }, { id: "b" }, { id: "c" }];

			const result = orderByIds(entries, ["c", "a", "b"]);

			expect(result.map((entry) => entry.id)).toEqual(["c", "a", "b"]);
		});

		it("should append entries with unknown ids, preserving their relative order", () => {
			const entries = [{ id: "a" }, { id: "unknown-1" }, { id: "b" }, { id: "unknown-2" }];

			const result = orderByIds(entries, ["b", "a"]);

			expect(result.map((entry) => entry.id)).toEqual(["b", "a", "unknown-1", "unknown-2"]);
		});

		it("should append entries with no id, preserving their relative order", () => {
			const first = { id: undefined };
			const second = { id: "a" };
			const third = { id: undefined };

			const result = orderByIds([first, second, third], ["a"]);

			expect(result).toEqual([second, first, third]);
		});

		it("should return the original order when orderedIds is empty", () => {
			const entries = [{ id: "a" }, { id: "b" }, { id: "c" }];

			const result = orderByIds(entries, []);

			expect(result.map((entry) => entry.id)).toEqual(["a", "b", "c"]);
		});

		it("should return an empty array when entries is empty", () => {
			const result = orderByIds([], ["a", "b"]);

			expect(result).toEqual([]);
		});

		it("should use the last matching id position when orderedIds contains duplicates", () => {
			const entries = [{ id: "a" }, { id: "b" }];

			const result = orderByIds(entries, ["b", "a", "b"]);

			expect(result.map((entry) => entry.id)).toEqual(["a", "b"]);
		});
	});
});
