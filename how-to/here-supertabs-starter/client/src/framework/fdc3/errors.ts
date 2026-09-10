/** Constants representing the errors that can be encountered when calling the `open` method on the DesktopAgent object (`fdc3`). */
export const OPEN_ERROR = {
	/** Returned if the specified application is not found.*/
	AppNotFound: "AppNotFound",
	/** Returned if the specified application fails to launch correctly.*/
	ErrorOnLaunch: "ErrorOnLaunch",
	/** Returned if the specified application launches but fails to add a context listener in order to receive the context passed to the `fdc3.open` call.*/
	AppTimeout: "AppTimeout",
	/** Returned if the FDC3 desktop agent implementation is not currently able to handle the request.*/
	ResolverUnavailable: "ResolverUnavailable",
	/** Returned if a call to the `open` function is made with an invalid context argument. Contexts should be Objects with at least a `type` field that has a `string` value.*/
	MalformedContext: "MalformedContext"
};
/** Constants representing the errors that can be encountered when calling the `findIntent`, `findIntentsByContext`, `raiseIntent` or `raiseIntentForContext` methods on the DesktopAgent (`fdc3`). */
export const RESOLVE_ERROR = {
	/** SHOULD be returned if no apps are available that can resolve the intent and context combination.*/
	NoAppsFound: "NoAppsFound",
	/** Returned if the FDC3 desktop agent implementation is not currently able to handle the request.*/
	ResolverUnavailable: "ResolverUnavailable",
	/** Returned if the user cancelled the resolution request, for example by closing or cancelling a resolver UI.*/
	UserCancelled: "UserCancelledResolution",
	/** SHOULD be returned if a timeout cancels an intent resolution that required user interaction. Please use `ResolverUnavailable` instead for situations where a resolver UI or similar fails.*/
	ResolverTimeout: "ResolverTimeout",
	/** Returned if a specified target application is not available or a new instance of it cannot be opened. */
	TargetAppUnavailable: "TargetAppUnavailable",
	/** Returned if a specified target application instance is not available, for example because it has been closed. */
	TargetInstanceUnavailable: "TargetInstanceUnavailable",
	/** Returned if the intent and context could not be delivered to the selected application or instance, for example because it has not added an intent handler within a timeout.*/
	IntentDeliveryFailed: "IntentDeliveryFailed",
	/** Returned if a call to one of the `raiseIntent` functions is made with an invalid context argument. Contexts should be Objects with at least a `type` field that has a `string` value.*/
	MalformedContext: "MalformedContext"
};
