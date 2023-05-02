import type OpenFin from "@openfin/core";
import { getCurrentSync } from "@openfin/workspace-platform";

export async function launchView(
	view: OpenFin.PlatformViewCreationOptions | string,
	targetIdentity?: OpenFin.Identity
) {
	const platform = getCurrentSync();
	let viewOptions: OpenFin.PlatformViewCreationOptions;
	if (typeof view === "string") {
		viewOptions = { url: view, target: null };
	} else {
		viewOptions = view;
	}

	return platform.createView(viewOptions, targetIdentity);
}
