import { getConnectedSnapshotSourceClients } from "./connections";
import { createGroupLogger } from "./logger-provider";

const logger = createGroupLogger("SnapshotSource");

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
				logger.info(`Snapshot source: ${entry.identity.uuid}. Requesting a snapshot`);
				const sourceSnapshot = await snapShotSource.getSnapshot();
				return { identity: entry.identity, snapshot: sourceSnapshot };
			} catch {
				logger.info(`Snapshot source: ${entry.identity.uuid} was not available`);
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
	const sources = await getConnectedSnapshotSourceClients();
	if (sources.length === 0) {
		return {};
	}
	await Promise.all(
		sources.map(async (entry) => {
			const clientSnapshot: ClientSnapshot = Array.isArray(snapshot.clientSnapshots)
				? snapshot.clientSnapshots.find((s: ClientSnapshot) => s.identity.uuid === entry.identity.uuid)
				: undefined;
			if (clientSnapshot) {
				try {
					const snapShotSource = await fin.SnapshotSource.wrap(clientSnapshot.identity);
					logger.info(
						`Snapshot source: ${entry.identity.uuid} is running and has a snapshot entry. Applying snapshot.`
					);
					await snapShotSource.applySnapshot(clientSnapshot.snapshot);
				} catch {
					logger.info(`Snapshot source: ${entry.identity.uuid} is not able to apply the snapshot`);
				}
			} else {
				logger.info(`Snapshot source: ${entry.identity.uuid} but doesn't have any entries in this snapshot`);
			}
			return {};
		})
	);
}
