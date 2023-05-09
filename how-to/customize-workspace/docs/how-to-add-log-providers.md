> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# How To Add Log Providers

Log providers add the ability to send logging information to your own display/storage mechanism.

You can implement a logger by following the module pattern, see [How To Add A Module](./how-to-add-a-module.md).

## Configuration

As mentioned above log providers follow the module pattern, the default configured console logger uses the following configuration:

```json
"loggerProvider": {
    "modules": [
        {
            "enabled": true,
            "id": "console",
            "url": "http://localhost:8080/js/modules/log/console.bundle.js"
        }
    ]
}
```

## Implementation

If you implement a logger module you need only override one method, `log`. From within this method you can send the logging data anywhere you want.

This method is deliberately not async, otherwise the whole of the logging pattern would require methods wanting to log to be async as well. Instead if you want to perform async operations like storing in a DB, or sending to a REST service, you should batch the information and send it with a background process.

```ts
class MyLogger implements LogProvider {
  /**
   * Log data as information.
   * @param identity The identity sending the message.
   * @param group The group sending the log message.
   * @param level The level of the message to log.
   * @param message The message to log.
   * @param optionalParams Optional parameters for details.
   */
  public log(
    identity: string,
    group: string,
    level: LogLevel,
    message: unknown,
    ...optionalParams: unknown[]
  ): void {}
}
```

You also need the entry point exported from the module.

```ts
export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
  log: new MyLogger()
};
```

## Using Logging

To use a logger in your code you need to import the `createLogger` method from `log-provider.ts`, this allows you to create an object from which you can call all the logging methods. The logging methods are the same as you would normally expect from the `console` object `info`, `warn`, `error`, `trace`, `debug`.

```ts
import { createLogger } from './logger-provider';

const logger = createLogger('Bootstrapper');

logger.info('The platform has started');
```

## Additional Settings

As with any entity following the module pattern it can have custom settings, the default `ConsoleLogger` has some additional settings to specify which log levels it displays. By default it shows everything, but you could reduce the noise to just `error` and `debug` messages with the following configuration.

```json
"loggerProvider": {
    "modules": [
        {
            "enabled": true,
            "id": "console",
            "url": "http://localhost:8080/js/modules/log/console.bundle.js",
            "data": {
                "includeLevels": ["error", "debug"]
            }
        }
    ]
}
```

Each log provider can have its own custom settings, so you could have a console logger showing all messages, and a remote logger which just gets sent error messages.

Also since the logging level is driven from the manifest settings you could make this entitlements based, providing different levels of logging per user. If a specific user is having problems, you could increase the verbosity of the logging messages for just that user.

## Using Logging In Modules

We don't want to include the logging code directly in external modules as it bloats their size, instead when the a module has it's `initialize` method called it is passed the `createLogger` method, so it can use this create a logger and perform logging from within the module.

## Source Reference

- [logger-provider.ts](../client/src/framework/logger-provider.ts)
- [logger-shapes.ts](../client/src/framework/shapes/logger-shapes.ts)
- console [log.ts](../client/src/modules/log/console/log.ts)

[<- Back to Table Of Contents](../README.md)
