import { fin } from "@openfin/core";
import { getSettings } from "./settings";
interface ClientSnapshot {
	identity: OpenFin.ApplicationIdentity;
	snapshot: unknown;
}

export async function decorateSnapshot(snapshot: OpenFin.Snapshot): Promise<OpenFin.Snapshot> {
	const settings = await getSettings();
	const sources = settings?.platformProvider?.connections?.snapshotSources ?? [];

	const clientSnapshots: ClientSnapshot[] = await Promise.all(
		sources.map(async (uuid) => {
			const snapShotSource = await fin.SnapshotSource.wrap({ uuid });
			try {
				console.log(`Snapshot source: ${uuid}. Requesting a snapshot.`);
				const sourceSnapshot = await snapShotSource.getSnapshot();
				return { identity: { uuid }, snapshot: sourceSnapshot };
			} catch {
				console.log(`Snapshot source: ${uuid} was not available.`);
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
	const settings = await getSettings();
	const sources = settings?.platformProvider?.connections?.snapshotSources ?? [];

	await Promise.all(
		sources.map(async (uuid) => {
			const clientSnapshot: ClientSnapshot = snapshot.clientSnapshots.find(
				(s: ClientSnapshot) => s.identity.uuid === uuid
			);
			if (clientSnapshot) {
				try {
					const snapShotSource = await fin.SnapshotSource.wrap(clientSnapshot.identity);
					console.log(`Snapshot source: ${uuid} is running and has a snapshot entry. Applying snapshot.`);
					await snapShotSource.applySnapshot(clientSnapshot.snapshot);
				} catch {
					console.log(`Snapshot source: ${uuid} is not able to apply the snapshot.`);
				}
			} else {
				console.log(`Snapshot source: ${uuid} but doesn't have any entries in this snapshot.`);
			}
			return {};
		})
	);
}
