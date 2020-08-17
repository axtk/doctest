module.exports = {
    target: './**/*.{js,mjs,jsx,ts,tsx}',

    // @see npm:glob options
    lookupOptions: {
        ignore: [
            './**/node_modules/**/*'
        ]
    },

    marker: '@test',

    // Output content options:
    // (module) moduleName, modulePath, moduleContent,
    //   (test) title, body, esImports, path, id, counter
    outputContent: ({ moduleName, moduleContent, title, body, esImports, counter }) => (
        (moduleContent ? moduleContent + '\n\n' : '') +
        (esImports ? esImports + '\n\n' : '') +
        `test('${title || `${moduleName} #${counter}`}', () => {\n` +
            `${body}\n` +
        '});\n'
    ),

    outputIndentation: {
        body: 4
    },

    listPath: './.doctest-files.json'
};
