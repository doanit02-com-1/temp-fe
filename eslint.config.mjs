import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['.next/**/*', 'node_modules/**/*', 'dist/**/*', 'out/**/*', '**/*.d.ts'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: react,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_|^error|^err|^errorInfo',
          varsIgnorePattern: '^_|^error|^err|^errorInfo',
          caughtErrorsIgnorePattern: '^_|^error|^err',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
];
