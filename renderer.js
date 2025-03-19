const fs = require("fs");
const os = require("os");
const { exec } = require("child_process");
const path = require("path");

module.exports = (filePath, options, callback) => {
    const phpFile = path.resolve(filePath);
    delete options["settings"];
    delete options["_locals"];
    delete options["cache"];

    const tmpFile = path.join(os.tmpdir(), `php_options_${Date.now()}.json`);
    fs.writeFileSync(tmpFile, JSON.stringify(options || {}));

    exec(`"${phpPath}" -d auto_prepend_file="${helperPath}" "${phpFile}" "${tmpFile}"`, (err, stdout) => {
        if (err) return callback(err);
        callback(null, stdout);
    });
};
