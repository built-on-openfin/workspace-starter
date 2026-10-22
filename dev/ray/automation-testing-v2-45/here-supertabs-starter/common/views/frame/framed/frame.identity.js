/**
 * Posts the identity of the current framed content to the Framed view.
 */
export function postIdentity() {
	if (window.fin === undefined) {
		console.log('Identity Module: fin api is not available so there is no fin identity for this frame.');
	} else {
		const identity = fin?.me?.identity;
		console.log(`Identity Module: Notify parent frame of identity: ${JSON.stringify(identity)}.`);
		parent.postMessage({ action: 'send-identity', data: { identity } }, '*');
	}
}
