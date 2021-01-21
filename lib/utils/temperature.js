Object.defineProperty(exports, "__esModule", {
  value: true
});
var c2f = function c2f(c) {
  return Math.round(1.8 * c + 32, 10);
};

var f2c = function f2c(f) {
  return parseInt(((f - 32) / 1.8).toFixed(0), 10);
};

var TemperatureUitls = {
  c2f: c2f,
  f2c: f2c
};

exports.default = TemperatureUitls;