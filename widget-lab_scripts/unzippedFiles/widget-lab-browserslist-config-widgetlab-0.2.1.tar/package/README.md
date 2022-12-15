# Browsers List Config Widget Lab

This package aims to provide a common Browserslist configuration for widget projects. It is used by babel (and babel-loader via webpack) to determine what to transpile and which polyfill to use.

We tend to support browsers matching the following query: `safari >= 13, opera >= 62, firefox >= 68, edge >= 79, chrome >= 74`.

See https://github.com/browserslist/browserslist.

## Installation

At the root of your project:

If you never installed one of the Widget Lab component, add our npm repository to your configuration:

```bash
npm config set @widget-lab:registry https://itgit.dsone.3ds.com/api/v4/packages/npm/
npm config set "//itgit.dsone.3ds.com/api/v4/packages/npm/:_authToken" "61qKzSxnrLqyeyBy1H-o"
```

Then

```bash
npm i @widget-lab/browserslist-config-widgetlab -D
```

## Usage

Reference it in package.json using the browserslist property:

```javascript
{
    "browserslist": ["extends @widget-lab/browserslist-config-widgetlab"]
}
```
