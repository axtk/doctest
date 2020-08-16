const fs = require('fs');
const { join, parse } = require('path');
const getInlineTests = require('./getInlineTests');
const buildTestContent = require('./buildTestContent');

module.exports = function buildTestFiles(moduleFile) {
    let { dir, name, ext } = parse(moduleFile);

    if (/-\d+\.test$/.test(name))
        return [];

    let moduleContent = fs.readFileSync(moduleFile).toString();
    let tests = getInlineTests(moduleContent);

    if (tests.length === 0)
        return tests;

    let suffixLength = Math.max(Math.ceil(Math.log10(tests.length)), 3);
    let leadingZeros = new Array(suffixLength).fill('0').join('');

    for (let i = 0; i < tests.length; i++) {
        let suffix = (leadingZeros + (i + 1)).slice(-suffixLength);
        let id = name + '-' + suffix + '.test';

        tests[i] = {
            id,
            path: join(dir, id + ext),
            moduleContent,
            ...tests[i]
        };

        if (!tests[i].title)
            tests[i].title = `#${suffix} ${name + ext}`;

        fs.writeFileSync(tests[i].path, buildTestContent(tests[i]));
    }

    return tests;
};
