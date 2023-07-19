> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

A web browser allows the launching of links that do not start with http/https if they are supported e.g. mailto: etc. How can this be configured in an OpenFin application?

## Protocol Support

### Security

The first thing to consider is configuring your manifest's security to allow the use of protocols (in html anchor tags, window.open and fin.System.openUrlWithBrowser calls).

See [API Security](https://developers.openfin.co/of-docs/docs/api-security) on our website.

Security can be configured at 4 levels.

- Desktop Owner Settings (please refer to our website documentation)
- Platform Level (If you want permissions at the view or window level then they must exist at the platform level).
- Window Level
- View Level

### Note about openExternal

There are two ways of launching specific protocol links. Using the OpenFin API and using the webAPIs permission openExternal. It is generally better to have a specific list of protocols that you intentionally wish to support so for the most part we recommend using the **fin.System.openUrlWithBrowser** API to open protocol links and ensure that only the list of supported protocols are launched. openExternal is a way of letting the system handle the protocol request so it is convenient but you are no longer being explicit in what you want to support.

#### Platform Level

You need to set the root permissions if you want them to be available to your platform and child windows/views. Below you can see that the openUrlWithBrowser permission has been enabled and it has been provided a list of protocols that it should support. For links and window.open calls you need to enable the WebAPIs openExternal permission.

```js
"platform": {
    "permissions": {
      "System": {
        "openUrlWithBrowser": {
          "enabled": true,
          "protocols": [
            "mailto",
            "msteams",
            "tel",
            "zoommtg",
            "zoomus",
            "wbx",
            "slack"
          ]
        }
      },
      "webAPIs": [
        "openExternal"
      ]
    }
}
```

#### Window Level

You can either set the window permissions for all windows through Default Window Options or for a specific window through Window Options when you launch it.

##### Default Window Options

```js
"platform": {
    "permissions": {
      "System": {
        "openUrlWithBrowser": {
          "enabled": true,
          "protocols": [
            "mailto",
            "msteams",
            "tel",
            "zoommtg",
            "zoomus",
            "wbx",
            "slack"
          ]
        }
      },
      "webAPIs": [
        "openExternal"
      ]
    },
    "defaultWindowOptions": {
      "permissions": {
        "System": {
          "openUrlWithBrowser": {
            "enabled": true,
            "protocols": [
              "mailto",
              "msteams",
              "tel",
              "zoommtg",
              "zoomus",
              "wbx",
              "slack"
            ]
          }
        },
        "webAPIs": [
          "openExternal"
        ]
      }
    }
}
```

##### Window Options

```js
{
    "permissions": {
        "System": {
          "openUrlWithBrowser": {
            "enabled": true,
            "protocols": [
              "mailto",
              "msteams",
              "tel",
              "zoommtg",
              "zoomus",
              "wbx",
              "slack"
            ]
          }
        },
        "webAPIs": [
          "openExternal"
        ]
      }
}
```

#### View Level

You can either set the view permissions for all views through Default View Options or for a specific view through View Options when you launch it.

##### Default View Options

```js
"platform": {
    "permissions": {
      "System": {
        "openUrlWithBrowser": {
          "enabled": true,
          "protocols": [
            "mailto",
            "msteams",
            "tel",
            "zoommtg",
            "zoomus",
            "wbx",
            "slack"
          ]
        }
      },
      "webAPIs": [
        "openExternal"
      ]
    },
    "defaultViewOptions": {
      "permissions": {
        "System": {
          "openUrlWithBrowser": {
            "enabled": true,
            "protocols": [
              "mailto",
              "msteams",
              "tel",
              "zoommtg",
              "zoomus",
              "wbx",
              "slack"
            ]
          }
        },
        "webAPIs": [
          "openExternal"
        ]
      }
    }
}
```

##### View Options

```js
{
    "permissions": {
        "System": {
          "openUrlWithBrowser": {
            "enabled": true,
            "protocols": [
              "mailto",
              "msteams",
              "tel",
              "zoommtg",
              "zoomus",
              "wbx",
              "slack"
            ]
          }
        },
        "webAPIs": [
          "openExternal"
        ]
      }
}
```
