const fs = require('fs');
const { join, parse } = require('path');
const glob = require('glob');
const { EOL } = require('os');

const INLINE_TEST_MARKER = '@test';
const TAB_SPACE = '    ';

function getComments(s) {
    let lines = s.split(/\r?\n/), comments = [];
    let buf = [], k0, k1, marker;

    for (let ln of lines) {
        k0 = ln.indexOf('/*');
        k1 = ln.indexOf('*/', k0 === -1 ? 0 : k0 + 2);

        if (k0 !== -1) {
            let s = ln.slice(k0, k1 === -1 ? ln.length : k1).replace(/^\/\*+/, '').trim();
            if (s) buf.push(s);
            marker = '/*';
        }
        else if (marker === '/*') {
            if (k1 === -1)
                buf.push(ln.replace(/^\s*\*+\s?/, ''));
            else {
                let s = ln.slice(0, k1).replace(/^\s*\*+\s?/, '').trim();
                if (s) buf.push(s);
                comments.push(buf.join(EOL));
                buf = [];
                marker = null;
            }
        }
        else {
            k0 = ln.indexOf('//');

            if (k0 !== -1) {
                buf.push(ln.slice(k0).replace(/^\/\/+/, '').trim());
                marker = '//';
            }
            else if (marker === '//') {
                comments.push(buf.join(EOL));
                buf = [];
                marker = null;
            }
        }
    }

    if (buf.length)
        comments.push(buf.join(EOL));

    return comments;
}

function parseInlineTest(s) {
    s = s.replace(/\s+$/, '');

    let lines = s.split(/\r?\n/);
    let body, title, imports, content = '';

    if (lines.length === 1)
        body = s;
    else {
        title = lines.shift().trim();
        body = lines.join(EOL);

        let [importLines, otherLines] = lines.reduce((acc, ln) => {
            if (/^\s*import\b/.test(ln))
                acc[0].push(ln);
            else if (ln.trim() || acc[1].length)
                acc[1].push(ln);
            return acc;
        }, [[], []]);

        imports = importLines.join(EOL);
        body = otherLines.join(EOL);
    }

    return {
        title,
        body,
        imports
    };
}

function getInlineTests(comments) {
    let tests = [];

    for (let comment of comments) {
        if (!comment.includes(INLINE_TEST_MARKER))
            continue;

        let commentTests = comment.split(new RegExp(`^[ \\t]*${INLINE_TEST_MARKER}(?:[ \\t]|$)`, 'm'));

        if (!comment.startsWith(INLINE_TEST_MARKER))
            commentTests.shift();

        tests = tests.concat(commentTests);
    }

    return tests.filter(Boolean).map(parseInlineTest);
}

function getTestContent(data) {
    let { title, body, imports, name, id, originalContent } = data;
    let content = '';

    if (originalContent)
        content += originalContent + EOL + EOL;

    if (imports)
        content += imports + EOL + EOL;

    if (body)
        content += [
            `test('${title || name}', () => {`,
            body.split(/\r?\n/).map(ln => TAB_SPACE + ln).join(EOL),
            '});'
        ].join(EOL);

    return content + EOL;
}

function build([source]) {
    if (!source)
        return console.error('Unspecified source argument');

    let tests = [];

    for (let file of glob.sync(source)) {
        let { dir, name, ext } = parse(file);

        if (/-\d+\.test$/.test(name))
            continue;

        let s = fs.readFileSync(file).toString();
        let fileTests = getInlineTests(getComments(s));

        if (fileTests.length === 0)
            continue;

        let suffixLength = Math.max(Math.ceil(Math.log10(fileTests.length)), 3);
        let leadingZeros = new Array(suffixLength).fill('0').join('');

        fileTests.forEach((test, k) => {
            let suffix = (leadingZeros + (k + 1)).slice(-suffixLength);

            test.id = name + '-' + suffix + '.test';
            test.path = join(dir, test.id + ext);
            test.name = `#${suffix} ${name + ext}`;

            let testContent = getTestContent({
                ...test,
                originalContent: s
            });

            fs.writeFileSync(test.path, testContent);
        });

        tests = tests.concat(fileTests);
    }

    fs.writeFileSync(
        join(__dirname, '.doctest-list.json'),
        JSON.stringify(tests.map(t => t.path), null, 2)
    );

    return tests;
}

if (require.main === module)
    build(process.argv.slice(2));
else module.exports = build;
