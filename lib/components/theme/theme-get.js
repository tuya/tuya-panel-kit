Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.popup = exports.dialog = undefined;

var _utils = require('../../utils');

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTheme = _utils.ThemeUtils.getTheme;

var d1 = _base2.default.dialog.basic;

var dialog = exports.dialog = {
  width: function width(props) {
    return getTheme(props, 'dialog.width', d1.width);
  },
  radius: function radius(props) {
    return getTheme(props, 'dialog.radius', d1.radius);
  },
  bgColor: function bgColor(props) {
    return getTheme(props, 'dialog.bg', d1.bg);
  },
  lineColor: function lineColor(props) {
    return getTheme(props, 'dialog.lineColor', d1.lineColor);
  },
  cellHeight: function cellHeight(props) {
    return getTheme(props, 'dialog.cellHeight', d1.cellHeight);
  },
  titleFontSize: function titleFontSize(props) {
    return getTheme(props, 'dialog.titleFontSize', d1.titleFontSize);
  },
  titleFontColor: function titleFontColor(props) {
    return getTheme(props, 'dialog.titleFontColor', d1.titleFontColor);
  },
  subTitleFontSize: function subTitleFontSize(props) {
    return getTheme(props, 'dialog.subTitleFontSize', d1.subTitleFontSize);
  },
  subTitleFontColor: function subTitleFontColor(props) {
    return getTheme(props, 'dialog.subTitleFontColor', d1.subTitleFontColor);
  },
  cancelFontSize: function cancelFontSize(props) {
    return getTheme(props, 'dialog.cancelFontSize', d1.cancelFontSize);
  },
  cancelFontColor: function cancelFontColor(props) {
    return getTheme(props, 'dialog.cancelFontColor', d1.cancelFontColor);
  },
  confirmFontSize: function confirmFontSize(props) {
    return getTheme(props, 'dialog.confirmFontSize', d1.confirmFontSize);
  },
  confirmFontColor: function confirmFontColor(props) {
    return getTheme(props, 'dialog.confirmFontColor', d1.confirmFontColor);
  },
  prompt: {
    bg: function bg(props) {
      return getTheme(props, 'dialog.prompt.bg', d1.prompt.bg);
    },
    radius: function radius(props) {
      return getTheme(props, 'dialog.prompt.radius', d1.prompt.radius);
    },
    padding: function padding(props) {
      return getTheme(props, 'dialog.prompt.padding', d1.prompt.padding);
    },
    placeholder: function placeholder(props) {
      return getTheme(props, 'dialog.prompt.placeholder', d1.prompt.placeholder);
    }
  }
};

var d2 = _base2.default.popup.basic;

var popup = exports.popup = {
  cellHeight: function cellHeight(props) {
    return getTheme(props, 'popup.cellHeight', d2.cellHeight);
  },
  cellBg: function cellBg(props) {
    return getTheme(props, 'popup.cellBg', d2.cellBg);
  },
  cellFontColor: function cellFontColor(props) {
    return getTheme(props, 'popup.cellFontColor', d2.cellFontColor);
  },
  cellFontSize: function cellFontSize(props) {
    return getTheme(props, 'popup.cellFontSize', d2.cellFontSize);
  },
  titleRadius: function titleRadius(props) {
    return getTheme(props, 'popup.titleRadius', d2.titleRadius);
  },
  titleHeight: function titleHeight(props) {
    return getTheme(props, 'popup.titleHeight', d2.titleHeight);
  },
  titleBg: function titleBg(props) {
    return getTheme(props, 'popup.titleBg', d2.titleBg);
  },
  footerRadius: function footerRadius(props) {
    return getTheme(props, 'popup.footerRadius', d2.footerRadius);
  },
  bottomBg: function bottomBg(props) {
    return getTheme(props, 'popup.bottomBg', d2.bottomBg);
  },
  lineColor: function lineColor(props) {
    return getTheme(props, 'popup.lineColor', d2.lineColor);
  },
  titleFontSize: function titleFontSize(props) {
    return getTheme(props, 'popup.titleFontSize', d2.titleFontSize);
  },
  titleFontColor: function titleFontColor(props) {
    return getTheme(props, 'popup.titleFontColor', d2.titleFontColor);
  },
  cancelFontSize: function cancelFontSize(props) {
    return getTheme(props, 'popup.cancelFontSize', d2.cancelFontSize);
  },
  cancelFontColor: function cancelFontColor(props) {
    return getTheme(props, 'popup.cancelFontColor', d2.cancelFontColor);
  },
  confirmFontSize: function confirmFontSize(props) {
    return getTheme(props, 'popup.confirmFontSize', d2.confirmFontSize);
  },
  confirmFontColor: function confirmFontColor(props) {
    return getTheme(props, 'popup.confirmFontColor', d2.confirmFontColor);
  },
  subTitleFontColor: function subTitleFontColor(props) {
    return getTheme(props, 'popup.subTitleFontColor', d2.subTitleFontColor);
  },
  backIconColor: function backIconColor(props) {
    return getTheme(props, 'popup.backIconColor', d2.backIconColor);
  }
};

exports.default = {
  dialog: dialog,
  popup: popup
};