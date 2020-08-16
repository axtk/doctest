const glob = require('glob');
const buildTestFiles = require('./src/buildTestFiles');
const buildTestList = require('./src/buildTestList');

function build([source]) {
    if (!source)
        return console.error('Unspecified source argument');

    let tests = [];
    for (let file of glob.sync(source))
        tests = tests.concat(buildTestFiles(file));

    buildTestList(tests);
    return tests;
}

if (require.main === module)
    build(process.argv.slice(2));
else module.exports = build;
