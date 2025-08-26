import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        document: 'readonly',
        window: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        FormData: 'readonly',
        URL: 'readonly',
        setTimeout: 'readonly',
        module: 'readonly',
        require: 'readonly',
        process: 'readonly'
      }
    }
  },

  {
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error'
    }
  },

  prettier,
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      '*.min.js',
      '.DS_Store',
      '*.log',
      '*.jpg',
      '*.jpeg',
      '*.png',
      '*.gif',
      '*.svg',
      '*.webp',
      '*.mp4',
      '*.avi',
      '*.mov',
      '*.ttf',
      '*.woff',
      '*.woff2',
      '*.eot',
      'package-lock.json',
      'yarn.lock',
      'helper/old_project/',
      '.github',
      '.husky/',
      'husky/'
    ]
  }
];
