# Workspace Platform Starter

An opinionated HERE Core UI (OpenFin) Platform that uses a **module-based architecture** — functionality is added through loosely-coupled ES modules loaded at runtime via manifest configuration.

## Module Generation

Scaffold new modules from `how-to/workspace-platform-starter/`:

```bash
npm run generate-module <type> "<Name>"
```

This creates source files, adds a webpack entry, and registers the module in the manifest automatically.

### Module Types

| Type               | Use when you need to...                            |
| ------------------ | -------------------------------------------------- |
| `analytics`        | Send platform events to analytics services         |
| `actions`          | Add behavior to menus or toolbar buttons           |
| `auth`             | Add login/logout flow (only one allowed)           |
| `conditions`       | Show/hide UI elements based on state               |
| `contentCreation`  | Control how window.open / target="\_blank" behaves |
| `endpoint`         | Fetch/store data from APIs or services             |
| `initOptions`      | React to launch-time URL parameters                |
| `integrations`     | Add search results or commands to Home             |
| `interopOverride`  | Extend context/intent sharing behavior             |
| `lifecycle`        | Run code on platform startup/shutdown events       |
| `log`              | Send logs to external services                     |
| `menus`            | Add/modify browser menus                           |
| `platformOverride` | Extend core platform APIs                          |
| `share`            | Enable workspace/page sharing                      |

### Build and Run

```bash
npm run build-client-modules   # Build user modules
npm run build                  # Build everything
npm run start                  # Dev server on port 8080
npm run client                 # Launch OpenFin client
```

## Module Pattern

Each generated module contains three files:

- `index.ts` — exports an `entryPoints` map keyed by module type
- `<type>.ts` — provider class with `initialize()`, `closedown()`, and type-specific methods
- `shapes.ts` — TypeScript interface for the module's `data` config options

Modules are registered in `public/manifest.fin.json` under `platform.customSettings.<providerKey>.modules[]` and loaded at runtime by URL.

**Override modules (`platformOverride`, `interopOverride`) are special:** Unlike other module types which are independent, these form an inheritance tree. Each override module extends the one before it in the manifest's `modules[]` array. Order matters — if your implementation calls `super.methodName()`, it delegates to the next override in the chain (or the base implementation if last). When adding a new override module, consider its position relative to existing overrides.

**Interop override tips:**

- To deliver an intent to a specific app, call `await super.setIntentTarget(intent, platformIdentity)` — launching an app alone does not deliver the intent.
- `helpers.launchApp(appId)` returns `PlatformAppIdentifier[]` containing `appId`, `instanceId`, `uuid`, `name` — pass these identifiers to `setIntentTarget`.
- Intent resolution must use the FDC3 2.0 format: `{ source: { appId, instanceId }, intent: intent.name }`. The legacy `{ source: "appId" }` string form is FDC3 1.2 only.
- The WPS interop override fully handles all intent cases and never calls `super.handleFiredIntent()`. If your override conditionally falls through to the next in the chain, match the base class signature exactly: `clientIdentity: OpenFin.ClientIdentity & { entityType: OpenFin.EntityType }` and return `Promise<unknown>`. This avoids any casting when calling `super.handleFiredIntent(intent, clientIdentity)`.
- The project's eslint enforces concise arrow bodies — if your `getConstructorOverride` return arrow has no statements before the class, use implicit return: `(Base) => class X extends Base {`.

**Framework vs modules:** Code in `client/src/framework/` is the core platform — do not modify it when adding features (use modules instead). If you do edit framework code, build with `npm run build-framework` (not `build-client-modules`). Use `npm run build` to build everything.

**Code style notes:**

- The framework uses `isEmpty()` for null/undefined narrowing — it acts as a TypeScript type guard. Optional parameters should use `!isEmpty(param)` before access, not optional chaining, to satisfy strict null checks.
- **Modules must never import from the framework folder directly.** Utilities like `isEmpty` are passed to modules via the `helpers` parameter in `initialize()`. Use `helpers` for any framework functionality.

**Production note:** The generator adds settings directly to the manifest for convenience during development. In a production app, move these settings to a settings service — the public manifest should only expose bare minimal auth information and a settings endpoint. See `public/second.manifest.fin.json` for an example of this pattern, which uses `settings.json` as a service endpoint.

## Finding Documentation

- **Table of contents**: `README.md` links to all 62 guides in `docs/`
- **Module pattern**: `docs/how-to-add-a-module.md`
- **Setup guide**: `docs/how-to-setup-workspace-platform-starter.md`
- **Architecture**: `docs/what-is-workspace-platform.md`
- For any module type, check `docs/` for a matching `how-to-*` guide (e.g., `how-to-add-integrations-to-home.md`, `how-to-define-endpoints.md`)

## Workflow

1. Identify what you need → pick the module type from the table above
2. Run `npm run generate-module <type> "<Name>"`
3. Implement your logic in the generated provider class
4. Build with `npm run build-client-modules`
5. Validate formatting and linting: `npm run validate` (runs prettier, eslint, and markdownlint)
6. Test with `npm start` then `npm run client`
7. Read the relevant `docs/` guide for type-specific APIs
