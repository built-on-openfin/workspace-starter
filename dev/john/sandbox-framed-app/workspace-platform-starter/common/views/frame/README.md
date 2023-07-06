# Framed App

This is an example app that shows how to load a piece of content via an iframe and control whether or not they get the fin API.

If the fin api is injected then you can use the fin api or the full fdc3 api.

If the fin api is available (the fdc3 api will also be available if it is available to the view) then the preload script specified in the apps.json file (preload.js) will be included and this adds logic that monitors the iframe's title and updates the views's title so that the content tab reflects the iframed content and not the view.

If the fin api is disabled (and therefore the fdc3 api) for the iframed content then we have an example.html page that loads a script framed.js that enables the title monitoring and provides a basic fdc3 API that supports broadcasting on system/user channels or adding a context listener.

This is just an example of how you can use the OpenFin APIs, browser APIs (postMessage) and OpenFin settings.

## Framed Content

A lot of sites do not allow their content to be contained within an iframe unless it comes from the same origin. Please keep that in mind when trying different urls in the settings of this app.

## Example App Entry in apps.json

```json
{
  "appId": "openfin-frame",
  "name": "openfin-frame",
  "title": "Framed App",
  "description": "An example of framing an application.",
  "manifest": {
    "url": "http://localhost:8080/common/views/frame/index.html",
    "customData": {
      "frame": {
        "url": "http://localhost:8080/common/views/frame/example-content/example.html",
        "title": "Example Frame"
      }
    },
    "api": {
      "iframe": {
        "crossOriginInjection": false,
        "sameOriginInjection": false
      }
    },
    "fdc3InteropApi": "2.0",
    "preloadScripts": [
      {
        "url": "http://localhost:8080/common/views/frame/preload.js"
      }
    ]
  },
  "manifestType": "inline-view",
  "icons": [
    {
      "src": "http://localhost:8080/common/images/icon-blue.png"
    }
  ],
  "contactEmail": "contact@example.com",
  "supportEmail": "support@example.com",
  "publisher": "OpenFin",
  "intents": [],
  "images": [],
  "tags": ["developer", "view"]
}
```

### Custom Data

```json
{
  "manifest": {
    "url": "http://localhost:8080/common/views/frame/index.html",
    "customData": {
      "frame": {
        "url": "http://localhost:8080/common/views/frame/example-content/example.html",
        "title": "Example Frame"
      }
    }
  },
  "manifestType": "inline-view"
}
```

Through customData you can specify the url the iframe should load and the default title you want to assign to the view.

### API Settings

```json
{
  "manifest": {
    "url": "http://localhost:8080/common/views/frame/index.html",
    "api": {
      "iframe": {
        "crossOriginInjection": false,
        "sameOriginInjection": false
      }
    }
  },
  "manifestType": "inline-view"
}
```

In this snippet we are using the view options to specify whether the fdc3 api should be injected into the iframe and what rules there are for that. If the API is disabled and you would still like to have the View Title updating and an example of a basic fdc3 api then we show that the iframed content could load a script to support communication between the framed content and the parent using postMessage.

### Preload

```json
{
  "manifest": {
    "url": "http://localhost:8080/common/views/frame/index.html",
    "preloadScripts": [
      {
        "url": "http://localhost:8080/common/views/frame/preload.js"
      }
    ]
  },
  "manifestType": "inline-view"
}
```

The preload script uses Mutation Observers and postMessage to ensure that the View title is updated as the iframed content's title is updated.
