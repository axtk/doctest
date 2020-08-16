module.exports = function buildString(template, data) {
    let s = template;
    for (let [k, v] of Object.entries(data))
        s = s.replace(new RegExp(`\\$\\{${k}\\}`, 'g'), v);
    return s;
};
