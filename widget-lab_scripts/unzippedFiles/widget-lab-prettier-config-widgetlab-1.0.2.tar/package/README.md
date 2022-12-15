# Prettier Config Widget Lab

This package aims to provide a common Prettier configuration for nodejs & widget projects.

## Installation

At the root of your project:

If you never installed one of the Widget Lab component, add our npm repository to your configuration:

```bash
npm config set @widget-lab:registry https://itgit.dsone.3ds.com/api/v4/packages/npm/
npm config set "//itgit.dsone.3ds.com/api/v4/packages/npm/:_authToken" "61qKzSxnrLqyeyBy1H-o"
```

Then

```bash
npm i @widget-lab/prettier-config-widgetlab -D
```

## Usage

Reference it in package.json using the prettier property:

```javascript
{
    "prettier": "@widget-lab/prettier-config-widgetlab"
}
```
