const { EOL } = require('os');

module.exports = function parseInlineTest(s) {
    s = s.replace(/\s+$/, '');

    let lines = s.split(/\r?\n/);
    let body = '', title = '', esImports = '', content = '';

    if (lines.length === 1)
        body = s;
    else {
        title = lines.shift().trim();

        let [esImportLines, otherLines] = lines.reduce((acc, ln) => {
            if (/^\s*import\b/.test(ln))
                acc[0].push(ln);
            else if (ln.trim() || acc[1].length)
                acc[1].push(ln);
            return acc;
        }, [[], []]);

        esImports = esImportLines.join(EOL);
        body = otherLines.join(EOL);
    }

    return {
        title,
        body,
        esImports
    };
};
