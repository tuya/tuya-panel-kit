import React from 'react';
import { StyleSheet } from 'react-native';
import StyledText from './styled';
import { ITYTextProps, ITextState } from './interface';

/**
 * TODO:
 * 1. Text 三类 heading title paragraph，通过 props 去做还是通过不同组件去做;
 * 2. 是否还有更多属性需要暴露;
 */
class TYText extends React.Component<ITYTextProps, ITextState> {
  static defaultProps = {
    type: null,
    size: null,
    align: null,
    weight: null,
    color: null,
  };

  constructor(props: ITYTextProps) {
    super(props);
    this.state = {
      text: props.text ? props.text : props.children,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ text: nextProps.text ? nextProps.text : nextProps.children });
  }

  setText = text => {
    this.setState({ text });
  };

  setNativeProps = nativeProps => {
    this._text.setNativeProps(nativeProps);
  };

  _text: any;

  render() {
    const { style, size, align, weight, ...props } = this.props;
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
        // @ts-ignore
        size={realSize}
        align={align}
        weight={weight}
        {...props}
      >
        {this.state.text}
      </StyledText>
    );
  }
}
export default TYText;
