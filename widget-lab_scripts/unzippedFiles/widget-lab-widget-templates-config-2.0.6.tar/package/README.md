# Widget Template Config

This package aims to automatically create widget-config.js from the embedded configuration template.

## Installation

At the root of your project:

If you never installed one of the Widget Lab component, add our npm repository to your configuration:

```bash
npm config set @widget-lab:registry https://itgit.dsone.3ds.com/api/v4/packages/npm/
npm config set "//itgit.dsone.3ds.com/api/v4/packages/npm/:_authToken" "61qKzSxnrLqyeyBy1H-o"
```

Then

```bash
npm i @widget-lab/widget-templates-config -D
```

## Usage

The template's copy must be triggered after your widget package installation. Therefor, add the following to your `package.json` `script`:

```javascript
"scripts": {
    "postinstall": "node node_modules/@widget-lab/widget-templates-config/bin/copy-template.js",
}
```

Be carefull if you are running `npm install` as root (on docker image for example): for security reasons `postinstall` scripts are not executed. In order to prevent this behavior, run `npm install --unsafe-perm` instead.
