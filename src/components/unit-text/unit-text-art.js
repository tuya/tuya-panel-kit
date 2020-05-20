import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View, ViewPropTypes, I18nManager } from 'react-native';
import IconART from '../iconfont/art';
import svgsART from '../iconfont/art/defaultSvg';

const LetterWidth = 0.37;
const LetterPadding = (1 - LetterWidth) / 2;

export default class UnitTextART extends React.PureComponent {
  static propTypes = {
    /**
     * 内容样式
     */
    style: ViewPropTypes.style,
    /**
     * 字体尺寸大小，valueSize 或 unitSize 的缩写版
     * 其中 valueSize 将会和与 size  相同，unitSize  将会为 size  值的一半。
     */
    size: PropTypes.number,
    /**
     * 单位的大小
     */
    valueSize: PropTypes.number,
    /**
     * 可以用来定制每个值的颜色
     */
    valueColors: PropTypes.array,
    /**
     * 值的颜色
     */
    valueColor: PropTypes.string,
    /**
     * 单位，字符串为内置的 svg name
     */
    unit: PropTypes.string,
    /**
     * 单位的大小
     */
    unitSize: PropTypes.number,
    /**
     * 单位的颜色
     */
    unitColor: PropTypes.string,
    /**
     * 单位的左边距
     */
    unitPaddingLeft: PropTypes.number,
    /**
     * 单位的上边距
     */
    unitPaddingTop: PropTypes.number,
    /**
     * 值
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };

  static defaultProps = {
    style: null,
    unit: '',
    valueSize: null,
    unitSize: null,
    size: 96,
    valueColors: [],
    valueColor: 'white',
    unitColor: 'white',
    unitPaddingLeft: 0,
    unitPaddingTop: 0,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value || '',
      unit: props.unit,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value || nextProps.unit !== this.state.unit) {
      this.setState({
        value: nextProps.value,
        unit: nextProps.unit,
      });
    }
  }

  setValue(value) {
    if (value !== this.state.value) {
      this.setState({ value: `${value}` });
    }
  }

  setUnit(unit) {
    if (unit !== this.state.unit) {
      this.setState({ unit: `${unit}` });
    }
  }

  renderUnit() {
    const { unitSize, valueSize, size, unitColor, unitPaddingLeft, unitPaddingTop } = this.props;
    const { unit } = this.state;
    if (!unit) {
      return null;
    }
    const uSize = unitSize || size / 2;
    const isRtl = I18nManager.isRTL;
    const marginType = isRtl ? 'marginRight' : 'marginLeft';
    const vSize = valueSize || size;
    const uNeedLeft = (vSize + uSize) * (LetterPadding - 0.025);
    const unitStyle = [{ marginTop: unitPaddingTop, [marginType]: -uNeedLeft + unitPaddingLeft }];
    return <IconART d={svgsART[unit] || unit} size={uSize} style={unitStyle} color={unitColor} />;
  }

  render() {
    const {
      style,
      size,
      valueSize,
      valueColor,
      valueColors,
      unit,
      unitSize,
      unitColor,
      unitPaddingLeft,
      unitPaddingTop,
      value,
      ...rest
    } = this.props;
    const isRtl = I18nManager.isRTL;
    const letter = `${this.state.value}`.split('');
    if (!letter || !letter.length) return null;
    const vSize = valueSize || size;
    const needLeft = vSize * (LetterPadding * 2 - 0.05);
    const marginType = isRtl ? 'marginRight' : 'marginLeft';
    const wrapperStyle = [
      styles.wrapperStyle,
      { flexDirection: isRtl ? 'row-reverse' : 'row' },
      style,
    ];
    return (
      <View {...rest} style={wrapperStyle}>
        {letter.map((l, i) => {
          const letterStyle = [i !== 0 && { [marginType]: -needLeft }];
          const color = valueColors[i] ? valueColors[i] : valueColor;
          return (
            <IconART
              name={l}
              size={vSize}
              style={letterStyle}
              key={`TYUnitText_${l}_${i + 1}`}
              color={color}
            />
          );
        })}
        {this.renderUnit()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperStyle: {
    justifyContent: 'center',
  },
});
