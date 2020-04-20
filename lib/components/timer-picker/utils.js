Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPrefix = exports.getTimePrefixSelections = exports.getMinsSelections = exports.getHourSelections = undefined;

var _utils = require('../../utils');

var toFixed = _utils.CoreUtils.toFixed;
var getHourSelections = exports.getHourSelections = function getHourSelections(is12Hours) {
  var hours = [];
  for (var i = 0; i < 24; i++) {
    var label = '';
    if (is12Hours) {
      label = i === 0 ? 12 : i <= 12 ? i : i - 12;
    } else {
      label = toFixed(i, 2);
    }
    hours.push({
      value: i,
      label: label.toString()
    });
  }
  return hours;
};

var getMinsSelections = exports.getMinsSelections = function getMinsSelections() {
  var minutes = [];
  for (var i = 0; i < 60; i++) {
    minutes.push({
      value: i,
      label: toFixed(i, 2)
    });
  }
  return minutes;
};

var getTimePrefixSelections = exports.getTimePrefixSelections = function getTimePrefixSelections() {
  return [{
    value: 'AM',
    label: 'AM'
  }, {
    value: 'PM',
    label: 'PM'
  }];
};

var getPrefix = exports.getPrefix = function getPrefix(hour) {
  return hour >= 12 ? 'PM' : 'AM';
};