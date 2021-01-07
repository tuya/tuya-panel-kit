import { TYSdk } from '../../TYNativeApi';

const TYEvent = TYSdk.event;

let uuid = 0;
class Portal {
  constructor() {
    this.uuid = `portal-direct-${uuid}`;
  }

  show = (ele, props) => {
    const userProps = Object.assign({}, { onMaskPress: this.hide }, props);
    uuid += 1;
    this.uuid = `portal-direct-${uuid}`;
    TYEvent.emit('registerPortal', {
      node: ele,
      uuid: this.uuid,
      props: userProps,
      isUpdate: false,
    });
    TYEvent.emit('showPortal', { uuid: this.uuid, show: true });
  };

  hide = () => {
    this.uuid = `portal-direct-${uuid--}`;
    TYEvent.emit('showPortal', { uuid: this.uuid, show: false });
    TYEvent.emit('removePortal', this.uuid);
  };
}

export default new Portal();
