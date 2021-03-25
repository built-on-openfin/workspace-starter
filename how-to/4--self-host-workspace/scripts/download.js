const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const extract = require("extract-zip");

const workspaceBundleUrl =
  "https://home-staging.openfin.co/assets/demo/hosted-workspace.zip";

async function download() {
  const res = await fetch(workspaceBundleUrl);
  const buffer = await res.buffer();
  fs.writeFileSync("hosted-workspace.zip", buffer);
  await extract("hosted-workspace.zip", { dir: path.resolve("public") });
}
download();
