const fs = require("fs");
const os = require("os");
const { exec } = require("child_process");
const path = require("path");

const helperPath = path.resolve(__dirname, "helper.php");
const phpPath = path.resolve(__dirname, "bin", "php.exe");
const projectDir = require.main.path;

module.exports = (filePath, options, callback) => {
    const phpFile = path.resolve(filePath);
    delete options["settings"];
    delete options["_locals"];
    delete options["cache"];

    const tmpFile = path.join(os.tmpdir(), `php_options_${Date.now()}.json`);
    fs.writeFileSync(tmpFile, JSON.stringify(options || {}));

    exec(`"${phpPath}" -c "${projectDir}" -d auto_prepend_file="${helperPath}" "${phpFile}" "${tmpFile}"`, (err, stdout) => {
        if (err) return callback(err);
        callback(null, stdout);
    });
};
