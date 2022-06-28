import OpenFin, { fin } from '@openfin/core';

export const CONTAINER_ID = 'layout-container';
const openfinWindow: OpenFin.Window = fin.Window.getCurrentSync();

const maxOrRestore = async (): Promise<void> => {
    if (await openfinWindow.getState() === 'normal') {
        return await openfinWindow.maximize();
    }

    return openfinWindow.restore();
};

const closeWindow = (): Promise<void> => {
    return openfinWindow.close();
};

const minimizeWindow = (): Promise<void> => {
    return openfinWindow.minimize();
}; 

const setupTitleBar = (): void => {
    const minBtn: HTMLElement = document.getElementById('minimize-button');
    const maxBtn: HTMLElement = document.getElementById('expand-button');
    const closeBtn: HTMLElement = document.getElementById('close-button');
    
    minBtn.onclick = minimizeWindow;
    maxBtn.onclick = maxOrRestore;
    closeBtn.onclick = closeWindow;

};

window.addEventListener('DOMContentLoaded', async () => {
    await fin.Platform.Layout.init({ containerId: CONTAINER_ID });
    setupTitleBar();
});