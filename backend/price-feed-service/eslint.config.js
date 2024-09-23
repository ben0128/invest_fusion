import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    ignores: [
      'logs',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      'lerna-debug.log*',
      '.pnpm-debug.log*',
      '.cache',
      'report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json',
      'pids',
      '*.pid',
      '*.seed',
      '*.pid.lock',
      'lib-cov',
      'coverage',
      '*.lcov',
      '.nyc_output',
      '.grunt',
      'bower_components',
      'node_modules',
      'dist',
      'tmp',
      'temp',
      '*.tmp',
      '*.temp',
      '*.swp',
      '.DS_Store',
      'Thumbs.db',
      'desktop.ini'
    ],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        // 在這裡添加全局變量
        console: 'readonly',
        // 如果需要，可以添加其他 Node.js 或 Bun 特定的全局變量
      },
    },
    rules: {
      ...tsPlugin.configs['recommended'].rules,
      'no-console': 'warn',
      'no-unused-vars': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-before-function-paren': ['error', 'never'],
      'space-before-blocks': ['error', 'always'],
      'keyword-spacing': ['error', { 'before': true, 'after': true }],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    },
  },
];