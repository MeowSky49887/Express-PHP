const { exec } = require("child_process");
const path = require("path");

const helperPath = path.resolve(__dirname, "helper.php");

module.exports = (filePath, options, callback) => {
    const phpFile = path.resolve(filePath);
    const data = JSON.stringify(options || {});

    exec(`php -d auto_prepend_file=${helperPath} ${phpFile} '${data}'`, (err, stdout) => {
        if (err) return callback(err);
        callback(null, stdout);
    });
};
