import React from 'react';
// import PropTypes from 'prop-types';
import { Text } from 'react-native';

class TYText extends React.Component {
  static propTypes = {
    ...Text.propTypes,
  };
  constructor(props) {
    super(props);
    this.state = {
      text: props.text ? props.text : props.children
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ text: nextProps.text ? nextProps.text : nextProps.children });
  }
  setText = text => {
    this.setState({ text });
  }
  setNativeProps = nativeProps => {
    this._text.setNativeProps(nativeProps);
  }
  render() {
    const { style, ...props } = this.props;
    return (
      <Text
        ref={ref => { this._text = ref; }}
        allowFontScaling={false}
        style={[{ color: '#fff', fontSize: 16 }, style]}
        {...props}
      >
        { this.state.text }
      </Text>
    );
  }
}
export default TYText;
