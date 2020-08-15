#!/usr/bin/env node
let command = process.argv[2];
let args = process.argv.slice(3);

try {
    require(`./${command}`)(args);
}
catch(e) {
    console.error('No such command: ' + command);
}
