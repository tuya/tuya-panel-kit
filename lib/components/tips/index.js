Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/tips/index.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNative = require('react-native');

var _motion = require('../motion');

var _motion2 = _interopRequireDefault(_motion);

var _utils = require('../../utils');

var _styled = require('./styled');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = _utils.RatioUtils.convertX;


var MOTION_TYPES = Object.keys(_motion2.default).filter(function (v) {
  return v !== 'Toast';
});

var path = {
  top: 'M1023.977245 1023.948801c-37.318282 0-74.60812 0.170663-111.926402-0.22755-35.696985-0.398213-75.660541-0.96709-110.418879-14.108131-37.545832-14.221906-62.377281-39.110242-87.379392-68.378925-18.004933-21.048421-53.360592-65.961201-70.597542-87.635386-14.079687-17.777383-41.670185-52.905491-56.745406-69.943335C567.966045 762.294171 544.528344 739.539121 511.988622 739.539121c-32.568165 0-55.977423 22.75505-74.921001 44.08791-15.075221 17.0094-42.665719 52.165952-56.77385 69.943334-17.180063 21.674185-52.535721 66.586965-70.540654 87.635386-25.058999 29.297127-49.862003 54.157019-87.407836 68.378925-34.758339 13.112597-74.721895 13.709918-110.418879 14.108131-37.318282 0.398213-74.60812 0.22755-111.926402 0.22755h1023.977245z',
  bottom: 'M1023.977245 0.051199c-37.318282 0-74.60812-0.170663-111.926402 0.22755-35.696985 0.398213-75.660541 0.96709-110.418879 14.108131-37.545832 14.221906-62.377281 39.110242-87.379392 68.378925-18.004933 21.048421-53.360592 65.961201-70.597542 87.635386-14.079687 17.777383-41.670185 52.905491-56.745406 69.943335C567.966045 261.705829 544.528344 284.460879 511.988622 284.460879c-32.568165 0-55.977423-22.75505-74.921001-44.08791-15.075221-17.0094-42.665719-52.165952-56.77385-69.943334-17.180063-21.674185-52.535721-66.586965-70.540654-87.635386-25.058999-29.297127-49.862003-54.157019-87.407836-68.378925C187.586943 1.302727 147.623386 0.705407 111.926402 0.307193 74.60812-0.09102 37.318282 0.079643 0 0.079643h1023.977245z'
};

var Tips = function (_PureComponent) {
  _inherits(Tips, _PureComponent);

  function Tips(props) {
    _classCallCheck(this, Tips);

    var _this = _possibleConstructorReturn(this, (Tips.__proto__ || Object.getPrototypeOf(Tips)).call(this, props));

    _this.state = {
      visible: props.show
    };
    return _this;
  }

  _createClass(Tips, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.show !== this.props.show) {
        if (this.props.widthModal) {
          this.setState({
            visible: true
          });
        } else {
          this.setState({
            visible: nextProps.show
          });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var visible = this.state.visible;
      var _props = this.props,
          contentStyle = _props.contentStyle,
          children = _props.children,
          cornerPosition = _props.cornerPosition,
          motionType = _props.motionType,
          bgColor = _props.bgColor,
          showCorner = _props.showCorner,
          motionConfig = _props.motionConfig,
          tipStyle = _props.tipStyle;

      var iconPosition = this.Position;
      var isTop = cornerPosition.match('top');
      var MotionComp = _motion2.default[motionType];
      return _react2.default.createElement(
        MotionComp,
        _extends({}, motionConfig, {
          show: visible,
          style: [{ alignItems: 'center', justifyContent: 'center' }, tipStyle],
          __source: {
            fileName: _jsxFileName,
            lineNumber: 137
          }
        }),
        _react2.default.createElement(
          _reactNative.View,
          { style: { borderRadius: cx(5) }, __source: {
              fileName: _jsxFileName,
              lineNumber: 142
            }
          },
          showCorner && isTop && _react2.default.createElement(_styled.StyledIconFont, { style: iconPosition, color: bgColor, d: path.top, __source: {
              fileName: _jsxFileName,
              lineNumber: 144
            }
          }),
          _react2.default.createElement(
            _styled.StyledViewChildren,
            {
              style: [contentStyle, { backgroundColor: bgColor, alignItems: 'center', justifyContent: 'center' }],
              __source: {
                fileName: _jsxFileName,
                lineNumber: 146
              }
            },
            children
          ),
          !isTop && showCorner && _react2.default.createElement(_styled.StyledIconFont, { style: iconPosition, color: bgColor, d: path.bottom, __source: {
              fileName: _jsxFileName,
              lineNumber: 155
            }
          })
        )
      );
    }
  }, {
    key: 'Position',
    get: function get() {
      var cornerPosition = this.props.cornerPosition;

      var position = cornerPosition.match('Left') ? 'Left' : cornerPosition.match('Right') ? 'Right' : 'Center';
      switch (position) {
        case 'Left':
          return { alignSelf: 'flex-start', left: cx(16) };
        case 'Center':
          return { alignSelf: 'center' };
        case 'Right':
          return { alignSelf: 'flex-end', right: cx(16) };
        default:
          break;
      }
    }
  }]);

  return Tips;
}(_react.PureComponent);

Tips.propTypes = {
  contentStyle: _reactNative.ViewPropTypes.style,

  tipStyle: _reactNative.ViewPropTypes.style,

  bgColor: _reactNative.ColorPropType,

  show: _propTypes2.default.bool,

  children: _propTypes2.default.element,

  showCorner: _propTypes2.default.bool,

  cornerPosition: _propTypes2.default.oneOf(['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight']),

  motionType: _propTypes2.default.oneOf(MOTION_TYPES),

  motionConfig: _propTypes2.default.object
};
Tips.defaultProps = {
  children: null,
  show: false,
  bgColor: '#fff',
  showCorner: true,
  contentStyle: undefined,
  tipStyle: null,
  motionType: 'ScaleFadeIn',
  cornerPosition: 'topCenter',
  motionConfig: {}
};
exports.default = Tips;