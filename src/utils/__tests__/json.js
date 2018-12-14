import JsonUtils from '../json';

describe('JsonUtils parseJSON', () => {
  it('JsonUtils.parseJSON()', () => {
    const result = JsonUtils.parseJSON('{"name": "tuya-panel-kit", "version": "1.0.0", "description": "", "main": "index.js", "scripts": {"test": "jest -u --verbose", "test:watch": "jest --watch", "test:coverage": "jest --coverage"}, "dependencies": {"react": "^16.2.0", "react-native": "0.51.0", "react-native-svg": "5.5.1", "style-equal": "^1.0.0"}, "devDependencies": {"enzyme": "^3.3.0", "enzyme-adapter-react-16": "^1.1.1", "enzyme-to-json": "^3.3.1", "jest": "^22.4.2", "prop-types": "^15.6.1", "react-addons-shallow-compare": "^15.6.2", "react-dom": "^16.2.0"}, "jest": {"preset": "react-native", "moduleNameMapper": {"^image![a-zA-Z0-9$_-]+$": "GlobalImageStub", "^[@./a-zA-Z0-9$_-]+\\.(png|gif)$": "RelativeImageStub"}, "coverageDirectory": "./coverage/", "collectCoverageFrom": ["components/**/*.js", "!src/index.js", "!src/helpers/*.js"], "collectCoverage": true, "globals": {"__DEV__": true}}, "author": ["fri3nds<chenglong@tuya.com>", "cris<wanghuan@tuya.com>"], "license": "ISC"}');
    expect(result).toEqual({"name": "tuya-panel-kit", "version": "1.0.0", "description": "", "main": "index.js", "scripts": {"test": "jest -u --verbose", "test:watch": "jest --watch", "test:coverage": "jest --coverage"}, "dependencies": {"react": "^16.2.0", "react-native": "0.51.0", "react-native-svg": "5.5.1", "style-equal": "^1.0.0"}, "devDependencies": {"enzyme": "^3.3.0", "enzyme-adapter-react-16": "^1.1.1", "enzyme-to-json": "^3.3.1", "jest": "^22.4.2", "prop-types": "^15.6.1", "react-addons-shallow-compare": "^15.6.2", "react-dom": "^16.2.0"}, "jest": {"preset": "react-native", "moduleNameMapper": {"^image![a-zA-Z0-9$_-]+$": "GlobalImageStub", "^[@./a-zA-Z0-9$_-]+.(png|gif)$": "RelativeImageStub"}, "coverageDirectory": "./coverage/", "collectCoverageFrom": ["components/**/*.js", "!src/index.js", "!src/helpers/*.js"], "collectCoverage": true, "globals": {"__DEV__": true}}, "author": ["fri3nds<chenglong@tuya.com>", "cris<wanghuan@tuya.com>"], "license": "ISC"});
  });

  it('JsonUtils.parseJSON(undefined) = {}', () => {
    const result = JsonUtils.parseJSON(undefined);
    expect(result).toEqual({});
  });
});
