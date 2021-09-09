import { NativeModules } from 'react-native';
import { TYSdk } from 'tuya-panel-core';
import { Utils } from 'tuya-panel-utils';

const ESPNative = Object.assign({}, NativeModules.TYRCTMqttManager);

const requireRnVersion = '5.21';
const { parseJSON } = Utils.JsonUtils;
const { compareVersion, get } = Utils.CoreUtils;

const TYNative = TYSdk.native;

export const getRssi = () => {
  return new Promise((resolve, reject) => {
    const { devId } = TYSdk.devInfo;
    TYNative.apiRNRequest(
      {
        a: 'tuya.m.device.upgrade.rssi.info.query',
        devId,
        v: '1.0',
      },
      d => {
        const data = parseJSON(d);
        resolve(data);
      },
      e => {
        reject(e);
      }
    );
  });
};

/**
 * 下发mqtt消息
 * @param {Number} protocol
 * @param {Object} param
 * @param {Function} success
 * @param {Function} error
 */
const sendMqttData = (param, protocol, success, error) => {
  const appRnVersion = get(TYNative, 'mobileInfo.appRnVersion');
  const isGreater = appRnVersion && compareVersion(appRnVersion, requireRnVersion); // 获取的版本是否比要求的版本高
  if (isGreater === undefined || !NativeModules.TYRCTMqttManager || isGreater === -1) return;
  ESPNative.sendMqttData(protocol, param, success, error);
};

/**
 * 接收mqtt消息
 * @param {Number} protocol
 * @param {Object} param
 * @param {Function} success
 * @param {Function} error
 */
const receiverMqttData = protocol => {
  const appRnVersion = get(TYNative, 'mobileInfo.appRnVersion');
  const isGreater = appRnVersion && compareVersion(appRnVersion, requireRnVersion); // 获取的版本是否比要求的版本高
  if (isGreater === undefined || !NativeModules.TYRCTMqttManager || isGreater === -1) return;
  ESPNative.receiverMqttData(protocol);
};

TYNative.sendMqttData = protocol => {
  const param = { reqType: 'sigQry' };
  return new Promise((resolve, reject) => {
    sendMqttData(
      param,
      protocol,
      data => {
        resolve(parseJSON(data));
      },
      error => {
        reject(error);
      }
    );
  });
};

TYNative.receiverMqttData = protocol => {
  return new Promise((resolve, reject) => {
    receiverMqttData(protocol);
  });
};

export default TYNative;
