import type OpenFin from "@openfin/core";

document.addEventListener("DOMContentLoaded", initDOM);

/**
 * Initialize the DOM components.
 */
async function initDOM(): Promise<void> {
	const options = await fin.me.getOptions();

	if (Array.isArray(options.customData?.menuEntries)) {
		const menuContainer = document.querySelector("#menuContainer");

		if (menuContainer) {
			for (const menuEntry of options.customData.menuEntries) {
				const menuEntryButton = document.createElement("div");
				menuEntryButton.classList.add("menu-item");
				menuEntryButton.addEventListener("click", async () => {
					await (fin.me as OpenFin.Window).dispatchPopupResult(menuEntry.id);
				});
				menuContainer.append(menuEntryButton);

				const icon = document.createElement("img");
				icon.src = menuEntry.icon;
				icon.width = 16;
				icon.height = 16;

				const text = document.createElement("span");
				text.textContent = menuEntry.label;

				menuEntryButton.append(icon);
				menuEntryButton.append(text);
			}
		}
	}
}
