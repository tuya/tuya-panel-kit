import TYSdk from '../../TYNativeApi';

const TYEvent = TYSdk.event;

let uuid = 0;
class Portal {
  constructor() {
    uuid += 1;
    this.uuid = uuid;
  }
  show = (ele, props) => {
    const userProps = Object.assign({}, { onMaskPress: this.hide }, props);
    TYEvent.emit('registerPortal', {
      node: ele,
      uuid: this.uuid,
      props: userProps,
      isUpdate: false,
    });
    TYEvent.emit('showPortal', { uuid: this.uuid, show: true });
  };
  hide = () => {
    TYEvent.emit('showPortal', { uuid: this.uuid, show: false });
    TYEvent.emit('removePortal', this.uuid);
  };
}

export default new Portal();
