const fs = require('fs');
const { join } = require('path');
const config = require('./getConfig')();

module.exports = function buildTestList(tests) {
    fs.writeFileSync(
        join(process.cwd(), config.listPath),
        JSON.stringify(tests.map(t => t.path), null, 2)
    );
}
