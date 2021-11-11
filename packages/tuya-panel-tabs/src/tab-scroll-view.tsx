import React from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';

export default class TabScrollView extends React.PureComponent<ScrollViewProps> {
  componentDidMount() {
    this._scrollView.scrollResponderHandleStartShouldSetResponder = () => true;
  }

  _scrollView: any;

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
