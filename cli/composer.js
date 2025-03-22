#!/usr/bin/env node

const { exec } = require("child_process");
const path = require("path");

const phpPath = path.resolve(__dirname, "..", "bin", "php.exe");
const composerPath = path.resolve(__dirname, "..", "bin", "composer", "composer.phar");
const projectDir = require.main ? require.main.path : process.cwd()
const args = process.argv.slice(2).join(" ");

exec(`"${phpPath}" -c "${projectDir}" "${composerPath}" ${args}`, { cwd: projectDir, stdio: "inherit" });
