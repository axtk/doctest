const fs = require('fs');
const { join } = require('path');
const config = require('./src/getConfig')();

function cleanUp() {
    let listFile = join(process.cwd(), config.listPath);

    if (!fs.existsSync(listFile))
        return;

    let files = JSON.parse(fs.readFileSync(listFile).toString());
    for (let file of files)
        fs.existsSync(file) && fs.unlinkSync(file);

    fs.unlinkSync(listFile);
}

if (require.main === module)
    cleanUp();
else module.exports = cleanUp;
