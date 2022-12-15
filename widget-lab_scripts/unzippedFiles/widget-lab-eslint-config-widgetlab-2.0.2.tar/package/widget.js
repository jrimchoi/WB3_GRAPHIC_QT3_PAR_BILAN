module.exports = {
    env: {
        browser: true, // all browsers variables
        commonjs: true, // const a = require("./a")
        es2020: true // 2020 features such as dynamic import
    },
    extends: ["eslint:recommended", "prettier", "./common-rules"],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module"
    },
    rules: {},
    globals: {
        __webpack_public_path__: true,
        process: true
    }
};
