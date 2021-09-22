const base = require('../../jest.config.base.js');
const pkg = require('./package');

module.exports = {
  ...base,
  name: pkg.name,
  displayName: pkg.name,
  rootDir: '../..',
  testMatch: ['<rootDir>/packages/tuya-panel-animation-wave/src/__tests__/?(*.)+(test).js'],
  coverageDirectory: '<rootDir>/packages/tuya-panel-animation-wave/coverage/',
  collectCoverageFrom: ['<rootDir>/packages/tuya-panel-animation-wave/src/*.ts'],
  modulePathIgnorePatterns: [
    '<rootDir>/example/node_modules',
    '<rootDir>/demos',
    '<rootDir>/example',
    '<rootDir>/packages/*/lib',
    '<rootDir>/packages/tuya-panel-animation-wave/src/index.ts',
  ],
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest',
  },
};
