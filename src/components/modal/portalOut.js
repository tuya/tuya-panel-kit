import React from 'react';
import TYSdk from '../../TYNativeApi';
import TYModal from './TYModal';

const TYEvent = TYSdk.event;

class PortalOut extends React.Component {
  constructor(props) {
    super(props);
    TYEvent.on('registerPortal', this.register);
    TYEvent.on('showPortal', this.show);
    TYEvent.on('removePortal', this.remove);
    this.state = {
      uuidList: [],
    };
    this.node = {};
    this._timerId = null;
  }

  componentWillUnmount() {
    clearTimeout(this._timerId);
    TYEvent.off('registerPortal', this.register);
    TYEvent.off('showPortal', this.show);
    TYEvent.off('removePortal', this.remove);
  }

  register = config => {
    const { uuid, node, props, isUpdate } = config;
    this.node[`${uuid}`] = { node, props };
    isUpdate && this.forceUpdate();
  };

  show = (config, isDismiss = false) => {
    const { uuid, show } = config;
    if (!this.node[`${uuid}`]) return;
    const { onShow, onHide, onDismiss } = this.node[`${uuid}`].props;
    if (show) onShow && onShow();
    if (!show) {
      if (isDismiss) {
        typeof onDismiss === 'function' && onDismiss();
      } else {
        typeof onHide === 'function' && onHide();
      }
    }
    /**
     * 在一个同步任务中可能会推送多个`show` or `hide` 消息过来，
     * 在这里需要把这几个同步的消息以异步队列的形式逐个更新，
     * 避免出现 this.state.uuidList 获取到的值未正确同步的情况;
     */
    this._timerId = setTimeout(() => {
      let { uuidList } = this.state;
      if (show) {
        uuidList = [...this.state.uuidList, uuid];
      } else {
        uuidList = this.state.uuidList.filter(id => id !== uuid);
      }
      this.setState({ uuidList });
    }, 0);
  };

  remove = uuid => {
    if (!this.node[`${uuid}`]) return;
    const hasRegistered = this.state.uuidList.findIndex(id => id === uuid) > -1;
    if (hasRegistered) {
      this.show({ uuid, show: false }, true);
    }
    delete this.node[`${uuid}`];
  };

  render() {
    const { uuidList } = this.state;
    const hasNode = uuidList.some(uuid => !!this.node[`${uuid}`]);
    if (!uuidList || uuidList.length === 0 || !hasNode) return null;
    const lastUuid = uuidList[uuidList.length - 1];
    const { props } = this.node[`${lastUuid}`];
    // eslint-disable-next-line no-unused-vars
    const { onShow, onHide, onDismiss, ...needProps } = props;
    let activeIdx = 0;
    const nodes = uuidList.map((key, idx) => {
      activeIdx = idx;
      const { node } = this.node[`${key}`];
      return React.isValidElement(node) ? React.cloneElement(node, { key }) : node;
    });
    return (
      <TYModal activeIdx={activeIdx} {...needProps}>
        {nodes}
      </TYModal>
    );
  }
}

export default PortalOut;
