Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/TYLists/items/checkbox-item.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _listItem = require('../list-item');

var _listItem2 = _interopRequireDefault(_listItem);

var _checkbox = require('../../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function CheckboxItem(_ref) {
  var checked = _ref.checked,
      reverse = _ref.reverse,
      disabled = _ref.disabled,
      onChange = _ref.onChange,
      props = _objectWithoutProperties(_ref, ['checked', 'reverse', 'disabled', 'onChange']);

  var listItemPropNames = Object.keys(_listItem2.default.propTypes);

  var _pick = (0, _utils.pick)(props, listItemPropNames),
      Icon = _pick.Icon,
      Action = _pick.Action,
      listItemProps = _objectWithoutProperties(_pick, ['Icon', 'Action']);

  var checkboxProps = (0, _utils.omit)(props, listItemPropNames);
  return _react2.default.createElement(_listItem2.default, _extends({
    styles: { contentLeft: { alignSelf: 'flex-start', marginTop: 4 } }
  }, listItemProps, {
    Icon: reverse ? Icon : _react2.default.createElement(_checkbox2.default, _extends({}, checkboxProps, { checked: checked, disabled: disabled, onChange: onChange, __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      }
    })),
    Action: reverse ? _react2.default.createElement(_checkbox2.default, _extends({}, checkboxProps, { checked: checked, disabled: disabled, onChange: onChange, __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      }
    })) : Action,
    disabled: disabled,
    onPress: function onPress() {
      return onChange && onChange(!checked);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }));
}

CheckboxItem.propTypes = _extends({}, _listItem2.default.propTypes, _checkbox2.default.propTypes);

exports.default = CheckboxItem;