import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { StyleSheet, ColorPropType, Picker } from 'react-native';
import { ThemeUtils } from '../../utils';

const { getTheme, ThemeConsumer } = ThemeUtils;

const MAX_ITEM_NUM = 1260;

export class PickerView extends PureComponent {
  static propTypes = {
    ...Picker.propTypes,
    loop: PropTypes.bool,
    children: PropTypes.array.isRequired,
  };

  static defaultProps = {
    loop: false,
  };

  constructor(props) {
    super(props);
    const { children, selectedValue } = props;
    this._loopTimes = children.length > 0 ? Math.round(MAX_ITEM_NUM / children.length) : 0;
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
      this.setState({ loopIdx, selectedValue });
      onValueChange && onValueChange(selectedValue, idx);
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
      <Picker {...rest} selectedValue={selectedValue} onValueChange={this._handleValueChange}>
        {pickerItems}
      </Picker>
    );
  }
}

PickerView.Item = Picker.Item;

const ThemedPickerView = props => {
  const { theme: localTheme, itemStyle, ...rest } = props;
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
        const themedItemStyle = StyleSheet.flatten([
          typeof fontSize === 'number' && { fontSize },
          fontColor && { color: fontColor },
          itemStyle,
        ]);
        return <PickerView itemStyle={themedItemStyle} {...rest} />;
      }}
    </ThemeConsumer>
  );
};

ThemedPickerView.Item = Picker.Item;

ThemedPickerView.propTypes = {
  theme: PropTypes.shape({
    fontSize: PropTypes.number,
    fontColor: ColorPropType,
  }),
};

ThemedPickerView.defaultProps = {
  theme: {},
};

export default ThemedPickerView;
