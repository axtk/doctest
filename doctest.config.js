module.exports = {
    target: './**/*.{js,mjs,jsx,ts,tsx}',
    // @see npm:glob options
    lookupOptions: {
        ignore: [
            './**/node_modules/**/*'
        ]
    },
    marker: '@test',
    // Content options:
    // (module) moduleName, modulePath, moduleContent,
    //   (test) title, body, esImports, path, id, counter
    content: ({ moduleName, moduleContent, title, body, esImports, counter }) => (
        (moduleContent ? moduleContent + '\n\n' : '') +
        (esImports ? esImports + '\n\n' : '') +
        `test('${title || `${moduleName} #${counter}`}', () => {\n` +
            `${body}\n` +
        '});\n'
    ),
    indentation: {
        body: 4
    },
    testListLocation: './.doctest-files.json'
};
