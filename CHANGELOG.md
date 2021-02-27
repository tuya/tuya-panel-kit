# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

# [4.4.0](https://github.com/tuya/tuya-panel-kit/compare/v4.3.4...v4.4.0) (2021-02-25)


### Bug Fixes

* **FullView:** fix background propType error ([#41](https://github.com/tuya/tuya-panel-kit/issues/41)) ([029a395](https://github.com/tuya/tuya-panel-kit/commit/029a395a059f82eca22b052d12b78154003d4ae4))
* **TopBar:** 修复 TopBar 标题文案不居中问题, fixes [#37](https://github.com/tuya/tuya-panel-kit/issues/37) ([#38](https://github.com/tuya/tuya-panel-kit/issues/38)) ([17be0f4](https://github.com/tuya/tuya-panel-kit/commit/17be0f4cacb9715b5bc18d3140aa242216615591))


### Features

* **Slider:** Slider support parcel type ([#46](https://github.com/tuya/tuya-panel-kit/issues/46)) ([9435532](https://github.com/tuya/tuya-panel-kit/commit/9435532578156386ecd48e358c6e56c78be9c304)), closes [#44](https://github.com/tuya/tuya-panel-kit/issues/44)



## [4.3.4](https://github.com/tuya/tuya-panel-kit/compare/v4.3.3...v4.3.4) (2021-02-04)



## [4.3.3](https://github.com/tuya/tuya-panel-kit/compare/v4.3.2...v4.3.3) (2021-01-29)


### Bug Fixes

* **react-navigation:** 修复react-navigation在二级页面首页无法接受参数的问题 ([#34](https://github.com/tuya/tuya-panel-kit/issues/34)) ([f71ebda](https://github.com/tuya/tuya-panel-kit/commit/f71ebda9a2e5103cb69f263bb74e6810013acb5a))


### Features

* **Beacon:** 新增蓝牙Beacon 协议 ([#35](https://github.com/tuya/tuya-panel-kit/issues/35)) ([5fedcfb](https://github.com/tuya/tuya-panel-kit/commit/5fedcfb854ab58d8db42575da41620cf8f9b2fcb))



## [4.3.2](https://github.com/tuya/tuya-panel-kit/compare/v4.3.1...v4.3.2) (2021-01-27)


### Bug Fixes

* **TYNativeApi:** fix parseJSON not defined ([83e41fe](https://github.com/tuya/tuya-panel-kit/commit/83e41fe837e9b31bb2e35e3fd95c5d9381eaf1a8))



## [4.3.1](https://github.com/tuya/tuya-panel-kit/compare/v4.3.1-rc.0...v4.3.1) (2021-01-26)



## [4.3.1-rc.0](https://github.com/tuya/tuya-panel-kit/compare/v4.3.0...v4.3.1-rc.0) (2021-01-26)



# [4.3.0](https://github.com/tuya/tuya-panel-kit/compare/v4.2.1...v4.3.0) (2021-01-26)


### Bug Fixes

* use pascalgn/npm-publish-action@1.3.6 ([334510b](https://github.com/tuya/tuya-panel-kit/commit/334510b0b01386b8d1efa981b1cd9853e2e64c3a))



## [4.2.1](https://github.com/tuya/tuya-panel-kit/compare/v4.2.0...v4.2.1) (2021-01-19)

### Bug Fixes

- TransitionPresets export error ([#27](https://github.com/tuya/tuya-panel-kit/issues/27)) ([f24ff58](https://github.com/tuya/tuya-panel-kit/commit/f24ff584fae1bf670ff3500e999d45fcf5500b1e))

# [4.2.0](https://github.com/tuya/tuya-panel-kit/compare/v4.1.0...v4.2.0) (2021-01-07)

### Bug Fixes

- **Popup:** 修复 Popup.countdown 在安卓 RN 0.59 全功能升级下出现横线间断的问题 ([#22](https://github.com/tuya/tuya-panel-kit/issues/22)) ([51b8f8d](https://github.com/tuya/tuya-panel-kit/commit/51b8f8d757849514efc8a40aab432f90e465515d))
- **Dialog** && **Popup**: 修复同时操作多个弹框，内容消失弹框不消失 [#24](https://github.com/tuya/tuya-panel-kit/issues/24)

## [4.1.0](https://github.com/tuya/tuya-panel-kit/compare/v4.0.0...v4.1.0) (2020-12-29)

### Features

- **RotationView:** 增加 isInteraction 属性不阻塞 InteractionManager 任务队列, fixes [#20](https://github.com/tuya/tuya-panel-kit/issues/20) ([#21](https://github.com/tuya/tuya-panel-kit/issues/21)) ([83d58e1](https://github.com/tuya/tuya-panel-kit/commit/83d58e124cc186faf572c0f3d4443ef553eaa750))

### Bug Fixes

- **Picker:** add type transfer for selectedValue ([f17010e](https://github.com/tuya/tuya-panel-kit/commit/f17010e2161c27d3245353745c7d864ccced0c58)), closes [#17](https://github.com/tuya/tuya-panel-kit/issues/17)

# [4.0.0](https://github.com/tuya/tuya-panel-kit/compare/v4.0.0-rc.1...v4.0.0) (2020-12-25)

### Bug Fixes

- **TimerPicker:** 修复时间制不更新问题。（[62ff90e](https://github.com/tuya/tuya-panel-kit/commit/62ff90e80963739c29a6ccecfb739999ca2b8988)）

### Features

- **Navigation:** add TransitionPresets. ([5ca060d](https://github.com/tuya/tuya-panel-kit/commit/5ca060dffbe56bcd74036afead3f40df11cc9346))
- **Theme:** add useTheme hooks.

### Breaking Changes

- **Navigation:** modify the screenOption structure.

- **Dialog:** Dialog 交互视图向 App 靠齐。（[62ff90e](https://github.com/tuya/tuya-panel-kit/commit/62ff90e80963739c29a6ccecfb739999ca2b8988)）

# [4.0.0-rc.1](https://github.com/tuya/tuya-panel-kit/compare/v4.0.0-rc.0...v4.0.0-rc.1) (2020-12-11)

### Bug Fixes

- react-native-deprecated-custom-components use official npm version ([cc03843](https://github.com/tuya/tuya-panel-kit/commit/cc038433992aa0a9ad5cc6904bbcaec2ecf7848c))

### Features

- remove typings ([16c1d96](https://github.com/tuya/tuya-panel-kit/commit/16c1d9603c4fb47d4bc983df596cb7b8c805aed2))

## [4.0.0-rc.0](https://github.com/tuya/tuya-panel-kit/compare/v2.0.0-rc.7...v4.0.0-rc.0) (2020-11-14)

### Bug Fixes

- **Tabbar:** 给 wrapperWidth 设置默认值 ([34066eb](https://github.com/tuya/tuya-panel-kit/commit/34066ebd590b2bff19498fbae08760c97cfc71d9))
- **Modal:** 修复 node 节点 undefined 的时候崩溃 ([c1d6aed](https://github.com/tuya/tuya-panel-kit/commit/c1d6aed))
- **tabbar:** 修复 tabar 崩溃问题 ([c1d6aed](https://github.com/tuya/tuya-panel-kit/commit/c1d6aed))

### Features

- 支持使用 react-navigation 5
- 测试覆盖率达到 90% 以上
- 支持 react-native@0.59.10
- 支持 typescript 开发

### Breaking Changes

- 因为引入了 react-navigation 所以必须要 app 版本 3.21 以上 即 appRNVersion 5.30 以上
- 4.0 之后不再支持 0.59.10 以下版本，低版本需自行兼容

# [2.0.0-rc.7](https://github.com/tuya/tuya-panel-kit/compare/v2.0.0-rc.6...v2.0.0-rc.7) (2020-09-25)

### Bug Fixes

- **ART:** 修复在 rn0.59 ART,需要嵌套 ScrollView 才能生效的 bug ([92d12a7](https://github.com/tuya/tuya-panel-kit/commit/92d12a73bf45e5887ac367443882baaa55f0a098))
- **Modal:** 修复 Modal 组件点击确认和遮罩动画失效 ([61a8f09](https://github.com/tuya/tuya-panel-kit/commit/61a8f098a0857a2a8b4216090ba73712ec66af13))
- **Modal:** 修复安卓双击或多击 Modal 的内容框会关闭遮罩问题 ([a8ef09f](https://github.com/tuya/tuya-panel-kit/commit/a8ef09ff2ae80c822959b651283f71d9fdfa038e))
- **Modal:** 修复潜在内部 nodes 结点取不到的问题 ([b48c966](https://github.com/tuya/tuya-panel-kit/commit/b48c9661206ab003af9a632d51ab26f26d6fe51f))
- **Progress:** 修复进度条在非手势动作下渐变色无法正常渲染问题 ([297ce5a](https://github.com/tuya/tuya-panel-kit/commit/297ce5a652426b9c683e453c5c5066706a9b38e6))
- **Progress:** 更新最大值 max 和最小值 min ([c5042ee](https://github.com/tuya/tuya-panel-kit/commit/c5042ee092e84e683cbc13a8dac229283a5449d4))
- **Text:** 修复 Text 在某些安卓机型被截断的问题 ([1f843eb](https://github.com/tuya/tuya-panel-kit/commit/1f843eb71c869ef6760c96650bfcaeaf84196659))
- **Toast:** 修复 Toast 组件横屏状态下不居中问题 ([bb6f1ab](https://github.com/tuya/tuya-panel-kit/commit/bb6f1abc135300186d75287f9447239eaeefee4d))
- **TopBar:** 修复 TopBar 里 background 重复导致崩溃 ([2a4e1e1](https://github.com/tuya/tuya-panel-kit/commit/2a4e1e1196dec2013f6c4599679d85a48fa68848))

### Features

- **Offline:** add showOldOffline to decide whether to use the old version offline ([ceb9f42](https://github.com/tuya/tuya-panel-kit/commit/ceb9f42e72e2b198e4bcfe69bc118f444d2c14a6))
- **Popup:** Popup.numberSlider 支持按钮加减 ([15b07b7](https://github.com/tuya/tuya-panel-kit/commit/15b07b7a5cce43329786a3beee3e2d897983e386))
- **Stepper:** 支持禁用 ([bc37d7c](https://github.com/tuya/tuya-panel-kit/commit/bc37d7c724dd0cf686e65977e70f6717d0165398))
- **Stepper:** 暴露实例对象 ([57dfd08](https://github.com/tuya/tuya-panel-kit/commit/57dfd08208cd4db1919bea3b9ad73a98d74b6e24))
- **Toast:** toast 动画时间调整 ([1f49cf4](https://github.com/tuya/tuya-panel-kit/commit/1f49cf45d8bc6d42f7cb49bb7cb69dfcd1e6c72e))

# [2.0.0-rc.6](https://github.com/tuya/tuya-panel-kit/compare/v2.0.0-rc.5...v2.0.0-rc.6) (2020-08-06)

### Bug Fixes

- **Modal:** 修复 Modal 在 unmount 时无法移除 ([5dd58c7](https://github.com/tuya/tuya-panel-kit/commit/5dd58c7ebf1b904e66974f1a4974648967e1fb66))

### Features

- **GlobalToast:** GlobalToast 新增属性可支持原 Toast 方法调用 ([4dfb6a3](https://github.com/tuya/tuya-panel-kit/commit/4dfb6a3de4bb909c0795a1ea6ffa9213691edf68))
- **MQTT:** 新增属性和后台配置字段 hideSignalPop 控制弱网提醒 ([bda7d3a](https://github.com/tuya/tuya-panel-kit/commit/bda7d3af2a3c20390e468285590b299cb128689b))
- **Offline:** add new Offline ([0d87aa7](https://github.com/tuya/tuya-panel-kit/commit/0d87aa74882fe84da6353a9f0fd229f8a388b84b))
- **Popup&Dialog:** 修复点击确认动画不生效问题 & Popup.list 和 Dialog.checkbox 值跳转问题 ([72ba25f](https://github.com/tuya/tuya-panel-kit/commit/72ba25f39af58894ef05d0fdff9d5761263fcd10))
- **Stepper:** add Stepper ([7d0cbe6](https://github.com/tuya/tuya-panel-kit/commit/7d0cbe6d784be000b6c474fb8b3c645e2aac09cd))
- **SwtichButton:** adjust size && fix size&theme conflict ([9918c59](https://github.com/tuya/tuya-panel-kit/commit/9918c599b11aab1b342c9bfe809736b526ef2f6c))
- **Tabs:** 支持设置通过 wrapperStyle 设置 TabContent 的宽度 ([f93d54e](https://github.com/tuya/tuya-panel-kit/commit/f93d54e4c01488825b820795dff4084991b11e05))
- **Toast:** Toast support adaptation ([a87cfe5](https://github.com/tuya/tuya-panel-kit/commit/a87cfe532972ed47d7bf70dcc6f7cdb55a366a8c))
- **typeScript:** 接入 ts ([6485d5f](https://github.com/tuya/tuya-panel-kit/commit/6485d5f691d3f861644457fe545d3f3391014359))

# [2.0.0-rc.5](https://github.com/tuya/tuya-panel-kit/compare/v2.0.0-rc.4...v2.0.0-rc.5) (2020-07-01)

### Bug Fixes

- **nativeApi:** spell error ([deb7507](https://github.com/tuya/tuya-panel-kit/commit/deb7507c5192acdf59aefc9297e6516beb119066))

# [2.0.0-rc.4](https://github.com/tuya/tuya-panel-kit/compare/v2.0.0-rc.3...v2.0.0-rc.4) (2020-07-01)

### Bug Fixes

- **TYSdk:** 修复 apiRequest 解析基础数据类型崩溃 ([30fd8f2](https://github.com/tuya/tuya-panel-kit/commit/30fd8f2627d5ac596766f6cd0bdfd73e1887267e))

- **Progress:** 修复 thumb 过大被截 ([4579450](https://github.com/tuya/tuya-panel-kit/commit/4579450730d37ef98989189bbc0432ef1e1cfe41))

### Features

- **Progress:** add Progress-double and Progress-compose ([c7eec55](https://github.com/tuya/tuya-panel-kit/commit/c7eec5522b2b24fe267aaa444b50c430a00a25f1))

# [2.0.0-rc.3](https://github.com/tuya/tuya-panel-kit/compare/v2.0.0-rc.2...v2.0.0-rc.3) (2020-05-21)

### Bug Fixes

- **Motion:** allow startAnimation when animating ([9084cfd](https://github.com/tuya/tuya-panel-kit/commit/9084cfd8798a0baadffd6eaa5ed265dfe2b713c9))
- **Layout:** 在 5.21 之前的版本不请求 mqtt data ([416ffb6](https://github.com/tuya/tuya-panel-kit/commit/416ffb6a04ac97cf00d60e2d102b952434c49f25))
- **OfflineView:** 允许蓝牙设备在网络离线设备在线的情况下操作 ([99cc363](https://github.com/tuya/tuya-panel-kit/commit/99cc363b8e4f21662a820556d07db1576cc8c120))
- **parseJSON:** 修复传入 false 返回空对象 ([fb2e4c4](https://github.com/tuya/tuya-panel-kit/commit/fb2e4c412e944973dbea05c7b285c66d9d893c57))
- **Popup.countdown:** fix min prop ([ed5a7ef](https://github.com/tuya/tuya-panel-kit/commit/ed5a7eff9d28a3a6741ee04142a53df14337a071))
- **Popup.list:** 修复 Popup.list 在安卓上无法正常显示 Switch ([d8ecb51](https://github.com/tuya/tuya-panel-kit/commit/d8ecb5190ca1a794fdc40e79b33fdc4703beb078))

### Features

- **Dialog:** Dialog 默认添加动效 ScaleFadeIn（放大淡入 / 缩小淡出 ([4795a85](https://github.com/tuya/tuya-panel-kit/commit/4795a85bdaf813e18b79aa57fcc53b3528c9bc49))
- **Popup:** Popup 添加默认动效 PullUp (上拉下滑） ([d50d1bc](https://github.com/tuya/tuya-panel-kit/commit/d50d1bc8a298b8c2e8e9c0163fb837a3e36380c3))

# [2.0.0-rc.2](https://github.com/tuya/tuya-panel-kit/compare/v2.0.0-rc.1...v2.0.0-rc.2) (2020-04-20)

### Bug Fixes

- **Popup.list:** 修复在 global dark / popup light 情况下列表显示问题 ([993b8f6](https://github.com/tuya/tuya-panel-kit/commit/993b8f662effee53665a8ace1bfa3b2ad9f7a553))
- **Popup.list:** 修复每次更新 props 都会重新计算选中值的 bug ([459ad8b](https://github.com/tuya/tuya-panel-kit/commit/459ad8b13ac46ef948fedb098a766fddb21037a2))
- **Popup.toast:** 修复 Popup.toast 无效 bug 并提示即将废弃 ([470a13d](https://github.com/tuya/tuya-panel-kit/commit/470a13d35fbdf56b97691316906ccbe75f179305))

### Features

- **GlobalToast:** 新增 GlobalToast 组件 ([7d62276](https://github.com/tuya/tuya-panel-kit/commit/7d62276cba5a2afc1079e803f13fb9b780e82355))
- **Navigator:** 接入信号强度提醒 ([cef73cc](https://github.com/tuya/tuya-panel-kit/commit/cef73cc00d43d9513d20cc3dafac649aabff2f78))
- **Notification:** 新增 onPress 属性 ([9393c3e](https://github.com/tuya/tuya-panel-kit/commit/9393c3e6f83bad2f4e29fe51b46331cb94f025d6))
- **NotificationLegacy:** 新增 onPress 属性 ([b717d4a](https://github.com/tuya/tuya-panel-kit/commit/b717d4a3e37bb87c02e0e6dcbcf82f67f801fdbf))
- **Popup:** 头部栏添加返回按钮或者副标题 ([9de2f91](https://github.com/tuya/tuya-panel-kit/commit/9de2f9126ead014bbab7d9e7c366e3fec19927d1))
- **Progress:** 新增 Progress 组件 ([b3e53e9](https://github.com/tuya/tuya-panel-kit/commit/b3e53e984f49b493611242b47c1502e2abf50c39))
- **Tabs:** 支持控制 TabContent 加速度阈值、配置右侧额外留白、允许禁用单个项 ([4427f3c](https://github.com/tuya/tuya-panel-kit/commit/4427f3ced44b608f9c42bc195d92a4cca4ca7c2b))
- **Tips:** 新增属性可选择不显示角标 ([9429727](https://github.com/tuya/tuya-panel-kit/commit/9429727c49a4cacda2bdb7331a6016113898f309))

# [2.0.0-rc.1](https://github.com/tuya/tuya-panel-kit/compare/v2.0.0-rc.0...v2.0.0-rc.1) (2020-02-18)

### Bug Fixes

- **Tab:** 修复当 tabContent 实例不存在导致崩溃的 bug ([632baf4](https://github.com/tuya/tuya-panel-kit/commit/632baf4f7d5c583bcc5b7141dede714cde382508))
- **Tabs:** 修复未激活的文字生效的 bug ([201c941](https://github.com/tuya/tuya-panel-kit/commit/201c941f5d99210144ba3e2c7580abd777b99467))
- **TYList:** 修复为跟随主题的 bug ([ae3d7fd](https://github.com/tuya/tuya-panel-kit/commit/ae3d7fd9f2bdc13801238180a1a777e4afc4249a))

### Features

- **Carousel:** add pageStyle ([3699c1a](https://github.com/tuya/tuya-panel-kit/commit/3699c1a599d9eed21028a5a23adb0524b1344a08))
- **DatePicker:** 参数补给是否新增 0 ([9657046](https://github.com/tuya/tuya-panel-kit/commit/9657046c0492b1af8e9bce7e1fecc521491c35ed))
- **Dialog:** 接入 dark mode ([8e31aa1](https://github.com/tuya/tuya-panel-kit/commit/8e31aa1855f5059e4261da90bb494ca61acaf557))
- **FullView:** add Notification motion ([67d2f45](https://github.com/tuya/tuya-panel-kit/commit/67d2f45bd8d7a04f9ff9a340080ab0644900b14d))
- **Modal:** add 键盘自适应 ([b5e1b0e](https://github.com/tuya/tuya-panel-kit/commit/b5e1b0efcce1a328c706fb61f46b05b2f37705c3))
- **Motion:** add motion 动效 ([ca5412f](https://github.com/tuya/tuya-panel-kit/commit/ca5412ff3e245c003c14ee460399980a3a9b17d7))
- **Notification:** add 有动画效果的通知和没动画效果的通知 ([86f5c5c](https://github.com/tuya/tuya-panel-kit/commit/86f5c5c9a08226e2bcd19aa7c8cb7334bbe6d08c))
- **Popup:** 接入 dark mode ([c0173fe](https://github.com/tuya/tuya-panel-kit/commit/c0173fedbf786c7a50eed203beec18bc404bd415))
- **SwitchButton:** 增加 wrapperProps 支持 studio ([b837bde](https://github.com/tuya/tuya-panel-kit/commit/b837bde0cebbfff794a3cc918492a0c19cb99fec))
- **SwitchButton:** 支持渐变形式的按钮 ([d064ef0](https://github.com/tuya/tuya-panel-kit/commit/d064ef02f786cf8a7bb0340b298571b144a7f930))
- **Tips:** add Tips 气泡类型 ([7cb16d7](https://github.com/tuya/tuya-panel-kit/commit/7cb16d7b682ec947ca1d1c4cb7ab3227fbccbcb6))
- **Toast:** add 四种类型 ([a9acffa](https://github.com/tuya/tuya-panel-kit/commit/a9acffa8adc914d3df27ecaf9fc6112fe77372e5))

# 2.0.0-rc.0 (2019-12-03)

### Features

- **Theme:** 新增 Theme 组件，接入主题
- **BrickButton:** 新增 BrickButton 组件
- **Carousel:** 新增 Carousel 组件
- **Collapsible:** 新增 Collapsible 组件
- **ControllerBar:** 新增 ControllerBar 组件
- **Dialog:** 新增 Dialog 组件
- **Divider:** 新增 Divider 组件
- **Notification:** 新增 Notification 组件
- **Popup:** 新增 Popup 组件
- **TabBar:** 新增 TabBar 组件
- **Tabs:** 新增 Tabs 组件
- **TimerPicker:** 新增 TimerPicker 组件

### BREAKING CHANGES

- **ColorPicker:** 移除 CircularPicker / ColorPicker / RectColorPicker

#### 1.0.1 (2019-03-13)

##### Bug Fixes

- **OfflineView:** fix Android OfflineView height [4980a25f](https://github.com/tuya/tuya-panel-kit/commit/4980a25f3648b46140f99ff3fefd72081c1f0c12)
- **TopBar**: Iphone XsMax 兼容 [baf1276d](https://github.com/tuya/tuya-panel-kit/commit/baf1276d32c450ecb7f56fb0a20ccc493154d7a5)
