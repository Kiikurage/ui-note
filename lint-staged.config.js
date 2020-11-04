module.exports = {
    '*.js': ['eslint --fix'],
    '*.jsx': ['eslint --fix'],
    '*.ts': ['eslint --fix'],
    '*.tsx': ['eslint --fix'],
    '*.json': ['prettier'],
    'posts/**/*.md': ['textlint --fix'],
};
