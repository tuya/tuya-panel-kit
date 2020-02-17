import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View, ViewPropTypes, I18nManager } from 'react-native';
import IconFont from '../iconfont/svg';
import svgs from '../iconfont/svg/defaultSvg';

export default class UnitTextSvg extends React.PureComponent {
  static propTypes = {
    style: ViewPropTypes.style,
    size: PropTypes.number,
    valueSize: PropTypes.number,
    valueColors: PropTypes.array,
    valueColor: PropTypes.string,
    unit: PropTypes.string,
    unitSize: PropTypes.number,
    unitColor: PropTypes.string,
    unitPaddingLeft: PropTypes.number,
    unitPaddingTop: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    letterWidth: PropTypes.number,
    symbolWidth: PropTypes.number,
    symbols: PropTypes.array,
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
    return <IconFont d={allSvgs[unit] || unit} size={uSize} style={unitStyle} color={unitColor} />;
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
