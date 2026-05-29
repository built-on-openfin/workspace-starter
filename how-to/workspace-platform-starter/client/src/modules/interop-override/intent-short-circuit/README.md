# Intent Short Circuit

An interop override module that intercepts specific intents and routes them directly to a configured target app, bypassing the standard intent resolution flow (app lookup, instance matching, intent resolver UI) for faster execution.

## How It Works

When an intent is fired:

1. If the intent name matches a configured mapping, the module launches the target app directly via `helpers.launchApp()` and delivers the intent using `super.setIntentTarget()`.
2. If the target app is the platform itself (matching `fin.me.identity.uuid`), it skips the launch step and delivers the intent immediately.
3. If the intent does not match any mapping, it falls through to the next override in the chain via `super.handleFiredIntent()`.

This is useful for well-known intent-to-app pairings (e.g., `CreateNotification` always handled by a specific app) where the full resolution flow is unnecessary overhead.

## Configuration

Add intent-to-app mappings in the module's `data` property in the manifest:

```json
{
  "id": "intent-short-circuit",
  "title": "Intent Short Circuit",
  "enabled": true,
  "url": "http://localhost:8080/js/modules/interop-override/intent-short-circuit.bundle.js",
  "data": {
    "intentMappings": [
      {
        "intentName": "CreateNotification",
        "appId": "your-notification-app-id"
      }
    ]
  }
}
```

## Module Ordering

This module should appear **before** the `wps-interop-override` module in the manifest's `platformProvider.interop.modules[]` array so that it gets first look at the intent. Unmatched intents are delegated to the next override in the chain.

## FDC3 2.0 Requirement

This module returns intent resolutions in the FDC3 2.0 format:

```json
{
  "source": { "appId": "...", "instanceId": "..." },
  "intent": "..."
}
```

It expects to be running in an environment targeting **FDC3 2.0**. Unlike the `wps-interop-override` module, it does not include additional logic to detect or adapt to FDC3 1.2 environments (where `source` would be a plain string). If your platform needs to support FDC3 1.2 clients, additional shaping logic would be required.
