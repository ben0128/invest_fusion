import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
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
      // 在這裡添加或覆蓋規則
    },
  },
];