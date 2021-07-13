module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
          '#components': './src/components',
          '#config': './src/config',
          '#i18n': './src/i18n',
          '#hooks': './src/hooks',
          '#models': './src/models',
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
