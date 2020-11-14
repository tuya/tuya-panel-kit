module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          'tuya-panel-kit/src/components/iconfont/svg/defaultSvg':
            '../src/components/iconfont/svg/defaultSvg',
          'tuya-panel-kit/src/components/iconfont/art/defaultSvg':
            '../src/components/iconfont/art/defaultSvg',
          'tuya-panel-kit/src/components/dialog/alert': '../src/components/dialog/alert',
          'tuya-panel-kit': '../src/index',
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
