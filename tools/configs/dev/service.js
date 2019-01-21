import buildConfig from "./build";

const networkConfig = {
    browserSync: {
        port: {
            main: 4001,
            ui: 4002
        }
    },
    devServer: {
        host: "localhost",
        port: 4000
    }
};

const devServerConfig = {
    host: networkConfig.devServer.host,
    port: networkConfig.devServer.port,
    webpackDev: {
        contentBase: buildConfig.build.public,
        publicPath: buildConfig.build.pathPrefix,
        compress: true,
        clientLogLevel: "none",
        noInfo: true,
        hot: true,
        historyApiFallback: false,
        watchOptions: {
            aggregateTimeout: 300,
            ignored: /node_modules/,
            poll: 100
        },
        proxy: {
            "/api": {
                target: "http://youtop-dsp.local",
                // target: 'http://platform.youtop.auto',
                // target: 'http://platform.youtop.test',
                changeOrigin: true
            },
            "/service": {
                target: "http://youtop-dsp.local",
                // target: 'http://platform.youtop.auto',
                // target: 'http://platform.youtop.test',
                changeOrigin: true
            }
        },
        stats: {
            colors: true
        }
    }
};
const browserSyncConfig = {
    initConfig: {
        port: networkConfig.browserSync.port.main,
        notify: true,
        ui: {
            port: networkConfig.browserSync.port.ui
        },
        proxy: {
            target:
                networkConfig.devServer.host +
                ":" +
                networkConfig.devServer.port
        },
        ghostMode: false
    }
};
export { networkConfig, devServerConfig, browserSyncConfig };
