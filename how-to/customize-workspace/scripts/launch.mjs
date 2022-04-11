import { launch, connect } from "openfin-adapter";

async function launchFromNode(manifestUrl) {
  try {
    console.log("Launching manifest: " + manifestUrl);

    const port = await launch({ manifestUrl });

    //We will use the port to connect from Node to determine when OpenFin exists.
    const fin = await connect({
      uuid: "dev-connection-" + Date.now(), //Supply an addressable Id for the connection
      address: `ws://localhost:${port}`, //Connect to the given port.
      nonPersistent: true, //We want OpenFin to exit as our application exists.
    });

    //Once OpenFin exists we shut down the process.
    fin.once("disconnected", process.exit);
    return fin;
  } catch (e) {
    throw new Error(`Error: \n${e}`);
  }
}

(async () => {
  try {
    const launchArgs = process.argv.slice(2);

    let manifestUrl = "http://localhost:8080/manifest.fin.json";

    if (launchArgs.length > 0) {
      manifestUrl = launchArgs[0];
    }

    const fin = await launchFromNode(manifestUrl, launch, connect);

    const manifest = await fin.System.fetchManifest(manifestUrl);
    const platform = fin.Platform.wrapSync({ uuid: manifest.platform.uuid });
    let quitRequested = false;
    let quitPlatform = async () => {
      if (platform !== undefined && quitRequested === false) {
        quitRequested = true;
        await platform.quit();
      }
    };

    console.log("Wrapped target platform: " + manifest.platform.uuid);
    // //do something when app is closing
    process.on("exit", async () => {
      console.log("Exit called");
      await quitPlatform();
    });

    // //catches ctrl+c event
    process.on("SIGINT", async () => {
      console.log("Ctrl + C called");
      await quitPlatform();
      process.exit();
    });

    console.log(
      `You successfully connected from node with to the manifest: ${manifestUrl}`
    );
  } catch (e) {
    throw new Error(`Error connecting to  from node: \n${e}`);
  }
})();
