import React from 'react';
import { ScrollView } from 'react-native';
import { IconFont } from 'tuya-panel-kit';
import svgs from 'tuya-panel-kit/src/components/iconfont/svg/defaultSvg'; // eslint-disable-line
import svgsART from 'tuya-panel-kit/src/components/iconfont/art/defaultSvg'; // eslint-disable-line
import TesterTitle from '../../components/TesterTitle';

const IconScene = () => {
  return (
    <ScrollView style={{ flex: 1, marginTop: 16 }}>
      <TesterTitle title="内置IconSvg" />
      <IconFont name="0" size={50 * 0.72} color="red" />
      <TesterTitle title="自定义IconSvg" />
      <IconFont d={svgs.plus} size={50 * 0.72} color="red" />
      <TesterTitle title="多个IconSvg" />
      <IconFont d={[svgs[1], svgs[2]]} size={50 * 0.72} color="red" />

      <TesterTitle title="内置IconFont" />
      <IconFont useART={true} name="0" size={50} color="red" />
      <TesterTitle title="自定义IconFont " />
      <IconFont useART={true} d={svgsART.plus} size={50} color="red" />
      <TesterTitle title="多个IconFont " />
      <IconFont useART={true} d={[svgsART[1], svgsART[2]]} size={50} color="red" />
    </ScrollView>
  );
};

export default IconScene;
