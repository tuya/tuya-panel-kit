const base = require('../../jest.config.base.js');
const pkg = require('./package');

module.exports = {
  ...base,
  preset: 'react-native',
  name: pkg.name,
  displayName: pkg.name,
  rootDir: '../..',
  testMatch: ['<rootDir>/packages/tuya-panel-topbar-mall-indicator/src/__test__/?(*.)+(test).tsx'],
  coverageDirectory: '<rootDir>/packages/tuya-panel-topbar-mall-indicator/coverage/',
  collectCoverageFrom: ['<rootDir>/packages/tuya-panel-topbar-mall-indicator/src/*.tsx'],
  modulePathIgnorePatterns: [
    '<rootDir>/example/node_modules',
    '<rootDir>/demos',
    '<rootDir>/example',
    '<rootDir>/lib',
    '<rootDir>/packages/*/lib',
    '<rootDir>/packages/tuya-panel-theme',
    '<rootDir>/packages/tuya-panel-kit',
  ],
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest',
  },
};
