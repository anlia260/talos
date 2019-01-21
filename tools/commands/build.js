/**
 * Talos
 *
 * @license        Apache 2.0
 * @copyright  (c) 2017, anlia260
 * @author         FedAkax <https://github.com/anlia260/talos>
 */

import path from "path";
import fs from "fs";
import webpack from "webpack";
import glob from "glob";

import clean from "../utils/clean";
import copy from "../utils/copy";
import judge from "../utils/judge";
import makeEntry from "../utils/make-entry";
import structuring from "../utils/structuring";

import buildConfig from "../configs/prod/build";
import dllConfig from "../configs/prod/dll.config";
import entryConfig from "../configs/prod/entry";
import mv from "../utils/mv";
import * as prodWebpack from "../configs/prod/webpack";

/**
 * [调试参数：生产环境是否cache dll]
 * @type {[type]}
 */

const clearDllCache = process.argv.includes("dll");

/**
 * [调试参数：生产是否开启sourcemap]
 * @type {[type]}
 */
const isOpenSourceMap = process.argv.includes("smap");
const souremapReg = `${buildConfig.build.static}/*.map`;

let existDll = false;
async function bundle() {
    const webpackConfig = prodWebpack.pack(isOpenSourceMap);
    return new Promise((resolve, reject) => {
        webpack(webpackConfig).run((err, stats) => {
            if (err) {
                return reject(err);
            }

            console.log(stats.toString(webpackConfig.stats));

            return resolve();
        });
    });
}

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

const mvSourceMap = () => {
    return new Promise((resolve, reject) => {
        glob(souremapReg, { nodir: true }, function(err, files) {
            if (err) {
                reject(err);
            } else {
                files.forEach(item => {
                    let len = item.split("/").length;
                    let destPath =
                        buildConfig.build.sourcemap +
                        "/" +
                        item.split("/")[len - 1];
                    Promise.all(mv(item, destPath));
                });
            }
        });
    });
};

async function build() {
    try {
        await judge(clean, [
            [
                path.join(
                    buildConfig.build[clearDllCache ? "index" : "public"],
                    "*"
                )
            ]
        ]);

        await judge(structuring, [
            [buildConfig.build.static, buildConfig.build.sourcemap]
        ]);

        await judge(checkDll);

        await judge(copy, [buildConfig.source.debug, buildConfig.build.static]);

        if (!existDll) {
            await judge(dllBundle);
        }

        await judge(bundle);

        await judge(makeEntry, [
            buildConfig.source.entry,
            buildConfig.build.entry,
            entryConfig,
            buildConfig.build.asset,
            buildConfig.source.api
        ]);

        await judge(copy, [buildConfig.build.dll, buildConfig.build.static]);

        await judge(mvSourceMap);
    } catch (err) {
        console.error(err.stack);
    }
}

export default build;
