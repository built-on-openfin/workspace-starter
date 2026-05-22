import type OpenFin from "@openfin/core";
import { init } from "@openfin/workspace-platform";
import { BROWSER_SCENARIOS, type BrowserScenarioId } from "./browser-scenarios";
import type { BrowserExampleLaunchParams } from "./launch-params";

const RUNTIME_MANIFEST_URL = "http://localhost:8080/runtime.manifest.fin.json";
const PLATFORM_ICON = "http://localhost:8080/favicon.ico";

let runtimeApplication: OpenFin.Application | undefined;

window.addEventListener("DOMContentLoaded", async () => {
	const platform = fin.Platform.getCurrentSync();
	await platform.once("platform-api-ready", async () => {
		const providerWindow = fin.Window.getCurrentSync();
		await providerWindow.once("close-requested", async () => {
			await quitLauncher();
		});
	});

	await initializeLauncherWorkspacePlatform();
	await initializeLauncherDOM();
});

/**
 * Minimal platform bootstrap so Platform.quit() and lifecycle work in the launcher app.
 */
async function initializeLauncherWorkspacePlatform(): Promise<void> {
	await init({
		browser: {
			defaultWindowOptions: {
				icon: PLATFORM_ICON,
				workspacePlatform: {
					pages: [],
					favicon: PLATFORM_ICON
				}
			}
		},
		theme: [
			{
				label: "Default",
				default: "dark",
				palette: {
					brandPrimary: "#0A76D3",
					brandSecondary: "#383A40",
					backgroundPrimary: "#1E1F23"
				}
			}
		]
	});
}

/**
 * Close any runtime example and exit the launcher platform application.
 */
async function quitLauncher(): Promise<void> {
	if (runtimeApplication) {
		await runtimeApplication.close(true);
		runtimeApplication = undefined;
	}
	await fin.Platform.getCurrentSync().quit();
}

/**
 * Initialize the launcher control panel UI and wire button handlers.
 */
async function initializeLauncherDOM(): Promise<void> {
	const scenarioSelect = document.querySelector<HTMLSelectElement>("#scenario");
	const launchButton = document.querySelector<HTMLButtonElement>("#launch");
	const closeExampleButton = document.querySelector<HTMLButtonElement>("#close-example");
	const quitButton = document.querySelector<HTMLButtonElement>("#quit");
	const allowDuplicatePageTitlesCheckbox =
		document.querySelector<HTMLInputElement>("#allowDuplicatePageTitles");
	const duplicateTitlesHint = document.querySelector<HTMLParagraphElement>("#duplicate-titles-hint");

	if (scenarioSelect && launchButton && closeExampleButton && quitButton) {
		for (const scenario of BROWSER_SCENARIOS) {
			const option = document.createElement("option");
			option.value = scenario.id;
			option.textContent = scenario.label;
			scenarioSelect.append(option);
		}

		scenarioSelect.addEventListener("change", () => {
			updateDuplicatePageTitlesHint(
				scenarioSelect,
				allowDuplicatePageTitlesCheckbox,
				duplicateTitlesHint,
				"scenario-change"
			);
		});
		allowDuplicatePageTitlesCheckbox?.addEventListener("change", () => {
			updateDuplicatePageTitlesHintTextOnly(
				scenarioSelect,
				allowDuplicatePageTitlesCheckbox,
				duplicateTitlesHint
			);
		});
		updateDuplicatePageTitlesHint(
			scenarioSelect,
			allowDuplicatePageTitlesCheckbox,
			duplicateTitlesHint,
			"init-dom"
		);

		launchButton.addEventListener("click", async () => {
			if (runtimeApplication) {
				await runtimeApplication.close(true);
				runtimeApplication = undefined;
			}

			const launchParams: BrowserExampleLaunchParams = {
				scenarioId: scenarioSelect.value as BrowserScenarioId,
				allowDuplicatePageTitles: allowDuplicatePageTitlesCheckbox?.checked ?? false
			};

			runtimeApplication = await fin.Application.startFromManifest(RUNTIME_MANIFEST_URL, {
				userAppConfigArgs: {
					scenarioId: launchParams.scenarioId,
					allowDuplicatePageTitles: launchParams.allowDuplicatePageTitles ? "true" : "false"
				}
			});
			await runtimeApplication.once("closed", () => {
				runtimeApplication = undefined;
				setExampleRunningState(false);
			});
			setExampleRunningState(true);
		});

		closeExampleButton.addEventListener("click", async () => {
			if (runtimeApplication) {
				await runtimeApplication.close(true);
				runtimeApplication = undefined;
			}
			setExampleRunningState(false);
		});

		quitButton.addEventListener("click", async () => {
			await quitLauncher();
		});

		setExampleRunningState(false);
	}
}

/**
 * Enable or disable controls based on whether a runtime example is active.
 * @param isRunning Whether the runtime platform is running.
 */
function setExampleRunningState(isRunning: boolean): void {
	const launchButton = document.querySelector<HTMLButtonElement>("#launch");
	const closeExampleButton = document.querySelector<HTMLButtonElement>("#close-example");
	const scenarioSelect = document.querySelector<HTMLSelectElement>("#scenario");
	const allowDuplicatePageTitlesCheckbox =
		document.querySelector<HTMLInputElement>("#allowDuplicatePageTitles");

	if (launchButton && closeExampleButton && scenarioSelect) {
		launchButton.disabled = isRunning;
		scenarioSelect.disabled = isRunning;
		if (allowDuplicatePageTitlesCheckbox) {
			allowDuplicatePageTitlesCheckbox.disabled = isRunning;
		}
		closeExampleButton.disabled = !isRunning;
	}
}

const DUPLICATE_TITLES_HINT_ALLOWED =
	"Enable Allow Duplicate Page Titles before launching. On launch, the second tab may still show a suffix such as (1) — that is expected. " +
	"To see duplicate titles in action: after the browser opens, rename one page tab to match the other (for example, both Shared Page Title). " +
	"The platform will accept the duplicate name when the checkbox is enabled.";

const DUPLICATE_TITLES_HINT_DISALLOWED =
	"With Allow Duplicate Page Titles unchecked, launch the browser then try renaming one page tab to match the other. " +
	"The platform will reject the duplicate or append a suffix such as (1). " +
	"Enable the checkbox and launch again to allow matching titles.";

/**
 * Update only the hint text from the current checkbox state (never changes the checkbox).
 * @param scenarioSelect The scenario dropdown.
 * @param allowDuplicatePageTitlesCheckbox The allow duplicate titles checkbox.
 * @param duplicateTitlesHint The hint paragraph for the duplicate titles scenario.
 */
function updateDuplicatePageTitlesHintTextOnly(
	scenarioSelect: HTMLSelectElement,
	allowDuplicatePageTitlesCheckbox: HTMLInputElement | null,
	duplicateTitlesHint: HTMLParagraphElement | null
): void {
	const isDuplicateTitlesScenario = scenarioSelect.value === "duplicate-page-titles";
	if (duplicateTitlesHint) {
		duplicateTitlesHint.classList.remove("error");
		duplicateTitlesHint.hidden = !isDuplicateTitlesScenario;
		if (isDuplicateTitlesScenario) {
			duplicateTitlesHint.textContent = allowDuplicatePageTitlesCheckbox?.checked
				? DUPLICATE_TITLES_HINT_ALLOWED
				: DUPLICATE_TITLES_HINT_DISALLOWED;
		}
	}
}

/**
 * Update hint when the scenario changes. Defaults the checkbox only when entering the demo scenario.
 * @param scenarioSelect The scenario dropdown.
 * @param allowDuplicatePageTitlesCheckbox The allow duplicate titles checkbox.
 * @param duplicateTitlesHint The hint paragraph for the duplicate titles scenario.
 * @param trigger What triggered this update.
 */
function updateDuplicatePageTitlesHint(
	scenarioSelect: HTMLSelectElement,
	allowDuplicatePageTitlesCheckbox: HTMLInputElement | null,
	duplicateTitlesHint: HTMLParagraphElement | null,
	trigger: "scenario-change" | "init-dom"
): void {
	const isDuplicateTitlesScenario = scenarioSelect.value === "duplicate-page-titles";
	if (allowDuplicatePageTitlesCheckbox && isDuplicateTitlesScenario && trigger === "scenario-change") {
		allowDuplicatePageTitlesCheckbox.checked = true;
	}
	updateDuplicatePageTitlesHintTextOnly(
		scenarioSelect,
		allowDuplicatePageTitlesCheckbox,
		duplicateTitlesHint
	);
}
