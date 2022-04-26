import type { Client } from "webdriver";

// These items have to be declared as var otherwise they are not able to be referenced.

// eslint-disable-next-line no-var,vars-on-top
export var webdriver: Client;

declare global {
    // eslint-disable-next-line no-var,vars-on-top
    var webdriver: Client;
}
