# Framed App

This is an example app that shows how to load a piece of content via an iframe and control whether or not they get the fin API.

If the fin api is injected then you can use the fin api or the full fdc3 api.

If the fin api is available (the fdc3 api will also be available if it is available to the view) then the preload script specified in the apps.json file ([framed.preload.js](./framed/framed.preload.js)) will be included and this adds logic that monitors the iframe's title and updates the views's title so that the content tab reflects the iframed content and not the view. It also loads logic to initialize the frame's interop broker connection and establish a way of staying in sync with the view when it joins a system/user channel (e.g. green) or leaves the context group.

If the fin api is disabled (and therefore the fdc3 api) for the iframed content then we have an example.html page that loads a script ["framed.js"](./framed/framed.js) that enables the title monitoring and provides a basic fdc3 API that supports broadcasting on system/user channels or adding a context listener.

This is just an example of how you can use the OpenFin APIs, browser APIs (postMessage) and OpenFin settings.

## Framed Content

A lot of sites do not allow their content to be contained within an iframe unless it comes from the same origin. Please keep that in mind when trying different urls in the settings of this app.

## Example App Entries in apps.json

```json
{
  "appId": "openfin-frame",
  "name": "openfin-frame",
  "title": "Framed App",
  "description": "An example of framing an application, injecting the fin and fdc3 apis and wiring up context group assignment and title updates.",
  "manifest": {
   "url": "http://localhost:8080/common/views/frame/index.html",
   "customData": {
    "frame": {
     "url": "http://localhost:8080/common/views/frame/example-content/example.html",
     "title": "Example Frame",
     "sandbox": "allow-forms allow-same-origin allow-scripts"
    }
   },
   "api": {
    "iframe": {
     "crossOriginInjection": true,
     "sameOriginInjection": true
    }
   },
   "fdc3InteropApi": "2.0",
   "preloadScripts": [
    {
     "url": "http://localhost:8080/common/views/frame/framed/framed.preload.js"
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
 },
 {
  "appId": "openfin-frame-no-api",
  "name": "openfin-frame-no-api",
  "title": "Framed App (No API Injection)",
  "description": "An example of framing an application, not injecting APIs but using a script loaded by the parent and the child and browser APIs (Postmessage) to sync title changes and provide a basic fdc3 api.",
  "manifest": {
   "url": "http://localhost:8080/common/views/frame/index.html",
   "customData": {
    "frame": {
     "url": "http://localhost:8080/common/views/frame/example-content/example.html",
     "title": "Example Frame (No API Injection)",
     "sandbox": "allow-forms allow-same-origin allow-scripts"
    }
   },
   "api": {
    "iframe": {
     "crossOriginInjection": false,
     "sameOriginInjection": false
    }
   },
   "preloadScripts": [
    {
     "url": "http://localhost:8080/common/views/frame/framed/framed.preload.js"
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
        "title": "Example Frame",
        "sandbox": "allow-forms allow-same-origin allow-scripts"
      }
    }
  },
  "manifestType": "inline-view"
}
```

Through customData you can specify:

- url: the url the iframe should load and the default title you want to assign to the view.
- title: the initial title that should be assigned to the view/tab on load
- sandbox: Restrictions you wish to put on the framed content. If you don't want it sandboxed then remove the sandbox setting from custom data. If you want the most restrictive sandbox then set it to an empty string. Otherwise set the permissions you wish to give the framed content ([sandboxed iframes](https://web.dev/sandboxed-iframes/)).

In the example above we have provided the following defaults:

- The framed content can submit a form
- The framed content can access same origin data (e.g. cookies, localstorage etc)
- The framed content can execute JavaScript

The framed content cannot:

- Open new windows (so it can't open a new window and have access to the fin API if you don't want to as you specified that restriction to the frame)
- Navigate the parent (top) to a different url (so it could load itself into the parent view).

This is just an example to show how you could use iframes in an OpenFin Platform, please read the ([sandboxed iframes](https://web.dev/sandboxed-iframes/)) post and read around if you want to know more about iframes and sandboxing.

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
        "url": "http://localhost:8080/common/views/frame/framed/framed.preload.js"
      }
    ]
  },
  "manifestType": "inline-view"
}
```

The preload script uses Mutation Observers and postMessage to ensure that the View title is updated as the iframed content's title is updated and it stay's in sync with the context group the parent view has been assigned to.

![Example of a Framed App](framed-app-example.gif)
