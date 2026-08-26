import type * as WorkspacePlatform from "@openfin/workspace-platform";

/**
 * Central dynamic loader for the OpenFin Workspace Platform bundle.
 * Caches the loaded module so all callers share a single instance.
 */
export class WorkspacePlatformLoader {
	/**
	 * Cached dynamic import promise. Using a promise prevents duplicate
	 * concurrent loads if multiple consumers call `import()` at once.
	 */
	private static _module: Promise<typeof WorkspacePlatform> | null = null;

	/**
	 * Dynamically import and return the Workspace Platform module.
	 * @returns The OpenFin Workspace Platform module.
	 */
	public static async import(): Promise<typeof WorkspacePlatform> {
		if (!this._module) {
			this._module = import("@openfin/workspace-platform");
		}

		return this._module;
	}
}

