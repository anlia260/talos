import path from "path";
import webpack from "webpack";
import AssetsPlugin from "assets-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import buildConfig from "./build";
import webpackCommon from "../webpack.common";

export const pack = isOpenSourceMap => ({
    devtool: isOpenSourceMap ? "hidden-source-map" : "",
    target: "web",
    name: "client",
    entry: ["./client.jsx"],
    context: webpackCommon(buildConfig).context,
    output: {
        publicPath: buildConfig.build.pathPrefix,
        path: buildConfig.build.static,
        filename: "app.[chunkhash:6].js"
    },
    stats: webpackCommon(buildConfig).stats,
    resolve: webpackCommon(buildConfig).resolve,
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"production"',
                BROWSER: true
            }
        }),
        new webpack.DllReferencePlugin({
            context: buildConfig.source.root,
            manifest: require(buildConfig.build.manifest)
        }),
        new AssetsPlugin({
            path: path.dirname(buildConfig.build.asset),
            filename: path.basename(buildConfig.build.asset),
            processOutput: assets => {
                assets.main.dll =
                    buildConfig.build.pathPrefix +
                    require(buildConfig.build.manifest).name +
                    ".js";
                return JSON.stringify(assets.main);
            }
        }),
        new ExtractTextPlugin(
            path.basename(`${buildConfig.build.public}/main.css`)
        ),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false,
                unused: true,
                dead_code: true
            },
            mangle: {
                screw_ie8: true
            },
            output: {
                comments: false,
                screw_ie8: true
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            name: "images/[hash:8].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader: "svg-inline-loader"
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "less-loader"
                        }
                    ]
                })
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                include: [buildConfig.source.root],
                loader: "babel-loader",
                query: {
                    presets: [
                        [
                            "es2015",
                            {
                                modules: false,
                                loose: false
                            }
                        ],
                        "stage-2",
                        "react"
                    ],
                    plugins: [
                        "transform-decorators-legacy",
                        [
                            "import",
                            {
                                libraryName: "antd",
                                libraryDirectory: "lib",
                                style: false
                            }
                        ]
                    ]
                    // ignore: buildConfig.dllLib
                }
            }
        ]
    }
});
