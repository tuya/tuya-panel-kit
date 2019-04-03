import React from 'react';
import PropTypes from 'prop-types';
import PortalFun from './portal-direct';
import TYSdk from '../../TYNativeApi';

const TYEvent = TYSdk.event;

let uuid = 0;

class Portal extends React.Component {
  static render = PortalFun.show;
  static close = PortalFun.hide;

  static propTypes = {
    visible: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    uuid += 1;
    this.uuid = uuid;
  }
  componentDidMount() {
    this.registerPortal(this.props, false);
    if (this.props.visible) {
      this.showPortal();
    }
  }
  componentWillUpdate(nextProps) {
    this.registerPortal(nextProps, true);
    if (nextProps.visible === this.props.visible) return;
    if (nextProps.visible) {
      this.showPortal();
    } else {
      this.hidePortal();
    }
  }
  componentWillUnmount() {
    this.removeProtal();
  }
  registerPortal = (registProps, isUpdate) => {
    const { children, ...props } = registProps;
    TYEvent.emit('registerPortal', { node: children, uuid: this.uuid, props, isUpdate });
  };
  showPortal = () => {
    TYEvent.emit('showPortal', { uuid: this.uuid, show: true });
  };
  hidePortal = () => {
    TYEvent.emit('showPortal', { uuid: this.uuid, show: false });
  };
  removeProtal = () => {
    TYEvent.emit('removePortal', this.uuid);
  };
  render() {
    return null;
  }
}

export default Portal;
