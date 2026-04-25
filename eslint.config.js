const eslint = require('@eslint/js');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const angular = require('@angular-eslint/eslint-plugin');
const angularTemplate = require('@angular-eslint/eslint-plugin-template');
const angularTemplateParser = require('@angular-eslint/template-parser');

module.exports = [
    {
        ignores: [
            'dist/',
            'build/',
            'builds/',
            '.angular/',
            'node_modules/',
            '.tmp/',
            'coverage/',
            '*.yaml',
            '*.yml',
            'ci/**',
            'scripts/**',
            'secrets/**',
            'charts/**',
            'playwright-report/**',
        ],
    },

    // ✅ FIX for require/module/__dirname being flagged
    {
        files: ['eslint.config.js'],
        languageOptions: {
            globals: {
                require: 'readonly',
                module: 'readonly',
                __dirname: 'readonly',
            },
        },
        rules: {
            'no-undef': 'off',
        },
    },

    eslint.configs.recommended,

    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                tsconfigRootDir: __dirname,
            },
            globals: {
                window: 'readonly',
                console: 'readonly',
                describe: 'readonly',
                it: 'readonly',
                expect: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            '@angular-eslint': angular,
        },
        rules: {
            '@typescript-eslint/no-unused-vars': ['warn', { args: 'none', caughtErrors: 'none', varsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',

            eqeqeq: 'error',
            'no-undef': 'off',
            '@angular-eslint/component-selector': 'off',
            '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: 'app', style: 'camelCase' }],

            '@angular-eslint/no-host-metadata-property': 'off',
            '@angular-eslint/use-lifecycle-interface': 'off',
            '@angular-eslint/no-empty-lifecycle-method': 'warn',
        },
    },

    {
        files: ['**/*.html'],
        languageOptions: {
            parser: angularTemplateParser,
        },
        plugins: {
            '@angular-eslint/template': angularTemplate,
        },
        rules: {
            '@angular-eslint/template/prefer-self-closing-tags': 'error',
            '@angular-eslint/template/banana-in-box': 'error',
            '@angular-eslint/template/no-negated-async': 'warn',
            '@angular-eslint/template/click-events-have-key-events': 'off',
            '@angular-eslint/template/interactive-supports-focus': 'off',
            '@angular-eslint/template/label-has-associated-control': 'off',
            '@angular-eslint/template/alt-text': 'off',
        },
    },

    {
        files: ['**/*.spec.ts'],
        languageOptions: {
            globals: {
                describe: 'readonly',
                it: 'readonly',
                expect: 'readonly',
            },
        },
    },
];
