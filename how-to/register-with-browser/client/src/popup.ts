import type OpenFin from "@openfin/core";

document.addEventListener("DOMContentLoaded", init);

async function init() {
	const options = await fin.me.getOptions();

	if (options.customData?.title) {
		const title = document.querySelector("#title");
		if (title) {
			title.textContent = options.customData?.title;
		}
	}

	if (options.customData?.instructions) {
		const instructions = document.querySelector("#instructions");
		if (instructions) {
			instructions.textContent = options.customData?.instructions;
		}
	}

	if (Array.isArray(options.customData?.buttons)) {
		const buttonsContainer = document.querySelector("#buttonsContainer");

		if (buttonsContainer) {
			for (const button of options.customData.buttons) {
				const btn = document.createElement("button");
				if (!button.default) {
					btn.classList.add("secondary");
				}
				btn.type = "button";
				btn.textContent = button.label;
				btn.addEventListener("click", async () => {
					await (fin.me as OpenFin.Window).dispatchPopupResult(btn.id);
				});
				buttonsContainer.append(btn);
			}
		}
	}
}
