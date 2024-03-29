const base = require('../../jest.config.base.js');
const pkg = require('./package');

module.exports = {
  ...base,
  name: pkg.name,
  displayName: pkg.name,
  rootDir: '../..',
  testMatch: ['<rootDir>/packages/tuya-panel-style-display-card/src/__tests__/?(*.)+(test).js'],
  coverageDirectory: '<rootDir>/packages/tuya-panel-style-display-card/coverage/',
  collectCoverageFrom: ['<rootDir>/packages/tuya-panel-style-display-card/src/index.tsx'],
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest',
  },
};
