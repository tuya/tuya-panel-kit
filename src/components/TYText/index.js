import React from 'react';
import PropTypes from 'prop-types';
import { Text, ColorPropType, StyleSheet } from 'react-native';
import StyledText from './styled';

/**
 * TODO:
 * 1. Text 三类 heading title paragraph，通过 props 去做还是通过不同组件去做;
 * 2. 是否还有更多属性需要暴露;
 */
class TYText extends React.Component {
  static propTypes = {
    /**
     * 字体类型
     */
    type: PropTypes.oneOf(['heading', 'title', 'paragraph']),
    /**
     * 字体尺寸
     */
    size: PropTypes.oneOfType([PropTypes.oneOf(['large', 'normal', 'small']), PropTypes.number]),
    /**
     * 字体对齐方式
     */
    align: PropTypes.oneOf(['left', 'center', 'right']),
    /**
     * 字体粗细
     */
    weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * 字体颜色
     */
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
