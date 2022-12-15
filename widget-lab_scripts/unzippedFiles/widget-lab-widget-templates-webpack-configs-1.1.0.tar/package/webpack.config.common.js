const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: ["/src/main.js"],
    output: {
        filename: "bundle.js",
        chunkFilename: "[contenthash].bundle.js",
        path: path.resolve(process.env.INIT_CWD, "./dist")
    },
    target: "web",
    module: {
        rules: [
            {
                test: /\.js$/,
                // keep widget-lab dependencies
                exclude: [new RegExp("node_modules\\" + path.sep + "(?!@widget-lab).*"), /src\/static/],
                use: {
                    loader: "babel-loader",
                    options: {
                        /* 
                        useBuiltIns add necessary polyfill using corejs 3 
                        "usage" and not "entry" else, core-js & runtime-genetators must be in entry point
                        */
                        presets: [["@babel/preset-env", { debug: false, useBuiltIns: "usage", corejs: 3 }]]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: "./src/index.html", to: "./index.html" },
                { from: "./src/static", to: "static", globOptions: { ignore: ["*.md"] } }
            ]
        })
    ]
};
