const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { launch } = require("openfin-adapter");

module.exports = {
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "./out"),
        filename: "index.js",
    },
    plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
        rules: [{ test: /\.tsx?$/, loader: "ts-loader" }],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        compress: true,
        port: 9000,
        onAfterSetupMiddleware: async () => {
            launch({ manifestUrl: "http://localhost:9000/app.json" });
        },
    },
};
