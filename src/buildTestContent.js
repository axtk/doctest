const { EOL } = require('os');
const config = require('./getConfig')();
const buildString = require('./buildString');
const indent = require('./indent');

module.exports = function buildTestContent(data) {
    let preprocessedData = Object.entries(data)
        .reduce((acc, [k, v]) => {
            acc[k] = indent(v, config.outputIndentation[k]);
            return acc;
        }, {});

    if (typeof config.outputContent === 'function')
        return config.outputContent(preprocessedData);

    return buildString(config.outputContent, preprocessedData);
};
