import path from "path";
import webpack from "webpack";
import AssetsPlugin from "assets-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import buildConfig from "./build";
import webpackCommon from "../webpack.common";
import { networkConfig } from "./service";

export default {
    devtool: "cheap-module-eval-source-map",

    entry: [
        "webpack-hot-middleware/client",
        `webpack-dev-server/client?http://${networkConfig.devServer.host}:${
            networkConfig.devServer.port
        }`,
        "./client.jsx"
    ],

    context: webpackCommon(buildConfig).context,

    output: {
        publicPath: buildConfig.build.pathPrefix,
        path: buildConfig.build.dest.root,
        filename: "app.js"
    },
    cache: true,
    stats: webpackCommon(buildConfig).stats,
    resolve: webpackCommon(buildConfig).resolve,
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: true,
            "process.env": {
                NODE_ENV: '"development"',
                BROWSER: true
            }
        }),

        new webpack.DllReferencePlugin({
            context: buildConfig.source.root,
            manifest: require(buildConfig.build.manifest)
        }),

        new AssetsPlugin({
            prettyPrint: true,
            path: path.dirname(buildConfig.build.asset),
            filename: path.basename(buildConfig.build.asset),
            processOutput: assets => {
                assets.main.dll = "dll/dll.js";
                return JSON.stringify(assets.main);
            }
        }),

        new webpack.NamedModulesPlugin(),

        new ExtractTextPlugin(path.basename(buildConfig.build.style)),

        new webpack.HotModuleReplacementPlugin(),

        new webpack.NoEmitOnErrorsPlugin()
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
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "less-loader",
                            options: {
                                sourceMap: true
                            }
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
                        "stage-0",
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
                }
            }
        ]
    }
};
