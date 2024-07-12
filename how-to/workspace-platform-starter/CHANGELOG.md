# Changelog

## v19.0.0

- Updated manifests to remove verbose logging --v=1 --inspect from the runtime.arguments setting: <https://developers.openfin.co/of-docs/docs/debugging#verbose-logging>
- Updated manifests to disable app logging (where console log entries are written to disk). You can still see console log messages in dev tools or you can turn it back on by setting enableAppLogging to true.
- Added new v38 runtime setting appLogsTimezone and set it to utc for when you do capture logs to disk.
- Removed startup_app from manifests as the name setting in platform is sufficient for naming the app folder name when app logging is enabled.
- Added support to the interop broker for preventing context from being sent back to the originator (default behavior). See the [how to add context support to your app](./docs/how-to-add-context-support-to-your-app.md) document and scroll down to the section titled: Should the context object be sent back to the sender?

## v18.0.0

- Added [apps-connector.json](./public/common/apps-connector.json) which includes an example salesforce app that can be added as the appId in the salesforce integration in the main [manifest.fin.json](./public/manifest.fin.json). The [apps-connector.json](./public/common/apps-connector.json) directory would also need to be added to the appProvider for it to be loaded. See [how to use our integrations](./docs/how-to-setup-example-home-integrations.md)
- Updated WPS Interop Broker implementation so that it includes fdc3 app instances if they exist in the array of apps returned when findIntent is called as recommended by the FDC3 documentation.
- Extended endpoint so that we now have a requestStream option for those implementing endpoints that want to return a stream of data instead of a simply requestResponse.
- Included an example of the the requestStream endpoint by implementing an example source of notification data in the [client/src/modules/endpoint/example-notification-source](./client/src/modules/endpoint/example-notification-source/endpoint.ts)
- Added an example of a lifecycle module that handles notifications coming from the notification source as well as notifications that have been sent to it. This shows how you can standardize some types of notification actions: raise-intent, launch-app, broadcast (option to broadcast on an app channel or user channel). This is just an example showing how you could expose an API to your content using an SDK approach using the Channel API or intents. This is a basic example and there are many more things to consider but it is intended as an example for a discussion around options. Documentation for this module has been provided here: [client/src/modules/lifecycle/example-notification-handler/README.md](./client/src/modules/lifecycle/example-notification-handler/README.md)
- Update the interop broker override module pattern so that it is now passed a PlatformInteropBrokerHelpers object instead of the standard ModuleHelpers object. There are no additional functions at the moment but getApps returns all apps (even private ones) for the interop broker as it needs access to everything in order to perform intent resolution.
- Added example of supporting workspace and desktop browser (through openfin/core-web as part of OpenFin anywhere) to our contact and manager portal examples in public/common by importing the fin/fdc3 api if it is not available (will require being rendered in an OpenFin Web Layout: <https://github.com/built-on-openfin/web-starter/tree/web/v19.0.0>).
- More efficient validation of appIds associated with views/windows for faster interop based actions. The appId validation in our wps module (modules directory) has extracted into its own file and tests to ensure it continues to behave as expected across future updates have been added to the test directory.
- Module Helpers now provide a getAnalyticsClient (it is marked as optional and the result could be undefined so it leaves the option for it to be denied to a module or removed). This client supports a ModuleAnalytic event which will have a source of Module assigned to it (you can still specify type and use the data property to provide additional module specific information). This data will be passed to the analyticProviders that receive the Workspace Analytic events. See [How to Configure Analytics](./docs/how-to-configure-analytics.md).
- Added a cloud interop override module so that you can easily test out OpenFin's cloud interop offering. See [How To Add Cloud Interop To Your Interop Broker](./docs/how-to-add-cloud-interop-to-your-interop-broker.md).
- Broke up the build process to make it easier to just build your modules. `npm run build` still builds everything and `npm run build-client` still builds all client related code but now if you change framework files you can use `npm run build-framework`, or if you modify our starter modules you can use `npm run build-starter-modules` or if you just want to build your modules (that are listed in webpack.config.js) then you can use `npm run build-client-modules`. This will let you have a much faster build.
- npm run launch now launches via the fins link when running on mac instead of the node adapter.
- We now capture the window state when saving a page and apply it if a page is being launched into a new window.
- Improvement: Added `apply` as an action on the WorkspaceChangedLifecyclePayload. Previously we had `create`, `update`, `delete`. `update` was being fired when a workspace was updated and when a workspace was applied. `apply` now makes it clear when a particular workspace platform override has been triggered.
- Improvement: modules/integrations/workspaces this module now refreshes the entries when a workspace is applied. So if a workspace entry in Home said it was selected it would be updated and the newly selected workspace would be updated to reflect it is the currently selected workspace.
- Updated: modules/composite/default-workspace/lifecycle logic to listen out for the new `apply` action.
- Improved performance of switching schemes
- Improved performance of computing dock configuration, especially on theme changes.
- Breaking Change (if you do not update your manifest): Added modules as an option for platformProvider.interop settings and made the workspace platform starter interop override a module (so you can decide to load it, chain it with other overrides or exclude it). Please see the new document [how to customize your interop broker](./docs/how-to-customize-your-interop-broker.md). If you want the default interop broker to check endpoints to see if a context type should be enriched through an endpoint then you need to add the wps-interop-override module id to the endpoint clients array in the endpointProvider (see the manifest.fin.json as an example).
- Added support for a title to be specified in the browserProvider that will be used as the platform name in the browser Quit menu option and the confirmation dialog.

## v17.2.0

- Updated SnapSDK to version 0.3.0 - This includes a new feature in the developer tool that comes with Snap that lets you identity Snap Strategies, bug fixes and new features (windows excluded from snapshots are not tracked by the Snap Server).
- Updated default build options. No longer bundling fdc3 module just for error strings. We have a copy of the strings to remove the dependency from the output (as it increased the size of the provider js)
- Updated webpack config to use source-map instead of inline-source-map to have smaller js files by default (devtools will import the sourcemap). It also gives you the option of whether or not you copy source map files alongside the files.
- Changed to production instead of development for the webpack build in package.json to have a more efficient js file.
- Added some useful commands `npm run explore-platform` and `npm run explore-modules` which should be run after you have run an initial build `npm run build`. This provides an overview of the bundles that are produced and lets you track the size of your modules as well as the platform.
- Improved performance of switching schemes
- Improved performance of computing dock configuration, especially on theme changes.
- Added lifecycle events for `language-changed` which includes the selected locale and updated `page-changed` so that you can listen for when a page is focused as there is now a focus event.
- Added additional context event to the app channel `platform/events` when a language is changed: type: `platform.language` which includes the selected locale.
- Added ability to specify initial language through platformProvider.language.initialLanguage in your settings. Default browser menu options and tooltips support the following locales: en-US (default), ja-JP, zh-CN, zh-Hant, ko-KR, ru-RU, de-DE. More information about this feature can be found here: <https://developers.openfin.co/of-docs/docs/localization>
- Added support for specifying notificationsCustomManifest ([self hosted notifications center](https://developers.openfin.co/of-docs/docs/register-notifications#host-on-your-cdn)) in the notificationsProvider settings so that it is used by the platform and the notificationClient passed to modules. As these settings are passed into the platform it will be available through the new platform api call of platform.getNotificationsConfig() (assuming you have used the getCurrentSync function from @openfin/workspace-platform or the function exposed by the module helper if you are building a module for workspace platform starter). Modules shouldn't need this as the notification client returned via the helper takes into account these settings.
- Added an example [apps-native-microsoft-office.json](./public/common/apps-native-microsoft-office.json) that can be added to the appProvider list of app json files to load in your manifest. This will add the native Microsoft Office Apps that you can launch. If you have the snapProvider enabled in your manifest these applications can also be snapped. This is an example for experimentation and discovery.

## v17.0.0

- Added support for dock submenus
- Added support for customizing the taskbar icon for the splash screen window
- Added an example of navigating content using navigation controls. Enabled through default window options in the main [manifest.fin.json](./public/manifest.fin.json) and in our developer docs snapshot [developer.snapshot.fin.json](./public/common/snapshots/developer.snapshot.fin.json)
- Fixed an issue where the order of entries within dock would change when toggling between light and dark theme.
- Improved performance when switching themes
- Fixed an issue where the order of Workspace component entries within dock may change when toggling between light and dark theme.
- FDC3 2.0 Open improvement - You can now specify instance id if you wish to open an existing instance of an app and optionally pass it context.
- Add option to allow specific modules to get unrestricted notificationClients if they want to implement custom platform logic without importing notifications directly via the npm package. The notification client options in the notification provider now has a 'restricted' setting which can be set to false.
- Update Save Page As and Duplicate Page logic using the copyPage platform override introduced in 16.1. When a page is duplicated we generated a copy of the page but generate the instance id associated with a view's name while retaining the app Id (previously you would get a new randomly generated name for the app). If your app is a singleton then the name remains unique. So you will have two pages referencing the same instance. When you switch between them it will be displaying the same instance. However, please note if you move a page to a new window then the single instance view will move with it and leave the other page's layout (a single instance can only exist on one window if you need multiple instances then instanceMode should not be set to single). Duplicate view (view context menu) currently generates a new unlinked id for a view so if you do not want this behavior you can remove Duplicate View from the View Context Menu. Feedback on this behavior is of interest.

## v16.1.0

- Change storage mapper now removes additional defaults based on default window/page/view settings
- Change storage mapper applies default settings when hydrating from storage
- Added Example endpoint for page/workspace storage to server (not production code)
- Added Additional Monitor Awareness
  - Initial set of updates to improve the multi-monitor experience.
  - Extracted Window Positioning Strategy logic from Platform Override to the utils-position.ts file so that it can be used/called from more than one place.
  - Improved launch preferences so that top and left can now be specified as part of the bounds.
  - Improved launch preferences by extending appProvider so that you can specify default updatable preferences that should apply across applications (Caution. Preferences such as url should remain app specific).
  - Dock now takes monitor into account when launching apps using the app entry type or launch-view action or favorites menu option (module). This only applies to views and windows (not snapshots or other types of app).
  - Interop Broker now takes into account who raised the intent/fdc3.open request when launching a view/window in response (it will position it on the same monitor as the requesting app if possible using the window positioning strategy)
- Removed the quote and emoji integration code and dependencies, examples of how they are implemented can be seen in the customize-home-templates example
- Removed the deprecated dock config for `buttons` and `apps`
- Added theming support for the new multi state icon urls for browser buttons
- Added additional FDC3 support so that [context metadata](https://fdc3.finos.org/docs/api/ref/Metadata#contextmetadata) is passed when context is broadcast, an intent is raised or fdc3.open is used. This can be used with fdc3.getInfo to see if the context you received was sent from your app.
- Updated example call app so that it logs the new context metadata when an intent is raised or context received. Added context support to the call app. Updated the example participant history app so that it console logs the context metadata received.
- Added UnsavedPagePromptStrategy support to the browserProvider. This takes advantage of the enhancement in Workspace 16.1 to decide whether or not the page should prompt the user if it has unsaved changes (in the platform override: handleSaveModalOnPageClose). The options are:
  - "default" - use the default platform behavior
  - "skip-untitled" - any page that hasn't been assigned a title shouldn't prompt the user to save unsaved changes.
  - "never" - you never want workspace to show a prompt. Unsaved changes will be lost if the user doesn't save before closing.
- Added better support for firing intents at .NET apps and updated the sample winform application.
- Native applications now use an appId for the UUID (if the uuid is not provided) and instanceId (if provided)
- Support for replacing two tokens if specified in native app (external or app asset) command line args: {OF-PLAT-UUID} will be replaced with the UUID of the platform that launched the native app (useful if you want to validate that it is an expected UUID you are allowed to connect to) and {OF-EXT-UUID} which will pass the UUID we launched your external application with.
- Updated the Winform Interop Example to be an updated copy that can auto connect if passed command line arguments and now supports raising more intents (ViewContact, ViewInstrument, ViewNews) and well as listening to those intents. A logging view has also been added.
- BREAKING CHANGE: manifest.fin.json was the only manifest without a security realm specified. This has been updated but may result in saved data being lost when developing locally. We recommend a security realm to isolate your platform from others and so decided to apply it here as well.
- Fixed - when launching multiple instances of an inline app asset it is possible to try and re-download an app asset that has just been downloaded or exists. We now fetch the app asset info to see if the platform already has the app asset and if it is the required version.
- Added util getCommandLineArgs to extract multiple command line arguments from a string into an array. Snap accepts an array of arguments and app assets and external apps take a string as an args parameter. This lets you specify arguments that cover scenarios where snap is disabled and enabled. Added tests to verify getCommandLineArgs behavior.
- Updated identity returned when launching a native app or app asset (either normally or through snap). The UUID is the app id if the app has been marked as instanceMode = "single" otherwise the uuid is appId/guid (guid being an instanceId). The name is the same as the UUID (as name is not specified in app asset/external process options). If your app supports having multiple instances and it registers intent handlers then we recommend passing the created UUID for your app instance using {OF-EXT-UUD} as part of the command line args so that the uuid can be used when you connect to the OpenFin runtime. When you then connect to the workspace platform interop broker (as the platform will be waiting on that connection to fire an intent against it) it will use the expected UUID as it's connection id.
- Update developer composite menu to use the Close menu option instead of Print as the positioning hook. Add Copy Url to the developer view context menu options.
- FIX: Home Queries are now debounced from home but there existed a condition where a previous queries response came in after the last queries results. This could result in unexpected results being shown in Home.

## v16

- Update the applyWorkspace override so that the following applySnapshot options are applied: closeExistingWindows: false, closeSnapshotWindows: true
- Updated logic to handle current launchExternalProcess and downloadAppAsset support in the Mac RVM. In apps.ts we filter out native or app asset applications and if Snap is enabled then we log a warning and do not try to enable the Snap SDK.
- Updated endpoint types so that fetch endpoints keep mandatory options (it can't work without them) but module endpoints now have options marked as optional (as not all custom modules would need to pass settings). This ties in with the schema improvements below.
- Added support for supporting intellisense for any manifest file called \*.manifest.fin.json or manifest.fin.json. The rules are any manifest in how-to/workspace-platform-starter will include the OpenFin manifest options as well as Workspace Platform Starter custom settings. Any manifest file in the other how-to examples will include the OpenFin manifest settings but not the custom settings that are specific to Workspace Platform Starter. The schema reference in the manifest has been dropped and schema settings are now picked up in the .vscode/settings.json file. Please open this repo at the root in VSCode so that you have access to all the how-tos and you have access to the settings for this repo.
- Added support for reshow. If you click on the application icon/shortcut it will show you the components that have been configured to autoShow (see [how to customize the bootstrapping process](./docs/how-to-customize-the-bootstrapping-process.md)) if the application is already running.
- Docs - Added a document showing [How To Add A Service](./docs/how-to-add-a-service.md)
- Improved launchPreference so that now args for a native app (app asset or external) can be specified via launchPreference. Launch preference can also be configured to allow args to be specified dynamically when the launch request is made. Please see [how to define app launch preference](./docs/how-to-define-app-launch-preference.md).
- Improved launchPreference so additional options such as url, interop, customData can be specified. Modules can now pass a launchPreference when launching an app by appId. They can see if the app supports being updated by getting the app by id and checking for the updatable setting under launchPreference.options. Only inline-view/view and inline-window/window support updatable launch preferences. Please see [how to define app launch preference](./docs/how-to-define-app-launch-preference.md).
- Added support for Snap, enable by setting `customSettings.snapProvider.enabled` to true. Configure the `customSettings.snapProvider.serverAssetInfo` to point to the `SNAP_ASSET_URL`. Enable the Snap debugging window by setting `customSettings.snapProvider.showDebugWindow` to true.
- Added new module type `content-creation`, these modules can be used to define content creation rules and handle the associated events. Modules are added in `customSettings.contentCreationProvider` section in manifest.
- Added example content creation module which interrogates the `features` property from `window.open` to determine where to place a view in relation to where it was launched from. An example app `Content Creation Example` demonstrates this in use.
- Added CustomActionCallerType enum to actions-shapes, use these in preference to the workspace-platform CustomActionCallerType type to avoid importing the whole npm package into your modules.
- Change moved pin/unpin/move-view/move-window actions in to module, make sure the following config is in your manifest so this functionality is still available

```json
{
   "customSettings": {
      "actionsProvider": {
         "modules": [
            ...
            {
               "id": "window-platform",
               "icon": "http://localhost:8080/favicon.ico",
               "title": "Window Platform Actions",
               "description": "Window Platform Actions",
               "enabled": true,
               "url": "http://localhost:8080/js/modules/actions/window-platform.bundle.js"
            }
         ]
      }
   }
}
```

- Fixed async filters so they don't replace the current filters
- Added a home searching panel when querying, and debounced requests
- Improved the Home UI experience so that it does not appear to bounce when typing search requests
- Improved platform now starts correctly when no customSettings are provided in manifest
- Fixed dock shows correct workspace buttons to match those configured when restoring from saved config
- InitOptions handlers now have the calling context passed to them, so they know if they were called from `launch` or already `running`
- Added unit testing script `npm run test` tests can be found in ./test folder, for more information see [How to Test Your Platform Code](./docs/how-to-test-your-platform-code.md)
- Added e2e testing script `npm run e2e` tests can be found in ./e2e folder, for more information see [How to Test Your Platform UI](./docs/how-to-test-your-platform-ui.md)
- BREAKING CHANGE: sharing has been moved to it's own provider, the `sharing` flag has been removed from `platformProvider` and `enabled` can be set in `shareProvider`
- BREAKING CHANGE: share links are now of the form `shareType=<type>&payload=` instead of `shareId=<id>`
- BREAKING CHANGE: share method has been removed from integration helpers, use shareClient in module helpers
- Added Share provider which allows modules to plugin their own share options.
- Added Share client to module helpers for performing share operations.
- Added Dialog client to module helpers to provide a simple way to show confirmation dialogs.
- Added sharing for pages moved into module
- Added sharing for workspaces moved into module
- Added example dummy share server for testing locally (stores in memory), to use update manifest.fin.json `https://workspace.openfin.co` references to `http://localhost:8080`
- Fixed Interop Broker client registration helper logic to ensure that a connectionUrl has a value. Empty strings were resulting in native apps being identified as supporting FDC3 2.0 instead of interop.

## v15

- BREAKING CHANGE: BrowserProvider windowOptions. A number of versions ago we indicated that you should use defaultWindowOptions in the BrowserProvider configuration instead of the old windowOptions setting. We have removed the type from the schema and type and we have updated the main manifest to use defaultWindowOptions(like we did in our other examples as seen in settings.json). Please update your manifest/settings (we will maintain support for window options for the browser configuration for this release but then that backwards compatibility will be removed).
- BREAKING CHANGE: `ModuleHelpers launchPage` helper function now takes a pageId (and it has to be a valid pageId) instead of asking modules to get the platform, use the storage apis and then send a page. This reduces code and also ensures that only valid pages are launched.
- BREAKING CHANGE: The theming methods in module helpers have been encapsulated inside a class returned by the `getThemeClient` method, the old methods `getCurrentThemeId`, `getCurrentIconFolder`, `getCurrentPalette`and `getCurrentColorSchemeMode` have been removed but equivalent functions are available by using `getThemeClient`.
- BREAKING CHANGE: Change ModuleHelpers `condition` method has been encapsulated into a `conditionsClient` retrieved using `getConditionsClient`
- BREAKING CHANGE: Integration preferences endpoint payloads now include the platform and metadata properties, the response should include the preference properties in the `payload` object
- Added conditionsClient has `changed` method which can notify the platform a condition has changed, a lifecycle event `condition-changed` will be raised
- Added [Notification Support](./docs/how-to-use-notifications.md) to the platform. You now have a helper getNotificationClient function that returns a notification client to modules and there are rules around whether a module can have this capability and if you wish to isolate notifications between modules.
- Added an example lifecycle module ExampleNotificationService ([see README.md](./client/src/modules/lifecycle/example-notification-service/README.md)) to the modules folder and added it (enabled:false) to the lifecycleProvider section of the main manifest ([manifest.fin.json](./public/manifest.fin.json)).
- Updated the way the [notification.ts](./client/src/framework/workspace/notifications.ts) registers against the workspace notification center (The notification center is no longer automatically started and that now happens upon registration which resulted removing the check to see if the notification center was running before registering).
- Added fdc3 approach to fdc3.open to the interop broker.
- Change: Default fdc3.open approach has moved from opinionated intent based approach to fdc3 standard based approach. platformProvider interop setting now has openOptions where you can specify openStrategy. Set it to 'intent' if you want the opinionated behavior back.
- Added improvements to the Interop Broker to improve support for FDC3 2.0 conformance.
- Window Positioning Strategy - Added additional defensive coding for instances where windows may be opened and closed quickly asynchronously (e.g. during automation testing). This additional defensiveness is for situations where a reference to a window may no longer exist if it was closed before the check for whether the window is showing or what it's current bounds are.
- Window Positioning Strategy - Added the option to turn window positioning strategy completely off if it is not required e.g. automation testing via the disableWindowPositioningStrategy in the browserProvider settings.
- Added favorites support for Workspaces
- Added favorites support for Pages
- Change Favorites icons are theme aware
- Change Favorites menu has option `menuStyle` to switch between `native` and `custom`
- Fixed Pages and Workspace not appearing in home results as soon as they are created
- Fixed Apps template not updating text color on theme-changed
- Added module helpers `launchWorkspace` method
- Added Native popup menus now support separators, icons
- Added Custom popup menus now support separators, disabled, submenu, checkbox, aria labelling and off-screen positioning
- Added Dock re-ordering is now enabled by default (it can be disabled by setting `dockProvider.disableUserRearrangement` to true)
- Added Dock provider entries now require an `id` field so that they can be identified when re-ordering is enabled
- Added Dock supports endpoints for storage of their config `dock-get` and `dock-set`, if you provide your own endpoints you must handle the adding/removing/ordering of buttons based on the available buttons
- Added ability to specify a preference for a custom view or window height and width for an app through a new setting called launchPreference that can be added to an app definition (this metadata could be used for other types of app in the future but right now only views and classic windows are supported).
- Added ability to specify whether the launched view/window should be autoCentered when launched via the launchPreference setting that can be added to an app definition.
- Added ability to specify a custom Platform API window should be used for a view/inline-view instead of the default browser window through the options setting of launchPreference which can be added to an app definition. The ability to support Platform API Windows and Browser windows was added to v15 of the @openfin/workspace-platform package.
- Updated [how-to-define-apps.md](./docs/how-to-define-apps.md), [how-to-define-apps-fdc3-1-2.md](./docs/how-to-define-apps-fdc3-1-2.md) and [how-to-define-apps-fdc3-2-0.md](./docs/how-to-define-apps-fdc3-2-0.md) to reflect the new launchPreference option.
- Change Platform override for `openGlobalContextMenu` can be configured to use the custom popup menus by setting `browserProvider.menuOptions.style.globalMenu` to `native` or `custom`
- Change Platform override for `openViewTabContextMenu` can be configured to use the custom popup menus by setting `browserProvider.menuOptions.style.viewMenu` to `native` or `custom`
- Change Platform override for `openPageTabContextMenu` can be configured to use the custom popup menus by setting `browserProvider.menuOptions.style.pageMenu` to `native` or `custom`
- Updated launchPreferences to provide a wider range of host options for views. Updated example platform api page to read the title from workspace platform title.
- New Feature - Updated the page composite module so that you can enable an [init options](./client/src/modules/composite/pages/init-options.ts) module that lets you launch a specific page using init params. Example fins link: fin://localhost:8080/manifest.fin.json?$$action=show-page&$$payload=eyAicGFnZUlkIjogImIwY2UxNTg3LTM2ZDAtNGRlZC05ZGU3LTlmNmQyYjc1OGYyNyIgfQ== the payload is a base64 encoded string of { "pageId": "the-id-of-the-page" }
- New Feature - Added a new init module example: launch-workspace so that you can enable an [init options](./client/src/modules/init-options/launch-workspace/init-options.ts) module that lets you launch a specific workspace using init params. Example fins link: fin://localhost:8080/manifest.fin.json?$$action=launch-workspace&$$payload=eyAid29ya3NwYWNlSWQiOiAidGhlLWlkLW9mLXRoZS13b3Jrc3BhY2UiIH0= the payload is a base64 encoded string of { "workspaceId": "the-id-of-the-workspace" }
- Added MenusProvider.popupMenuStyle which sets a global style for popup menus which can be inherited by other components, default to `platform`, but can also be `native` or `custom`
- Added ModuleHelpers now contain MenuClient which can be use to show a popup menu or get the global setting for menu style
- Added Workspaces menu in custom menu module, visibility is disabled by default on the dock
- Added platform action `popup-menu` which can be passed menu options in the payload to display a context menu, it then call the platform action for the result.
- Added ModuleHelpers now contain getEndpointClient. This will give module developers access to endpoints so that useful endpoints can be exposed to teams building modules. Whether the endpoint client is made available to a module and which endpoints are accessible is controlled by the platform owner. See [How to define endpoints](./docs/how-to-define-endpoints.md)
- New Feature - The intent picker now tries to appear in the center of the monitor from where the intent was raised (rather than always showing up on the main monitor).
- Fix - Fixed the basic intent picker that wasn't working correctly.
- Added Tray menu can now use the custom popup menus, will use the global popupMenuStyle but can be overridden by the `trayProvider.popupMenuStyle`
- Updated interopbroker to break out some logic into sub classes in a broker folder. Also removed functions that were not being overridden.
- Removed interop related functions from [apps.ts](./client/src/framework/apps.ts) to [app-intent-helper.ts](./client/src/framework/platform/broker/app-intent-helper.ts) as part of the interopbroker tidy.
- Added support for app providers or platform owners to specify their own endpoint to handle the fetching of manifests (when a url is specified as a source for an app's manifest e.g. view options, window options, snapshot etc instead of the inline equivalent). [launch.ts](./client/src/framework/launch.ts) will now check the following when passed a manifest url:
  - Is there a app specific endpoint available? E.g. if a view app has an id of `my-view-app` then we check for `manifest-get-my-view-app`. If the endpoint exists then we will call the request/response function against that endpoint and pass { url: string; appId: string} as the request. If you are using a fetch endpoint type instead of a custom module and the url is not specified we use the passed manifest url.
  - Is there a platform specific endpoint available - `manifest-get` is specified. This gives platform owners the option of providing a hook where they want to manage the fetching of manifests for their platform. If you are using a fetch endpoint type instead of a custom module and the url is not specified we use the passed manifest url.
  - If none of the above endpoints exist we fall back to the default `await fetch(manifestUrl)` behavior.
  - Added example of how to enable/disable console logging of built in interop broker messages to manifests.
  - Added extra check of view/window title when building a list of intent handler instances.
- Encourage the use of the initOptionsProvider for loading content into the platform.
- Change `getPlatform` moved from IntegrationsHelpers to ModulesHelpers
- Change `launchSnapshot` moved from IntegrationsHelpers to ModulesHelpers
- Change `launchView` moved from IntegrationsHelpers to ModulesHelpers
- Added platform override for `applyWorkspace` which triggers the `workspace-changed` lifecycle event
- Added Dock monitors the `conditions-changed` and refreshes its contents if the condition was used
- Added url property to splashScreenProvider so you can provide your own custom location for the html content
- Change splash screen progress updates are sent using channels so they work cross domain
- Update applyWorkspace logic so that you are not prompted on whether you wish to save changes if you have never loaded a workspace (you just started a session), and you have not got any windows open that would be included in a snapshot and would be lost.

## v14

- Added customizable splash screen (splashScreenProvider in settings)
- Apps are refreshed based on the cache interval, if they change then the lifecycle event `apps-changed` is fired
- Dock component subscribes to `apps-changed` lifecycle event and updates any dock based on their tagged apps
- LaunchPage helper logic centralized for home, menus, dynamic dock and share
- LaunchPage helper will always activate page if it already exists, unless `createCopyIfExists` is set
- Added dynamic dock menu module which shows pages, this example module demonstrates how to use the `showPopupWindow` API
- Added additional option for integration getSearchEntries `isSuggestion` to notify when the query was from a suggestion
- Composite module for pages the `page-show` action has been removed, as this is now handled by the centralized launchPage logic
- Composite module for pages now sorts the page name in the menu
- BREAKING CHANGE: LaunchPage helper second parameter has changed from bounds to options containing bounds
- Fix If the manifest comes from the same hostname as the provider.html/shell.html (the main entry page for the platform) then it is an acceptable host. If the manifest is coming from a different host then the manifest-hosts.json file needs to include it.
- Fix: Composite Windows Module update. The Show All Windows, Hide All Windows, Hide Other Windows function update. From v32 of the OpenFin runtime the window isShowing() function returns true if it is on a desktop but false if a window is minimized (for consistency with Electron's approach). This means that our check to see if there are windows to minimize or show in the main browser menu and dock window needs to check isShowing() and if it isn't showing it checks the window state to see if it is minimized. Other places where isShowing is used (broker for taking screenshots of a window/view for an intent instance picker) and the platform override for places launched windows work against currently visible windows (so minimized and hidden windows should not be considered).
- Added: OIDC Auth provider example module
- Fixed: Auth modules initialized only if at least one is enabled
- Fixed: When Toolbar buttons in browserProvider are undefined we maintain this state instead of returning empty array, so that default platform buttons are used.
- Added framework support for the concept of favorites. The introduction of a favoriteProvider has been added to the settings which let you specify settings that aid in support of favorites (if not provided it is assumed that favorites is not enabled for the platform). This provider needs 4 endpoints to be defined: favorite-list, favorite-get, favorite-set and favorite-remove. The generated favorite shapes type provides types starting with Endpoint to help build the endpoint module and know the expected shape.
- Added appProviderOptions `cacheRetrievalStrategy`, defaults to `on-demand`
  - `on-demand` validates/updates the cache every time the list of apps is requested (will reduce requests to app endpoints when app is idle)
  - `interval` validates/updates the cache on a timer based on the cache duration (will make more requests to app endpoints)
- Added trayProvider which will show a tray icon, lets you customize the icon, activation button and menu entries
- Added an example endpoint module: favorites-local-storage with a README showing how it can be wired up if you wanted to looking at using he favoriteClient from a module you are building.
- Added apps in Home can now be favorited, you can see all your favorite apps with the `/fav` command
- Added Store also supports the favorites functionality with secondary app buttons, this can be disabled for store by setting `StorefrontProviderOptions.favoritesEnabled` to false
- Added Favorites conditions for `favorites`, `favorites-app`, `favorites-workspace`, `favorites-page`, `favorites-query`
- Added dock buttons now support conditions to determine if they should be shown
- Added example favorites actions module which shows a popup menu
- Fixed checking condition triggered exception when condition did not exist
- Added Module helpers showPopupMenu for common functionality
- Added conditions now support passing `callerType`and `context`
- Added `include-in-snapshot` composite module which has both actions and conditions to display browser toolbar buttons which can control if a window is included in a snapshot, disabled by default
- FUTURE BREAKING CHANGE `apps` and `buttons` in the dock config have been deprecated and replaced with `entries` which can contain the combined data from the old properties, the old properties will be read for now.
- Change Auth `logged-in` and lifecycle `auth-logged-in` events are now passed the logged in user, if you don't want this to be passed set `authProvider.includeLoggedInUserInfo` to false
- Change Lifecycle events can now be lazy subscribed so a late subscriber will get called with the last payload
- Change Auth `logged-in` events can now be lazy subscribed so a late subscriber when you are already logged in will still receive the current user
- Change Splash screen will now not show if `platform.preventQuitOnLastWindowClosed` is not set as closing the splash screen will exit the platform, a warning will be logged in this scenario
- Added extra check of view/window title when building a list of intent handler instances.
- Encourage the use of the initOptionsProvider for loading content into the platform.

## v13.1

- BREAKING CHANGE: Removed the logic that supported saving page window bounds into local storage or a defined endpoint (so if you created custom endpoints for saving this information please note that it is now in the page data). This was used when saving a page or sharing a page. It now uses the new customData property on the PageObject to append windowBounds. We also now capture the page bounds when Save Page AND Save Page As is called.
- Added baseScore to integration modules to help with ordering of results, integration should use this value for the score property of results they return
- Added support for OpenFin Workspace's Microsoft Low Code Integration (see [How To Setup Low Code Integrations](./docs/how-to-setup-low-code-integrations.md))
- Fetch endpoints substitute url params for all http verbs
- Fetch endpoints now support DELETE, PUT and PATCH http verbs
- Page and Workspace storage using custom endpoints now reduces the JSON stored to just the essential data
- Platform Provider has additional `disableStorageMapping` flag which disables the above mapping
- BREAKING CHANGE: Page and Workspace storage now separates the endpoints for getting all the entries `-list` and a single entry `-get`
- Page and Workspace requests now include the platform uuid in the request
- BREAKING CHANGE: Page and Workspace requests now include additional metadata in the request
- BREAKING CHANGE: Local storage endpoint module has been updated to accommodate the above change
- Endpoint fetch requests now add the `Content-Type` and `Accept` headers with `application/json`
- Added a common example app - Framed App in [common/views/frame](./public/common/views/frame/README.md). Which gives an example of loading a iframed app as if it was a view and using the sandboxing and API restrictions while showing communication between the view and the frame.

## v13

- Renamed application to Workspace Platform Starter (WPS)
- Enabled strict mode
- Added JSDoc Linting
- App definition instanceMode extension. New options added: "new" (new means a new instance will be created if an intent is raised and the app specified but no instance id even if there are existing instances. The intent picker will also not show instances as the app provider has indicated they want to just launch a new instance).
- If you app meta data indicates it supports the intent "OpenApp" and therefore fdc3.open then a new instance will be created if fdc3.open is called unless your app instance mode is "single". This is regardless of setting "multi" or "new" in instanceMode. If the intent "OpenApp" is called directly (not through fdc3.open) and your instanceMode is "multi" then it will prompt the user (through the intent resolver) to pick an instance or launch a new instance.

## v12.6

- BREAKING CHANGE (unless you update your manifest): Decoupled home from App logic. Home supported searching for apps plus an array of configurable integrations. If you didn't like the implementation with regards to how apps were filtered or searched and rendered then you didn't have a choice. This update means that our app support is now a module that can be configured in the integration provider (to maintain existing behavior or let you plug in your own). If you don't want app support simply don't add our app module or your own. This gives more flexibility.
- Added ability to set more settings for the Home Provider (this aligns with the settings you would specify if doing it through code).
- Added more logging in platform override when it comes to saving, deleting and fetching workspaces and pages and fixed an issue where a lifecycle event wouldn't have fired if you have had custom storage via endpoints.
- Updated workspace and page integration modules to specify the id of the module definition as the providerId to ensure they do not get out of sync (which was a danger if it was hardcoded).
- Added ability to specify defaultWindowOptions (this replaces windowOptions and offers the full workspace options. We have maintained backwards compatibility if you have windowOptions specified.), defaultPageOptions and defaultViewOptions in the browserProvider
- Added option of specifying whether you want the default Global, Page, or View Menu options included when you specify menu options in the browser provider (this is through browserProvider.menuOptions.includeDefaults)
- Added optional function launchApp to the default module helpers so that modules that need to can launch an app that is listed in the directory (this feature allows the launching of apps without enabling the passing of an app Object)
- Added new example init module that supports the launching of an app by id and enabled it in manifest.fin.json and settings.json e.g. launching call-app = fin://localhost:8080/manifest.fin.json?$$action=launch-app&$$payload=eyAiYXBwSWQiOiAiY2FsbC1hcHAiIH0= the payload is a base64 encoded string of an object that specifies appId.
- Removed appAssetTag from appProvider and added support for two more manifest types. appasset - you have defined an app asset in your manifest and the manifest part of the app definition represents the alias. inline-appasset - you put the app asset definition as the manifest instead of putting it into appAssets in your manifest (so that it can be service and user driven). Also added additional error handling and logging to external and inline-external manifest support.
- Added support for two new composite modules: pages and windows. They contain action and menu implementations. The modules have been added to the manifest and settings.json to show how they can be configured. They show up in the main browser menu and two of the window management options are referenced in the dock. The two modules provide the following actions: page-open, page-show, page-delete, window-show-all, window-hide-all, window-hide-others. The workspace platform starter MenuEntry type has been updated to extend the MenuItemTemplate so that icon's can be specified and sub menus can be specified for a menu entry.
- Added default window positioning strategy for browser windows, which cascades them offset from the previous one
- FDC3 v2 packages no longer in beta, updated to 2.0.1
- Classic window apps are now launched via platform.createWindow instead of fin.Window.create. This allows consistent rules by default and takes advantage of our new offset window behavior.
- Updated npm generate-schema command to generate additional schemas for the platform apps array, view manifests, window manifests and snapshots. Updated the vscode settings to support schema mapping for apps.json, \*.apps.fin.json (array of platform apps), \*.view.fin.json (view manifests), \*.window.fin.json (window manifests), \*.snapshot.fin.json (snapshots) and updated the existing json files to follow this naming convention. This will give you helpful intellisense when editing existing json files or creating new ones.

## v12

- Initial update to interop broker to support fdc3 2.0
- Additional intent picker that is the new default that supports instances
- Support for instanceMode in an app definition to say whether the instance picker should present a single app option or show multiple instances via instanceMode: "single" or "multi"
- Updated images for contact related samples and updated them to set page title as context comes in
- Updated call app to support fdc3 2.0 and initially return the passed context as a getResult return object.
- Updated references to tools for fdc3 2.0 help (intent and context).
- Added a bring to front function when intents are fired at a specific view/window
- Add support for indicating an app has a preference for a single instance (for views/window right now) by setting instanceMode: "single" against an app.
- A new layout helper is added to the getting started window and there is a layout entry in the common apps.json as well
- Added default support for fdc3 1.2 and 2.0 app directory structures and added examples into the public folder.
- Added intellisense to the json files for fdc3 1.2 and 2.0 apps
- dropped the fdc3 app module used for mapping as it is now built into workspace-platform-starter
- broke out the fdc3 tools into different json files.
- Updated the broker to return results in expected format based on whether the view is set to fdc3 1.2 or 2.0
- Workspace platform starter supports interop api, fdc3 1.2 and fdc3 2.0 apps and directory structures.
- autostart is available as an app setting. This can be used if you need an application to start straight after the bootstrapping process. This may be a headless window (that might be needed to provide services to views), a native app that works with the platform and should be auto launched or it could be the launching of another OpenFin app that is required. If this applications need to be launched but shouldn't be visible in home, store or dock then set the app private property to true.
- autostart of apps can be disabled at the platform level by setting the autostartApps bootstrap provider setting to false.
- headlessProvider has been removed from customized. This provider allowed the setting of windows that should be launched after the bootstrapping process. It could be used by content providers to have a headless window launched but meant there were two ways of defining
  content provider related apps. This has been removed because now it can be achieved by defining an app entry (e.g. a manifest type of inline-window or window) with private and autostart set to true.
- Support for a new manifest type has been added (after feedback). We now support inline-snapshot as well as snapshot. We already have inline-view, inline-window and inline-external alongside view, window and external so inline-snapshot was the only one missing and people have found it useful and added it themselves. It is now available in customize to remove the need to add it yourself.

## v11

- Added default secondary buttons config for store

## v10

- Added support for new themes format with light and dark schemes
  - toolbar button icons should now use `{theme}` and `{scheme}` substitution in icon url instead of `themes` property
  - dock button icons can also use the `{theme}` and `{scheme}` syntax
  - added `theme-changed` life cycle event
- Added example of using setSearchQuery API for home integration
- Use Notifications now uses Show/Hide APIs instead of toggle
- Shim randomUUID so that it can be used in non secure contexts
- Added ability to restrict who can connect to your broker and the ability to specify how a payload is validated (which endpoint to use). See [how to manage connections to your platform](./docs/how-to-manage-connections-to-your-platform.md).
- Added ability to collect analytic events generated by the workspace and workspace platform through configuration. See [how to configure analytics](./docs/how-to-configure-analytics.md)
- Added example of splitting initial auth into a shell that only has required logic (in case you want access to the main provider bundle limited until authentication has been performed). The fourth manifest provides an example of this.
- Added example of extending the App definition in order to keep compatibility with Workspace components while also proving data specific to a platform implementation. App definition now has an optional private setting. When set to true the app will no longer show up in Home, Store or Dock but can still be launched via fdc3/interop.
- Add source filter to home with Apps, Pages, Workspaces and integration modules
- Added opinionated support for fdc3.open (see [How To Add Open Support To Your App](./docs/how-to-add-open-support-to-your-app.md))
- Updated example auth to give an example of how workspace can present entitled based data by letting you pick from two users and each user has a role (developer or sales) and the developer role has an apps feed that consists of developer related apps and has menu options that help developers (inspect view, window, platform etc) where as the sales role keeps the demo apps but filters out developer related menu options and apps. **npm run secondclient** will run the demo.
- Moved the create app definition action logic from the app definition module (which has been deleted) into a developer action module which also has inspect menu actions.
- Added ability to specify a minimum and/or maximum version for something your platform depends on (see [How To Add Version Support](./docs/how-to-add-versioning-support.md))
- Moved the workspaces home logic into the Workspaces integration provider
- Moved the pages home logic into the Pages integration provider
- Removed `enableWorkspaceIntegration` from `homeProvider`, enable/disable the Workspaces integration instead
- Removed `enablePageIntegration` from `homeProvider`, enable/disable the Pages integration instead
- Added Automation Testing examples
- Added option of modules receiving a getInteropClient function if they are allowed. Added pattern that a module should listen for the after bootstrap lifecycle event before trying to get an interop client. Added an example to the dev module in modules/composite/developer. There is an analytics implementation that publishes events to an interop/fdc3 channel. This is for dev purposes so you can easily listen to a stream of the events and build a UI (it complements the console analytics module we have). It is only enabled in manifest.fin.json.
- Added intent support for manifest type: inline-window and window. These can now be intent targets. Specifying the name of the window means only a single window will be launched as the intent target.
- Only lookup and use intent target if it isn't undefined, null or an empty string
- Added lifecycle events for `workspace-changed` and `page-changed` so the integrations such as workspace and pages can keep in sync with actual data

## v9.2

- Added `dev` npm script which live build and reloads code for workspace-platform-starter sample
- Added `dispatchFocusEvents: true` to Home provider so integrations should handle `result.action.trigger === "user-action"` to activate entries

## v9.1

- Removed `GETALL` from endpoints to make it behave more like REST, instead use `GET` without an `id` which returns the whole object, not as an array, but as a keyed object
- Add initOptions lifecycle property which defaults to `after-bootstrap`, but has an alternative value of `after-auth`
- Change - headless windows initialization to be towards the end of the bootstrapper instead of before the platform is initialized (allowing windows to be launched after workspace registration is successful).
- Added - an extra check to the fdc3 1.2 mapper to check to see if tags are passed (not part of the 1.2 spec but if they exist they should be used) and if no tags are passed we then use the manifest type as a tag.

## v9

- Added - Lifecycle modules with standard hooks of `after-bootstrap`, `before-quit`
- Added - Condition modules
- Change - Menu entries use `conditions` to determine visibility
- Change - The `sharing` option has been moved from `bootstrapProvider` to `platformProvider` in `customSettings`
- Change - The `conditions.isAuthenticationEnabled` flag has changed to `conditions: ["authenticated"]`
- Added - The toolbar buttons can be enabled/disabled with conditions
- Change - Code folders have been rationalized into `framework\platform`, `framework\shapes`, `framework\workspace`
- Added - `bootstrapProvider.autoShow` now has `none` option to not launch any of the standard components, can be used if you want to hook the life-cycle event if `after-bootstrap` and show you own view
- Fixed - Menu entry incorrectly positioned elements marked as `before`
- Fixed - Modules with multiple entry points correctly handle separate configurations
- Removed - Browser page bound storage no longer has a fallback if the storage endpoint is not configured
- Fixed - Platform overrides quit behavior if called during a snapshot load
- Change - Authentication example uses RegExp match for `authenticatedUrl` instead of exact match
- Fixed - Authentication example used correct `logoutUrl` when determining if it can call logout
- Change - Example modules reference the types using a local namespace `workspace-platform-starter` instead of relative paths
- Added - `package.json` has additional script command `generate-types` which can be used to generate a folder of TypeScript type definitions `.d.ts` files for the shapes, the types can imported when building modules instead of needing to reference the framework directly
