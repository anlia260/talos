/**
 * Talos
 *
 * @license        Apache 2.0
 * @copyright  (c) 2017, anlia260
 * @author         FedAkax <https://github.com/anlia260/talos>
 */

import path from "path";
import judge from "./utils/judge";

const scriptDir = path.join(__dirname, "", "commands");
/**
 * @param scriptName
 */

function invokeScript(scriptName) {
    const scriptPath = path.join(scriptDir, scriptName);
    process.env.NODE_ENV = scriptName;
    const task = require(scriptPath).default;

    judge(task);
}

/**
 * @param filename
 * @returns {boolean}
 */
function isMainModuleFile(filename) {
    return process.mainModule.filename === filename;
}

/**
 * @param expect
 * @returns {boolean}
 */
function isProcessArgumentNumMoreThan(expect) {
    return process.argv.length > expect;
}

if (isMainModuleFile(__filename) && isProcessArgumentNumMoreThan(2)) {
    try {
        invokeScript(process.argv[2]);
    } catch (err) {
        console.error(err.stack);
    }
} else {
    throw new Error("This script can only be running in CLI");
}
