import React from 'react';
import PropTypes from 'prop-types';
import TYSdk from '../../TYNativeApi';
import PortalFun from './portal-direct';
import { ListModal } from '../popup/list';
import { PickerModal } from '../popup/picker';
import { CountdownModal } from '../popup/countdown';
import { DatePickerModal } from '../popup/date-picker';

const TYEvent = TYSdk.event;

let uuid = 0;

class Portal extends React.Component {
  static List = ListModal;
  static Picker = PickerModal;
  static Countdown = CountdownModal;
  static DatePicker = DatePickerModal;
  static render = PortalFun.show;
  static close = PortalFun.hide;

  static propTypes = {
    visible: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    uuid += 1;
    this.uuid = `portal-${uuid}`;
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
    this.removePortal();
  }

  registerPortal = (registerProps, isUpdate) => {
    const { children, ...props } = registerProps;
    TYEvent.emit('registerPortal', { node: children, uuid: this.uuid, props, isUpdate });
  };

  showPortal = () => {
    TYEvent.emit('showPortal', { uuid: this.uuid, show: true });
  };

  hidePortal = () => {
    TYEvent.emit('showPortal', { uuid: this.uuid, show: false });
  };
  removePortal = () => {
    TYEvent.emit('removePortal', this.uuid);
  };

  render() {
    return null;
  }
}

export default Portal;
