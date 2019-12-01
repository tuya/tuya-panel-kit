import React from 'react';
import { ScrollView } from 'react-native';

export default class TabScrollView extends React.PureComponent {
  componentDidMount() {
    this._scrollView.scrollResponderHandleStartShouldSetResponder = () => true;
  }

  render() {
    return (
      <ScrollView
        ref={x => {
          this._scrollView = x;
        }}
        {...this.props}
      >
        {this.props.children}
      </ScrollView>
    );
  }
}
