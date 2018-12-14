module.exports = {
  presets: ['react-native'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          'tuya-panel-kit': '../src/index',
        },
      },
    ],
  ],
};
