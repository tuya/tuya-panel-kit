import React from 'react';
import PropTypes from 'prop-types';
import { Text, ColorPropType, StyleSheet } from 'react-native';
import StyledText from './styled';

class TYText extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(['heading', 'title', 'paragraph']),
    size: PropTypes.oneOfType([PropTypes.oneOf(['large', 'normal', 'small']), PropTypes.number]),
    align: PropTypes.oneOf(['left', 'center', 'right']),
    weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    color: ColorPropType,
    ...Text.propTypes,
  };

  static defaultProps = {
    type: null,
    size: null,
    align: null,
    weight: null,
    color: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: props.text ? props.text : props.children,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ text: nextProps.text ? nextProps.text : nextProps.children });
  }

  setText = text => {
    this.setState({ text });
  };

  setNativeProps = nativeProps => {
    this._text.setNativeProps(nativeProps);
  };

  render() {
    const { style, size, ...props } = this.props;
    /**
     * 如果 `style` 里有设置 `fontSize` 则覆盖 `size props`，
     * 避免行高 `lineHeight` 仍有误;
     */
    const { fontSize } = StyleSheet.flatten([style]);
    const realSize = fontSize || size;
    return (
      <StyledText
        style={style}
        ref={ref => {
          this._text = ref;
        }}
        allowFontScaling={false}
        size={realSize}
        {...props}
      >
        {this.state.text}
      </StyledText>
    );
  }
}
export default TYText;
