import React from 'react';
import { Dimensions, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Motion } from 'tuya-panel-kit';
import Strings from '#i18n';
import { BlockList, Icons } from '#components';

const window = Dimensions.get('window');
const { width, height } = window;

export default () => {
  const [fadeShow, setFadeShow] = React.useState(false);
  const [pullUpShow, setPullUpShow] = React.useState(false);
  const [scaleFadeInShow, setScaleFadeInShow] = React.useState(false);
  const contentStyles = {
    width: 375,
    height: 200,
    backgroundColor: '#f0f',
  };
  const [scalePullDownShow, setScalePullDownShow] = React.useState(false);
  const [pushDownShow, setPushDownShow] = React.useState(false);
  const [toastShow, setToastShow] = React.useState(false);
  return (
    <>
      <BlockList
        list={[
          {
            name: Strings.getLang('motion_fade'),
            onPress: () => setFadeShow(!fadeShow),
            component: <>{Icons.right}</>,
          },
          {
            name: Strings.getLang('motion_pullup'),
            onPress: () => setPullUpShow(!pullUpShow),
            component: <>{Icons.right}</>,
          },
          {
            name: Strings.getLang('motion_scalefadein'),
            onPress: () => setScaleFadeInShow(!scaleFadeInShow),
            component: <>{Icons.right}</>,
          },
          {
            name: Strings.getLang('motion_scalefadeout'),
            onPress: () => setScalePullDownShow(!scalePullDownShow),
            component: <>{Icons.right}</>,
          },
          {
            name: Strings.getLang('motion_pushdown'),
            onPress: () => setPushDownShow(!pushDownShow),
            component: <>{Icons.right}</>,
          },
          {
            name: Strings.getLang('motion_toast'),
            onPress: () => setToastShow(!toastShow),
            component: <>{Icons.right}</>,
          },
        ]}
      />
      {(fadeShow ||
        pullUpShow ||
        scaleFadeInShow ||
        scalePullDownShow ||
        pushDownShow ||
        toastShow) && (
        <TouchableWithoutFeedback
          style={{
            width,
            height,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            position: 'absolute',
            left: 0,
            bottom: 0,
          }}
          onPress={() => {
            fadeShow && setFadeShow(!fadeShow);
            pullUpShow && setPullUpShow(!pullUpShow);
            scaleFadeInShow && setScaleFadeInShow(!scaleFadeInShow);
            scalePullDownShow && setScalePullDownShow(!scalePullDownShow);
            pushDownShow && setPushDownShow(!pushDownShow);
            toastShow && setToastShow(!toastShow);
          }}
        />
      )}
      <Motion.Fade
        style={{ position: 'absolute', bottom: 0 }}
        show={fadeShow}
        onHide={() => setFadeShow(false)}
      >
        <View style={contentStyles} />
      </Motion.Fade>
      <Motion.PullUp
        style={{ position: 'absolute', bottom: 0 }}
        dropHeight={200}
        show={pullUpShow}
        onHide={() => setPullUpShow(false)}
      >
        <View style={[contentStyles, { bottom: 0 }]} />
      </Motion.PullUp>
      <Motion.ScaleFadeIn
        style={{ position: 'absolute', bottom: 0 }}
        show={scaleFadeInShow}
        onHide={() => setScaleFadeInShow(false)}
      >
        <View style={contentStyles} />
      </Motion.ScaleFadeIn>
      <Motion.ScalePullDown show={scalePullDownShow} onHide={() => setScalePullDownShow(false)}>
        <View style={contentStyles} />
      </Motion.ScalePullDown>
      <Motion.PushDown
        style={{ position: 'absolute', bottom: 0 }}
        show={pushDownShow}
        onHide={() => setPushDownShow(false)}
        dropHeight={100}
      >
        <View style={contentStyles} />
      </Motion.PushDown>
      <Motion.Toast
        style={{ position: 'absolute', bottom: 0 }}
        show={toastShow}
        onFinish={() => setToastShow(false)}
      >
        <View style={contentStyles} />
      </Motion.Toast>
    </>
  );
};
