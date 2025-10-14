export default {
  '*.js': ['eslint --fix --max-warnings 0', 'prettier --write'],
  '*.html': ['html-validate', 'prettier --write'],
  '*.css': ['stylelint --fix', 'prettier --write'],
  '*.json': ['prettier --write']
};
