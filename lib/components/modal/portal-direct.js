Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _TYNativeApi = require('../../TYNativeApi');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TYEvent = _TYNativeApi.TYSdk.event;

var uuid = 0;

var Portal = function Portal() {
  var _this = this;

  _classCallCheck(this, Portal);

  this.show = function (ele, props) {
    var userProps = _extends({}, { onMaskPress: _this.hide }, props);
    uuid += 1;
    _this.uuid = 'portal-direct-' + uuid;
    TYEvent.emit('registerPortal', {
      node: ele,
      uuid: _this.uuid,
      props: userProps,
      isUpdate: false
    });
    TYEvent.emit('showPortal', { uuid: _this.uuid, show: true });
  };

  this.hide = function () {
    _this.uuid = 'portal-direct-' + uuid--;
    TYEvent.emit('showPortal', { uuid: _this.uuid, show: false });
    TYEvent.emit('removePortal', _this.uuid);
  };

  this.uuid = 'portal-direct-' + uuid;
};

exports.default = new Portal();