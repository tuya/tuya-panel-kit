Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TYNativeApi = require('../../TYNativeApi');

var _number = require('../../utils/number');

var _number2 = _interopRequireDefault(_number);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var I18NWrapper = function (_I18N) {
  _inherits(I18NWrapper, _I18N);

  function I18NWrapper() {
    _classCallCheck(this, I18NWrapper);

    return _possibleConstructorReturn(this, (I18NWrapper.__proto__ || Object.getPrototypeOf(I18NWrapper)).apply(this, arguments));
  }

  _createClass(I18NWrapper, [{
    key: 'getRangeStrings',
    value: function getRangeStrings(dpCode) {
      var result = {};
      var schema = _TYNativeApi.TYSdk.device.getDpSchema(dpCode);
      if (typeof schema === 'undefined') return result;
      var lists = schema.range;

      for (var _iterator = lists, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator']();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var v = _ref;

        var key = ('dp_' + dpCode + '_' + v).toLowerCase();
        result[v] = typeof this[key] !== 'undefined' ? this[key] : key;
        this.sendToSentry(key);
        this.saveToI18N(key, result[v]);
      }
      return result;
    }
  }, {
    key: 'getFaultStrings',
    value: function getFaultStrings(faultCode, faultValue) {
      var onlyPrior = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (!faultValue) return '';

      var _TYSdk$device$getDpSc = _TYNativeApi.TYSdk.device.getDpSchema(faultCode),
          label = _TYSdk$device$getDpSc.label;

      var labels = [];
      for (var i = 0; i < label.length; i++) {
        var value = label[i];
        var isExist = _number2.default.getBitValue(faultValue, i);
        if (isExist) {
          labels.push(this.getDpLang(faultCode, value));
          if (onlyPrior) break;
        }
      }
      return onlyPrior ? labels[0] : labels.join(', ');
    }
  }]);

  return I18NWrapper;
}(_TYNativeApi.I18N);

exports.default = I18NWrapper;