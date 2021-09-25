const base = require('../../jest.config.base.js');
const pkg = require('./package');

module.exports = {
  ...base,
  name: pkg.name,
  displayName: pkg.name,
  rootDir: '../..',
  testMatch: ['<rootDir>/packages/tuya-panel-animation-drawer/src/__tests__/?(*.)+(test).js'],
  coverageDirectory: '<rootDir>/packages/tuya-panel-animation-drawer/coverage/',
  collectCoverageFrom: ['<rootDir>/packages/tuya-panel-animation-drawer/src/*.tsx'],
  modulePathIgnorePatterns: [
    '<rootDir>/example/node_modules',
    '<rootDir>/demos',
    '<rootDir>/example',
    '<rootDir>/packages/*/lib',
    '<rootDir>/packages/tuya-panel-animation-drawer/src/index.ts',
  ],
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest',
  },
};
