module.exports = {
    rules: {
        "no-unused-expressions": "off",
        "no-const-assign": "error",
        "no-this-before-super": "warn",
        "no-undef": "error",
        "no-unreachable": "warn",
        "no-unused-vars": "warn",
        "constructor-super": "warn",
        "valid-typeof": "warn",
        "comma-dangle": ["error", "never"],
        "no-console": [
            "warn",
            {
                allow: ["debug", "warn", "error", "trace", "table"]
            }
        ],
        eqeqeq: ["error", "always"],
        quotes: [2, "double"],
        "arrow-parens": ["error", "as-needed"],
        "object-shorthand": ["warn", "always", { avoidQuotes: false }],
        semi: ["error", "always"],
        "space-before-function-paren": "off",
        "space-before-blocks": "warn",
        "no-var": "warn",
        "prefer-arrow-callback": "error",
        "spaced-comment": "warn",
        camelcase: ["warn", { allow: ["__webpack_public_path__"] }],
        "no-magic-numbers": ["warn", { ignoreArrayIndexes: true, enforceConst: true, ignore: [-1, 0, 1, 2, 100] }]
    },
    plugins: ["json"]
};
