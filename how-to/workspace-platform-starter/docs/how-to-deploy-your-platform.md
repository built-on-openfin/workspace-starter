> **_:information_source: HERE Core UI:_** [HERE Core UI](https://resources.here.io/docs/core/hc-ui/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the HERE Core Container and HERE Core UI components is only granted pursuant to a license from HERE (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.here.io/contact) if you would like to request a developer evaluation key or to discuss a production license.

[<- Back to Table Of Contents](../README.md)

# How To Deploy Your Platform

The HERE website has a section dedicated to deployment, see [Deploying Applications](https://developers.openfin.co/of-docs/docs/deploying-applications)

## Installer

If you have a manifest setup to your liking (e.g. a local setup would be [manifest.fin.json](../public/manifest.fin.json)) then you can move onto creating an installer for that manifest:

- [https://install.openfin.co](https://install.openfin.co)

This page will take the url to your manifest (you can use localhost for testing) and give you a zipped installer. The zipped installer is our Runtime Version Manager (RVM see [Installation With RVM](https://developers.openfin.co/of-docs/docs/installation-with-rvm)) and this will install without requiring admin rights and pull down the required HERE runtime from our CDN.

Your manifest can add specify settings that can customize the download screen (see [Customizing Dialog Settings](https://developers.openfin.co/of-docs/docs/application-configuration#section-dialogsettings-properties)) as well as present a splash screen (see [Splash Screen Settings In Top Level Properties](https://developers.openfin.co/of-docs/docs/application-configuration#section-top-level-properties)).

You can then create installers for your other environments (e.g. DEV, UAT) if you wish to have others install and test your HERE Core UI Platform.

## Detecting If HERE is installed

When you are deploying your application and an end user is visiting your site using a desktop browser you can now detect whether or not HERE is installed and if it is capable of launching applications using the fins link protocol (which is the default installation behavior).

With this knowledge you can present them with a link to click and launch if they are capable of doing so, or a download link so they can download and run the installer:

[Detect HERE support from a web browser](https://developers.openfin.co/of-docs/docs/how-to-detect-openfin-in-your-app)

## Versioning - Determining the version of Workspace and Notification Center you are running against

If you want to confirm the version of the different parts that make up your application then you can take advantage of the new Version Provider ([see how to add versioning support](./how-to-add-versioning-support.md)). The Version Provider lets you specify the minimum and maximum versions of components such as Workspace and gives you the option of stopping the platform from fully initializing and displaying your own warning window to notify the end user of the next steps (we include an example but it is only an example warning page and you should develop one suitable for your platform).

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

All of the content packs are included, unless they have `autoInclude` set to false. To include these packages you can use the `--packages` option on the command line e.g. `--packages=shell,package,of-info`

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

This will replace `{OF-APPTITLE}` anywhere in the content with `My Local App` if the environment is set to `local`, in a `uat` build it will substitute it with `My UAT App`. The file types that will have this applied are specified by the `replaceTypes` entry in `package-config.json`, defaults to `.html`, `.js`, `.json`.

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

Serve the content, the `-c-` option disables caching making it easier to test:

```shell
npx http-server packaged\local -p 8181 -c-1
```

Start the HERE app:

```shell
start fin://localhost:8181/manifest.fin.json
```

## Self Hosted HERE Core UI Components

If you are self hosting HERE Core UI Components remember to include them in your deployments across environments. Please see [How To Self Host HERE Core UI Components](./how-to-self-host-workspace.md) for more information.

[<- Back to Table Of Contents](../README.md)
