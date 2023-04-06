import { init as bootstrap } from "./bootstrapper";
import { init as initialisePlatform } from "./platform";


window.addEventListener("DOMContentLoaded", async () => {
	const platform = fin.Platform.getCurrentSync();

	await platform.once("platform-api-ready", async () => bootstrap());

	await initialisePlatform();

	// initDom();
    // await showBBGTestWindow();
});

const initDom = () => {
    const btnConnect = document.querySelector("#btnConnect");

    btnConnect.addEventListener("click", showBBGTestWindow);
};

const showBBGTestWindow = async () => {
    let appWin = await fin.Window.create({
        name: "integrate-with-bloomberg-app",
        alwaysOnTop: true,
        maximizable: false,
        minimizable: false,
        autoShow: true,
        defaultCentered: true,
        defaultHeight: 500,
        defaultWidth: 800,
        includeInSnapshots: false,
        resizable: true,
        showTaskbarIcon: false,
        url: "http://localhost:8080/platform/bbgtest.html"
    });

    await appWin.on("closed", async () => {
        await appWin.removeAllListeners();
        appWin = undefined;
    });
};


