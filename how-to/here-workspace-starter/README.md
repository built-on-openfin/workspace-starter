# HERE Workspace Starter — Enterprise Browser POC

 This folder in **workspace-starter** is set up to demonstrate the Enterprise Browser UI, including tabbed browser windows, the platform shell, and related workspace behavior, in a workspace-starter context. It provides a runnable sample so clients can explore the Enterprise Browser experience.

This sample is experimental and subject to change. It is provided for early evaluation purposes. For ongoing product guidance, please refer to your HERE engagement and the maintained **workspace-starter** / Core UI documentation.

## How To

This how-to is a configurable HERE Core UI Platform example, wired for **Enterprise Browser** (`@openfin/enterprise-api`, `public/platform/enterprise` static assets from `prepare-browser.mjs`, and `here.config.ts`). **Local build:** `npm install` runs `prepare` / `prepare-browser.mjs` (copies Enterprise Browser UI into `public/platform/enterprise`); then `npm run build`, start the dev server (`npm start`), and launch OpenFin against `http://localhost:8080/manifest.fin.json` (for example `npm run client` if you use the included launcher).
