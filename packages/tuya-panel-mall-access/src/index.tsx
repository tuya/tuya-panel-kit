import { View, StyleSheet, Animated, NativeModules, NativeEventEmitter } from 'react-native';
import React, { memo, useState, useEffect, useMemo } from 'react';
import { TYSdk, TopBar } from 'tuya-panel-kit';

const { TYRCTPublicManager } = NativeModules;
const NativeNotificationModule = new NativeEventEmitter(TYRCTPublicManager);

type IProps = {
  title: string;
  subTitle?: string;
  titlePress?: () => void;
  containerStyle?: any;
  imageStyle?: any;
  rightPress?: () => void;
  rightActionType?: string;
};

const ToolBarMallIndicator: React.FC<IProps> = ({
  title,
  titlePress,
  subTitle,
  containerStyle,
  imageStyle,
  rightPress,
  rightActionType,
}) => {
  const { productId } = TYSdk.devInfo;

  const [existMsg, setExistMsg] = useState(false);

  const springVale = useMemo(() => new Animated.Value(1), []);

  const scaleVale = useMemo(() => new Animated.Value(0.3), []);

  const spring = () => {
    springVale.setValue(1.2);
    Animated.spring(springVale, {
      toValue: 1,
      friction: 2,
    }).start();
  };

  const scale = () => {
    scaleVale.setValue(0.3);
    Animated.timing(scaleVale, {
      toValue: 1,
      duration: 200,
    }).start(() => spring());
  };

  const handlePopIndicator = () => {
    if (!existMsg) {
      setExistMsg(true);
      scale();
    }
  };

  useEffect(() => {
    if (
      TYRCTPublicManager &&
      typeof TYRCTPublicManager.getRedPointVisibleForProduct === 'function'
    ) {
      TYRCTPublicManager.getRedPointVisibleForProduct(productId, visible => {
        if (visible) {
          handlePopIndicator();
        }
      });
    }

    NativeNotificationModule.addListener('onRedPointRefreshEvent', ({ pid }) => {
      if (pid === productId) {
        setExistMsg(false);
      }
    });
  }, []);

  const boundsScale = scaleVale.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <TopBar.Container>
      <TopBar.Action name="backIos" onPress={TYSdk.Navigator.pop} />
      <TopBar.Content
        title={title}
        subTitle={subTitle}
        onPress={() => {
          titlePress && titlePress();
        }}
      />
      <TopBar.Action
        name={rightActionType || 'edit'}
        onPress={() => {
          if (rightPress) {
            rightPress();
          } else {
            TYSdk.native.showDeviceMenu();
          }
        }}
      />
      <TopBar.Action>
        <View style={[styles.container, containerStyle]}>
          <View style={{ width: 36, height: 16 }}>
            {existMsg && (
              <Animated.Image
                style={[
                  {
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                  },
                  imageStyle,
                  {
                    width: boundsScale,
                    height: boundsScale,
                  },
                  {
                    transform: [{ scale: springVale }],
                  },
                ]}
                source={require('./msg.png')}
              />
            )}
          </View>
        </View>
      </TopBar.Action>
    </TopBar.Container>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 36,
    position: 'relative',
    width: 36,
  },
});

export default memo(ToolBarMallIndicator);
