const fs = require('fs');
const { join, parse } = require('path');
const getInlineTests = require('./getInlineTests');
const buildTestContent = require('./buildTestContent');

module.exports = function buildTestFiles(modulePath) {
    if (fs.lstatSync(modulePath).isDirectory())
        return [];

    let { dir, name, ext } = parse(modulePath);

    if (/-\d+\.test$/.test(name))
        return [];

    let moduleContent = fs.readFileSync(modulePath).toString();
    let tests = getInlineTests(moduleContent);

    if (tests.length === 0)
        return tests;

    let counterLength = Math.max(String(tests.length).length, 3);
    let leadingZeros = new Array(counterLength).fill('0').join('');

    for (let i = 0; i < tests.length; i++) {
        let counter = (leadingZeros + (i + 1)).slice(-counterLength);
        let id = name + '-' + counter + '.test';

        tests[i] = {
            id,
            counter,
            path: join(dir, id + ext),
            moduleName: name + ext,
            modulePath,
            moduleContent,
            ...tests[i]
        };

        fs.writeFileSync(tests[i].path, buildTestContent(tests[i]));
    }

    return tests;
};
