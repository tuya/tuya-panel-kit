Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/modal/portalOut.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _TYNativeApi = require('../../TYNativeApi');

var _TYModal = require('./TYModal');

var _TYModal2 = _interopRequireDefault(_TYModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TYEvent = _TYNativeApi.TYSdk.event;

var PortalOut = function (_React$Component) {
  _inherits(PortalOut, _React$Component);

  function PortalOut(props) {
    _classCallCheck(this, PortalOut);

    var _this = _possibleConstructorReturn(this, (PortalOut.__proto__ || Object.getPrototypeOf(PortalOut)).call(this, props));

    _initialiseProps.call(_this);

    TYEvent.on('registerPortal', _this.register);
    TYEvent.on('showPortal', _this.show);
    TYEvent.on('removePortal', _this.remove);
    _this.state = {
      uuidList: []
    };
    _this.node = {};

    _this.pendingDeleteNode = {};
    _this._timerId = null;
    return _this;
  }

  _createClass(PortalOut, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this._timerId);
      TYEvent.off('registerPortal', this.register);
      TYEvent.off('showPortal', this.show);
      TYEvent.off('removePortal', this.remove);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var uuidList = this.state.uuidList;

      var hasNode = uuidList.some(function (uuid) {
        return !!_this2.node['' + uuid];
      });
      var lastUuid = uuidList[uuidList.length - 1];

      var _ref = this.node['' + lastUuid] || this.pendingDeleteNode || {},
          _ref$props = _ref.props,
          props = _ref$props === undefined ? {} : _ref$props;

      var onShow = props.onShow,
          onHide = props.onHide,
          _onDismiss = props.onDismiss,
          needProps = _objectWithoutProperties(props, ['onShow', 'onHide', 'onDismiss']);

      var activeIdx = 0;
      var nodes = Object.keys(this.node || {}).length > 0 ? uuidList.map(function (key, idx) {
        activeIdx = idx;
        var node = _this2.node['' + key] && _this2.node['' + key].node;
        return node === undefined ? [] : _react2.default.isValidElement(node) ? _react2.default.cloneElement(node, { key: key }) : node;
      }) : [];
      return _react2.default.createElement(
        _TYModal2.default,
        _extends({
          visible: hasNode,
          activeIdx: activeIdx,
          onDismiss: function onDismiss() {
            _this2.pendingDeleteNode = {};
            typeof _onDismiss === 'function' && _onDismiss();
          }
        }, needProps, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 99
          }
        }),
        nodes
      );
    }
  }]);

  return PortalOut;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.register = function (config) {
    var uuid = config.uuid,
        node = config.node,
        props = config.props,
        isUpdate = config.isUpdate;

    _this3.node['' + uuid] = { node: node, props: props };
    isUpdate && _this3.forceUpdate();
  };

  this.show = function (config) {
    var isDismiss = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var uuid = config.uuid,
        show = config.show;

    if (!_this3.node['' + uuid]) return;
    var _node$$props = _this3.node['' + uuid].props,
        onShow = _node$$props.onShow,
        onHide = _node$$props.onHide,
        onDismiss = _node$$props.onDismiss;

    if (show) onShow && onShow();
    if (!show) {
      if (isDismiss) {
        _reactNative.Platform.OS === 'android' && typeof onDismiss === 'function' && onDismiss();
      } else {
        typeof onHide === 'function' && onHide();
      }
    }

    _this3._timerId = setTimeout(function () {
      var uuidList = _this3.state.uuidList;

      if (show) {
        uuidList = [].concat(_toConsumableArray(_this3.state.uuidList), [uuid]);
      } else {
        uuidList = _this3.state.uuidList.filter(function (id) {
          return id !== uuid;
        });
      }
      _this3.setState({ uuidList: uuidList });
    }, 0);
  };

  this.remove = function (uuid) {
    if (!_this3.node['' + uuid]) return;
    var hasRegistered = _this3.state.uuidList.findIndex(function (id) {
      return id === uuid;
    }) > -1;
    if (hasRegistered) {
      _this3.show({ uuid: uuid, show: false }, true);
    }
    _this3.pendingDeleteNode = _this3.node['' + uuid];
    delete _this3.node['' + uuid];
  };
};

exports.default = PortalOut;