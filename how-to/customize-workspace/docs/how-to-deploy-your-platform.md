> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# How To Deploy Your Platform

The OpenFin website has a section dedicated to deployment, see [Deploying Applications](https://developers.openfin.co/of-docs/docs/deploying-applications)

## Installer

If you have a manifest setup to your liking (e.g. a local setup would be [manifest.fin.json](../public/manifest.fin.json)) then you can move onto creating an installer for that manifest:

- [https://install.openfin.co](https://install.openfin.co)

This page will take the url to your manifest (you can use localhost for testing) and give you a zipped installer. The zipped installer is our Runtime Version Manager (RVM see [Installation With RVM](https://developers.openfin.co/of-docs/docs/installation-with-rvm)) and this will install without requiring admin rights and pull down the required OpenFin runtime from our CDN.

Your manifest can add specify settings that can customize the download screen (see [Customizing Dialog Settings](https://developers.openfin.co/of-docs/docs/application-configuration#section-dialogsettings-properties)) as well as present a splash screen (see [Splash Screen Settings In Top Level Properties](https://developers.openfin.co/of-docs/docs/application-configuration#section-top-level-properties)).

You can then create installers for your other environments (e.g. DEV, UAT) if you wish to have others install and test your Workspace Platform.

## Detecting If OpenFin is installed

When you are deploying your application and an end user is visiting your site using a desktop browser you can now detect whether or not OpenFin is installed and if it is capable of launching applications using the fins link protocol (which is the default installation behavior).

With this knowledge you can present them with a link to click and launch if they are capable of doing so, or a download link so they can download and run the installer:

[Detect OpenFin support from a web browser](https://developers.openfin.co/of-docs/docs/how-to-detect-openfin-in-your-app)

## Packaging your app for deployment

The project has an npm script `package-config` which will read the data from a manifest and build a final set of files based on the included content.

The script has 3 parameters.

- `manifest` - Specifies the manifest to use as the source (default: `manifest.fin.json`)
- `env` - The environment you are building for, could be local, prod, uat etc (default: `local`)
- `host` - The host location you will be serving from e.g. `https://my.domain.com` (default: `http://localhost:8181`)

The output from the script is stored in the `packaged/${env}` folder, which is created if it does not exist (it is also removed entirely on each run of the script).

The script uses the manifest file as a starting point, the file is processed and then any dependencies are processed similarly in a recursive fashion.

As each file is processed the development host references will be replaced with the `host` option, and environment substitutions are performed (see below).

### Content Packs

After the manifest file is processed the `contentPacks` from `./scripts/package-config.json` are processed in the same way. This can be useful if there are assets that are not directly referenced in the other files, but are still required at runtime.

At a bare minimum the `public` and `common` sections are required, as they are used to locate other assets. Any pack can include a `dependsOn` field, specifying this means that it will only include the packs content if the file specified by the property has been included earlier in the processing.

### Environment Substitutions

You can also substitute tokens based on the environment, the `tokens` property of `package-config.json` is a map of variables by environment.

```json
"tokens": {
    "local": {
        "APPTITLE": "My Local App"
    },
    "uat": {
        "APPTITLE": "My UAT App"
    }
}
```

This will replace `{OF-APPTITLE}` anywhere in the content with `foo` if the environment is set to `local`, in a `uat` build it will substitute it with `bar`. The file types that will have this applied are specified by the `replaceTypes` entry in `package-config.json`, defaults to `.html`, `.js`, `.json`.

Example as part of `customSettings` in manifest.

```json
"customSettings": {
    ...
    "browserProvider": {
        "windowOptions": {
            "title": "{OF-APPTITLE}",
            ...
        }
    }
    ...
}
```

### Manifest hosts

To add a small level of security the platform reads the `manifest-hosts.json` before loading settings, see [How To Secure Your Platform](./how-to-secure-your-platform.md). The file by default will contains just the `host` you specify on the command line. Should you wish to add more entries for use with different environments you can configure the `hosts` property of `package-config.json` mapped by environment.

```json
"hosts": {
    "local": [
        "127.0.0.1",
        "built-on-openfin.github.io",
        "openfin.github.io",
        "samples.openfin.co",
        "cdn.openfin.co"
    ]
}
```

### Running the script

Run the script with default parameters as follows.

```shell
npm run package-content
```

This will use `manifest.fin.json` as the starting point for the content, store the output in `packaged/local`, and the domain will be served from `http://localhost:8081`

Run the script with custom parameters as follows:

```shell
npm run package-content --manifest=second.manifest.fin.json --env=uat --host=https://openfin.mydomain.com
```

This will use `second-manifest.fin.json` as the starting point for the content, store the output in `packaged/uat`, and the domain will be served from `https://openfin.mydomain.com`

### Testing local builds

You can test a local build with the following commands (assuming defaults):

Serve the content:

```shell
npx http-server packaged\local -p 8181
```

Start the OpenFin app:

```shell
start fin://localhost:8181/manifest.fin.json
```

[<- Back to Table Of Contents](../README.md)
