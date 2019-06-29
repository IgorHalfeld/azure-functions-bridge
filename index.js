const axios = require('axios');
const express = require('express');
const path = require('path');

module.exports = class Bridge {
  constructor({ nuxt, root, fnName }) {
    this.root = root || '/';
    this.fnName = fnName;
    this.server = null;
    if (nuxt) {
      this.setServer(nuxt);
    }

    this.launcher = this.launcher.bind(this);
  }

  async setServer(nuxt) {
    nuxt.options.buildDir = path.join(process.cwd(), this.fnName, '.nuxt');
    nuxt.options.srcDir = path.join(process.cwd(), this.fnName);
    nuxt.options.build.publicPath = path.join(process.cwd(), this.fnName, '_nuxt');

    this.server = express();
    this.server.use(nuxt.render);

    try {
      this.address = await this.listen();    
    } catch (error) {
      throw error;
    }
  }

  listen() {
    if (!this.server) {
      throw new Error('Server has not been set!');
    }
    return new Promise((resolve, reject) => {
      this.server.listen(0, function listenCallback() {
        const address = this.address();
        if (!address) {
          reject(new Error('`server.addressess()` returned `null`'))
        }

        if (typeof address === 'string') {
          reject(new Error(
            `Unexpected string for \`server.address()\`: ${address}`
          ));
        }

        resolve(address);
      });
    }) 
  }

  launcher(context) {
    return new Promise(async resolve => {
      const { port } = this.address;
      const { path = this.root } = context.req;
      const uri = `http://127.0.0.1:${port}${path}`
      context.log(`* Calling route ${uri}`);
      const response = await axios.get(uri);
      
      delete response.headers.connection;
      delete response.headers.etag;
      delete response.headers['x-powered-by'];

      const azureFuncResult = {
        status: response.status || 200,
        headers: response.headers,
        body: response.data,
      };
      resolve(azureFuncResult);
    });
  }

}