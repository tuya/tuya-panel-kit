import { TYSdk } from 'tuya-panel-kit';
import { componentsRouters, elementsRouters } from './routers';

function dataProducers(router) {
  return router.map(({ id }) => ({
    key: id,
    title: id,
    arrow: true,
    onPress: () => TYSdk.Navigator.push({
      id,
      title: id,
    }),
  }));
}

export default [
  {
    title: 'Components',
    data: dataProducers(componentsRouters),
  },
  // {
  //   title: 'Elements',
  //   data: dataProducers(elementsRouters),
  // },
];
