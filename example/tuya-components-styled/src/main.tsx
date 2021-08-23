/* eslint-disable no-console */
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { createNavigator, GlobalTheme, NavigationRoute } from 'tuya-panel-kit';
import DebugView from './components/debug/DebugView';

import composeLayout from './composeLayout';
import { store } from './models';
import Home from './pages/panel-index';
import { routes } from './routes';

console.disableYellowBox = true;

const withScroll = (Compnent: React.ComponentType<any>) => (props: any) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Compnent navigation={props.navigation} />
      </ScrollView>
      <DebugView />
    </SafeAreaView>
  );
};

const router: NavigationRoute[] = [
  {
    name: 'main',
    component: withScroll(Home),
    options: {
      title: 'Tuya Design',
      renderStatusBar: () => <StatusBar barStyle="default" />,
    },
  },
  ...routes.map(route => ({
    name: route.href,
    component: withScroll(route.component),
    options: {
      title: route.name,
      renderStatusBar: () => <StatusBar barStyle="default" />,
    },
  })),
];

interface Props {
  theme: GlobalTheme;
}

const Navigator = createNavigator<Props>(
  {
    router,
    screenOptions: {},
  },
  {
    onStateChange: state => {
      console.log(state);
    },
  }
);

export default composeLayout(store, Navigator);
