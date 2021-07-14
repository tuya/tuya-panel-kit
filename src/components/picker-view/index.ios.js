import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { StyleSheet, ColorPropType, PickerIOS, NativeModules } from 'react-native';
import { ThemeUtils } from '../../utils';
import TYRCTPanelPicker from './TYRCTPicker';

const { getTheme, ThemeConsumer } = ThemeUtils;

const MAX_ITEM_NUM = 1260;

export class PickerView extends PureComponent {
  static propTypes = {
    ...PickerIOS.propTypes,
    ...TYRCTPanelPicker.propTypes,
    /**
     * Picker是否循环滚动
     */
    loop: PropTypes.bool,
    /**
     * 自定义内容
     */
    children: PropTypes.array.isRequired,
  };

  static defaultProps = {
    loop: false,
  };

  constructor(props) {
    super(props);
    const { children, selectedValue } = props;
    this._loopTimes =
      children && children.length > 0 ? Math.round(MAX_ITEM_NUM / children.length) : 0;
    this.state = {
      loopIdx: Math.floor(this._loopTimes / 2),
      selectedValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedValue !== nextProps.selectedValue) {
      this.setState({ selectedValue: nextProps.selectedValue });
    }
  }

  _handleValueChange = (value, idx) => {
    const { loop, onValueChange } = this.props;
    if (loop) {
      const [loopIdx, selectedValue] = value.split('-');
      const originSelectedValue =
        typeof this.state.selectedValue === 'number' ? selectedValue * 1 : selectedValue;
      this.setState({
        loopIdx,
        selectedValue: originSelectedValue,
      });
      onValueChange && onValueChange(originSelectedValue, idx);
    } else {
      const selectedValue = value;
      this.setState({ selectedValue });
      onValueChange && onValueChange(selectedValue, idx);
    }
  };

  render() {
    const { loop, children, ...rest } = this.props;
    let pickerItems = this.props.children;
    if (loop) {
      const childArray = React.Children.toArray(children);
      let curIdx = 0;
      pickerItems = new Array(this._loopTimes).fill(1).reduce(acc => {
        curIdx++;
        const current = childArray.map(c => {
          const key = `${curIdx}-${c.props.value}`;
          return React.cloneElement(c, {
            ...c.props,
            key,
            value: key,
          });
        });
        return [...acc, ...current];
      }, []);
    }
    const selectedValue = loop
      ? `${this.state.loopIdx}-${this.state.selectedValue}`
      : this.state.selectedValue;
    return (
      <PickerIOS {...rest} selectedValue={selectedValue} onValueChange={this._handleValueChange}>
        {pickerItems}
      </PickerIOS>
    );
  }
}

PickerView.Item = PickerIOS.Item;

const ThemedPickerView = props => {
  const { theme: localTheme, itemStyle, useTYRCTPicker, ...rest } = props;
  return (
    <ThemeConsumer>
      {fullTheme => {
        const theme = {
          ...fullTheme,
          picker: { ...fullTheme.picker, ...localTheme },
        };
        const propsWithTheme = { theme, ...rest };
        const fontSize = getTheme(propsWithTheme, 'picker.fontSize');
        const fontColor = getTheme(propsWithTheme, 'picker.fontColor');
        const dividerColor = getTheme(propsWithTheme, 'picker.dividerColor');
        const themedItemStyle = StyleSheet.flatten([
          typeof fontSize === 'number' && { fontSize },
          fontColor && { color: fontColor },
          { fontFamily: 'DIN Alternate' },
          itemStyle,
        ]);
        return useTYRCTPicker && 'TYRCTPicker' in NativeModules.UIManager ? (
          <TYRCTPanelPicker
            textSize={fontSize}
            itemTextColor={fontColor}
            dividerColor={dividerColor}
            {...rest}
          />
        ) : (
          <PickerView itemStyle={themedItemStyle} {...rest} />
        );
      }}
    </ThemeConsumer>
  );
};

ThemedPickerView.Item = PickerIOS.Item;

ThemedPickerView.propTypes = {
  theme: PropTypes.shape({
    fontSize: PropTypes.number,
    fontColor: ColorPropType,
    dividerColor: ColorPropType,
  }),
  useTYRCTPicker: PropTypes.bool,
};

ThemedPickerView.defaultProps = {
  theme: {},
  useTYRCTPicker: false,
};

export default ThemedPickerView;
