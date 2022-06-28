import { fin } from "openfin-adapter/src/mock";
import { LaunchBarWindowSettings } from "./shapes";

export async function createLaunchBarWindow(options: LaunchBarWindowSettings) {
  return fin.Window.create(options);
}
