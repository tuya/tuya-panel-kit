import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View, ViewPropTypes, I18nManager } from 'react-native';
import IconFont from '../iconfont/svg';
import TYText from '../TYText';
import svgs from '../iconfont/svg/defaultSvg';

export default class UnitTextSvg extends React.PureComponent {
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
     * 值的大小
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
     * 单位的类型
     */
    unitType: PropTypes.oneOf(['icon', 'text']),
    /**
     * 值
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    /**
     * 自定义文字的宽度
     * @version 3.0.0-rc.14
     */
    letterWidth: PropTypes.number,
    /**
     * 自定义符号的宽度（如.,:等）
     * @version 3.0.0-rc.14
     */
    symbolWidth: PropTypes.number,
    /**
     * 哪些字符串被认作为symbol，并被应用与symbolWidth
     * @version 3.0.0-rc.14
     */
    symbols: PropTypes.array,
    /**
     * 额外的svg路径映射表，用于拓展内部的svg path或覆盖内部的svg path
     * @version 3.0.0-rc.14
     */
    svgMap: PropTypes.object,
  };

  static defaultProps = {
    style: null,
    unit: '',
    valueSize: null,
    unitSize: null,
    size: 82,
    valueColors: [],
    valueColor: 'white',
    unitColor: 'white',
    unitPaddingLeft: 0,
    unitPaddingTop: 0,
    letterWidth: 0.55,
    symbolWidth: 0.35,
    symbols: ['.', ':', ','],
    svgMap: {},
    unitType: 'icon',
  };

  getLetterPadding(letterWidth) {
    const letterPadding = (1 - letterWidth) / 2;
    return letterPadding;
  }

  renderUnit() {
    const {
      unit,
      unitSize,
      valueSize,
      size,
      unitColor,
      unitPaddingLeft,
      unitPaddingTop,
      letterWidth,
      svgMap,
      unitType,
    } = this.props;
    if (!unit) {
      return null;
    }
    const uSize = unitSize || size / 2;
    const isRtl = I18nManager.isRTL;
    const marginType = isRtl ? 'marginRight' : 'marginLeft';
    const vSize = valueSize || size;
    const letterPadding = this.getLetterPadding(letterWidth);
    const uNeedLeft = (vSize + uSize) * (letterPadding - 0.025);
    const unitStyle = [{ marginTop: unitPaddingTop, [marginType]: -uNeedLeft + unitPaddingLeft }];
    const allSvgs = { ...svgs, ...svgMap };
    return unitType === 'icon' ? (
      <IconFont d={allSvgs[unit] || unit} size={uSize} style={unitStyle} color={unitColor} />
    ) : (
      <TYText
        style={[
          {
            fontSize: uSize,
            color: unitColor,
          },
          unitStyle,
        ]}
      >
        {unit}
      </TYText>
    );
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
      letterWidth,
      symbolWidth,
      symbols,
      svgMap,
      ...rest
    } = this.props;
    const isRtl = I18nManager.isRTL;
    const letter = `${value}`.split('');
    if (!letter || !letter.length) return null;
    const vSize = valueSize || size;
    const marginType = isRtl ? 'marginRight' : 'marginLeft';
    const wrapperStyle = [
      styles.wrapperStyle,
      { flexDirection: isRtl ? 'row-reverse' : 'row' },
      style,
    ];
    const allSvgs = { ...svgs, ...svgMap };
    const symbolIdx = letter
      .map((l, lIdx) => (symbols.includes(l) ? lIdx : undefined))
      .filter(i => !!i);
    return (
      <View {...rest} style={wrapperStyle}>
        {letter.map((l, i) => {
          const letterPadding = this.getLetterPadding(letterWidth);
          let needLeft = vSize * (letterPadding * 2 - 0.05);
          // 如果为 symbol 则需要缩减其渲染大小
          if (symbolIdx.includes(i) || symbolIdx.includes(i - 1)) {
            const specialLetterPadding = this.getLetterPadding(symbolWidth);
            needLeft = vSize * (specialLetterPadding * 2 - 0.05);
          }
          const letterStyle = [i !== 0 && { [marginType]: -needLeft }];
          const color = valueColors[i] ? valueColors[i] : valueColor;
          return (
            <IconFont
              d={allSvgs[l]}
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
