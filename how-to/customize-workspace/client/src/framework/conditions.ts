import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import { createLogger } from "./logger-provider";
import { initializeModules, loadModules } from "./modules";
import type { ConditionMap, Conditions, ConditionsProviderOptions } from "./shapes/conditions-shapes";
import type { ModuleDefinition, ModuleEntry, ModuleHelpers } from "./shapes/module-shapes";

let conditionsModules: ModuleEntry<Conditions, unknown, unknown, ModuleDefinition>[] = [];

const allConditions: ConditionMap = {};

const logger = createLogger("ConditionProvider");

export function registerCondition(
	conditionName: string,
	conditionChecker: () => Promise<boolean>,
	override: boolean = true
) {
	if (allConditions[conditionName] !== undefined) {
		if (override) {
			logger.warn(
				"Replacing existing condition checker that has been registered with this name:",
				conditionName
			);
			allConditions[conditionName] = conditionChecker;
		} else {
			logger.warn(
				"Not replacing existing condition checker that has been registered with this name:",
				conditionName
			);
		}
	} else {
		logger.info("Registering condition:", conditionName);
		allConditions[conditionName] = conditionChecker;
	}
}

export async function init(
	conditionsProviderOptions: ConditionsProviderOptions,
	helpers: ModuleHelpers
): Promise<void> {
	conditionsModules = await loadModules<Conditions>(conditionsProviderOptions, "conditions");
	await initializeModules<Conditions>(conditionsModules, helpers);

	logger.info("Checking conditions...");
	for (const conditionModule of conditionsModules) {
		const conditions = await conditionModule.implementation.get();
		for (const condition in conditions) {
			allConditions[condition] = conditions[condition];
			logger.info(`Added condition: ${condition}`);
		}
	}
	logger.info("Finished checking conditions.");
}

export async function checkConditions(
	platform: WorkspacePlatformModule,
	conditionIds: string[]
): Promise<boolean> {
	if (Array.isArray(conditionIds)) {
		for (const conditionId of conditionIds) {
			if (!(await checkCondition(platform, conditionId))) {
				return false;
			}
		}
		return true;
	}

	return true;
}

export async function checkCondition(
	platform: WorkspacePlatformModule,
	conditionId: string
): Promise<boolean> {
	return allConditions[conditionId](platform) ?? true;
}
