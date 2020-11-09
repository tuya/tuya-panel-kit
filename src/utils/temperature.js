const c2f = c => Math.round(1.8 * c + 32, 10);

const f2c = f => parseInt(((f - 32) / 1.8).toFixed(0), 10);

const TemperatureUitls = {
  c2f,
  f2c,
};

export default TemperatureUitls;
