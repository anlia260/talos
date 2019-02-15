/**
 * Talo
 *
 * @license        Apache 2.0
 * @copyright  (c) 2017, anlia260
 * @author         FedAkax <https://github.com/anlia260/talos>
 */

import path from "path";
import fs from "fs";
import WebpackDevServer from "webpack-dev-server";
import webpackHotMiddleware from "webpack-hot-middleware";

import webpack from "webpack";
import BrowserSync from "browser-sync";
import once from "lodash/fp/once";

import clean from "../utils/clean";
import judge from "../utils/judge";
import makeEntry from "../utils/make-entry";
import structuring from "../utils/structuring";

import dllConfig from "../configs/dll.config";
import buildConfig from "../configs/dev/build";

import {
    networkConfig,
    devServerConfig,
    browserSyncConfig
} from "../configs/dev/service";

import entryConfig from "../configs/dev/entry";

const bs = BrowserSync.create();
let compiler, existDll = false;

/**
 * @returns {Promise}
 */
function startDevServer() {
    const webpackConfig = require("../configs/dev/webpack").default;
    compiler = webpack(webpackConfig);

    return new Promise((resolve, reject) => {
        compiler.plugin(
            "done",
            once(stats => {
                console.log("Webpack finished compiling.");
                resolve();
            })
        );

        /**
         * @param err
         * @param result
         */
        const onStarted = (err, result) => {
            if (err) {
                reject(err);
            }

            console.log(
                `Listening at http://${networkConfig.devServer.host}:${
                    networkConfig.devServer.port
                }/`
            );
            console.log("Waiting for Webpack to finish compiling...");
        };
        const server = new WebpackDevServer(
            compiler,
            devServerConfig.webpackDev
        );

        server.use(webpackHotMiddleware(compiler));
        server.listen(
            networkConfig.devServer.port,
            networkConfig.devServer.host,
            onStarted
        );
    });
}

/**
 *
 * @returns {Promise}
 */
function startBrowserSync() {
    return new Promise(resolve => {
        bs.init(browserSyncConfig.initConfig, () => {
            resolve();
        });
    });
}

//打包dll
const dllBundle = () => {
    return new Promise((resolve, reject) => {
        webpack(dllConfig).run((err, stats) => {
            if (err) {
                return reject(err);
            }

            console.log(stats.toString(dllConfig.stats));

            return resolve();
        });
    });
};

const checkDll = () => {
    return new Promise((resolve, reject) => {
        fs.exists(buildConfig.build.dll, exists => {
            console.log(exists ? "dll existed..." : "bundle dll...");
            existDll = exists;
            return resolve();
        });
    });
};

async function start() {
    let clearPath = [path.join(buildConfig.build.public, "*")];


    try {
        await judge(checkDll);

        if (existDll) {
            clearPath.push("!" + path.join(buildConfig.build.dll));
        }

        await judge(clean, [clearPath]);

        await judge(structuring, [[buildConfig.build.public]]);

        if (!existDll) {
            await judge(dllBundle);
        }

        await judge(startDevServer);

        await judge(makeEntry, [
            buildConfig.source.entry,
            buildConfig.build.entry,
            entryConfig,
            buildConfig.build.asset
        ]);

        await judge(startBrowserSync);

        compiler.plugin("done", function(stats) {
            bs.reload("*.css");
        });
    } catch (err) {
        console.error(err.stack);
    }
}

export default start;
