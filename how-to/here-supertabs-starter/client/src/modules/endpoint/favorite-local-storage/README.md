## Favorite Local Storage

If you are setting up favorite support because you want to build some custom modules to support it then the favorite provider needs a number of endpoints for saving, removing and getting favorite entries. There are interfaces that can be implemented in your module but to make things easier with have included a local storage example.

You can add this to the endpointProvider modules list:

```json
{
  "id": "favorite-local-storage",
  "icon": "http://localhost:8080/favicon.ico",
  "title": "Favorite Local Storage",
  "description": "Favorite Local Storage",
  "enabled": true,
  "url": "http://localhost:8080/js/modules/endpoint/favorite-local-storage.bundle.js",
  "data": {}
}
```

And then you could add the following endpoints to the endpoints array:

```json
[
  {
    "id": "favorite-list",
    "type": "module",
    "typeId": "favorite-local-storage",
    "options": {}
  },
  {
    "id": "favorite-get",
    "type": "module",
    "typeId": "favorite-local-storage",
    "options": {}
  },
  {
    "id": "favorite-set",
    "type": "module",
    "typeId": "favorite-local-storage",
    "options": {}
  },
  {
    "id": "favorite-remove",
    "type": "module",
    "typeId": "favorite-local-storage",
    "options": {}
  }
]
```

This will now be the endpoint that gets called when the favoriteClient is used from one of your modules (there can only be one set of endpoints with these ids).
