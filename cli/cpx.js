#!/usr/bin/env node

const { exec } = require("child_process");
const path = require("path");

const phpPath = path.resolve(__dirname, "..", "bin", "php.exe");
const cpxPath = path.resolve(__dirname, "..", "bin", "composer", "vendor", "bin", "cpx");
const workDir = process.cwd();
const args = process.argv.slice(2).join(" ");
args = args.replace(/^\[|\]$/g, ""); // Remove leading/trailing brackets

const command = `"${phpPath}" -c "${workDir}" "${cpxPath}" ${args}`;
console.log(`Executing: ${command}`);

exec(command, { cwd: workDir, stdio: "inherit" }, (err, stdout, stderr) => {
    if (err) {
        console.error(`Error: ${err.message}`);
        return;
    }
    if (stderr) {
        console.error(`Error: ${stderr}`);
    }
    console.log(stdout);
});
