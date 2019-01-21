/**
 * Talos
 *
 * @license        Apache 2.0
 * @copyright  (c) 2017, anlia260
 * @author         FedAkax <https://github.com/anlia260/talos>
 */

import fs from "fs";
import template from "lodash/template";

/**
 * @param templatePath
 * @param renderData
 */
function renderTemplate(templatePath, renderData) {
    const templateCompiler = template(fs.readFileSync(templatePath));

    return templateCompiler(renderData);
}

/**
 * @param templatePath
 * @param destEntry
 * @param entryConfig
 * @param assetPath
 * @param apiPath
 */
function makeEntry(...params) {
    const [templatePath, destEntry, entryConfig, assetPath] = params;
    const assetConfig = require(assetPath);

    let renderData = {
        title: entryConfig.title,
        description: entryConfig.description,
        styleUrl: assetConfig.css,
        scriptUrl: assetConfig.js,
        libScript: assetConfig.dll || ""
    };

    const html = renderTemplate(templatePath, renderData);
    fs.writeFileSync(destEntry, html);
}

export default makeEntry;
