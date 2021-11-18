export interface DevInfo<S = Record<string, DpType>> {
  ability: number;
  activeTime: number;
  /**
   * @deprecated
   */
  appId: number;
  appKey: string;
  /**
   * @desc 网络是否在线
   */
  appOnline: boolean;
  attribute: number;
  baseAttribute: number;
  bv: number;
  capability: number;
  category: string;
  categoryCode: string;
  cloudOnline: boolean;
  codeIds: Record<string, string>;
  communication: Record<string, any>;
  devAttribute: number;
  /**
   * @desc 设备是否在线
   */
  deviceOnline: boolean;
  deviceType: number;
  devId: string;
  displayDps: any[];
  displayMsgs: Record<string, any>;
  displayOrder: number;
  dpMaxTime: number;
  dpName: Record<string | number, string>;
  dps: Record<number, string>;
  errorCode: number;
  faultDps: any[];
  gatewayVerCAD: string;
  gwType: string;
  homeDisplayOrder: number;
  homeId: number;
  i18nTime: number;
  iconUrl: string;
  idCodes: Record<number, string>;
  ip: string;
  isAdmin: boolean;
  isCloudOnline: boolean;
  /**
   * @desc 局域网是否在线
   */
  isLocalOnline: boolean;
  isMeshBleOnline: boolean;
  isNewFirmware: boolean;
  isShare: boolean;
  isUniversalPanel: boolean;
  isVDevice: boolean;
  latitude: string;
  localKey: string;
  longitude: string;
  lpv: number;
  meshId: string;
  name: string;
  networkType: NetworkType;
  originJson: Record<string, any>;
  panelConfig: {
    bic: Array<{ code: string; selected: boolean; value?: string | undefined }>;
    fun?: Record<string, any> | undefined;
  };
  pcc: string;
  productId: string;
  protocolAttribute: number;
  pv: number;
  quickOpDps: any[];
  rnFind: boolean;
  roomId: number;
  runtimeEnv: string;
  schema: {
    [K in keyof S]: DpSchema;
  };
  schemaExt: string;
  sharedTime: number;
  sigmeshId: string;
  standard: boolean;
  standSchemaModel: Record<string, any>;
  state: S;
  supportGroup: boolean;
  supportSGroup: boolean;
  timezoneId: string;
  ui: string;
  uiId: string;
  uiPhase: string;
  uiType: string;
  uiVersion: string;
  upgrading: boolean;
  uuid: string;
  vendorInfo: string;
  verSw: string;
  virtual: boolean;
  parentId?: string | undefined;
  groupId?: string | undefined;
}

export interface DpSchema {
  code: string;
  dptype: string;
  iconname: string;
  id: string;
  /**
   * type: 'bitmap' only
   */
  label?: string[] | undefined;
  /**
   * type: 'bitmap' only
   */
  maxlen?: number | undefined;
  /**
   * type: 'value' only
   */
  max?: number | undefined;
  /**
   * type: 'value' only
   */
  min?: number | undefined;
  mode: 'rw' | 'ro' | 'rw';
  name: string;
  /**
   * type: 'enum' only
   */
  range?: any[] | undefined;
  /**
   * type: 'value' only
   */
  scale?: number | undefined;
  /**
   * type: 'value' only
   */
  step?: number | undefined;
  type: DpType;
  /**
   * type: 'value' only
   */
  unit?: string | undefined;
}

export type NetworkType = 'WIFI' | 'GPRS' | 'BLE' | 'NONE';

export type DpType = 'bool' | 'value' | 'enum' | 'raw' | 'string' | 'bitmap';

export interface INavigatorState {
  modalVisible: boolean;
  isMqttNoticeActive: boolean;
}

export interface INavigatorProps {
  devInfo: DevInfo;
}
