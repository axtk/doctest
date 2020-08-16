#!/usr/bin/env node
let command = process.argv[2];
let args = process.argv.slice(3);

if (['build', 'cleanup'].includes(command))
    require(`./${command}`)(args);
else console.error('No such command: ' + command);
