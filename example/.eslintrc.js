module.exports = {
  extends: '../.eslintrc.js',
  settings: {
    'import/core-modules': ['tuya-panel-kit'],
    'import/no-unresolved': [2, { ignore: ['.png$', '.webp$', '.jpg$'] }],
  },
  rules: {
    'import/no-extraneous-dependencies': 0,
    'react/prefer-stateless-function': 0,
    'react/jsx-filename-extension': 0,
  },
};
