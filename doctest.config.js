module.exports = {
    // Target files of `doctest build`
    target: './**/*.{js,mjs,jsx,ts,tsx}',

    // Lookup options for the target files
    // @see npm:glob options
    targetOptions: {
        ignore: [
            './**/node_modules/**/*'
        ]
    },

    marker: '@test',

    // Content of generated test files
    outputContent: ({
        moduleName,
        modulePath,
        moduleContent,
        title,
        body,
        esImports,
        path,
        id,
        counter
    }) => (
        (moduleContent ? `${moduleContent}\n\n` : '') +
        (esImports ? `${esImports}\n\n` : '') +
        `test('${title || `${moduleName} #${counter}`}', () => {\n` +
            `${body}\n` +
        '});\n'
    ),

    outputIndentation: {
        body: 4
    },

    // Path to the temporary file containing the list of test files
    // produced during the `doctest build` phase
    dumpPath: './.doctestdump'
};
