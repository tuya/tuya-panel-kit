import StringUtil from '../string';

describe('StringUtil hexStringToNumber', () => {
  it('StringUtil.hexStringToNumber("AD03") = [173, 3]', () => {
    const result = StringUtil.hexStringToNumber('AD03');
    expect(result).toEqual([173, 3]);
  });

  it('StringUtil.hexStringToNumber("0fe9") = [15, 233]', () => {
    // 0fe9 4073
    const result = StringUtil.hexStringToNumber('0fe9');
    expect(result).toEqual([15, 233]);
  });
});

describe('StringUtil hexStringToBinString', () => {
  it('StringUtil.hexStringToBinString("AD03") = "1010110100000011"', () => {
    const result = StringUtil.hexStringToBinString('AD03');
    expect(result).toEqual('1010110100000011');
  });

  it('StringUtil.hexStringToBinString("0fe9") = "0000111111101001"', () => {
    const result = StringUtil.hexStringToBinString('0fe9');
    expect(result).toEqual('0000111111101001');
    expect(0x0fe9).toEqual(0b0000111111101001);
  });
});

describe('StringUtil strToHexString', () => {
  it('StringUtil.strToHexString("ababba0102hghg0011100") = "1010110100000011"', () => {
    const result = StringUtil.strToHexString('ababba0102hghg0011100');
    expect(result).toEqual('3');
  });

  it('StringUtil.strToHexString("ababba0102hghg001110011000111") = "398"', () => {
    const result = StringUtil.strToHexString('ababba0102hghg001110011000111');
    expect(result).toEqual('398');
  });
});

describe('StringUtil camelize', () => {
  it('StringUtil.camelize("ababba0102hghg0011100") = "ababba0102hghg0011100"', () => {
    const result = StringUtil.camelize('ababba0102hghg0011100');
    expect(result).toEqual('ababba0102hghg0011100');
  });

  it('StringUtil.camelize("tuya_hosts") = "tuyaHosts"', () => {
    const result = StringUtil.camelize('tuya_hosts');
    expect(result).toEqual('tuyaHosts');
  });

  it('StringUtil.camelize("tuya-hosts") = "tuyaHosts"', () => {
    const result = StringUtil.camelize('tuya-hosts');
    expect(result).toEqual('tuyaHosts');
  });

  it('StringUtil.camelize(11) = "11"', () => {
    const result = StringUtil.camelize(11);
    expect(result).toEqual('11');
  });
});
