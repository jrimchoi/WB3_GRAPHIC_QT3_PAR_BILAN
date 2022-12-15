const confFile = `${process.env.INIT_CWD}/widget-config.js`;
const { merge } = require("webpack-merge");
const commonDev = require("./webpack.config.dev.js");
const DevServerUploadToS3Plugin = require("@widget-lab/webpack-s3-hot-reload-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const { s3 } = require(confFile);

const plugins = [];
if (s3.useCompression) {
    plugins.push(new CompressionWebpackPlugin({ test: /\.js$/, algorithm: "gzip", deleteOriginalAssets: true }));
}

module.exports = merge(commonDev, {
    output: {
        // force to get bundle on S3 path
        publicPath: "/" + s3.params.Key + "/"
    },
    plugins: [
        ...plugins,
        new DevServerUploadToS3Plugin({
            // uses s3. see https://www.npmjs.com/package/@auth0/s3

            // any other options are passed to new AWS.S3()
            // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
            options: s3.options,
            // other options supported by putObject, except Body and ContentLength.
            // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
            params: s3.params,
            useCompression: s3.useCompression
        })
    ]
});
