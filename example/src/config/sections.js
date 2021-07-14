import { TYSdk } from 'tuya-panel-kit';
import { themeRouter, componentsRouters } from './routers';
import ComponentInfo from '../../../package.json';
import Strings from '../i18n';

function dataProducers(router) {
  return router.map(({ id }) => ({
    key: id,
    title: id,
    arrow: true,
    styles: {
      container: {
        backgroundColor: '#f5f5f5',
        marginHorizontal: 24,
        borderRadius: 8,
        marginBottom: 8,
      },
      content: {
        paddingTop: 19,
        paddingBottom: 19,
      },
    },
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
  {
    title: Strings.getLang('test_theme'),
    data: dataProducers(themeRouter),
  },
];
