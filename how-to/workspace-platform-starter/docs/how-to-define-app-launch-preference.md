> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.

[<- Back to Table Of Contents](../README.md)

# How To Define Launch Preferences for an App

You have a number of choices when choosing how you define your apps.

- [Platform App Definition](./how-to-define-apps.md)
- [FDC3 1.2 App Definition](./how-to-define-apps-fdc3-1-2.md)
- [FDC3 2.0 App Definition](./how-to-define-apps-fdc3-2-0.md)

## Launch Preferences

Launch Preferences currently apply to the following types of application:

- view / inline-view
- window / inline-window
- external (native)

Launch preferences are defined in the app definition when adding an entry to an app directory. Launch preferences can also specify what settings can be dynamically specified at the time of app launch.
An example might be that an app is defined and it supports contextual data sharing but you may wish to have it join a particular user channel on launch e.g. green. Another example might be that an application uses custom data to specify what mode it should be in. For big modes you might have separate app entries. For minor changes you might specify customData that should be used at launch.

```javascript
/**
 * Are there any preferences you would like to apply when launching this application?
 */
export interface LaunchPreference {
 /**
  * Do you wish to specify a custom height/width that should be used when this application is launched?
  */
 bounds?: {
  width: number;
  height: number;
 };

 /**
  * Should the launched UI be positioned in the center of the screen?
  */
 defaultCentered?: boolean;

 /**
  * Are there any app type specific options you would like to apply?
  */
 options?: ViewLaunchOptions | WindowLaunchOptions | NativeLaunchOptions;
}
```

If you are using our app json files inside of Visual Studio you should get intellisense when specifying launchPreference in your app definition.

### Launch Preferences - View Launch Options For Inline Views / Views

View applications can be specified as an inline-view (where the json for the view manifest is specified in the app definition) or as a view (where the manifest points to a url that will return the configuration for a view).

A view definition on it's own is not tightly tied to it's hosting page. If you wanted to influence the size of the window the view was placed in or details about the host page then you needed to specify an inline-snapshot or snapshot application and build a json file that included the settings you required.

Now with launch preferences you can specify information related to the view and or related to the hosting window. You can also specify if these settings can be specified at runtime when launching an instance of an application.

```javascript
/**
 * Additional options that apply to a view
 */
export interface ViewLaunchOptions extends LaunchOptions {
 /**
  * View options type
  */
 type: "view";
 /**
  * If specified it indicates wish to specify specific host settings for this content.
  */
 host?: HostLaunchOptions;

 /**
  * The option to override a few settings that are specific to views.
  */
 view?: Partial<Pick<OpenFin.ViewOptions, "url" | "interop" | "customData">>;

 /**
  * What can be specified when launching a view. This is an array of named types to reflect the properties you are happy to be specified.
  * By default nothing can be set outside of the app definition when launching the app.
  */
 updatable?: (ViewPreference | ViewPreferenceUrl)[];
}
```

Every launch preference option has to specify a type so that we can correctly type the settings you have specified.

#### Host settings

The host setting lets you specify settings that should be applied to the parent window the view is launched into.

```javascript
/**
 * Additional options that apply to the host of the content
 */
export interface HostLaunchOptions {
 /**
  * If specified it indicates you do not want to use a browser window for this view but a platform window.
  */
 url?: string;

 /**
  * If specified it indicates a preference to be used by this type of host.
  */
 title?: string;

 /** The Icon you would prefer the window shows. */
 icon?: string;

 /**
  * Should the header for the content be hidden
  */
 hasHeaders?: boolean;

 /**
  * Should the host support multi layouts (e.g. pages). Assumes the default for each host will be used.
  */
 disableMultiplePages?: boolean;

 /**
  * Should the toolbar options of a window be hidden if they are available?
  */
 disableToolbarOptions?: boolean;

 /**
  * If this host supports multiple layouts what should the layout (e.g page) title be?
  */
 pageTitle?: string;

 /**
  * If this host supports multiple layouts what should the icon be for the layout (e.g. page) be?
  */
 pageIcon?: string;
}
```

#### View settings

We let you specify the following view specific settings:

- url - Why would you want to override the view url? For views you may wish to provide an updated url that passes a particular query string parameter. You may want to do this from a platform perspective without modifying the view manifest or the inline view (so you can see the difference between the default and the platform override).
- interop - You may wish to specify that a view is assigned a specific user channel (e.g. green, yellow) either in the app definition (so you don't have to change the inline view setting or the manifest file) or dynamically (you might want to assign a view against a particular user channel given the circumstances at launch).
- customData - when building a view the view may take advantage of customData to help it support different modes or to prefill certain inputs etc (contextual data sharing or intents are also an option if you want external apps to be able to influence this).

#### Updatable View Options

An app directory is the golden source for the description of an app. A platform can launch application in many ways but it may want to restrict what can be dynamically changed when launching an app and this is where the updatable setting comes in. This is an array of options that contain the name of the setting that can be configured and an optional array of constraints that should be checked before trying to apply the update.

```javascript
/**
 * Which Launch Options are updatable and are there any constraints
 */
export interface Preference<T = unknown> {
 /**
  * What setting is updatable?
  */
 name: ViewPreferenceName | WebPreferenceName;

 /**
  * Is there a constraint that the platform can apply?
  */
 constraint?: T;
}

/**
 * Which Launch Options are updatable and are there any constraints
 */
export interface ViewPreference<T = never> extends Preference<T> {
 /**
  * What setting is updatable?
  */
 name: ViewPreferenceName;
}

/**
 * Which Launch Options are updatable and are there any constraints
 */
export interface ViewPreferenceUrl extends ViewPreference<PreferenceConstraintUrl> {
 /**
  * Is the url updatable?
  */
 name: "url" | "host-options";
}
```

You can specify which settings are updatable and when it comes to "url" or "host-options" you can set a constraint that will be applied against the suggested url.

- url-domain - the app owner/platform wants the suggested url to match the origin of the existing url (e.g. you want to change the page/path for the same domain).
- url-page - the app owner/platform wants the suggested url to match the origin and the path but it will let you specify additional/different query string parameters.
- url-any - any url can be specified.
- url-none - if a url is specified do not use it.

### Launch Preferences - Window Launch Options For Inline Windows / Windows

These settings apply to Classic OpenFin Windows.

The launch preference will let you override the settings that might exist in the inline definition or external manifest for situations where a platform might need to alter settings specific to the platform or how the application is used within the platform. The application can also be passed settings dynamically at the time of launch if the app definition supports it.

```javascript
/**
 * Additional options that apply to a window
 */
export interface WindowLaunchOptions extends LaunchOptions {
 /**
  * Window options type
  */
 type: "window";

 /**
  * The option to override a few settings that are specific to windows.
  */
 window?: Partial<Pick<OpenFin.WindowOptions, "url" | "interop" | "customData">>;

 /**
  * What can be specified when launching a window. This is an array of named types to reflect the properties you are happy to be specified.
  * By default nothing can be set outside of the app definition when launching the app.
  */
 updatable?: (WindowPreference | WindowPreferenceUrl)[];
}

```

Every launch preference option has to specify a type so that we can correctly type the settings you have specified.

#### Window settings

We let you specify the following window specific settings:

- url - Why would you want to override the window url? For windows you may wish to provide an updated url that passes a particular query string parameter. You may want to do this from a platform perspective without modifying the window manifest or the inline window (so you can see the difference between the default and the platform override).
- interop - You may wish to specify that a window is assigned a specific user channel (e.g. green, yellow) either in the app definition (so you don't have to change the inline window setting or the manifest file) or dynamically (you might want to assign a window against a particular user channel given the circumstances at launch).
- customData - when building a window the window may take advantage of customData to help it support different modes or to prefill certain inputs etc (contextual data sharing or intents are also an option if you want external apps to be able to influence this).

#### Updatable Window Options

An app directory is the golden source for the description of an app. A platform can launch application in many ways but it may want to restrict what can be dynamically changed when launching an app and this is where the updatable setting comes in. This is an array of options that contain the name of the setting that can be configured and an optional array of constraints that should be checked before trying to apply the update.

```javascript
/**
 * Which Launch Options are updatable and are there any constraints
 */
export interface WindowPreference<T = never> extends Preference<T> {
 /**
  * What setting is updatable?
  */
 name: WebPreferenceName;
}

/**
 * Which Launch Options are updatable and are there any constraints
 */
export interface WindowPreferenceUrl extends Preference<PreferenceConstraintUrl> {
 /**
  * Is the url updatable?
  */
 name: "url";
}
```

You can specify which settings are updatable and when it comes to "url" you can set a constraint that will be applied against the suggested url.

- url-domain - the app owner/platform wants the suggested url to match the origin of the existing url (e.g. you want to change the page/path for the same domain).
- url-page - the app owner/platform wants the suggested url to match the origin and the path but it will let you specify additional/different query string parameters.
- url-any - any url can be specified.
- url-none - if a url is specified do not use it.

### Launch Preferences - Native Options

Bounds and centered settings are currently not applied to native apps.

```javascript
/**
 * Additional options that apply to a native app
 */
export interface NativeLaunchOptions extends LaunchOptions {
 /**
  * Native options type
  */
 type: "native";
 /**
  * If specified it indicates the native app should be included when snapping.
  */
 snap?: SnapLaunchOptions;

 /**
  * Launch Preferences related to native apps
  */
 native?: {
  /**
   * Arguments are set as an array for compatibility with appAssets, launchExternalProcess and Snap.
   */
  arguments?: string[];
 };

 /**
  * What can be specified when launching a native app. This is an array of named types to reflect the properties you are happy to be specified.
  * By default nothing can be set outside of the app definition when launching the app.
  */
 updatable?: NativePreference[];
}
```

Every launch preference option has to specify a type so that we can correctly type the settings you have specified.

#### Snap Settings

These settings are used to specify snap specific settings which are used by the platform to help launch and snap applications with Browser and Platform Windows.

To find out more about these settings please visit the [how to configure snap](./how-to-configure-snap.md).

#### Native settings

Native settings let you specify an array of arguments that will be put together and passed to the native application that is being launched. It will override the default arguments that may have been specified.

#### Updatable Native Options

An app directory is the golden source for the description of an app. A platform can launch application in many ways but it may want to restrict what can be dynamically changed when launching an app and this is where the updatable setting comes in. This is an array of options that contain the name of the setting that can be configured and an optional array of constraints that should be checked before trying to apply the update (if applicable).

```javascript
/**
 * Which Launch Options are updatable and are there any constraints
 */
export interface NativePreference<T = never> extends Preference<T> {
 /**
  * What setting is updatable?
  */
 name: NativePreferenceName;
}

/**
 * A list of native related settings that can be updated.
 */
export type NativePreferenceName = "arguments";
```

You can see that you can have an updatable array with an object that specify that you want arguments to be dynamically updatable. Without that setting you can still override the arguments but only through the launchPreference within the app definition.

## Using Launch Preferences from a module

When building a module it may have permission to get and launch applications. These helper functions are passed in a helper object when the module is initialized. See [How to add a module](./how-to-add-a-module.md).

Here is an example where a module may be looking to see if it can set the bounds for a particular view application called x.

```javascript
    // bring in the types at the top of the file
    import type { LaunchPreference, UpdatableViewLaunchPreference } from "workspace-platform-starter/shapes/app-shapes";

    // in your code check to see if you can get an app to see if it is updatable and if you can launch it
    // this is assuming you have assigned the helpers object passed to you during module initialization to _helpers.
    if(this._helpers?.getApp !== undefined &&
     this._helpers?.launchApp !== undefined) {
    // get the application
     const targetAppId = "x";
     const app = await this._helpers?.getApp(targetAppId);
     // check to see if it allows anything to be updated.
     if(app?.launchPreference?.options?.type === "view" && Array.isArray(app?.launchPreference?.options?.updatable)) {
      const updatable: UpdatableViewLaunchPreference[] = app.launchPreference.options.updatable;
      const preferences: LaunchPreference = {};
      let canUpdate = false;
      // go through the updatable options to update the settings you wish to change
      for(const option of updatable) {
       switch(option.name) {
        case "bounds": {
         preferences.bounds = {
          height: 500,
          width: 600
         };
         canUpdate = true;
         break;
        }
        default: {
         break;
        }
       }
      }
      // if it can be updated pass the launch preferences (or undefined)
      if(canUpdate) {
       await this._helpers.launchApp(targetAppId, preferences);
      } else {
       await this._helpers.launchApp(targetAppId);
      }
     }
    }
```

## Source Reference

- [app-shapes.ts](../client/src/framework/shapes/app-shapes.ts)

[<- Back to Table Of Contents](../README.md)
