# Widget Templates Webpack Configs

Webpack configurations for Widget Lab widget templates & examples.

## Installation

At the root of your project:

If you never installed one of the Widget Lab component, add our npm repository to your configuration:

```bash
npm config set @widget-lab:registry https://itgit.dsone.3ds.com/api/v4/packages/npm/
npm config set "//itgit.dsone.3ds.com/api/v4/packages/npm/:_authToken" "61qKzSxnrLqyeyBy1H-o"
```

Then

```bash
npm i @widget-lab/widget-templates-webpack-configs core-js@^3 regenerator-runtime -D
```

## Usage

Example of usage in package.json:

```bash
"scripts": {
    "build": "webpack --config-name prod",
    "start": "webpack serve --config-name dev --open",
    "startS3": "webpack serve --config-name devS3",
}
```

Using such webpack.config.js:

```javascript
const devConf = require("@widget-lab/widget-templates-webpack-configs/webpack.config.dev");
const devS3Conf = require("@widget-lab/widget-templates-webpack-configs/webpack.config.dev-s3");
const prod = require("@widget-lab/widget-templates-webpack-configs/webpack.config.prod");

/**
 * use this object to override our settings
 */
const myConf = {};

module.exports = [
    { name: "dev", ...merge(devConf, myConf) },
    { name: "devS3", ...merge(devS3Conf, myConf) },
    { name: "prod", ...merge(prod, myConf) }
];
```
