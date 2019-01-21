/**
 * Talos
 *
 * @license        Apache 2.0
 * @copyright  (c) 2017, anlia260
 * @author         FedAkax <https://github.com/anlia260/talos>
 */

import map from "lodash/fp/map";
import mkdirp from "mkdirp";

/**
 * @param dirPath
 * @returns {Promise}
 */
function mkdirpWithPromise(dirPath) {
    return new Promise((resolve, reject) => {
        mkdirp(dirPath, err => {
            if (err) {
                reject(err);
            }

            console.log(`Directory "${dirPath}" created.`);

            resolve();
        });
    });
}

/**
 * @param dirs
 */
export default function structuring(dirs) {
    return Promise.all(map(mkdirpWithPromise)(dirs));
}
