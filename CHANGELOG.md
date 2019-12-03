# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

# 2.0.0-rc.0 (2019-12-03)


### Bug Fixes

* Iphone XsMax 兼容 ([baf1276](https://github.com/TuyaInc/tuya-panel-kit/commit/baf1276d32c450ecb7f56fb0a20ccc493154d7a5))
* **carousel:** carousel fix ([208279b](https://github.com/TuyaInc/tuya-panel-kit/commit/208279ba9dbfc87e6d6121d564b89ded6616df8d))
* **ColorPicker:** 修复图片锯齿 ([9c87b58](https://github.com/TuyaInc/tuya-panel-kit/commit/9c87b5890b47ceec62d8b6937e2c149fe725f437))
* **OfflineView:** fix Android OfflineView height ([4980a25](https://github.com/TuyaInc/tuya-panel-kit/commit/4980a25f3648b46140f99ff3fefd72081c1f0c12))
* **UnitText:** 修复Icon key可能不唯一的问题 ([99f098d](https://github.com/TuyaInc/tuya-panel-kit/commit/99f098d32a290e0fc9e203608358264fcff4079c))


### Code Refactoring

* 移除ShowMaskView ([fb8b488](https://github.com/TuyaInc/tuya-panel-kit/commit/fb8b488f465fbecdbcb96816e0e8b0329c1fab95))
* 移除业务组件 ([2c47bff](https://github.com/TuyaInc/tuya-panel-kit/commit/2c47bff6b2aac49a3fcdf7c392f0b4057828cf25))


### Features

* **Button:** add new Button ([9ab7ed1](https://github.com/TuyaInc/tuya-panel-kit/commit/9ab7ed1c334228ff693556238a5fcd0e756ad40e))
* **Carousel:** 新增 Carousel 组件 ([28aec7b](https://github.com/TuyaInc/tuya-panel-kit/commit/28aec7b5653890f754ed2a25453a57795005fced))
* **Checkbox:** 新增 Checkbox 组件 ([9c0eba9](https://github.com/TuyaInc/tuya-panel-kit/commit/9c0eba91218a1570172b7589c05b96eb06243e7b))
* **Collapsible:** 新增 Collapsible 组件 ([f9db5d7](https://github.com/TuyaInc/tuya-panel-kit/commit/f9db5d7343f675cf524d41123f110dad45dbfed4))
* **DatePicker:** add loop and pickerFontColor props ([47b8f38](https://github.com/TuyaInc/tuya-panel-kit/commit/47b8f386280d2f817897a888f0785062e71f7386))
* **Divider:** 新增 Divider 组件 ([c959b3f](https://github.com/TuyaInc/tuya-panel-kit/commit/c959b3f9fa0eb390bab7a9b97afe10515505c049))
* **IconFont:** 增加更多内置图标 ([fe4a64d](https://github.com/TuyaInc/tuya-panel-kit/commit/fe4a64da7b17fbaad4cf923632e538746d206b31))
* **Modal:** 新增 Modal 组件 ([828235d](https://github.com/TuyaInc/tuya-panel-kit/commit/828235d6474556084771eda4ce30d32990b74952))
* **Picker:** add ios loop support ([af0324d](https://github.com/TuyaInc/tuya-panel-kit/commit/af0324d2e6836404282cd2ec6fb0004def2b6cb4))
* **TabBar:** 新增 TabBar 组件 ([77da07c](https://github.com/TuyaInc/tuya-panel-kit/commit/77da07c3efa24cd242f39c0533c4aa9bf46af901))
* **TopBar:** add new TopBar ([f9e0b84](https://github.com/TuyaInc/tuya-panel-kit/commit/f9e0b84ccb72612efda072f37a1278df67340a28))
* **TYFlatList/TYSectionList:** 新增几大常用列表项支持 ([f5714fa](https://github.com/TuyaInc/tuya-panel-kit/commit/f5714fa6bcc602ac79ee03d9a499ea24c2997be9))
* **TYListItem:** 拓展应用范围 ([cb027b7](https://github.com/TuyaInc/tuya-panel-kit/commit/cb027b77bfa93ad8584c69d2f278d971af825ca8))


### BREAKING CHANGES

* **Picker:** rename PickerView to Picker
* **TopBar:** 取代旧版本的TopBar
* **Button:** 取代旧版本的Button
* **TYListItem:** Icon props 新增自动适配功能，若为string渲染IconFont组件，若为number或uri对象则渲染Image组件，其余向后兼容
* 移除CircularPicker/ColorPicker/RectColorPicker
* 移除ShowMaskView



<a name="2.0.0"></a>
# 2.0.0 (2019-12-03)


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
