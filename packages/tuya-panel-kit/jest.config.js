const base = require('../../jest.config.base.js');
const pkg = require('./package');

module.exports = {
  ...base,
  name: pkg.name,
  displayName: pkg.name,
  rootDir: '../..',
  coverageDirectory: '<rootDir>/packages/tuya-panel-kit/coverage/',
  testMatch: ['<rootDir>/packages/tuya-panel-kit/src/components/**/__tests__/?(*.)+(test).js'],
  collectCoverageFrom: [
    '<rootDir>/packages/tuya-panel-kit/src/components/**/*.js',
    '<rootDir>/packages/tuya-panel-kit/src/utils/*.js',
    '<rootDir>/packages/tuya-panel-kit/src/utils/theme/*.js',
    '!<rootDir>/packages/tuya-panel-kit/src/components/layout/+(navigator-layout|full-view|offline-view|api|detect-net-modal|react-navigation)/*.js',
    '!<rootDir>/packages/tuya-panel-kit/src/components/layout/offline-view/ble-offline-view/*.js',
    '!<rootDir>/packages/tuya-panel-kit/src/components/dialog/password.js',
    '!<rootDir>/packages/tuya-panel-kit/src/components/popup/dropdown/*.js',
    '!<rootDir>/packages/tuya-panel-kit/src/components/feature-slider/*.js',
    '!<rootDir>/packages/tuya-panel-kit/src/index.js',
    '!<rootDir>/packages/tuya-panel-kit/src/helpers/*.js',
    '!<rootDir>/packages/tuya-panel-kit/src/components/barchart/*.js',
    '!<rootDir>/packages/tuya-panel-kit/src/components/linechart/*.js',
    '!<rootDir>/packages/tuya-panel-kit/src/components/image-upload/*.js',
    '!<rootDir>/packages/tuya-panel-kit/src/components/i18n/*.js',
    '!<rootDir>/packages/tuya-panel-kit/src/components/theme/*.js',
    '!<rootDir>/packages/tuya-panel-kit/src/TYNativeApi.js',
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/example/node_modules',
    '<rootDir>/demos',
    '<rootDir>/example',
    '<rootDir>/lib',
    '<rootDir>/packages/*/lib',
    '<rootDir>/packages/tuya-panel-utils',
  ],
};
