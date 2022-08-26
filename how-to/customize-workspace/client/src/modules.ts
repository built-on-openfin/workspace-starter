import { createLogger } from "./logger-provider";
import {
	Module,
	ModuleEntry,
	ModuleEntryTypes,
	ModuleDefinition,
	ModuleImplementation,
	ModuleList,
	ModuleTypes
} from "./module-shapes";

const logger = createLogger("Modules");

/**
 * All the loaded modules.
 */
const loadedModules: {
	[url: string]: ModuleEntryTypes;
} = {};

/**
 * Load the modules from the list.
 * @param moduleList The list of modules to load.
 * @param moduleType The type of modules to load.
 * @returns Nothing.
 */
export async function loadModules<
	M extends ModuleImplementation<O, H>,
	H = unknown,
	O = unknown,
	D extends ModuleDefinition<O> = ModuleDefinition<O>
>(moduleList: ModuleList | undefined, moduleType: ModuleTypes): Promise<ModuleEntry<M, H, O, D>[]> {
	const loaded: ModuleEntry<M, H, O, D>[] = [];

	if (Array.isArray(moduleList?.modules)) {
		for (const moduleDefinition of moduleList.modules) {
			const module = await loadModule<M, H, O, D>(moduleDefinition, moduleType);
			if (module) {
				loaded.push(module);
			}
		}
	}

	return loaded;
}

/**
 * Load a module if it is enabled and add it to the loaded list.
 * @param moduleDefinition The module definition to load.
 * @param moduleType The type of module to load.
 * @returns Nothing.
 */
export async function loadModule<
	M extends ModuleImplementation<O, H>,
	H = unknown,
	O = unknown,
	D extends ModuleDefinition<O> = ModuleDefinition<O>
>(moduleDefinition: ModuleDefinition, moduleType: ModuleTypes): Promise<ModuleEntry<M, H, O, D> | undefined> {
	if (!moduleDefinition.id) {
		logger.warn("Module does not have an id defined");
		return;
	}
	if (moduleDefinition.enabled) {
		if (!moduleDefinition.url) {
			logger.error(`Module '${moduleDefinition.id}' can not be loaded without a url`);
			return;
		}
		if (!loadedModules[moduleDefinition.url]) {
			try {
				logger.info(`Loading module '${moduleDefinition.url}' for type ${moduleType}`);
				const mod: Module = await import(/* webpackIgnore: true */ moduleDefinition.url);
				if (!mod.entryPoints) {
					logger.error(`Module '${moduleDefinition.id}' has no exported entryPoints`);
				}
				loadedModules[moduleDefinition.url] = {};
				const moduleTypes = Object.keys(mod.entryPoints);
				logger.info(`Module contains implementations for '${moduleTypes.join(", ")}'`);
				for (const type of moduleTypes) {
					loadedModules[moduleDefinition.url][type] = {
						definition: moduleDefinition,
						isInitialised: false,
						implementation: mod.entryPoints[type]
					};
				}
			} catch (err) {
				logger.error(`Error loading module ${moduleDefinition.url}`, err);
			}
		} else {
			logger.info(`Module already loaded '${moduleDefinition.url}' for type ${moduleType}`);
		}

		return loadedModules[moduleDefinition.url][moduleType] as ModuleEntry<M, H, O, D>;
	}
}

/**
 * Initialize modules of the given type.
 * @param moduleType The type of modules to initialize.
 * @returns The list of initialized modules.
 */
export async function initializeModules<
	M extends ModuleImplementation<O, H>,
	H = unknown,
	O = unknown,
	D extends ModuleDefinition<O> = ModuleDefinition<O>
>(moduleEntries: ModuleEntry<M, H, O, D>[], helpers?: H): Promise<void> {
	for (const moduleEntry of moduleEntries) {
		await initializeModule<M, H, O, D>(moduleEntry, helpers);
	}
}

/**
 * Initialize a single module entry.
 * @param moduleEntry The entry to initialize.
 * @returns The initialized module implementation.
 */
export async function initializeModule<
	M extends ModuleImplementation<O, H>,
	H = unknown,
	O = unknown,
	D extends ModuleDefinition<O> = ModuleDefinition<O>
>(moduleEntry: ModuleEntry<M, H, O, D>, helpers?: H): Promise<M | undefined> {
	if (!moduleEntry.isInitialised) {
		if (moduleEntry?.implementation.initialize) {
			try {
				logger.info(`Initializing module '${moduleEntry.definition.id}'`);
				await moduleEntry?.implementation.initialize(moduleEntry.definition, createLogger, helpers);
				moduleEntry.isInitialised = true;
			} catch (err) {
				logger.error(`Error initializing module ${moduleEntry.definition.id}`, err);
			}
		} else {
			moduleEntry.isInitialised = true;
		}
	}

	return moduleEntry.isInitialised ? moduleEntry.implementation : undefined;
}

/**
 * Close down modules of the given type.
 * @param moduleType The type of modules to close down.
 * @returns Nothing.
 */
export async function closedownModules(moduleType: ModuleTypes): Promise<void> {
	for (const url in loadedModules) {
		const moduleEntry = loadedModules[url][moduleType];
		if (moduleEntry) {
			await closedownModule(moduleEntry);
		}
	}
}

/**
 * Close down a single module entry.
 * @param moduleEntry The entry to close down.
 * @returns Nothing.
 */
export async function closedownModule<
	M extends ModuleImplementation<O, H>,
	H = unknown,
	O = unknown,
	D extends ModuleDefinition<O> = ModuleDefinition<O>
>(moduleEntry: ModuleEntry<M, H, O, D>): Promise<void> {
	if (moduleEntry.isInitialised) {
		if (moduleEntry?.implementation.closedown) {
			try {
				logger.info(`Closing down module '${moduleEntry.definition.id}'`);
				await moduleEntry?.implementation.closedown();
				moduleEntry.isInitialised = false;
			} catch (err) {
				logger.error(`Error closing down module ${moduleEntry.definition.id}`, err);
			}
		} else {
			moduleEntry.isInitialised = false;
		}
	}
}
