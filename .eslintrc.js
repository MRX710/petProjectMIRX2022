module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:i18next/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'i18next',
        'react-hooks',
        'mirx-eslint-plugin',
    ],
    rules: {
        'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        indent: [2, 4],
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'consistent-return': 'warn',
        'no-unused-vars': 'warn',
        quotes: 'off',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-no-useless-fragment': 'warn',
        'no-trailing-spaces': 'off',
        'react/jsx-props-no-spreading': 'warn',
        'react/self-closing-comp': 'off',
        'prefer-const': 'warn',
        'no-empty': 'warn',
        'brace-style': [
            'error',
            'stroustrup',
            { allowSingleLine: true },
        ],
        'no-multiple-empty-lines': 'off',
        'no-mixed-operators': 'off',
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'prefer-destructuring': 'off',
        'no-debugger': 'error',
        'i18next/no-literal-string': [
            'warn',
            {
                markupOnly: true,
                ignoreAttribute: ['data-testid', 'to'],
            },
        ],
        /* eslint-disable */
        'max-len': ['error', {'ignoreComments': true, code: 300}],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'no-param-reassign': 'off',
        'no-undef': 'off',
        'react/no-array-index-key': 'warn',
        'mirx-eslint-plugin/path-checker': 'error',
    },
    globals: {
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true,
    },
    overrides: [
        {
            files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off',
                'max-length': 'off',
            }
        }
    ]
};
