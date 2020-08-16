const args = process.argv.slice(2);

function toKey(arg, aliasMap) {
    if (!arg) return;

    if (aliasMap && aliasMap[arg])
        arg = aliasMap[arg];

    let key;

    if (arg.startsWith('--'))
        key = arg.slice(2);
    else if (arg.startsWith('-') && arg.length === 2)
        key = arg.slice(1);

    return key;
}

module.exports = function getArgs(aliasMap) {
    return args.reduce((acc, arg, i) => {
        let key = toKey(arg, aliasMap);
        let nextArg = args[i + 1];

        if (key === undefined)
            return acc;

        if (nextArg === undefined || toKey(nextArg, aliasMap) !== undefined)
            acc[key] = true;
        else {
            try { acc[key] = JSON.parse(nextArg); }
            catch(e) { acc[key] = nextArg; }
        }

        return acc;
    }, {});
};
