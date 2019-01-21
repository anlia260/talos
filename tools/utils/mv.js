var fs = require("fs");

export default function mv(sourceFile, destPath) {
    return new Promise((resolve, reject) => {
        fs.rename(sourceFile, destPath, function(err) {
            if (err) {
                reject(err);
            }

            fs.stat(destPath, function(err, stats) {
                if (err) {
                    reject(err);
                }
                resolve("stats: " + JSON.stringify(stats));
            });
        });
    });
}
