module.exports = {
    root: true,
    extends: 'airbnb-typescript/base',
    plugins: ['import'],
    parserOptions: {
        project: './config/tsconfig.eslint.json',
    },
    rules: {
        'no-console': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/lines-between-class-members': 'off',
        'multiline-ternary': 'off',
        'node/no-callback-literal': 0,
        'import/named': 'off',
        indent: ['error', 4],
    },
};
