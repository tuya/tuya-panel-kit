const base = require('../../jest.config.base.js');
const pkg = require('./package');

module.exports = {
  ...base,
  name: pkg.name,
  displayName: pkg.name,
  rootDir: '../..',
  testMatch: ['<rootDir>/packages/tuya-panel-icon/src/__tests__/?(*.)+(test).js'],
  coverageDirectory: '<rootDir>/packages/tuya-panel-icon/coverage/',
  collectCoverageFrom: [
    '<rootDir>/packages/tuya-panel-icon/src/*.tsx',
    '<rootDir>/packages/tuya-panel-icon/src/**/*.tsx',
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/example/node_modules',
    '<rootDir>/example',
    '<rootDir>/packages/*/lib',
  ],
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest',
  },
};
