const fs = require('fs');
const { join } = require('path');
const getArgs = require('./getArgs');
const defaultConfig = require('../doctest.config.js');

const argAliasMap = {
    '-c': '--config'
};

let cachedConfig;

module.exports = function getConfig() {
    if (cachedConfig)
        return cachedConfig;

    let argConfig = getArgs(argAliasMap), config;
    let paths = [
        argConfig.config,
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

    delete argConfig.config;

    return (cachedConfig = {
        ...defaultConfig,
        ...config,
        ...(Object.keys(argConfig).length === 0 ? null : { targetOptions: argConfig })
    });
};
