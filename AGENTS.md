# AGENTS.md — workspace-starter

> This file is designed for LLM-based coding assistants (Claude Code, GitHub Copilot, OpenAI Codex, etc.) to quickly orient themselves in this repository. It is not a substitute for reading individual example READMEs — it is a map so you know *where* to look.

---

## What This Repository Is

`workspace-starter` is the official collection of **example applications** for **HERE Core UI** (formerly OpenFin Workspace). It demonstrates how to configure, extend, and integrate the HERE Core UI platform using its workspace APIs.

**This is evaluation/reference code, not a production application.** Every example is meant to teach a pattern. Developers clone this repo, study the examples, then apply those patterns to their own platform builds.

### Branding Context (Critical for LLMs)

This codebase is in a branding transition. You will encounter both naming conventions throughout the code, docs, and npm packages:

| Current Name | Legacy Name | Notes |
|---|---|---|
| HERE Core UI | OpenFin Workspace | Product name changed; older branches and npm packages still use OpenFin naming |
| HERE Core Container | OpenFin Container | The underlying runtime |
| HERE | OpenFin | Company/platform name |
| HERE Snap SDK | OpenFin Snap SDK | Native app docking |

**The npm packages still use `@openfin/*` namespaces.** Do not assume a package called `@openfin/workspace` is outdated — it is the current, actively maintained package under the legacy namespace.

---

## Version Information

| Property | Value |
|---|---|
| Branch `main` targets | HERE Core UI **v23.2.0** |
| Root `package.json` version | `23.2.23` |
| TypeScript version | `5.9.3` |
| Required Node.js | **20+** |
| Required RVM (Windows) | **7+** |
| Required RVM (Mac) | **12+** |

### Key npm Packages (OpenFin Ecosystem)

These are the core packages that examples depend on. When generating code, pin to versions compatible with v23.2.0:

| Package | Purpose |
|---|---|
| `@openfin/workspace` | Client APIs for Home, Store, Dock, Notifications |
| `@openfin/workspace-platform` | APIs for creating your own Workspace Platform (includes Dock3, Browser) |
| `@openfin/core` | Core OpenFin container APIs |
| `@openfin/node-adapter` | Node.js adapter for OpenFin (used in build tooling; `43.102.2` in root) |
| `@openfin/snap-sdk` | Native application snapping/docking (Windows only) |
| `@openfin/automation-cli` | CLI for automation testing in HERE environments |
| `@openfin/automation-helpers` | Helper methods for interacting with HERE components in tests |

### Versioned Branches

The repo uses versioned branches for each major release. The `main` branch always reflects the **latest stable release**. When cloning, use `--depth=1` to avoid pulling the full history of all versioned branches:

```bash
git clone https://github.com/built-on-openfin/workspace-starter.git --depth=1
```

---

## Repository Structure

```
workspace-starter/
├── how-to/                        # All example applications live here
│   ├── workspace-platform-starter/       # ★ Full-featured platform (start here)
│   ├── workspace-platform-starter-basic/ # ★ Simplified platform starter
│   ├── register-with-home-basic/         # Home component (hardcoded apps)
│   ├── register-with-home/               # Home component (REST endpoint)
│   ├── customize-home-templates/         # Custom Home result templates
│   ├── register-with-store-basic/        # Store component (hardcoded)
│   ├── register-with-store/              # Store component (config-driven)
│   ├── register-with-dock3-basic/        # Dock3 component (new, in workspace-platform)
│   ├── register-with-dock-basic/         # Dock component (hardcoded)
│   ├── register-with-dock/               # Dock component (dynamic, persistent)
│   ├── register-with-browser/            # Browser component
│   ├── register-with-browser-basic/      # Browser component (minimal)
│   ├── use-notifications/                # Notification system
│   ├── use-theming-basic/                # Theming (basic)
│   ├── use-theming/                      # Theming (advanced)
│   ├── support-context-and-intents/      # FDC3 context sharing and intents
│   ├── register-with-platform-windows/   # Platform API Windows (non-Browser)
│   ├── integrate-with-snap-basic/        # Snap SDK basics (Windows only)
│   ├── integrate-with-snap/              # Snap SDK with save/restore (Windows only)
│   ├── integrate-with-openid-connect/    # OpenID Connect SSO
│   ├── integrate-server-authentication/  # Server-side auth
│   ├── integrate-with-salesforce-basic/  # Salesforce (basic query)
│   ├── integrate-with-salesforce/        # Salesforce (full Home integration)
│   ├── integrate-with-ms365-basic/       # Microsoft 365 (basic query)
│   ├── integrate-with-ms365/             # Microsoft 365 (full Home integration)
│   ├── integrate-with-ms365-low-code-basic/ # MS365 Low Code (minimal)
│   ├── integrate-with-ms365-low-code/    # MS365 Low Code (customizable)
│   ├── integrate-with-servicenow-basic/  # ServiceNow (basic query)
│   ├── integrate-with-servicenow/        # ServiceNow (full Home integration)
│   ├── integrate-with-excel/             # Excel integration
│   ├── integrate-with-bloomberg-basic/   # Bloomberg (intents and context)
│   ├── integrate-with-rss/               # RSS feed integration (custom)
│   ├── migrate-from-a-previous-version/  # Migration guide (not runnable code)
│   └── hints-and-tips/                   # Collection of tips (not runnable code)
├── scripts/                       # Build and packaging scripts
├── assets/                        # Shared images and assets
├── .vscode/                       # VS Code workspace settings
├── package.json                   # Root workspace config (npm workspaces)
└── context7.json                  # Context7 configuration for LLM tools
```

---

## How Examples Are Structured

Each `how-to/*` example follows a consistent pattern:

1. **`package.json`** — Example-specific dependencies; the root uses npm workspaces so `how-to/*` are registered workspaces.
2. **`manifest.fin.json`** — The OpenFin application manifest. This is the entry point for launching the app. It defines platform configuration, default windows/views, and Desktop Owner Settings references.
3. **`client/src/`** or **`src/`** — TypeScript source code (the repo is ~49% TypeScript).
4. **`public/`** — Static assets served by the local dev server (HTML, CSS, app definitions, images).
5. **`README.md`** — Detailed walkthrough specific to that example. **Always read this first for any example you are working with.**

### Common Commands (Per Example)

From within any `how-to/<example>/` directory:

```bash
npm run setup       # Install dependencies + initial build
npm run build       # Build the example
npm run start       # Start the local dev server
npm run client      # Launch the OpenFin application
npm run dos         # (Windows) Set Desktop Owner Settings registry key for version pinning
```

### Root-Level Commands

From the repository root:

```bash
npm install         # Install all workspace dependencies
npm run build       # Build ALL examples
npm run prettier    # Format all code
npm run eslint      # Lint all code
npm run validate    # Run all validation checks
```

---

## Conceptual Architecture

Understanding these concepts is essential for generating correct code:

### HERE Core UI Components

The platform is composed of discrete UI components, each with its own registration API:

| Component | Package | Purpose |
|---|---|---|
| **Home** | `@openfin/workspace` | Smart search/assistant overlay; apps register providers that return search results |
| **Store** (Storefront) | `@openfin/workspace` | App discovery marketplace; configured via `StorefrontProvider` |
| **Dock** | `@openfin/workspace` | Persistent taskbar/launcher; buttons, dropdowns, favorites |
| **Dock3** | `@openfin/workspace-platform` | Newer dock implementation, part of workspace-platform package |
| **Browser** | `@openfin/workspace-platform` | Tabbed window manager for views; supports layouts, pages, workspaces |
| **Notifications** | `@openfin/workspace` | Toast and notification center system |
| **Theming** | `@openfin/workspace-platform` | Brand customization (colors, icons) across all components |

### Platform Initialization Flow

Every HERE Core UI application follows this lifecycle:

1. **Initialize the Workspace Platform** — Call `init()` from `@openfin/workspace-platform` with your platform configuration.
2. **Register Component Providers** — Register providers for Home, Store, Dock, etc. Each provider is an object implementing a specific interface.
3. **Show Components** — Call `show()` on each registered component to display it.
4. **Handle Lifecycle** — Listen for platform events, handle cleanup on shutdown.

### FDC3 and Interop

OpenFin is a major contributor to the FDC3 standard. There are multiple versions supported (v1.2 and v2.0). Key concepts:

- **Context** — Typed data objects shared between apps (e.g., `fdc3.instrument`, `fdc3.contact`).
- **Intents** — Named actions that apps can raise and handle (e.g., `ViewChart`, `ViewContact`).
- **Channels** — Named conduits for context sharing. Apps join channels to participate in context flows.
- **Interop Broker** — The platform's central hub for routing context and intents between apps.

The `support-context-and-intents` example is the primary reference for this, but only supports v1.2 at this time. `workspace-platform-starter` supports v2.0.

### App Definitions

Apps are defined as JSON objects (type `PlatformApp`) with these key fields:

```typescript
{
  appId: string;           // Unique identifier
  title: string;           // Display name
  description: string;     // Used in Store and Home results
  manifest: string;        // URL to the app's view/window manifest
  manifestType: string;    // "view" | "inline-view" | "window" | "snapshot" | "manifest" | "external" | "connection"
  icons: Array<{ src: string }>;
  tags: string[];          // Used for categorization in Store
  intents?: Array<{...}>; // FDC3 intents the app supports
}
```

### Desktop Owner Settings (DOS)

A JSON file that controls which version of workspace components are loaded from the CDN. On Windows, this is referenced via a registry key. The `npm run dos` command in examples sets this up for local development. **This is critical for version pinning** — without it, the newest CDN version is used, which may not match your API version.

---

## Which Example to Start With

### "I want to build a full platform"
→ **`workspace-platform-starter`** — This is the comprehensive, configurable reference implementation. It demonstrates all components, module patterns, and extension points. It has its own extensive documentation.

### "I want the simplest possible platform"
→ **`workspace-platform-starter-basic`** — Minimal configuration, apps defined directly in the manifest.

### "I want to learn one specific component"
→ Start with the corresponding `register-with-*-basic` example, then graduate to the non-basic version.

### "I want to integrate with a third-party service"
→ Look at the `integrate-with-*` examples. Basic versions show connection/query; full versions show Home integration with search and browse.

### "I need to test my platform"
→ **`automation-testing/`** — Contains WebDriverIO, Selenium, and JS/TS test examples using `@openfin/automation-cli`.

---

## Key Patterns for Code Generation

### Registering with Home

```typescript
import { Home, type HomeProvider } from "@openfin/workspace";

const homeProvider: HomeProvider = {
  id: "my-provider",
  title: "My Platform",
  icon: "https://example.com/icon.png",
  onUserInput: async (request, response) => {
    // Return search results based on request.query
    return { results: [...] };
  },
  onResultDispatch: async (result) => {
    // Handle when a user selects a result
  }
};

await Home.register(homeProvider);
await Home.show();
```

### Initializing a Workspace Platform

```typescript
import { init as initPlatform } from "@openfin/workspace-platform";

await initPlatform({
  browser: {
    defaultWindowOptions: {
      // Window configuration
    }
  },
  theme: [
    {
      label: "My Theme",
      palette: {
        brandPrimary: "#504CFF",
        brandSecondary: "#383A40",
        backgroundPrimary: "#111214"
      }
    }
  ]
});
```

### App Manifest Structure (manifest.fin.json)

```json
{
  "platform": {
    "uuid": "my-platform",
    "autoShow": false,
    "providerUrl": "http://localhost:8080/platform/provider.html"
  },
  "snapshot": {
    "windows": []
  }
}
```

---

## Platform-Specific Constraints

- **Windows vs Mac**: The full HERE Core UI runtime is production-supported on Windows and Mac. Snap SDK examples are **Windows only**.
- **Headless Platform**: The platform provider is a headless app by default (`autoShow: false`). To debug it, set `platform.autoShow` to `true` in the manifest, or use the HERE Process Manager.
- **CDN Components**: Workspace UI components (Home, Store, Dock, Browser, etc.) are prebuilt and loaded from a CDN at runtime. The version loaded depends on Desktop Owner Settings. API version mismatches between your code and CDN components cause subtle bugs — always verify with the RVM log.
- **Local Dev Server**: Every example runs a local HTTP server (typically on port 8080) that serves static assets and the manifest. The platform loads content from this server.

---

## Common Gotchas

1. **Version mismatch**: If workspace components behave unexpectedly, check `%localappdata%/OpenFin/log/rvm.log` (Windows) for `apiVersion` vs `componentVersion` alignment.
2. **npm install from root**: Always run `npm install` from the repository root, not from individual example directories. The repo uses npm workspaces.
3. **Open in VS Code from root**: Open the entire `workspace-starter` folder, not a sub-example. This gives you JSON intellisense on manifests and app definitions.
4. **DOS command**: When running v23.2.0 on Windows, use `npm run dos` to set up the Desktop Owner Settings pointing to the CDN. Restore your previous DOS path after testing.
5. **Port conflicts**: Multiple examples use port 8080 by default. Only run one at a time, or update the port in the example's server configuration.
6. **`manifestType` matters**: The `manifestType` field in app definitions controls how the app is launched. Using the wrong type (e.g., `"view"` when it should be `"snapshot"`) causes silent failures.

---

## Related Repositories

| Repository | Purpose |
|---|---|
| [built-on-openfin/web-starter](https://github.com/built-on-openfin/web-starter) | HERE npm libraries for desktop browsers and tablets (outside the HERE Container) |
| [built-on-openfin/container-starter](https://github.com/built-on-openfin/container-starter) | HERE Core Container examples |
| [built-on-openfin/frontend-framework-starter](https://github.com/built-on-openfin/frontend-framework-starter) | Framework-specific starters (React, Angular, etc.) |
| [built-on-openfin/csharp-starter](https://github.com/built-on-openfin/csharp-starter) | C# adapter examples |
| [built-on-openfin/node-starter](https://github.com/built-on-openfin/node-starter) | Node.js adapter examples |
| [built-on-openfin/deployment](https://github.com/built-on-openfin/deployment) | Deployment configuration examples |

---

## External Documentation

- **HERE Core UI Docs**: https://resources.here.io/docs/core/hc-ui/
- **Developer Environment Setup**: https://resources.here.io/docs/core/develop/
- **Release Notes (v23.0.0)**: https://cdn.openfin.co/versions/?product=UI%20Components#23.0.20
- **Integration Docs**: https://developers.openfin.co/of-docs/#section-third-party-applications
- **HERE Health Check**: https://cdn.openfin.co/health/deployment/index.html
- **HERE Process Manager**: https://start.openfin.co/pm
- **npm: @openfin/workspace**: https://www.npmjs.com/package/@openfin/workspace
- **npm: @openfin/workspace-platform**: https://www.npmjs.com/package/@openfin/workspace-platform
- **Contact HERE/OpenFin**: https://www.here.io/contact

---

## License

This repository is for **evaluation purposes only**. Use of the HERE Core Container and HERE Core UI components requires a license from HERE. See `LICENSE.MD` in the repository root. Contact HERE to request a developer evaluation key or discuss a production license.
