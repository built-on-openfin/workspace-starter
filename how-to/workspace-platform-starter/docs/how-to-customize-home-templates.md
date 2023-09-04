> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.

[<- Back to Table Of Contents](../README.md)

# How To Customize Home Templates ?

Home templates can easily be customized, see [Customize Search Results In Home](https://developers.openfin.co/of-docs/docs/customize-search-results-in-home).

To provide more consistency with the way search results are displayed we provide a few ready to use template fragments that will pick up the colors from your platforms palette.

The template helpers are in [templates.ts](../client/src/framework/templates.ts).

All of the methods are strongly typed with the CSS properties so it is easy to provide additional styling to the entries.

## createContainer

Uses CSS flex box to create either a row or column.

## createTitle

Used for create a strong title at the top of a template.

![Template Title](./assets/template-title.png)

## createText

Used for create a strong title at the top of a template.

![Template Text](./assets/template-text.png)

## createImage

Used for displaying an image in the template.

![Template Image](./assets/template-image.png)

## createButton

Used for adding a button to a template.

![Template Button](./assets/template-button.png)

## createLabelledValue

Used for displaying a label/value pair.

![Template Labelled Value](./assets/template-labelledvalue.png)

## createTable

Used for displaying a table of data.

![Template Table](./assets/template-table.png)

## createHelp

Used for creating a help entry result for when `?` query is used in Home

![Template Help](./assets/template-help.png)

## Source Reference

- [templates.ts](../client/src/framework/templates.ts)
- [home.ts](../client/src/framework/workspace/home.ts)

[<- Back to Table Of Contents](../README.md)
