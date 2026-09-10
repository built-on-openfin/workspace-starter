---
description: Workspace Platform Starter module generation and architecture. Use when working in the workspace-platform-starter project, generating modules, or asking about HERE Core UI platform modules.
globs:
  - how-to/workspace-platform-starter/**
---

# Workspace Platform Starter

Module-based HERE Core UI (OpenFin) platform. Scaffold modules with:

```bash
npm run generate-module <type> "<Name>"
```

Types: `analytics`, `actions`, `auth`, `conditions`, `contentCreation`, `endpoint`, `initOptions`, `integrations`, `interopOverride`, `lifecycle`, `log`, `menus`, `platformOverride`, `share`

Build: `npm run build-client-modules` | Run: `npm start` + `npm run client`

For full details (module types table, pattern, docs index): read `how-to/workspace-platform-starter/AGENTS.md`
