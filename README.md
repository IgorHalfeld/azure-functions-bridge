## <⚡> Azure Functions Bridge

A bridge to [Nuxt](https://nuxtjs.org/)-based apps works in Azure Functions.

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
const Bridge = require('azure-functions-bridge');

const config = require('./nuxt.config');
const nuxt = new Nuxt(config);

const bridge = new Bridge({
  nuxt,
  root: '/', // Root url
  fnName: 'NuxtApp', // Function name
});

module.exports = async function (context) {
  const response = await bridge.launcher(context);
  context.res = response;
};
```
