export default (buildConfig) => {
    return {
        context: buildConfig.source.root,
        resolve: {
            extensions: ['.json', '.js', '.jsx', '.es', '.es6', '.css', '.less'],
            modules: [
                'node_modules',
                buildConfig.source.root
            ],
            alias: {
                'Container': 'containers',
                'Component': 'components',
                'Constant': 'constant',
                'Reducers': 'redux/reducers',
                'Actions': 'redux/actions',
                'RComponent': 'routes',
                'Resource': 'resources',
                'Util': 'util',
            },
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
            cachedAssets: false,
        },
    };
};
