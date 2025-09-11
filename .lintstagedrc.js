export default {
  // JavaScript files - lint first, then format
  '*.js': ['eslint --fix --max-warnings 0', 'prettier --write --check'],

  // TypeScript files (if you add them later)
  '*.{ts,tsx}': ['eslint --fix --max-warnings 0', 'prettier --write --check'],

  // HTML files - lint and format
  '*.html': ['html-validate --config .htmlvalidate.json', 'prettier --write --check'],

  // CSS files - lint and format
  '*.css': ['stylelint --fix', 'prettier --write --check'],

  // SCSS files - lint and format
  '*.scss': ['stylelint --fix', 'prettier --write --check'],

  // Markdown files - format only
  '*.md': ['prettier --write --check', 'markdownlint --fix'],

  // JSON files - format only
  '*.json': ['prettier --write --check'],

  // YAML files - format only
  '*.{yml,yaml}': ['prettier --write --check']
};
