/* eslint-disable quotes */
import I18N from './index';

const lang = {
  en: {
    offline: 'Device Offline',
    appoffline: 'Network error, please check ',
    alreadyKnow: 'Got It',
    backToHome: 'Homepage',
    checkHelp: 'View Help',
    openBle: 'Enable System Bluetooth',
    openBleShare: 'Enable Bluetooth Sharing',
    openBleShareStep: 'Settings > Find Your App > Enable Bluetooth Sharing',
    deviceOffline: 'Device Connection Failure',
    deviceOfflineHelp:
      '① Make sure that the device is powered on or that the battery capacity is sufficient.\n② Place the mobile phone as close as possible to the device.\n③ If the device has been connected to another mobile phone, close the connection and try again.',
    deviceOfflineHelpNew:
      '① Make sure that the device is powered on or that the battery capacity is sufficient.\n② Place the mobile phone as close as possible to the device.\n③ If the device has been connected to another mobile phone, close the connection and try to ',
    bluetoothShare: 'Bluetooth Sharing',
    bluetoothOfflineTip: 'Enable Bluetooth on your mobile phone.',
    bluetoothShareTip: 'Limited functionality, please turn on "Bluetooth Sharing"',
    wifiBadTitle: 'Weak Wi-Fi Signal',
    detectPlease: 'Check the following items:',
    internetAccess:
      '1. Whether the router that is connected to the device is working as expected in excellent network conditions.',
    obstructions:
      '2. Whether the device is too far away from the router, or whether the data transmission is obstructed by walls or other barriers.',
    retest: 'Retest Network',
    location: 'The Wi-Fi signal of the device is weak. Change the device position.',
    offline_alreadyOffline: 'Offline Device',
    offline_pleaseCheck: 'Check the following items:',
    offline_moreHelp: 'More Help',
    offline_checkHelps: 'The device is offline. Please check the help',
    offline_textLinkBefore:
      '1. Whether your device is powered on.\n2. Whether the router that is connected to your device is working as expected.',
    offline_linkFront: '3. Whether the name or password of the router is modified. You can try to ',
    offline_link: 'reconnect the router.',
    offline_textLinkAfter:
      '4. Whether your device is too far away from the router, whether the signal is weak, or whether the data transmission is obstructed.',
    offline_textLinkMore: '',
  },
  zh: {
    offline: '设备暂时不可操作\n请稍后再试',
    appoffline: '当前网络不可用\n请检查手机网络',
    alreadyKnow: '知道了',
    backToHome: '返回首页',
    checkHelp: '查看帮助',
    openBle: '开启系统蓝牙',
    openBleShare: '开启“蓝牙共享”',
    openBleShareStep: '设置 > 找到你的 App > 开启蓝牙共享',
    deviceOffline: '设备连接失败',
    deviceOfflineHelp:
      '① 确保设备通电正常（或电池电量充足）\n② 将手机尽量贴近设备\n③ 若设备曾被其他手机连接过，请先断开连接。',
    deviceOfflineHelpNew:
      '① 确保设备通电正常（或电池电量充足）\n② 将手机尽量贴近设备\n③ 若设备曾被其他手机连接过，请先断开，再进行',
    bluetoothShare: '蓝牙权限',
    bluetoothOfflineTip: '请开启“蓝牙”',
    bluetoothShareTip: '功能受限，请开启“蓝牙共享”',
    wifiBadTitle: '设备Wi-Fi信号弱',
    detectPlease: '请检查:',
    internetAccess: '1.设备连接的路由器是否正常工作，网络通畅',
    obstructions: '2.设备是否与路由器距离过远、隔墙或有其他遮挡物',
    retest: '重新检测网络',
    location: '设备Wi-Fi信号弱，请更换设备位置',
    offline_alreadyOffline: '设备已离线',
    offline_pleaseCheck: '请依次检查：',
    offline_moreHelp: '更多帮助',
    offline_checkHelps: '设备已离线，请查看帮助',
    offline_textLinkBefore: '1. 请检查您的设备是否有电\n2. 您的设备连接的路由器是否正常工作',
    offline_linkFront: '3. 检查是否修改了路由器的名称或密码，可以尝试',
    offline_link: '重新连接',
    offline_textLinkAfter: '4. 您的设备是否离路由器过远、信号较差或有遮挡物',
    offline_textLinkMore: '',
  },
};

const Strings = new I18N(lang);

export default Strings;
