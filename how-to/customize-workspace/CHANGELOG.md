# Changelog

## v9

* Added - Lifecycle modules with standard hooks of `after-bootstrap`, `before-quit`
* Added - Condition modules
* Change - Menu entries use `conditions` to determine visibility
* Change - The `sharing` option has been moved from `bootstrapProvider` to `platformProvider` in `customSettings`
* Change - The `conditions.isAuthenticationEnabled` flag has changed to `conditions: ["authenticated"]`
* Added - The toolbar buttons can be enabled/disabled with conditions
* Change - Code folders have been rationalized into `framework\platform`, `framework\shapes`, `framework\workspace`
* Added - `bootstrapProvider.autoShow` now has `none` option to not launch any of the standard components, can be used if you want to hook the life-cycle event if `after-bootstrap` and show you own view
* Fixed - Menu entry incorrectly positioned elements marked as `before`
* Fixed - Modules with multiple entry points correctly handle separate configurations
* Removed - Browser page bound storage no longer has a fallback if the storage endpoint is not configured
* Fixed - Platform overrides quit behavior if called during a snapshot load
* Change - Authentication example uses RegExp match for `authenticatedUrl` instead of exact match
* Fixed - Authentication example used correct `logoutUrl` when determining if it can call logout
* Change - Example modules reference the types using a local namespace `customize-workspace` instead of relative paths
