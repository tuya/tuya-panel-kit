module.exports = {
  presets: ['react-native'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          'tuya-panel-kit': '../src/index',
        },
      },
    ],
  ],
};
