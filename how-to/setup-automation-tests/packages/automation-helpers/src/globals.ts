/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import type { ThenableWebDriver } from "selenium-webdriver";
import type { Client } from "webdriver";
import type { IWebDriver } from "./models/IWebDriver";

// These items have to be declared as var otherwise they are not able to be referenced.
export var webDriver: IWebDriver;
export var nodeWebDriver: Client | undefined;
export var seleniumWebDriver: ThenableWebDriver | undefined;

declare global {
    var webDriver: IWebDriver;
    var nodeWebDriver: Client | undefined;
    var seleniumWebDriver: ThenableWebDriver | undefined;
}
