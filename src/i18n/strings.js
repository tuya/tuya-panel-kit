import I18N from './index';

const lang = {
  en: {
    offline: 'Device Offline',
    appoffline: 'Network error, please check ',
    alreadyKnow: 'Already Know',
    backToHome: 'Back Home',
    checkHelp: 'Check Help',
    openBle: 'Open Bluetooth',
    openBleShare: 'Open Bluetooth Sharing',
    openBleShareStep: 'Setting > TuyaSmart > Open Bluetooth Sharing',
    deviceOffline: 'Unable to Connect',
    deviceOfflineHelp:
      '① Make sure that the equipment is powered on normally (or the battery is sufficient).\n② Keep the cell phone as close as possible to the device.\n③ If the device has been connected by other mobile phones, please disconnect the connection first.',
    bluetoothShare: 'Bluetooth Sharing',
    bluetoothOfflineTip: 'Please turn on "Bluetooth"',
    bluetoothShareTip: 'Limited functionality, please turn on "Bluetooth Sharing"',
    wifiBadTitle: 'Device Wi-Fi signal is weak',
    detectPlease: 'Please check:',
    internetAccess:
      '1. Whether the router connected to the device works normally and the network is smooth.',
    obstructions:
      '2. Is the device too far away from the router, partition wall or other obstructions?',
    retest: 'Retest the network',
    location: 'The device Wi-Fi signal is weak, please change the device location.',
  },
  zh: {
    offline: '设备暂时不可操作\n请稍后再试',
    appoffline: '当前网络不可用\n请检查手机网络',
    alreadyKnow: '知道了',
    backToHome: '返回首页',
    checkHelp: '查看帮助',
    openBle: '开启系统蓝牙',
    openBleShare: '开启“蓝牙共享”',
    openBleShareStep: '设置 > 涂鸦智能 > 开启蓝牙共享',
    deviceOffline: '设备连接失败',
    deviceOfflineHelp:
      '① 确保设备通电正常（或电池电量充足）\n② 将手机尽量贴近设备\n③ 若设备曾被其他手机连接过，请先断开连接。',
    bluetoothShare: '蓝牙权限',
    bluetoothOfflineTip: '请开启“蓝牙”',
    bluetoothShareTip: '功能受限，请开启“蓝牙共享”',
    wifiBadTitle: '设备Wi-Fi信号弱',
    detectPlease: '请检查:',
    internetAccess: '1.设备连接的路由器是否正常工作，网络通畅',
    obstructions: '2.设备是否与路由器距离过远、隔墙或有其他遮挡物',
    retest: '重新检测网络',
    location: '设备Wi-Fi信号弱，请更换设备位置',
  },
};

const Strings = new I18N(lang);

export default Strings;
