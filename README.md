## <⚡> Azure Functions Bridge

A bridge to Nuxt-based apps works in Azure Functions.

> ⚠️ this is a beta version

- 🚀 Blazing fast
- 🦄 Built for fast prototype
- 🔥 Express behind the scenes

## How to install

```sh
npm install azure-functions-bridge
# or with yarn
yarn add azure-functions-bridge
```

## Usage

_your-function-file.js_
```javascript
const { Nuxt } = require('nuxt');

const AzureFunctionsBridge = require('azure-functions-bridge');
const config = require('./nuxt.config'); // your nuxt config file
const nuxt = new Nuxt(config);

const bridge = new AzureFunctionsBridge({ nuxt });

module.exports = async function(context) {
  const response = await bridge.launcher(context);
  return context.res = response;
};
```
