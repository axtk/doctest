const fs = require('fs');
const { join } = require('path');
const { EOL } = require('os');
const config = require('./getConfig')();

module.exports = function buildTestList(tests) {
    fs.writeFileSync(
        join(process.cwd(), config.dumpPath),
        tests.map(t => t.path).join(EOL)
    );
}
