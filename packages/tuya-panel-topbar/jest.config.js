const base = require('../../jest.config.base.js');
const pkg = require('./package');

module.exports = {
  ...base,
  name: pkg.name,
  displayName: pkg.name,
  rootDir: '../..',
  testMatch: ['<rootDir>/packages/tuya-panel-topbar/src/__tests__/?(*.)+(test).js'],
  coverageDirectory: '<rootDir>/packages/tuya-panel-topbar/coverage/',
  collectCoverageFrom: ['<rootDir>/packages/tuya-panel-topbar/src/*.ts'],
  modulePathIgnorePatterns: [
    '<rootDir>/example/node_modules',
    '<rootDir>/demos',
    '<rootDir>/example',
    '<rootDir>/packages/*/lib',
    '<rootDir>/packages/tuya-panel-topbar/src/index.ts',
  ],
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest',
  },
};
