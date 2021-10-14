import { fin } from 'openfin-adapter/src/mock';

export async function init() {
    console.log("Initialising platform");
    await fin.Platform.init({
    });
} 