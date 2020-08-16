module.exports = {
    marker: '@test',
    content: (
        '${moduleContent}\n\n' +
        '${esImports}\n\n' +
        'test(\'${title}\', () => {\n' +
            '${body}\n' +
        '});\n'
    ),
    indentation: {
        body: 4
    },
    testListLocation: './.doctest-files.json'
};
