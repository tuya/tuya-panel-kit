Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/TYLists/items/switch-item.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _listItem = require('../list-item');

var _listItem2 = _interopRequireDefault(_listItem);

var _switchButton = require('../../switch-button');

var _switchButton2 = _interopRequireDefault(_switchButton);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function SwitchItem(_ref) {
  var value = _ref.value,
      disabled = _ref.disabled,
      props = _objectWithoutProperties(_ref, ['value', 'disabled']);

  var listItemPropNames = Object.keys(_listItem2.default.propTypes);
  var listItemProps = (0, _utils.pick)(props, listItemPropNames);
  var switchButtonProps = (0, _utils.omit)(props, listItemPropNames);
  return _react2.default.createElement(_listItem2.default, _extends({}, listItemProps, {
    disabled: disabled,
    Action: _react2.default.createElement(_switchButton2.default, _extends({ value: value, disabled: disabled }, switchButtonProps, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      }
    })),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }));
}

SwitchItem.propTypes = _extends({}, _listItem2.default.propTypes, _switchButton2.default.propTypes);

exports.default = SwitchItem;