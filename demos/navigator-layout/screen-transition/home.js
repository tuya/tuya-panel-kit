import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'tuya-panel-kit';
import { Navigator } from 'react-native-deprecated-custom-components';

const sceneConfig = {
  ...Navigator.SceneConfigs.HorizontalSwipeJump,
  gestures: {
    pop: {
      ...Navigator.SceneConfigs.FloatFromRight.gestures.pop,
    },
  },
};

const RouterConfig = [
  {
    txt: `VerticalUpSwipeJump to page 1`,
    transition: {
      ...sceneConfig,
      ...Navigator.SceneConfigs.VerticalUpSwipeJump
    }
  },
  {
    txt: `SwipeFromLeft to page 2`,
    transition: {
      ...sceneConfig,
      ...Navigator.SceneConfigs.SwipeFromLeft
    }
  }
];

// eslint-disable-next-line
export default ({ navigator }) => (
  <View style={[styles.container, styles.center]}>
    <Text style={styles.welcomeTxt}>
      Screen Transition Example!
    </Text>
    {
      [1, 2].map(v => (
        <Button
          style={styles.btnStyle}
          key={v}
          onPress={() => navigator.push({
            id: `page${v}`,
            sceneConfigs: RouterConfig[v - 1].transition,
          })}
        ><Text style={styles.navTxt}>{RouterConfig[v - 1].txt}</Text>
        </Button>
      ))
    }
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTxt: {
    fontSize: 15,
    color: 'black',
    marginBottom: 30,
  },
  btnStyle: {
    borderWidth: 1,
    borderColor: '#303A4B',
    borderRadius: 3,
    height: 40,
    backgroundColor: 'cyan',
    marginBottom: 2,
  },
  navTxt: {
    marginHorizontal: 20,
    backgroundColor: 'transparent',
    fontSize: 12,
    color: '#303A4B',
  }
});
