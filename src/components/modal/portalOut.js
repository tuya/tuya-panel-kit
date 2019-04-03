import React from 'react';
import TYModal from './TYModal';
import TYSdk from '../../TYNativeApi';

const TYEvent = TYSdk.event;

class PortalOut extends React.Component {
  constructor(props) {
    super(props);
    TYEvent.on('registerPortal', this.register);
    TYEvent.on('showPortal', this.show);
    TYEvent.on('removePortal', this.remove);
    this.state = {
      showUuid: null,
    };
    this.node = {};
  }

  componentWillUnmount() {
    TYEvent.off('registerPortal', this.register);
    TYEvent.off('showPortal', this.show);
    TYEvent.off('removePortal', this.remove);
  }

  register = config => {
    const { uuid, node, props, isUpdate } = config;
    this.node[`${uuid}`] = { node, props };
    isUpdate && this.forceUpdate();
  };

  show = config => {
    const { uuid, show } = config;
    if (!this.node[`${uuid}`]) return;
    const { onShow, onDisMiss } = this.node[`${uuid}`].props;
    if (show) onShow && onShow();
    if (!show) onDisMiss && onDisMiss();
    this.setState({
      showUuid: show ? uuid : null,
    });
  };

  remove = uuid => {
    if (!this.node[`${uuid}`]) return;
    if (this.state.showUuid === uuid) {
      this.show({ uuid, show: false });
    }
    delete this.node[`${uuid}`];
  };

  render() {
    const uuid = this.state.showUuid;
    if (!uuid || !this.node[`${uuid}`]) return null;
    const { node, props } = this.node[`${uuid}`];
    // eslint-disable-next-line no-unused-vars
    const { onShow, onDisMiss, ...needProps } = props;
    return <TYModal {...needProps}>{node}</TYModal>;
  }
}

export default PortalOut;
