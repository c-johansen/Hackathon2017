const path = require("path")
const webpack = require("webpack")
const appPackage = require("./package.json")

module.exports = function (env) {
    const nodeEnv = env && env.NODE_ENV || "development" // --env.NODE_ENV=environment

    // Plugins

    let plugins = [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(nodeEnv),
                PLATFORM: JSON.stringify("chainsite"),
                LAST_BUILD: JSON.stringify(new Date().toISOString()),
                APP_VERSION: JSON.stringify(appPackage.version),
            }
        }),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /nb/),
        new webpack.NamedModulesPlugin()
        /*
        new webpack.optimize.CommonsChunkPlugin({
            name: "webshop-chainsite-vendor",
            chunks: ["webshop-chainsite-vendor"]
        })
        */
    ]

    if (nodeEnv === "production") {
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    screw_ie8: true,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true,
                },
                output: {
                    comments: false,
                }
            }),
            new webpack.optimize.AggressiveMergingPlugin()
        )
    }

    let babelLoaderIncludes = [path.resolve(__dirname, "src")]
    if (nodeEnv === "production") {
        // "node_modules/@ng-mw" must be included to be able to uglify arrow functions
        babelLoaderIncludes.push(path.resolve(__dirname, "node_modules/@ng-mw"))
        babelLoaderIncludes.push(path.resolve(__dirname, "node_modules/sort-array"))
    }

    return {
        context: path.resolve(__dirname, "src"),
        entry: {
            "webshop-chainsite-app": "./chainsite/app.js"
            //"webshop-chainsite-vendor": ["react", "react-dom"]
        },
        output: {
            path: path.resolve(__dirname, nodeEnv === "production" ? "dist" : "public/js"),
            filename: nodeEnv === "production" ? "[name].bundle.js" : "[name].js",
            chunkFilename: "[id].js"
        },
        devtool: nodeEnv === "production" ? false : "source-map",
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: babelLoaderIncludes,
                    use: [
                        {
                            loader: "babel-loader"
                        }
                    ]
                }
            ]
        },
        resolve: {
            modules: [
                path.resolve("./src"),
                path.resolve("./node_modules")
            ]
        },
        plugins
    }
}
