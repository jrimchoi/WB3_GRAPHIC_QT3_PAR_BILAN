module.exports = {
    arrowParens: "avoid",
    bracketSpacing: true,
    htmlWhitespaceSensitivity: "css",
    insertPragma: false,
    jsxBracketSameLine: true,
    jsxSingleQuote: false,
    printWidth: 160,
    proseWrap: "always",
    requirePragma: false,
    semi: true,
    singleQuote: false,
    tabWidth: 4,
    trailingComma: "none",
    useTabs: false,
    overrides: [
        {
            files: "*.json",
            options: {
                parser: "json"
            }
        },
        {
            files: "*.vue",
            options: {
                parser: "vue"
            }
        },
        {
            files: "*.js",
            options: {
                parser: "babel"
            }
        },
        {
            files: "*.md",
            options: {
                tabWidth: 4,
                printWidth: 500
            }
        }
    ]
};
