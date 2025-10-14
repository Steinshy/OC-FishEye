import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import html from 'eslint-plugin-html';
import importPlugin from 'eslint-plugin-import';
import jsdoc from 'eslint-plugin-jsdoc';
import accessibility from 'eslint-plugin-jsx-a11y';
import security from 'eslint-plugin-security';

export default [
  js.configs.recommended,
  {
    files: ['**/*.html'],
    plugins: { html },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    }
  },
  {
    files: ['**/*.js'],
    plugins: {
      import: importPlugin,
      jsdoc,
      security,
      accessibility
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        document: 'readonly',
        window: 'readonly',
        location: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        URLSearchParams: 'readonly',
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['error', 'warn', 'info'] }],
      'no-debugger': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-spacing': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'comma-dangle': ['error', 'never'],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      indent: ['error', 2, { SwitchCase: 1 }],
      'no-trailing-spaces': 'error',
      'max-len': ['warn', { code: 160, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true }],
      complexity: ['warn', 15],
      'max-depth': ['warn', 5],
      'max-lines-per-function': ['warn', 80],
      'no-duplicate-imports': 'error',
      'import/no-unresolved': 'error',
      'import/no-absolute-path': 'error',
      'import/no-self-import': 'error',
      'import/order': ['error', { groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'], 'newlines-between': 'always', alphabetize: { order: 'asc' } }],
      'jsdoc/check-param-names': 'error',
      'jsdoc/check-tag-names': 'error',
      'jsdoc/require-param': 'off',
      'jsdoc/require-returns': 'off',
      'security/detect-eval-with-expression': 'error',
      'security/detect-unsafe-regex': 'error',
      'security/detect-object-injection': 'off',
      'accessibility/alt-text': 'warn',
      'accessibility/aria-props': 'warn',
      'accessibility/click-events-have-key-events': 'warn',
      'accessibility/label-has-associated-control': 'warn',
      'accessibility/no-autofocus': 'warn'
    }
  },
  prettier,
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      '*.min.js',
      '*.min.css',
      '*.log',
      'assets/api/',
      'assets/js/minified/',
      'minified/',
      'scripts/',
      'lighthouse*.html',
      '.lighthouseci/',
      '.husky/',
      '.cursor/',
      '.vscode/',
      '.idea/'
    ]
  }
];
