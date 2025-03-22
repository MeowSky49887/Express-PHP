#!/usr/bin/env node

const { exec } = require("child_process");
const path = require("path");

const phpPath = path.resolve(__dirname, "..", "bin", "php.exe");
const composerPath = path.resolve(__dirname, "..", "bin", "composer", "composer.phar");
const projectDir = require.main ? require.main.path : process.cwd()
const args = process.argv.slice(2).join(" ");

const command = `"${phpPath}" -c "${projectDir}" "${composerPath}" ${args}`;
console.log(`Executing: ${command}`);

exec(command, { cwd: projectDir, stdio: "inherit" }, (err, stdout, stderr) => {
    if (err) {
        console.error(`Error: ${err.message}`);
        return;
    }
    if (stderr) {
        console.error(`Error: ${stderr}`);
    }
    console.log(stdout);
});
