const base = require('../../jest.config.base.js');
const pkg = require('./package');

module.exports = {
  ...base,
  name: pkg.name,
  displayName: pkg.name,
  rootDir: '../..',
  testMatch: ['<rootDir>/packages/tuya-panel-style-icon-background/src/__tests__/?(*.)+(test).js'],
  coverageDirectory: '<rootDir>/packages/tuya-panel-style-icon-background/coverage/',
  collectCoverageFrom: ['<rootDir>/packages/tuya-panel-style-icon-background/src/index.tsx'],
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest',
  },
};
