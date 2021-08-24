module.exports = {
  preset: 'react-native',
  verbose: true,
  moduleNameMapper: {
    '^image![a-zA-Z0-9$_-]+$': 'GlobalImageStub',
    '^[@./a-zA-Z0-9$_-]+\\.(png|gif)$':
      '<rootDir>/node_modules/react-native/Libraries/Image/RelativeImageStub',
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  modulePathIgnorePatterns: [
    '<rootDir>/example/node_modules',
    '<rootDir>/example',
    '<rootDir>/packages/*/lib',
    '<rootDir>/packages/tuya-panel-theme',
  ],
  collectCoverage: true,
  testEnvironment: 'node',
  globals: {
    __DEV__: true,
  },
  setupTestFrameworkScriptFile: '<rootDir>/jest.setup.js',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transformIgnorePatterns: [
    'node_modules/(?!react-native|@react-navigation|react-native-gesture-handler|react-native-svg/|@react-native-community/blur/)',
  ],
};
