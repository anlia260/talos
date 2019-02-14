import webpack from "webpack";
import buildConfig from "./build";
export default {
    devtool: "cheap-module-eval-source-map",
    entry: {
        dll: buildConfig.dllLib
    },
    context: buildConfig.source.root,
    output: {
        publicPath: buildConfig.build.pathPrefix,
        path: buildConfig.build.dll,
        filename: "[name].js",
        library: "[name]"
    },
    stats: {
        colors: true,
        reasons: true,
        hash: false,
        version: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        cached: false,
        cachedAssets: false
    },
    
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
                BROWSER: true
            }
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true,
                warnings: false
            }
        }),

        new webpack.DllPlugin({
            path: buildConfig.build.manifest,
            name: "[name]"
        })
    ]
};
