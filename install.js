const fs = require('fs');
const fetch = require('node-fetch-commonjs');
const cheerio = require('cheerio');
const unzipper = require('unzipper');
const path = require('path');

const baseURL = 'https://windows.php.net/downloads/releases';
const downloadURL = 'https://windows.php.net';
const extractPath = path.join(__dirname, 'bin');

async function getLatestPHPURL() {
    try {
        const response = await fetch(baseURL);
        const html = await response.text();
        const $ = cheerio.load(html);

        const phpFiles = $('a')
            .map((_, el) => $(el).attr('href'))
            .get()
            .filter(link => link && link.match(/php-(\d+\.\d+\.\d+)-Win32-vs\d+-(x86|x64)\.zip$/));

        phpFiles.sort((a, b) => {
            const versionA = a.match(/php-(\d+\.\d+\.\d+)-Win32/)[1];
            const versionB = b.match(/php-(\d+\.\d+\.\d+)-Win32/)[1];
            return versionB.localeCompare(versionA, undefined, { numeric: true });
        });

        const latestFile = phpFiles.find(link => link.includes('-x86.zip'));

        return `${downloadURL}${latestFile}`;
    } catch (error) {
        console.error('Error fetching latest PHP version:', error);
    }
}

async function downloadLatestPHP() {
    try {
        const latestPHPURL = await getLatestPHPURL();

        const filePath = path.join(__dirname, latestPHPURL.split('/').pop());

        console.log(`Downloading: ${latestPHPURL}`);

        const response = await fetch(latestPHPURL);
        const buffer = await response.arrayBuffer();
        fs.writeFileSync(filePath, Buffer.from(buffer));

        console.log(`Download Completed: ${filePath}`);

        await extractPHP(filePath);
    } catch (error) {
        console.error('Error downloading latest PHP version:', error);
    }
}

async function extractPHP(zipFilePath) {
    try {
        console.log(`Extracting to: ${extractPath}`);

        if (!fs.existsSync(extractPath)) {
            fs.mkdirSync(extractPath, { recursive: true });
        }

        const directory = await unzipper.Open.file(zipFilePath);

        return await directory.extract({ path: extractPath });
    } catch (error) {
        console.error('Error extracting PHP:', error);
    }
}

downloadLatestPHP();
