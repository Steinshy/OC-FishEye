import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
  // Base configuration
  js.configs.recommended,

  // Browser environment configuration
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Browser globals
        document: 'readonly',
        window: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        FormData: 'readonly',
        URL: 'readonly',
        setTimeout: 'readonly',
        // Node.js globals for config files
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
      },
    },
  },

  // Global rules
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },

  // Prettier integration (must be last)
  prettier,

  // Ignore patterns (migrated from .eslintignore)
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
      'husky/',
    ],
  },
];
