var getRNAlias = () => {
  return process.env.DEV_MODE === 'umi'
    ? {}
    : {
        'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg':
          '../../packages/tuya-panel-kit/src/components/iconfont/svg/defaultSvg',
        'tuya-panel-kit/lib/components/modal/portalOut':
          '../../packages/tuya-panel-kit/src/components/modal/portalOut',
        'tuya-panel-kit': '../../packages/tuya-panel-kit/src/index.js',
        'tuya-panel-acrylic-kit': '../../packages/tuya-panel-acrylic-kit/src/index.ts',
        'tuya-panel-classic-kit': '../../packages/tuya-panel-classic-kit/src/index.ts',
        'tuya-panel-nordic-kit': '../../packages/tuya-panel-nordic-kit/src/index.ts',
        'react-native-gesture-handler': './node_modules/react-native-gesture-handler',
      };
};

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
          ...getRNAlias(),
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
