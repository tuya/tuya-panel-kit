const base = require('../../jest.config.base.js');
const pkg = require('./package');

module.exports = {
  ...base,
  name: pkg.name,
  displayName: pkg.name,
  rootDir: '../..',
  testMatch: ['<rootDir>/packages/tuya-panel-style-button-card/src/__tests__/?(*.)+(test).js'],
  coverageDirectory: '<rootDir>/packages/tuya-panel-style-button-card/coverage/',
  collectCoverageFrom: ['<rootDir>/packages/tuya-panel-style-button-card/src/index.tsx'],
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: ['TS2322', 'TS2532', 'TS7006'],
      },
    },
  },
  transform: {
    '^.+\\.(j|t)sx$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
};
