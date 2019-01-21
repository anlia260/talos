/**
 * Talos
 *
 * @license        Apache 2.0
 * @copyright  (c) 2017, anlia260
 * @author         FedAkax <https://github.com/anlia260/talos>
 */

import ncp from "ncp";

/**
 * @param src
 * @param dist
 */
export default function copy(src, dist) {
    return new Promise((resolve, reject) => {
        ncp(src, dist, err => {
            if (err) {
                reject(err);
            }

            resolve();
        });
    });
}
