## AI context in SuperTab windows (Workspace onboarding preview)

SuperTab windows in Workspace Starter are designed as a practical preview of the Enterprise Browser (EB SaaS) experience.  
If you are piloting this capability, AI context is the part that lets the chat experience understand what your users are looking at across opted-in views.

### What this gives you
- A Workspace-native way to trial EB-style AI-assisted workflows without a full migration.
- Business-controlled context collection, so only approved views participate.
- A clear separation between user/content views and the AI chat view, matching expected production guardrails.

### Main platform touch points
- `client/src/framework/ai-context.ts` is the central coordinator for AI context in the provider runtime.
- `AIContextProvider.initialize(...)` is where `useAIContext()` is created and should remain platform-provider owned (long-lived, single provider/channel lifecycle).
- `getAIContext(winIdentity)` is the pull path used by chat to request current context for a window.
- `getViewIdentities(...)` is the main place to apply business logic (`isAIContextPermitted(url)`) so only allowed view URLs are included.
- `fireContextChanged(...)` and `setupWinListeners(...)` enable push updates when relevant view/page state changes.

### Preload model
- Preloads are role-based:
  - user/content views -> `public/common/ai-context/dom-sender.cjs`
  - chat view -> `public/common/ai-context/ai-context.cjs`
- `public/manifest.fin.json` domain rules are the primary opt-in mechanism for deciding which views receive each preload.
- Keep the populations disjoint:
  - user views should never receive `ai-context.cjs`
  - chat view should never receives `dom-sender.cjs`

### What each preload does
- `dom-sender.cjs` (user views): collects lightweight page signals (title/url/referrer, etc.) and generates text-oriented content from the DOM for AI input.
- `@openfin/ai-context` provider helper (`getContext()` path): combines scraped outputs, adds screenshots via `fin.View.capturePage`, and returns an `AIContextResponse` payload for chat consumption.
- `ai-context.cjs` (chat view): exposes `window._aiContext`:
  - `getContext()` calls platform dispatch `getAIContext` (wired through the provider override in `wps-platform-override.ts`).
  - `setContextChangedListener()` lets chat react to push updates, including cases where a view is opted in but context capture is only partially available.

### Operating constraints
- One chat view per window.
- Keep `useAIContext()` invocation in the platform provider window so the AI context channel/provider is available for the full app lifecycle.
