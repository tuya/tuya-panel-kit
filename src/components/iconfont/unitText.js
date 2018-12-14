import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  View,
  ViewPropTypes,
  I18nManager
} from 'react-native';

import Icon from './index';

const LetterWidth = 0.37;
const LetterPadding = (1 - LetterWidth) / 2;
export default class UnitText extends React.PureComponent {
  static propTypes = {
    style: ViewPropTypes.style,
    size: PropTypes.number,
    valueSize: PropTypes.number,
    valueColor: PropTypes.string,
    unit: PropTypes.string,
    unitSize: PropTypes.number,
    unitColor: PropTypes.string,
    unitPaddingLeft: PropTypes.number,
    unitPaddingTop: PropTypes.number,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  };

  static defaultProps = {
    style: null,
    unit: '',
    valueSize: null,
    unitSize: null,
    size: 96,
    valueColor: 'white',
    unitColor: 'white',
    unitPaddingLeft: 0,
    unitPaddingTop: 0,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value || '',
      unit: props.unit
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
  render() {
    const {
      size, valueSize,
      valueColor, unitSize,
      unitColor, unitPaddingLeft,
      unitPaddingTop, style
    } = this.props;
    const isRtl = I18nManager.isRTL;
    const { value, unit } = this.state;
    const letter = value.split('');
    if (!letter || !letter.length) return null;
    const vSize = valueSize || size;
    const uSize = unitSize || size / 2;
    const needLeft = vSize * (LetterPadding * 2 - 0.05);
    const uNeedLeft = (vSize + uSize) * (LetterPadding - 0.025);
    const marginType = isRtl ? 'marginRight' : 'marginLeft';
    const unitStyle = [
      { marginTop: unitPaddingTop, [marginType]: -uNeedLeft + unitPaddingLeft }
    ];
    const wrapperStyle = [
      styles.wrapperStyle,
      { flexDirection: isRtl ? 'row-reverse' : 'row' },
      style,
    ];
    return (
      <View style={wrapperStyle}>
        {
          letter.map((l, i) => {
            const letterStyle = [
              i !== 0 && { [marginType]: -needLeft }
            ];
            return (
              <Icon
                name={l}
                size={vSize}
                style={letterStyle}
                key={`TYUnitText_${l}`}
                color={valueColor}
              />
            );
          })
        }
        { unit ? <Icon name={unit} size={uSize} style={unitStyle} color={unitColor} /> : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperStyle: {
    justifyContent: 'center',
  }
});
