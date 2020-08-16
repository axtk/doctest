const getComments = require('./getComments');
const parseInlineTest = require('./parseInlineTest');
const { marker } = require('./getConfig')();

module.exports = function getInlineTests(code) {
    let comments = getComments(code);
    let tests = [];

    for (let comment of comments) {
        if (!comment.includes(marker))
            continue;

        let commentTests = comment
            .split(new RegExp(`^[ \\t]*${marker}(?:[ \\t]|$)`, 'm'));

        if (!comment.startsWith(marker))
            commentTests.shift();

        tests = tests.concat(commentTests);
    }

    return tests
        .filter(Boolean)
        .map(parseInlineTest);
};
