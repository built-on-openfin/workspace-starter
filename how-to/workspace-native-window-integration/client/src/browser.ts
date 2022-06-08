import { BrowserOverrideCallback } from "@openfin/workspace-platform";
import { decorateSnapshot, applyDecoratedSnapshot } from "./native-window-integration";

export const overrideCallback: BrowserOverrideCallback = async (WorkspacePlatformProvider) => {
  class Override extends WorkspacePlatformProvider {
    async getSnapshot(...args: [undefined, OpenFin.ClientIdentity]) {
      const snapshot = await super.getSnapshot(...args);

      const decoratedSnapshot = await decorateSnapshot(snapshot);
      return decoratedSnapshot;

      return snapshot;
    }

    async applySnapshot(...args: [OpenFin.ApplySnapshotPayload, OpenFin.ClientIdentity]) {
      await super.applySnapshot(...args);

      await applyDecoratedSnapshot(args[0].snapshot);
    }
  }
  return new Override();
};
