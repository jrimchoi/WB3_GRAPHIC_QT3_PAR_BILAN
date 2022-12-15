module.exports = {
    env: {
        node: true,
        es6: true
    },
    extends: ["./common-rules"],
    parserOptions: {
        // 2018 to override es6. Not above due to node 12 on docker images
        ecmaVersion: 2018,
        sourceType: "script"
    }
};
