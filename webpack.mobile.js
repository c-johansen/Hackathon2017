const path = require("path")
const webpack = require("webpack")
const appPackage = require("./package.json")

module.exports = function (env) {
    const nodeEnv = env && env.NODE_ENV || "development" // --env.NODE_ENV=environment
    const target = env && env.DEST

    // Plugins

    let plugins = [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(nodeEnv),
                PLATFORM: JSON.stringify("mobile"),
                LAST_BUILD: JSON.stringify(new Date().toISOString()),
                DEST: JSON.stringify(target),
                APP_VERSION: JSON.stringify(appPackage.version),
                API_KEY_DEV: JSON.stringify("25QN05mfp4T4Z4LKF338mj5FoRgrx9Iy"),
                API_KEY_PREPROD: JSON.stringify("N282BSubJ6n2o9c8Qc3Y"),
                API_KEY_PROD: JSON.stringify("Cs1T5N8XBg5HUvcfGy56"),
                CHAIN_ID: 1300
            }
        }),
        new webpack.NamedModulesPlugin()
    ]

    if (nodeEnv === "production") {
        plugins.push(
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
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
            })
        )
    }

    let babelLoaderIncludes = [path.resolve(__dirname, "src")]
    if (nodeEnv === "production") {
        // "node_modules/@ng-mw" must be included to be able to uglify arrow functions
        babelLoaderIncludes.push(path.resolve(__dirname, "node_modules/@ng-mw"))
        babelLoaderIncludes.push(path.resolve(__dirname, "node_modules/sort-array"))
    }

    let outputPath = env && env.DEST === "native" ? path.resolve(__dirname, "..", "react-native-meny-app/assets/js") : path.resolve(__dirname, "public/js")

    return {
        context: path.resolve(__dirname, "src"),
        entry: {
            "webshop-mobile-app": "./mobile/app.js"
        },
        output: {
            path: outputPath,
            filename: "[name].js",
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
