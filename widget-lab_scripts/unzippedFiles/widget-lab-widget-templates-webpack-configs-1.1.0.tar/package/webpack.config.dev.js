const confFile = `${process.env.INIT_CWD}/widget-config.js`;
const { merge } = require("webpack-merge");
const common = require("./webpack.config.common.js");
const { webpackDevOptions, urls, devVariables } = require(confFile);
const { DefinePlugin } = require("webpack");

// use default public value ?
if (!urls.public) urls.public = urls.local;

const locUrl = new URL(urls.local);
const pubUrl = new URL(urls.public);
let port = locUrl.port;
if (!port) port = locUrl.protocol === "https:" ? 443 : 80;

module.exports = merge(
    common,
    {
        mode: "development",
        devtool: "inline-source-map",
        devServer: {
            contentBase: "./dist",
            hot: true,
            compress: true,
            // allow to be called from any host
            disableHostCheck: true,
            // to prevent CORS issues
            headers: { "Access-Control-Allow-Origin": "*" },
            writeToDisk: true,

            // these options are computed from localUrl and publicUrl global parameters
            port,
            host: locUrl.hostname,
            public: pubUrl.href,
            sockPath: locUrl.pathname + "sockjs-node"
        },
        output: {
            // these options are computed from localUrl and publicUrl global parameters
            publicPath: locUrl.pathname
        },
        plugins: [
            new DefinePlugin({
                "process.env.devVariables": JSON.stringify(devVariables || { vue: { useExternalDebugger: false } })
            })
        ]
    },
    webpackDevOptions
);
