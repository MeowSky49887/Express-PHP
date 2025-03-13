const { exec } = require("child_process");
const path = require("path");

const helperPath = path.resolve(__dirname, "helper.php");
const phpPath = path.resolve(__dirname, "bin", "php.exe");

module.exports = (filePath, options, callback) => {
    const phpFile = path.resolve(filePath);
    delete options["settings"];
    delete options["_locals"];
    delete options["cache"];
    const data = Buffer.from(JSON.stringify(options || {})).toString("base64");

    exec(`"${phpPath}" -d auto_prepend_file="${helperPath}" "${phpFile}" "${data}"`, (err, stdout) => {
        if (err) return callback(err);
        callback(null, stdout);
    });
};
