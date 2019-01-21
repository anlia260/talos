/**
 * Talos
 *
 * @license        Apache 2.0
 * @copyright  (c) 2017, anlia260
 * @author         FedAkax <https://github.com/anlia260/talos>
 */

/**
 * @param time
 * @returns {string}
 */
function formatTime(time) {
    return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
}

/**
 * @param fn
 * @param args
 */
async function timekeeping(fn, args = []) {
    const startTime = new Date();

    console.log(`[${formatTime(startTime)}] Starting ${fn.name} ...`);

    await fn.apply(fn, args);

    const endTime = new Date();
    const elapsedMs = endTime.getTime() - startTime.getTime();

    console.log(
        `[${formatTime(endTime)}] Finished ${fn.name} after ${elapsedMs}ms`
    );
}

/**
 * @param fn
 * @param args
 */
async function judge(fn, args = []) {
    await timekeeping(fn, args);
}

export default judge;
