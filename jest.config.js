module.exports = {
  ...require('./jest.config.base.js'),
  projects: ['<rootDir>/packages/*/jest.config.js'],
  coverageDirectory: '<rootDir>/coverage/',
};
