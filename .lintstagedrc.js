export default {
  '*.js': ['eslint --fix --max-warnings 0', 'prettier --write --check'],
  '*.{ts,tsx}': ['eslint --fix --max-warnings 0', 'prettier --write --check'],
  '*.html': ['html-validate --config .htmlvalidate.json', 'prettier --write --check'],
  '*.css': ['stylelint --fix', 'prettier --write --check'],
  '*.scss': ['stylelint --fix', 'prettier --write --check'],
  '*.md': ['prettier --write --check', 'markdownlint --fix'],
  '*.json': ['prettier --write --check'],
  '*.{yml,yaml}': ['prettier --write --check']
};
