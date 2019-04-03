import { TYSdk } from 'tuya-panel-kit';
import { componentsRouters } from './routers';
import ComponentInfo from '../../../package.json';

function dataProducers(router) {
  return router.map(({ id }) => ({
    key: id,
    title: id,
    arrow: true,
    onPress: () =>
      TYSdk.Navigator.push({
        id,
        title: id,
      }),
  }));
}

export default [
  {
    title: `${ComponentInfo.name}: ${ComponentInfo.version}`,
    data: dataProducers(componentsRouters),
  },
];
