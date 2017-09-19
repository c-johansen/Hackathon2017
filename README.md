# Webshop Components

Work in progress! Nothing is currently synced and a lot of the functionality might change behind-the-scenes.

## General Instructions

`npm install`

## Installing on a chain-site

`npm run build:chainsite`

This builds the modules and bundles them into `./dist/webshop-chainsite-app.bundle.js`. This file has to be copied somewhere in your script folder on the site. 

The components are built as React-Redux components using [react-habitat](https://www.npmjs.com/package/react-habitat), and is bundled with all needed dependencies.

### Configuration

To initialize the components you need to set a config object on `window` before the js-bundle is loaded on the page. All properties are required except `userToken` which only shall be present for logged in users.

```javascript
window._siteGlobalSettings = {
    "chainId": "1300",
    "environment": "development",
    "apiKey": "25QN05mfp4T4Z4LKF338mj5FoRgrx9Iy",
    "userToken": "Bearer e3119d11-12e4-47bb-8856-915de07577f1"
};
```

*WARNING: We probably shouldn't embed the apiKey in the source code, so don't go public with the components until we've found a solution for this.*

### Using the components

The components hook on to data-properties on html elements on the page:

#### AddToCart

    <div data-component="AddToCart" data-prop-product="{...}"></div>

`data-prop-product` is required and shall contain a JSON-formatted "minimal-product". See `./public/chainsite.html` for sample model and formatting.

#### Cart

    <div data-component="Cart"></div>

#### Checkout

    <div data-component="Checkout"></div>

#### CartSuggestions

    <div data-component="CartSuggestions"></div>

### Styling

The components currently come without any styling. All css-classes are prepended with `ws-*`. You might find the default MENY styling for the demo page in `./resources/sass/webshop-chainsite-app.scss`. 

### Running/debugging the components on a [demo page](http://localhost:3000/chainsite.html)

#### Add this to your launch.json and Start Debugging:

```javascript
{
    // Use IntelliSense to learn about possible Node.js debug attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "serverer",
            "program": "${workspaceRoot}/server.js",
            "env": {
                "PORT": "3030",
                "NODE_ENV": "local"
            }
        },
        {
            "type": "node",
            "request": "launch",
            "name": "serverer prod",
            "program": "${workspaceRoot}/server.js",
            "env": {
                "PORT": "3030",
                "NODE_ENV": "production"
            }
        }
    ]
}
```

#### `npm run run:chainsite`
