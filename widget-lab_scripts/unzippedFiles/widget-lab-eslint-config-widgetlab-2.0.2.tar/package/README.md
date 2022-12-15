# ESLint Config Widget Lab

This package aims to provide a common eslint configuration for nodejs & widget projects.

## Installation

At the root of your project:

If you never installed one of the Widget Lab component, add our npm repository to your configuration:

```bash
npm config set @widget-lab:registry https://itgit.dsone.3ds.com/api/v4/packages/npm/
npm config set "//itgit.dsone.3ds.com/api/v4/packages/npm/:_authToken" "61qKzSxnrLqyeyBy1H-o"
```

Then

```bash
npm i @widget-lab/eslint-config-widgetlab -D
```

## Available configurations

`widget` for common widgets,  
`widget-vue` for widgets that include Vue library,  
`widget-vue3` for widgets that include Vue 3 library,  
`nodejs` for nodeJS projects.

## Usage

In your eslint configuration file:

```javascript
{
    "extends": "@widget-lab/eslint-config-widgetlab/__CONFIGURATION__"
}
```

Please replace `__CONFIGURATION__` by one of the above configuration.
