import type { ModuleList } from "./module-shapes";

/**
 * The headless provider supports a list of modules. Right now the url must be to a
 * html page as we will be launching a window after the bootstrapping process has run. A js extension will log an error.
 * The data setting of the module can be a WindowsOptions object with settings (our defaults should be enough if you want
 * a hidden window to run logic in the background)
 */
export type HeadlessProviderOptions = ModuleList;
