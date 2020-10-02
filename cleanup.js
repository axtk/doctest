const fs = require('fs');
const { join } = require('path');
const config = require('./src/getConfig')();

function cleanUp() {
    let dumpFile = join(process.cwd(), config.dumpPath);

    if (!fs.existsSync(dumpFile))
        return;

    let files = fs.readFileSync(dumpFile).toString().split(/\r?\n/);
    for (let file of files)
        file && fs.existsSync(file) && fs.unlinkSync(file);

    fs.unlinkSync(dumpFile);
}

if (require.main === module)
    cleanUp();
else module.exports = cleanUp;
