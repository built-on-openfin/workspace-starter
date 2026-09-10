> **_:information_source: HERE Core UI:_** [HERE Core UI](https://resources.here.io/docs/core/hc-ui/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the HERE Core Container and HERE Core UI components is only granted pursuant to a license from HERE (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.here.io/contact) if you would like to request a developer evaluation key or to discuss a production license.

[<- Back to Table Of Contents](../README.md)

# How To Use An AI Agent To Build With Workspace Platform Starter

This project includes configuration files that enable AI coding agents (Cursor, Claude Code, Codex) to understand the module-based architecture and help you scaffold, implement, and configure modules.

## Agent Configuration Files

| File                                          | Tool         | Purpose                                      |
| --------------------------------------------- | ------------ | -------------------------------------------- |
| `AGENTS.md`                                   | OpenAI Codex | Full project instructions (canonical source) |
| `CLAUDE.md`                                   | Claude Code  | Pointer to AGENTS.md                         |
| `.cursor/rules/workspace-platform-starter.md` | Cursor       | Auto-activates when working in this project  |

These files teach the agent about the module system, available types, the generate command, build workflow, and where to find documentation.

## Example Prompts

The following examples show how you can ask an AI agent to help you build with this project.

### Adding Analytics Tracking

**Prompt:** "I want to add analytics tracking to my platform"

The agent will:

1. Identify `analytics` as the appropriate module type
2. Run `npm run generate-module analytics "My Analytics Tracker"`
3. Open the generated provider class and help you implement event forwarding to your analytics service
4. Build with `npm run build-client-modules`

### Adding A Search Integration

**Prompt:** "Add a search integration that queries our internal knowledge base API"

The agent will:

1. Pick `integrations` from the module type table
2. Run `npm run generate-module integrations "Knowledge Base"`
3. Read `docs/how-to-add-integrations-to-home.md` for the search result API
4. Implement `getSearchResults()` in the generated provider class, calling your API
5. Build with `npm run build-client-modules`

### Understanding The Module System

**Prompt:** "How do modules work in this project?"

The agent will explain:

- Each module contains three files: `index.ts`, a provider class, and `shapes.ts`
- Modules are loaded at runtime via manifest URL
- The generate command scaffolds everything including webpack and manifest entries
- It will point you to `docs/how-to-add-a-module.md` for deeper detail

### Adding Lifecycle Hooks

**Prompt:** "We need to run some cleanup logic when the platform shuts down"

The agent will:

1. Identify this as a `lifecycle` hook
2. Run `npm run generate-module lifecycle "Cleanup Handler"`
3. Implement the shutdown event handler in the generated provider class
4. Reference `docs/how-to-use-lifecycle-events.md` for available lifecycle events

### Creating A Custom Endpoint

**Prompt:** "Create an endpoint module that fetches user preferences from our REST API at /api/v2/preferences"

The agent will:

1. Run `npm run generate-module endpoint "User Preferences"`
2. Implement `requestResponse()` to call `/api/v2/preferences`
3. Configure the manifest `data` property with the base URL
4. Remind you that for production, this config should move to a settings service

### Production Deployment Questions

**Prompt:** "I want to deploy this to production — what do I need to change about how settings are configured?"

The agent will explain that `manifest.fin.json` includes all settings for development convenience, but in production the public manifest should only expose bare minimal auth information and a settings endpoint. It will point to `public/second.manifest.fin.json` and `settings.json` as the reference pattern for this approach.

### Extending Platform Or Interop Behavior (Override Modules)

**Prompt:** "I want to override the default window positioning so that new windows open in a cascading layout"

The agent will:

1. Identify this as a `platformOverride` module
2. Run `npm run generate-module platformOverride "Cascade Positioning"`
3. Implement the relevant platform method override (e.g., `createWindow()`) calling `super.createWindow()` to preserve upstream behavior before applying custom positioning
4. Ensure the module is placed in the correct order in the manifest's `modules[]` array

> **Important:** `platformOverride` and `interopOverride` are different from typical modules. Rather than being independent, they form an **inheritance tree** — each override module extends the one before it in the manifest's `modules[]` array. Order matters: if your implementation calls `super.methodName()`, it delegates to the next override in the chain (or the base implementation if it's last). Placing your module in the wrong position can bypass or break logic from other overrides.

**Another example:** "Add custom context handling so that `fdc3.instrument` contexts are enriched with pricing data before delivery"

The agent will:

1. Identify this as an `interopOverride` module
2. Run `npm run generate-module interopOverride "Instrument Enrichment"`
3. Override the context handler, call `super.setContext()` after enriching the payload
4. Reference `docs/how-to-customize-your-interop-broker.md` for the available interop broker methods
5. Check the existing override module order in the manifest and place the new module appropriately in the chain

### Adding Custom Menu Actions

**Prompt:** "I want to add a custom right-click menu option that copies a view's URL to clipboard"

The agent will:

1. Run `npm run generate-module actions "Copy View URL"`
2. Implement the action handler in the generated provider class
3. Reference `docs/how-to-add-custom-actions-for-menus-and-buttons.md` for menu action registration
4. Optionally also generate a `menus` module if custom menu structure is needed

## Tips For Better Results

- **Be specific about what you want** — "Add a search integration for Jira tickets" is better than "add search"
- **Mention the service or API** — the agent can implement the actual integration if it knows the target
- **Ask about production patterns** — the agent knows the dev vs production configuration distinction
- **Ask it to read docs** — if you need deeper detail on a module type, ask the agent to read the relevant guide from `docs/`

## Source Reference

- Agent instructions: [AGENTS.md](../AGENTS.md)
- Module templates: [templates/src/](../templates/src/)
- Generate script: [templates/scripts/generate-module.mjs](../templates/scripts/generate-module.mjs)
