import { fin } from "openfin-adapter/src/mock";

export async function createLaunchBarWindow(options) {
  return fin.Window.create(options);
}
