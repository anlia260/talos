export default buildConfig => {
    return {
        context: buildConfig.source.root,
        resolve: {
            extensions: [
                ".json",
                ".js",
                ".jsx",
                ".es",
                ".es6",
                ".css",
                ".less"
            ],
            modules: ["node_modules", buildConfig.source.root],
            alias: {
                Container: "containers",
                Component: "components",
                Constant: "constant",
                Reducers: "redux/reducers",
                Actions: "redux/actions",
                Util: "util",
                "redux-model": "util/redux-model"
            }
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
        }
    };
};
