const fs = require('fs');
const { join } = require('path');
const getArg = require('./getArg');
const defaultConfig = require('../doctest.config.js');

let cachedConfig;

module.exports = function getConfig() {
    if (cachedConfig)
        return cachedConfig;

    let config;
    let paths = [
        getArg('--config'),
        getArg('-c'),
        './doctest.config.js',
        './doctest.config.json',
        './.doctestrc'
    ];

    for (let i = 0; i < paths.length && !config; i++) {
        try {
            config = require(join(process.cwd(), paths[i]));
        }
        catch(e) {}
    }

    return (cachedConfig = {
        ...defaultConfig,
        ...config
    });
};
