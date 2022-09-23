# A web component to toggle between two css classes via a button with an inline image

`<button is="fin-toggle-class"></button>`

This is a very basic webcomponent that lets you specify the following attributes:

- first-class - the name of the first class you want to toggle between (first class is used as the default) (default is theme-dark)
- second-class - the name of the second class you want to toggle between (default is theme-light)
- first-image - the path to an image you wish to show when the first class is applied (if no path is provided then an embedded svg of a sun is shown)
- second-image - the path to an image you wish to show when the second class is applied (if no path is provided then an embedded svg of a moon is shown)
- height - the default height applied against the image (default is 32px)
- width - the default width applied against the image (default is 32px)
- target - the element you wish to apply the css class to (default is the body element)
- sync - whether this view (where the webcomponent is placed) should react to changes to other windows which are also using this webcomponent (default is true so when one window is changed they all change. Set sync="false" if you want to isolate one from the others).

The web component saves the selection so that it is applied when any page using the component is launched or reloaded. It uses the uuid of the application as part of the key to store the selection unless sync="false" then it uses the uuid of the application and the name of the page it is on (in order to isolate itself but still remember the user's selection).

The type is a button to aid in accessibility.

## Example usage

```javascript
        <script src="/common/components/fin-toggle-class.js" defer></script>

        <button is="fin-toggle-class"></button>
```
