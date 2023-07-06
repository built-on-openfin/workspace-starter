# Changelog

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
- BREAKING CHANGE: Local storage endpoint module has been update to accommodate the above change
- Endpoint fetch requests now add the `Content-Type` and `Accept` headers with `application/json`

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
