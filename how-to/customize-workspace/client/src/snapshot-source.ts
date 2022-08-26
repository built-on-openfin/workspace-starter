import { App } from "@openfin/workspace";
import { getConnectedSnapshotSourceClients } from "./connections";
import { launch } from "./launch";
import { createLogger } from "./logger-provider";

const logger = createLogger("SnapshotSource");

interface ClientSnapshot {
	identity: OpenFin.ApplicationIdentity;
	snapshot: unknown;
}

export async function decorateSnapshot(snapshot: OpenFin.Snapshot): Promise<OpenFin.Snapshot> {
	const sources = await getConnectedSnapshotSourceClients();

	if (sources.length === 0) {
		return snapshot;
	}
	const clientSnapshots: ClientSnapshot[] = await Promise.all(
		sources.map(async (entry) => {
			const snapShotSource = await fin.SnapshotSource.wrap({ uuid: entry.identity.uuid });
			try {
				logger.info(`Snapshot source: ${entry.identity.uuid}. Requesting a snapshot.`);
				const sourceSnapshot = await snapShotSource.getSnapshot();
				return { identity: entry.identity, snapshot: sourceSnapshot };
			} catch {
				logger.info(`Snapshot source: ${entry.identity.uuid} was not available.`);
				return null;
			}
		})
	);

	const validatedClientSnapshots: ClientSnapshot[] = clientSnapshots.filter(
		(snapshotSource) => snapshotSource !== null
	);

	const decoratedSnapshot: OpenFin.Snapshot = Object.assign(snapshot, {
		clientSnapshots: validatedClientSnapshots
	});
	return decoratedSnapshot;
}

export async function applyClientSnapshot(snapshot) {
	if (!Array.isArray(snapshot?.clientSnapshots)) {
		return {};
	}
	const sources = await getConnectedSnapshotSourceClients();
	await Promise.all(
		snapshot.clientSnapshots.map(async (clientSnapshot: ClientSnapshot) => {
			if (clientSnapshot) {
				if (sources.some((source) => source.identity.uuid === clientSnapshot.identity.uuid)) {
					try {
						const snapShotSource = await fin.SnapshotSource.wrap(clientSnapshot.identity);
						logger.info(
							`Snapshot source: ${clientSnapshot.identity.uuid} is running and has a snapshot entry. Applying snapshot.`
						);
						await snapShotSource.applySnapshot(clientSnapshot.snapshot);
					} catch {
						logger.warn(
							`Snapshot source: ${clientSnapshot.identity.uuid} is not able to apply the snapshot.`
						);
					}
				} else if (clientSnapshot?.snapshot !== undefined) {
					// eslint-disable-next-line @typescript-eslint/dot-notation
					const app: App = clientSnapshot.snapshot["App"] ?? clientSnapshot.snapshot["app"];
					if (app !== undefined) {
						logger.info(
							`Client not connected but snapshot contains an app definition. Launching app definition for ${clientSnapshot.identity.uuid}`
						);
						logger.debug("Client app definition:", app);
						await launch(app);
					}
				} else {
					logger.warn(
						`Client snapshot was available but the source ${clientSnapshot.identity.uuid} was not connected and it didn't provide an app/App entry as part of the snapshot to trigger a launch.`
					);
				}
			}
			return {};
		})
	);
}
