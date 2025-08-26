module.exports = {
  '*.js': [
    'eslint --fix',
    'prettier --write'
  ],
  '*.{html,css,md,json}': [
    'prettier --write'
  ]
};
