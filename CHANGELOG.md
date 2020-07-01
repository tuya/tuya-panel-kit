# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

# [2.0.0-rc.4](https://github.com/TuyaInc/tuya-panel-kit/compare/v2.0.0-rc.3...v2.0.0-rc.4) (2020-07-01)


### Bug Fixes

修复 apiRequest 解析基础数据类型崩溃 ([30fd8f2](https://github.com/TuyaInc/tuya-panel-kit/commit/30fd8f2627d5ac596766f6cd0bdfd73e1887267e))
* **Progress:** 修复 thumb 过大被截 ([4579450](https://github.com/TuyaInc/tuya-panel-kit/commit/4579450730d37ef98989189bbc0432ef1e1cfe41))


### Features

* **Progress:** add Progress-double and Progress-compose ([c7eec55](https://github.com/TuyaInc/tuya-panel-kit/commit/c7eec5522b2b24fe267aaa444b50c430a00a25f1))



# [2.0.0-rc.3](https://github.com/TuyaInc/tuya-panel-kit/compare/v2.0.0-rc.2...v2.0.0-rc.3) (2020-05-21)


### Bug Fixes

* **Motion:** allow startAnimation when animating ([9084cfd](https://github.com/TuyaInc/tuya-panel-kit/commit/9084cfd8798a0baadffd6eaa5ed265dfe2b713c9))
* do not request mqtt data below version 5.21 ([416ffb6](https://github.com/TuyaInc/tuya-panel-kit/commit/416ffb6a04ac97cf00d60e2d102b952434c49f25))
* **OfflineView:** 允许蓝牙设备在网络离线设备在线的情况下操作 ([99cc363](https://github.com/TuyaInc/tuya-panel-kit/commit/99cc363b8e4f21662a820556d07db1576cc8c120))
* **parseJSON:** 修复传入 false 返回空对象 ([fb2e4c4](https://github.com/TuyaInc/tuya-panel-kit/commit/fb2e4c412e944973dbea05c7b285c66d9d893c57))
* **Popup.countdown:** fix min prop ([ed5a7ef](https://github.com/TuyaInc/tuya-panel-kit/commit/ed5a7eff9d28a3a6741ee04142a53df14337a071))
* **Popup.list:** 修复 Popup.list 在安卓上无法正常显示 Switch ([d8ecb51](https://github.com/TuyaInc/tuya-panel-kit/commit/d8ecb5190ca1a794fdc40e79b33fdc4703beb078))


### Features

* **Dialog:** Dialog 默认添加动效 ScaleFadeIn（放大淡入 / 缩小淡出 ([4795a85](https://github.com/TuyaInc/tuya-panel-kit/commit/4795a85bdaf813e18b79aa57fcc53b3528c9bc49))
* **Popup:** Popup 添加默认动效 PullUp (上拉下滑） ([d50d1bc](https://github.com/TuyaInc/tuya-panel-kit/commit/d50d1bc8a298b8c2e8e9c0163fb837a3e36380c3))



# [2.0.0-rc.2](https://github.com/TuyaInc/tuya-panel-kit/compare/v2.0.0-rc.1...v2.0.0-rc.2) (2020-04-20)


### Bug Fixes

* **Popup.list:** 修复在 global dark / popup light 情况下列表显示问题 ([993b8f6](https://github.com/TuyaInc/tuya-panel-kit/commit/993b8f662effee53665a8ace1bfa3b2ad9f7a553))
* **Popup.list:** 修复每次更新 props 都会重新计算选中值的 bug ([459ad8b](https://github.com/TuyaInc/tuya-panel-kit/commit/459ad8b13ac46ef948fedb098a766fddb21037a2))
* **Popup.toast:** 修复Popup.toast 无效 bug 并提示即将废弃 ([470a13d](https://github.com/TuyaInc/tuya-panel-kit/commit/470a13d35fbdf56b97691316906ccbe75f179305))


### Features

* **GlobalToast:** 新增 GlobalToast 组件 ([7d62276](https://github.com/TuyaInc/tuya-panel-kit/commit/7d62276cba5a2afc1079e803f13fb9b780e82355))
* **Navigator:** 接入信号强度提醒 ([cef73cc](https://github.com/TuyaInc/tuya-panel-kit/commit/cef73cc00d43d9513d20cc3dafac649aabff2f78))
* **Notification:** 新增 onPress 属性 ([9393c3e](https://github.com/TuyaInc/tuya-panel-kit/commit/9393c3e6f83bad2f4e29fe51b46331cb94f025d6))
* **NotificationLegacy:** 新增 onPress 属性 ([b717d4a](https://github.com/TuyaInc/tuya-panel-kit/commit/b717d4a3e37bb87c02e0e6dcbcf82f67f801fdbf))
* **Popup:** 头部栏添加返回按钮或者副标题 ([9de2f91](https://github.com/TuyaInc/tuya-panel-kit/commit/9de2f9126ead014bbab7d9e7c366e3fec19927d1))
* **Progress:** 新增 Progress 组件 ([b3e53e9](https://github.com/TuyaInc/tuya-panel-kit/commit/b3e53e984f49b493611242b47c1502e2abf50c39))
* **Tabs:** 支持控制 TabContent 加速度阈值、配置右侧额外留白、允许禁用单个项 ([4427f3c](https://github.com/TuyaInc/tuya-panel-kit/commit/4427f3ced44b608f9c42bc195d92a4cca4ca7c2b))
* **Tips:** 新增属性可选择不显示角标 ([9429727](https://github.com/TuyaInc/tuya-panel-kit/commit/9429727c49a4cacda2bdb7331a6016113898f309))



# [2.0.0-rc.1](https://github.com/TuyaInc/tuya-panel-kit/compare/v2.0.0-rc.0...v2.0.0-rc.1) (2020-02-18)


### Bug Fixes

* **Tab:** 修复当tabContent实例不存在导致崩溃的bug ([632baf4](https://github.com/TuyaInc/tuya-panel-kit/commit/632baf4f7d5c583bcc5b7141dede714cde382508))
* **Tabs:** 修复未激活的文字生效的bug ([201c941](https://github.com/TuyaInc/tuya-panel-kit/commit/201c941f5d99210144ba3e2c7580abd777b99467))
* **TYList:** 修复为跟随主题的bug ([ae3d7fd](https://github.com/TuyaInc/tuya-panel-kit/commit/ae3d7fd9f2bdc13801238180a1a777e4afc4249a))


### Features

* **Carousel:** add pageStyle ([3699c1a](https://github.com/TuyaInc/tuya-panel-kit/commit/3699c1a599d9eed21028a5a23adb0524b1344a08))
* **DatePicker:** 参数补给是否新增0 ([9657046](https://github.com/TuyaInc/tuya-panel-kit/commit/9657046c0492b1af8e9bce7e1fecc521491c35ed))
* **Dialog:** 接入dark mode ([8e31aa1](https://github.com/TuyaInc/tuya-panel-kit/commit/8e31aa1855f5059e4261da90bb494ca61acaf557))
* **FullView:** add Notification motion ([67d2f45](https://github.com/TuyaInc/tuya-panel-kit/commit/67d2f45bd8d7a04f9ff9a340080ab0644900b14d))
* **Modal:** add 键盘自适应 ([b5e1b0e](https://github.com/TuyaInc/tuya-panel-kit/commit/b5e1b0efcce1a328c706fb61f46b05b2f37705c3))
* **Motion:** add motion动效 ([ca5412f](https://github.com/TuyaInc/tuya-panel-kit/commit/ca5412ff3e245c003c14ee460399980a3a9b17d7))
* **Notification:** add 有动画效果的通知和没动画效果的通知 ([86f5c5c](https://github.com/TuyaInc/tuya-panel-kit/commit/86f5c5c9a08226e2bcd19aa7c8cb7334bbe6d08c))
* **Popup:** 接入dark mode ([c0173fe](https://github.com/TuyaInc/tuya-panel-kit/commit/c0173fedbf786c7a50eed203beec18bc404bd415))
* **SwitchButton:** 增加wrapperProps支持studio ([b837bde](https://github.com/TuyaInc/tuya-panel-kit/commit/b837bde0cebbfff794a3cc918492a0c19cb99fec))
* **SwitchButton:** 支持渐变形式的按钮 ([d064ef0](https://github.com/TuyaInc/tuya-panel-kit/commit/d064ef02f786cf8a7bb0340b298571b144a7f930))
* **Tips:** add Tips气泡类型 ([7cb16d7](https://github.com/TuyaInc/tuya-panel-kit/commit/7cb16d7b682ec947ca1d1c4cb7ab3227fbccbcb6))
* **Toast:** add 四种类型 ([a9acffa](https://github.com/TuyaInc/tuya-panel-kit/commit/a9acffa8adc914d3df27ecaf9fc6112fe77372e5))



# 2.0.0-rc.0 (2019-12-03)


### Features

* **Theme:** 新增 Theme 组件，接入主题
* **BrickButton:** 新增 BrickButton 组件
* **Carousel:** 新增 Carousel 组件
* **Collapsible:** 新增 Collapsible 组件
* **ControllerBar:** 新增 ControllerBar 组件
* **Dialog:** 新增 Dialog 组件
* **Divider:** 新增 Divider 组件
* **Notification:** 新增 Notification 组件
* **Popup:** 新增 Popup 组件
* **TabBar:** 新增 TabBar 组件
* **Tabs:** 新增 Tabs 组件
* **TimerPicker:** 新增 TimerPicker 组件

### BREAKING CHANGES

* **ColorPicker:** 移除 CircularPicker / ColorPicker / RectColorPicker

#### 1.0.1 (2019-03-13)

##### Bug Fixes

* `OfflineView`: fix Android OfflineView height [4980a25f](https://github.com/TuyaInc/tuya-panel-kit/commit/4980a25f3648b46140f99ff3fefd72081c1f0c12)
* `TopBar`: Iphone XsMax 兼容 [baf1276d](https://github.com/TuyaInc/tuya-panel-kit/commit/baf1276d32c450ecb7f56fb0a20ccc493154d7a5)
