import _times from 'lodash/times';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Tabs, TYListItem } from 'tuya-panel-kit';

export default class TabPanel extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    largeData: PropTypes.bool,
  };

  static defaultProps = {
    largeData: false,
  };

  componentDidMount() {
    console.log('测试动态加载 :', this.props.title);
  }

  render() {
    const { title, largeData, ...rest } = this.props;
    return (
      <Tabs.TabPanel {...rest}>
        {largeData ? (
          _times(99, n => <TYListItem key={n} title={`${title}_${n}`} />)
        ) : (
          <TYListItem title={title} />
        )}
      </Tabs.TabPanel>
    );
  }
}
