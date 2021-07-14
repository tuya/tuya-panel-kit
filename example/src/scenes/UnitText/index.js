import React from 'react';
import { ScrollView } from 'react-native';
import { UnitText } from 'tuya-panel-kit';
import svgs from 'tuya-panel-kit/src/components/iconfont/svg/defaultSvg'; // eslint-disable-line
import svgsART from 'tuya-panel-kit/src/components/iconfont/art/defaultSvg'; // eslint-disable-line
import TesterTitle from '../../components/TesterTitle';
import Strings from '../../i18n';

const UnitTextScene = () => {
  return (
    <ScrollView style={{ flex: 1, marginTop: 16 }}>
      <TesterTitle title={Strings.getLang('unitText_basic')} />
      <UnitText value="999" size={36} unit="celsius" valueColor="red" unitColor="red" />
      <UnitText value="0123456789.:," size={36} unit="celsius" valueColor="red" unitColor="red" />
      <UnitText value="0:999" size={36} unit="celsius" valueColor="red" unitColor="red" />
      <UnitText value="999,88" size={36} unit="celsius" valueColor="red" unitColor="red" />
      <UnitText
        value="0.99.999999:12"
        letterWidth={0.55}
        size={36}
        unit="celsius"
        valueColor="red"
        unitColor="red"
      />
      <TesterTitle title={Strings.getLang('unitText_custom_color')} />
      <UnitText
        value="032"
        size={36}
        unit={svgs.fahrenheit}
        valueColor="red"
        valueColors={['rgba(0, 0, 0, 0.3)', undefined, 'blue']}
        unitColor="red"
      />

      <TesterTitle title={Strings.getLang('unitText_basic_art')} />
      <UnitText
        useART={true}
        value="0.999"
        size={50}
        unit="celsius"
        valueColor="red"
        unitColor="red"
      />
      <TesterTitle title={Strings.getLang('unitText_custom_color_art')} />
      <UnitText
        useART={true}
        value="032"
        size={50}
        unit={svgsART.fahrenhei}
        valueColor="red"
        valueColors={['rgba(0, 0, 0, 0.3)', undefined, 'blue']}
        unitColor="red"
      />
    </ScrollView>
  );
};

export default UnitTextScene;
