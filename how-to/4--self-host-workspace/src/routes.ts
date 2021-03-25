import * as fs from "fs";
import * as path from "path";
import * as express from "express";

const router = express.Router();
export default router;

/**
 * The base path of the FE assets.
 *
 * Note that the relative path of the assets is hard coded into the build of OpenFin Workspace.
 * The assets downloaded here are hardcoded to work with the `/workspace` path.
 * If you wish to serve OpenFin Workspace from a different path, OpenFin
 * will provide a custom build per request.
 */
const feBasePath = "/workspace";

/**
 * The app manifest for self hosted OpenFin Workspace.
 */
const appManifest: any = JSON.parse(
  fs
    .readFileSync(path.resolve(__dirname, "../public/app.json"))
    .toString("utf-8")
);

/**
 * OpenFin app manifests cannot contain relative URLs.
 * This endpoint modifies all URLs in the manifest to point to the server.
 * Alternatively, you can manually edit the manifest file.
 */
router.get(`${feBasePath}/app.json`, (req, res) => {
  const fullUrl = req.protocol + "://" + req.get("host") + feBasePath;
  const appIconUrl = fullUrl + "/favicon.ico";
  const indexPageUrl = fullUrl + "/";
  const browserPageUrl = fullUrl + "/browser/";
  const providerPageUrl = fullUrl + "/provider/";
  appManifest.shortcut.icon = appIconUrl;
  appManifest.startup_app.url = indexPageUrl;
  appManifest.platform.providerUrl = providerPageUrl;
  appManifest.platform.applicationIcon = appIconUrl;
  appManifest.platform.defaultWindowOptions.url = browserPageUrl;
  res.json(appManifest);
});

/**
 * Serve all files in the 'public' directory.
 *
 * The OpenFin Workspace frontend assets should have been downloaded
 * to the `public` directory. All we have to do now is serve them.
 *
 * Make sure that your server defaults to `index.html` when just the path is provided.
 */
router.use(feBasePath, express.static("public"));
