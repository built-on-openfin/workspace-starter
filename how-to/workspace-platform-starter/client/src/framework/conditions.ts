import { getCurrentSync, type WorkspacePlatformModule } from "@openfin/workspace-platform";
import { fireLifecycleEvent } from "./lifecycle";
import { createLogger } from "./logger-provider";
import { initializeModules, loadModules } from "./modules";
import type {
	ConditionContextTypes,
	ConditionMap,
	Conditions,
	ConditionsProviderOptions
} from "./shapes/conditions-shapes";
import type { ConditionChangedLifecyclePayload } from "./shapes/lifecycle-shapes";
import type { ModuleDefinition, ModuleEntry, ModuleHelpers } from "./shapes/module-shapes";
import { isEmpty } from "./utils";

const logger = createLogger("ConditionProvider");
const allConditions: ConditionMap = {};
let modules: ModuleEntry<Conditions, unknown, unknown, ModuleDefinition>[] = [];

/**
 * Initialize the conditions provider.
 * @param options Options for the conditions provider.
 * @param helpers Module helpers to pass to any loaded modules.
 */
export async function init(
	options: ConditionsProviderOptions | undefined,
	helpers: ModuleHelpers
): Promise<void> {
	if (options) {
		modules = await loadModules<Conditions>(options, "conditions");
		await initializeModules<Conditions>(modules, helpers);

		logger.info("Getting conditions...");
		for (const conditionModule of modules) {
			const conditions = await conditionModule.implementation.get();
			for (const condition in conditions) {
				allConditions[condition] = conditions[condition];
				logger.info(`Added condition: ${condition}`);
			}
		}
		logger.info("Finished getting conditions.");
	}
}

/**
 * Manually register a condition.
 * @param conditionName The name of the condition.
 * @param conditionChecker The method to call to check the condition.
 * @param override Override an existing condition.
 */
export function registerCondition(
	conditionName: string,
	conditionChecker: () => Promise<boolean>,
	override: boolean = true
): void {
	if (!isEmpty(allConditions[conditionName])) {
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
		logger.info("Registering condition", conditionName);
		allConditions[conditionName] = conditionChecker;
	}
}

/**
 * Check the condition to see if all of the conditions are true.
 * @param platform The platform.
 * @param conditionIds The conditions to check.
 * @param context The context of the caller.
 * @returns True if all of the conditions are true.
 */
export async function checkConditions(
	platform: WorkspacePlatformModule,
	conditionIds: string[] | undefined,
	context?: ConditionContextTypes
): Promise<boolean> {
	if (Array.isArray(conditionIds)) {
		for (const conditionId of conditionIds) {
			if (!(await checkCondition(platform, conditionId, context))) {
				return false;
			}
		}
	}

	return true;
}

/**
 * Check to see if a single condition is true.
 * @param platform The platform.
 * @param conditionId The condition to check.
 * @param context The context of the caller.
 * @returns True if the condition is true, or it does not exist.
 */
export async function checkCondition(
	platform: WorkspacePlatformModule,
	conditionId: string,
	context?: ConditionContextTypes
): Promise<boolean> {
	if (isEmpty(allConditions[conditionId])) {
		return false;
	}
	return allConditions[conditionId](platform, context);
}

/**
 * Notify the platform that a condition has changed.
 * @param conditionId The condition that changed, or empty to determine many might have changed.
 */
export async function conditionChanged(conditionId?: string): Promise<void> {
	const platform = getCurrentSync();
	await fireLifecycleEvent<ConditionChangedLifecyclePayload>(platform, "condition-changed", {
		conditionId
	});
}
