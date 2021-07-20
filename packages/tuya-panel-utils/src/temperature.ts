const c2f: (c: number) => number = (c: number) => Math.round(1.8 * c + 32);

const f2c: (f: number) => number = (f: number) => parseInt(((f - 32) / 1.8).toFixed(0), 10);

const TemperatureUitls = {
  c2f,
  f2c,
};

export default TemperatureUitls;
