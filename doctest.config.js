module.exports = {
    marker: '@test',
    content: ({ moduleContent, esImports, title, body }) => (
        (moduleContent ? moduleContent + '\n\n' : '') +
        (esImports ? esImports + '\n\n' : '') +
        `test('${title}', () => {\n` +
            `${body}\n` +
        '});\n'
    ),
    indentation: {
        body: 4
    },
    testListLocation: './.doctest-files.json'
};
