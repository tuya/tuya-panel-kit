module.exports = {
  extends: ['tuya-panel'],
  plugins: ['literal-check'],
  rules: {
    'import/no-unresolved': 'off',
    'no-shadow': 'off',
    'no-bitwise': 'off',
    'prefer-spread': 'off',
  },
};
