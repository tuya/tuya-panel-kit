import React from 'react';
import RadioButton from './radio-button/group';

const WrapperComponent = WrappedComponent => {
  return class extends WrappedComponent {
    radioOnChange = value => {
      const tab = this.props.tabs[value];
      const key = typeof tab.key === 'undefined' ? `tab_${value}` : tab.key;
      this.props.onChange && this.props.onChange(key);
    };

    render() {
      if (this.props.type === 'radio' || this.props.type === 'radioCircle') {
        const { activeKey, defaultActiveKey, ...otherProps } = this.props;
        const radioProps: { activeIndex?: number; defaultActiveIndex?: number } = {};
        if (typeof activeKey !== 'undefined') {
          radioProps.activeIndex = this.activeIndex;
        }
        if (typeof defaultActiveKey !== 'undefined') {
          radioProps.defaultActiveIndex = this.activeIndex;
        }
        return <RadioButton {...radioProps} {...otherProps} onChange={this.radioOnChange} />;
      }
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default WrapperComponent;
