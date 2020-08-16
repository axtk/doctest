const args = process.argv.slice(2);

module.exports = function getArg(key) {
    let k = args.indexOf(key);
    return k === -1 ? undefined : args[k + 1];
};
