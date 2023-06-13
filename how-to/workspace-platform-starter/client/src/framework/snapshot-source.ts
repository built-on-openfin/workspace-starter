import type OpenFin from "@openfin/core";
import { getConnectedSnapshotSourceClients } from "./connections";
import { launch } from "./launch";
import { createLogger } from "./logger-provider";
import type { ClientSnapshot, PlatformApp } from "./shapes/app-shapes";
import { isEmpty } from "./utils";

const logger = createLogger("SnapshotSource");

/**
 * Decorate a snapshot with the native window information.
 * @param snapshot The snapshot to decorate.
 * @returns The decorated snapshot.
 */
export async function decorateSnapshot(snapshot: OpenFin.Snapshot): Promise<OpenFin.Snapshot> {
	const sources = await getConnectedSnapshotSourceClients();

	if (sources.length === 0) {
		return snapshot;
	}

	const clientSnapshots: (ClientSnapshot | undefined)[] = await Promise.all(
		sources.map(async (entry) => {
			const snapShotSource = await fin.SnapshotSource.wrap({ uuid: entry.identity.uuid });
			try {
				logger.info(`Snapshot source: ${entry.identity.uuid}. Requesting a snapshot.`);
				const sourceSnapshot = await snapShotSource.getSnapshot();
				return { identity: entry.identity, snapshot: sourceSnapshot };
			} catch {
				logger.info(`Snapshot source: ${entry.identity.uuid} was not available.`);
			}
		})
	);

	const decoratedSnapshot: OpenFin.Snapshot = Object.assign(snapshot, {
		clientSnapshots: clientSnapshots.filter((snapshotSource) => !isEmpty(snapshotSource))
	});

	return decoratedSnapshot;
}

/**
 * Apply connected client to a snapshot.
 * @param snapshot The snapshot.
 */
export async function applyClientSnapshot(
	snapshot: OpenFin.Snapshot & { clientSnapshots?: ClientSnapshot[] }
): Promise<void> {
	if (Array.isArray(snapshot?.clientSnapshots)) {
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
					} else if (!isEmpty(clientSnapshot?.snapshot)) {
						const sn = clientSnapshot?.snapshot;
						const app: PlatformApp | undefined = sn?.App ?? sn?.app;
						if (!isEmpty(app)) {
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
			})
		);
	}
}
