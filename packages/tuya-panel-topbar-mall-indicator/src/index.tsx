import {
  View,
  TextStyle,
  ViewStyle,
  StyleSheet,
  ImageStyle,
  Animated,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import React, { memo, useState, useEffect, useMemo } from 'react';
import { TYSdk, TopBar, IconFontName } from 'tuya-panel-kit';
import { useNavigation } from '@react-navigation/core';

const { TYRCTPublicManager } = NativeModules;
const NativeNotificationModule = new NativeEventEmitter(TYRCTPublicManager);

interface IProps {
  title: string;
  titleColor?: string;
  titleStyle?: TextStyle;
  subTitleStyle?: TextStyle;
  subTitle?: string;
  position?: 'left' | 'center' | 'right';
  onTitlePress?: () => void;
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  onRightPress?: () => void;
  rightActionType?: IconFontName;
  children?: React.ReactNode;
  wrapStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  contentBackground?: string;
}

const ToolBarMallIndicator: React.FC<IProps> = ({
  title,
  onTitlePress,
  subTitle,
  containerStyle,
  imageStyle,
  onRightPress,
  rightActionType,
  children = null,
  titleColor = null,
  titleStyle = null,
  subTitleStyle = null,
  position = 'center',
  wrapStyle = null,
  contentStyle = null,
  contentBackground = undefined,
}) => {
  const { productId, groupId } = TYSdk.devInfo;

  const navigation = useNavigation();

  const [existMsg, setExistMsg] = useState(false);

  const springVale = useMemo(() => new Animated.Value(1), []);

  const scaleVale = useMemo(() => new Animated.Value(0.3), []);

  const spring = () => {
    springVale.setValue(1.2);
    Animated.spring(springVale, {
      toValue: 1,
      friction: 2,
      useNativeDriver: false,
    }).start();
  };

  const scale = () => {
    scaleVale.setValue(0.3);
    Animated.timing(scaleVale, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
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
      TYRCTPublicManager.getRedPointVisibleForProduct(
        productId,
        groupId || '',
        (visible: boolean) => {
          if (visible) {
            handlePopIndicator();
          }
        }
      );

      NativeNotificationModule.addListener('onRedPointRefreshEvent', ({ pid }) => {
        if (pid === productId) {
          setExistMsg(false);
        }
      });
    }
  }, []);

  const boundsScaleWidth = scaleVale.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 36],
  });

  const boundsScaleHeight = scaleVale.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      TYSdk.mobile.back();
    }
  };

  return (
    <TopBar.Container style={wrapStyle} contentStyle={contentStyle} background={contentBackground}>
      <TopBar.Action name="backIos" onPress={handleBack} />
      <TopBar.Content
        title={title}
        subTitle={subTitle}
        onPress={() => {
          onTitlePress && onTitlePress();
        }}
        titleStyle={titleStyle}
        subTitleStyle={subTitleStyle}
        color={titleColor}
        position={position}
      >
        {children}
      </TopBar.Content>
      <TopBar.Action
        name={rightActionType || 'edit'}
        onPress={() => {
          if (onRightPress) {
            onRightPress();
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
                resizeMode="cover"
                resizeMethod="scale"
                style={[
                  {
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                  },
                  imageStyle,
                  {
                    width: boundsScaleWidth,
                    height: boundsScaleHeight,
                  },
                  {
                    transform: [{ scale: springVale }],
                  },
                ]}
                source={require('../assets/msg.png')}
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
