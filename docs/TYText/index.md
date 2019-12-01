# TYText - 文字

---


<a name="a4d3b02a"></a>
## 简介

在**React Native**中，`Text`组件的默认props在Android和iOS上不一致。<br />`TYText`在`Text`组件上进行了一层封装保证iOS与Android表征一致。

<a name="da441097"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/TuyaInc/tuya-panel-kit/tree/master/example/src/scenes)

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { TYText, Utils, defaultTheme } from 'tuya-panel-kit';

const { withTheme } = Utils.ThemeUtils;

const TYTextScene = props => {
  const typeMap = ['heading', 'title', 'paragraph'];
  const sizeMap = ['large', 'normal', 'small'];
  return (
    <ScrollView>
      {typeMap.map(type =>
        sizeMap.map((size, idx) => {
          const { fontSize } = defaultTheme.text[type][size](props.theme);
          return (
            <View
              key={`${type}-${size}`}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: 36,
              }}
            >
              <TYText>{`${type}-${size}`}</TYText>
              <TYText type={type} size={sizeMap[idx]}>{`${fontSize}px`}</TYText>
            </View>
          );
        })
      )}
      {/* Custom Size Text */}
      <TYText color="red" align="center" weight="bold" size={36} text="自定义大小 36px" />
      <TYText style={{ fontSize: 36, textAlign: 'center' }} text="自定义大小 36px" />
    </ScrollView>
  );
};

TYTextScene.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withTheme(TYTextScene);
```

## 交互演示

![TYText.gif](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/cd4e620f-3461-4ba2-9e20-64fdf5347d70.gif)

<a name="API"></a>
## API

`TYText`的`Props`继承自[Text](https://facebook.github.io/react-native/docs/0.51/text#props)

<a name="style"></a>
### style

Text的样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [Text.propTypes.style](https://facebook.github.io/react-native/docs/text#style) | 否 | null |

<a name="type"></a>
### type

字体类型

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `'heading' | 'title' | 'paragraph'` | 否 | null |

<a name="size"></a>
### size

字体尺寸

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `'large' | 'normal' | 'small' | number` | 否 | null |

> 注: type 和 size 属性都设置为枚举值时，会从主题中获取对应值，如设置了 type: 'heading'，size: 'small'时，则会去 text.heading.small获取对应的字体大小和字体行高，更多信息可参考主题文档。

<a name="align"></a>
### align

字体对齐方式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `'left' | 'center' | 'right'` | 否 | null |

<a name="weight"></a>
### weight

字体粗细

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number | string` | 否 | null |

<a name="color"></a>
### color

字体颜色

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ColorPropType](https://facebook.github.io/react-native/docs/colors) | 否 | '#fff' |

<a name="color"></a>
### color

字体颜色

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ColorPropType](https://facebook.github.io/react-native/docs/colors) | 否 | '#333' |

<a name="text"></a>
### text

文字

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `string` | 是 | null |


<a name="Methods"></a>
## Methods

<a name="setText"></a>
### setText

```jsx
static setText(text)
```

设置TYText内的文字

