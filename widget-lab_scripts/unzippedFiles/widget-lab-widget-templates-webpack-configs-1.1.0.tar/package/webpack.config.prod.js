const { merge } = require("webpack-merge");
const common = require("./webpack.config.common.js");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    plugins: [new ESLintPlugin({ extensions: ["js", "vue"] })],
    performance: {
        maxAssetSize: 1000000
    }
});
