import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigatorLayout } from 'tuya-panel-kit';
import Page from './page';
import Home from './home';

const routers = [{
  id: 'page1',
  title: 'page1',
  Scene: props => <Page {...props} num={1} />,
}, {
  id: 'page2',
  title: 'page2',
  Scene: props => <Page {...props} num={2} />,
}];

export default class MainLayout extends NavigatorLayout {
  // eslint-disable-next-line
  hookRoute(route) {
    const isMainScene = route.id === 'main';
    const theRoute = routers.find(r => r.id === route.id);
    return {
      ...route,
      topbarStyle: { backgroundColor: '#ff6024' },
      showOfflineView: false,
      title: isMainScene ? 'Screen Transitions Usage' : theRoute.title,
    };
  }

  renderScene(route, navigator) {
    console.log(this.props);
    let Scene = <Home navigator={navigator} />;

    const router = routers.find(r => r.id === route.id);
    if (router && router.Scene) {
      const Component = router.Scene;
      Scene = (
        <Component
          navigator={navigator}
          {...route}
        />
      );
    }

    return Scene;
  }
}


const styles = StyleSheet.create({
});
