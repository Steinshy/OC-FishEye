import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import html from 'eslint-plugin-html';
import importPlugin from 'eslint-plugin-import';
import jsdoc from 'eslint-plugin-jsdoc';
import security from 'eslint-plugin-security';
import accessibility from 'eslint-plugin-jsx-a11y';

export default [
  js.configs.recommended,

  // HTML plugin configuration
  {
    files: ['**/*.html'],
    plugins: {
      html,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },

  // Main JavaScript configuration
  {
    files: ['**/*.js'],
    plugins: {
      import: importPlugin,
      jsdoc,
      security,
      accessibility,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Browser globals
        document: 'readonly',
        window: 'readonly',
        location: 'readonly',
        navigator: 'readonly',
        history: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',

        // Web APIs
        Image: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        FormData: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',

        // Node.js globals (for build tools)
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',

        // Custom project functions
        getPhotographersData: 'readonly',
        getPhotographerInformation: 'readonly',
        getPhotographerIdFromData: 'readonly',
        createPhotographerCard: 'readonly',
        loadPhotographers: 'readonly',
        renderPhotographerInfo: 'readonly',
        handleContactModal: 'readonly',
        initCharacterCount: 'readonly',
        initializeRealTimeValidation: 'readonly',
        handleFormSubmit: 'readonly',
        errorDisplay: 'readonly',
        Validators: 'readonly',
        createSortDropdown: 'readonly',
      },
    },
    rules: {
      // Core ESLint rules
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-console': ['warn', { allow: ['error', 'warn', 'info', 'debug'] }],
      'no-debugger': 'error',
      'no-alert': 'warn',
      'no-var': 'error',

      // Code style rules
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-spacing': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'template-curly-spacing': 'error',
      'prefer-destructuring': [
        'error',
        {
          array: true,
          object: true,
        },
        {
          enforceForRenamedProperties: false,
        },
      ],

      // Formatting rules
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
      'eol-last': 'error',
      'comma-dangle': ['error', 'never'],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      indent: ['error', 2, { SwitchCase: 1 }],
      'no-trailing-spaces': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-tabs': 'error',

      // Line length and complexity rules
      'max-len': [
        'warn',
        {
          code: 160,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
          ignoreComments: true,
        },
      ],
      complexity: ['warn', 15],
      'max-depth': ['warn', 5],
      'max-lines-per-function': ['warn', 80],
      'max-params': ['warn', 6],
      'max-lines': ['warn', 500],

      // Modern JavaScript features
      'prefer-spread': 'error',
      'prefer-rest-params': 'error',
      'no-useless-concat': 'error',
      'no-useless-return': 'error',
      'no-useless-escape': 'error',
      'no-useless-call': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-constructor': 'error',
      'no-useless-rename': 'error',

      // Import/export rules
      'no-duplicate-imports': 'error',
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/namespace': 'error',
      'import/no-absolute-path': 'error',
      'import/no-dynamic-require': 'warn',
      'import/no-self-import': 'error',
      'import/no-cycle': 'warn',
      'import/no-useless-path-segments': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      // JSDoc rules (relaxed for better developer experience)
      'jsdoc/check-alignment': 'warn',
      'jsdoc/check-indentation': 'warn',
      'jsdoc/check-param-names': 'error',
      'jsdoc/check-tag-names': 'error',
      'jsdoc/check-types': 'warn',
      'jsdoc/empty-tags': 'warn',
      'jsdoc/require-param': 'off',
      'jsdoc/require-param-description': 'off',
      'jsdoc/require-param-name': 'error',
      'jsdoc/require-param-type': 'off',
      'jsdoc/require-returns': 'off',
      'jsdoc/require-returns-description': 'off',
      'jsdoc/require-returns-type': 'off',
      'jsdoc/valid-types': 'warn',

      // Security rules
      'security/detect-eval-with-expression': 'error',
      'security/detect-non-literal-regexp': 'warn',
      'security/detect-unsafe-regex': 'error',
      'security/detect-buffer-noassert': 'error',
      'security/detect-disable-mustache-escape': 'error',
      'security/detect-no-csrf-before-method-override': 'error',
      'security/detect-object-injection': 'off',
      'security/detect-pseudoRandomBytes': 'error',

      // Accessibility rules (adapted for vanilla JS/HTML)
      'accessibility/alt-text': 'warn',
      'accessibility/anchor-has-content': 'warn',
      'accessibility/aria-props': 'warn',
      'accessibility/aria-proptypes': 'warn',
      'accessibility/aria-role': 'warn',
      'accessibility/aria-unsupported-elements': 'warn',
      'accessibility/click-events-have-key-events': 'warn',
      'accessibility/heading-has-content': 'warn',
      'accessibility/html-has-lang': 'warn',
      'accessibility/iframe-has-title': 'warn',
      'accessibility/img-redundant-alt': 'warn',
      'accessibility/label-has-associated-control': 'warn',
      'accessibility/mouse-events-have-key-events': 'warn',
      'accessibility/no-access-key': 'warn',
      'accessibility/no-autofocus': 'warn',
      'accessibility/no-distracting-elements': 'warn',
      'accessibility/no-redundant-roles': 'warn',
      'accessibility/role-has-required-aria-props': 'warn',
      'accessibility/role-supports-aria-props': 'warn',
      'accessibility/scope': 'warn',
      'accessibility/tabindex-no-positive': 'warn',
    },
  },
  prettier,
  {
    ignores: [
      'node_modules/',
      'package-lock.json',
      'yarn.lock',
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
      'assets/photographers/',
      '.github/',
      '.husky/',
      'husky/',
      'coverage/',
      '.nyc_output/',
      '*.config.js',
      'scripts/',
      'assets/js/minified/',
      'minified/',
    ],
  },
];
