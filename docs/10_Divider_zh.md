# Divider 分隔栏

<a name="e05dce83"></a>
## 简介

分隔线


<a name="da441097"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/TuyaInc/tuya-panel-kit/tree/develop_2.0/example/src/scenes)

<a name="91b287a7"></a>
### 简单分隔线

Divider默认会根据父元素的宽度自动适配

```jsx
import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TextInput, ViewPropTypes, StyleSheet } from 'react-native';
import { Divider, TYText } from 'tuya-panel-kit';

function InputItem({ style, title, titleStyle, inputStyle, ...textInputProps }) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <TYText style={[styles.title, titleStyle]}>{title}</TYText>
        <TextInput
          style={[styles.textInput, inputStyle]}
          placeholderTextColor="#dbdbdb"
          {...textInputProps}
        />
      </View>
      <View style={styles.dot} />
      <Divider />
    </View>
  );
}

InputItem.propTypes = {
  ...TextInput.propTypes,
  title: PropTypes.string.isRequired,
  titleStyle: Text.propTypes.style,
  inputStyle: ViewPropTypes.style,
};

InputItem.defaultProps = {
  titleStyle: null,
  inputStyle: null,
};

const styles = StyleSheet.create({
  container: {
    height: 94,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },

  content: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  title: {
    fontSize: 14,
    color: '#999',
  },

  textInput: {
    alignSelf: 'stretch',
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#dbdbdb',
  },
});

export default InputItem;
```

<a name="API"></a>
## API

<a name="style"></a>
### style

分隔线样式

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 |

<a name="flexDirection"></a>
### flexDirection

主轴方向，默认为row

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `row | column` | 否 | row |

<a name="visible"></a>
### visible

是否显示

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `boolean` | 否 | true |

<a name="color"></a>
### color

分隔线颜色

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ColorPropType](https://facebook.github.io/react-native/docs/colors) | 否 | #dbdbdb |

<a name="width"></a>
### width

分隔线宽，默认为父元素宽

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 否 | null |

<a name="height"></a>
### height

分隔线高，默认为父元素高

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 否 | null |


