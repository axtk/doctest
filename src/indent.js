const { EOL } = require('os');

module.exports = function indent(s, indentationSize) {
    if (!s || typeof indentationSize !== 'number')
        return s;

    let indentation = new Array(indentationSize).fill(' ').join('');
    return s.split(/\r?\n/).map(ln => ln.trim() ? indentation + ln : ln).join(EOL);
};
