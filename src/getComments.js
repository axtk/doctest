const { EOL } = require('os');

module.exports = function getComments(s) {
    let lines = s.split(/\r?\n/), comments = [];
    let buf = [], k0, k1, state;

    for (let ln of lines) {
        k0 = ln.indexOf('/*');
        k1 = ln.indexOf('*/', k0 === -1 ? 0 : k0 + 2);

        if (k0 !== -1) {
            let s = ln.slice(k0, k1 === -1 ? ln.length : k1).replace(/^\/\*+/, '').trim();
            if (s) buf.push(s);
            state = '/*';
        }
        else if (state === '/*') {
            if (k1 === -1)
                buf.push(ln.replace(/^\s*\*+\s?/, ''));
            else {
                let s = ln.slice(0, k1).replace(/^\s*\*+\s?/, '').trim();
                if (s) buf.push(s);
                comments.push(buf.join(EOL));
                buf = [];
                state = null;
            }
        }
        else {
            k0 = ln.indexOf('//');

            if (k0 !== -1) {
                buf.push(ln.slice(k0).replace(/^\/\/+/, '').trim());
                state = '//';
            }
            else if (state === '//') {
                comments.push(buf.join(EOL));
                buf = [];
                state = null;
            }
        }
    }

    if (buf.length)
        comments.push(buf.join(EOL));

    return comments;
};
