# Changelog

## v10

- Added support for new themes format with light and dark schemes
  - toolbar button icons should now use `{theme}` substitution in icon url instead of `themes` property
  - dock button icons can also use the `{theme}` syntax
  - added `theme-changed` life cycle event
- Added example of using setSearchQuery API for home integration
- Use Notifications now uses Show/Hide APIs instead of toggle
- Shim randomUUID so that it can be used in non secure contexts

## v9.2

- Added `dev` npm script which live build and reloads code for customize-workspace sample
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
- Change - Example modules reference the types using a local namespace `customize-workspace` instead of relative paths
- Added - `package.json` has additional script command `generate-types` which can be used to generate a folder of TypeScript type definitions `.d.ts` files for the shapes, the types can imported when building modules instead of needing to reference the framework directly
