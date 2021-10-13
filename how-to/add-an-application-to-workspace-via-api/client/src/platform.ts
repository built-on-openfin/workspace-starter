import { fin } from 'openfin-adapter/src/mock';

export function init() {
    console.log("Initialising platform");
    fin.Platform.init({
    });
} 