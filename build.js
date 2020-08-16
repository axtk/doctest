const glob = require('glob');
const buildTestFiles = require('./src/buildTestFiles');
const buildTestList = require('./src/buildTestList');
const config = require('./src/getConfig')();

function build(options) {
    if (Array.isArray(options))
        options = options[0] ? { target: options[0] } : null;

    let { target, lookupOptions } = { ...config, ...options };
    let tests = [];

    for (let file of glob.sync(target, lookupOptions))
        tests = tests.concat(buildTestFiles(file));

    buildTestList(tests);
    return tests;
}

if (require.main === module)
    build(process.argv.slice(2));
else module.exports = build;
