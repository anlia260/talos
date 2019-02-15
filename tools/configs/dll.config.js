import webpack from "webpack";
import devBuildConfig from "./dev/build";
import prodBuildConfig from "./prod/build";
const isDev = process.env.NODE_ENV === "start";
const buildConfig = isDev ? devBuildConfig : prodBuildConfig;
const dllConfig = {
    entry: {
        dll: buildConfig.dllLib
    },
    context: buildConfig.source.root,
    output: {
        publicPath: buildConfig.build.pathPrefix,
        path: buildConfig.build.dll,
        filename: isDev ? "[name].js" : "[name]_[chunkhash:6].js",
        library: isDev ? "[name]" : "[name]_[chunkhash:6]"
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
                NODE_ENV: isDev ? '"development"' : '"production"',
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
            name: isDev ? "[name]" : "[name]_[chunkhash:6]"
        })
    ]
}


/**
 * handle bundle dll's webpack config when evn is 'dev' or 'prod'
 * 
 *  */ 
if(isDev){
    dllConfig.devtool = "cheap-module-eval-source-map"
}

export default dllConfig;
