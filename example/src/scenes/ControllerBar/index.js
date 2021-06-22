import React from 'react';
import { ScrollView } from 'react-native';
import { ControllerBar } from 'tuya-panel-kit';
import TesterTitle from '../../components/TesterTitle';
import Strings from '../../i18n';

// const ControlItem = props => {
//   const { theme, schema, values, ...rest } = props;
//   return <ControllerBar {...rest} />;
// };



const ControllerBarScene = () => {
  const baseDataSource = [
    { text: Strings.getLang('controllerbar_switch'), icon: 'selected', iconSize: 28 },
    { text: Strings.getLang('controllerbar_automatic'), icon: 'warning', iconSize: 28 },
    { text: Strings.getLang('controllerbar_sleep'), icon: 'plus', iconSize: 28 },
    { text: Strings.getLang('controllerbar_strong'), icon: 'minus', iconSize: 28 },
  ];

  g1 = Strings.getLang('controllerbar_group') + '1';
  g2 = Strings.getLang('controllerbar_group') + '2';

  return (
    <ScrollView>
      <TesterTitle title={Strings.getLang('controllerbar_icon_bottom_bar')} />
      <ControllerBar button={baseDataSource} />
      <TesterTitle title={Strings.getLang('controllerbar_waitbackground_iconbottombar')} />
      <ControllerBar type="primary" button={baseDataSource} />
      <TesterTitle title={Strings.getLang('controllerbar_control_bar_combination')} />
      <ControllerBar.Group>
        <ControllerBar
          size={44}
          button={[{ text: 'A', type: 'primary' }, { text: 'B', type: 'primary' }]}
        />
        <ControllerBar
          size={44}
          button={[{ text: 'C', type: 'primary' }, { text: 'D', type: 'primary' }]}
        />
      </ControllerBar.Group>
      <TesterTitle title={Strings.getLang('controllerbar_Multi_screen_swiped')} />
      <ControllerBar.Group
        type="swiper"
        swiperConfig={{
          style: { height: 60 },
          dotActiveStyle: { backgroundColor: 'red' },
          dotStyle: { backgroundColor: 'blue' },
        }}
        size={44}
      >
        <ControllerBar
          size={44}
          button={[{ text: 'Swiper', type: 'primary' }, { text: g1, type: 'primary' }]}
        />
        <ControllerBar
          size={44}
          button={[{ text: 'Swiper', type: 'primary' }, { text: g2, type: 'primary' }]}
        />
      </ControllerBar.Group>
      <TesterTitle title={Strings.getLang('controllerbar_test_size')}/>
      <ControllerBar.Group size={44} type="divide">
        <ControllerBar
          size={22}
          button={[{ text: 'A', size: 80, type: 'primary' }, { text: 'B', type: 'primary' }]}
        />
        <ControllerBar
          // size={22}
          button={[{ text: 'C', type: 'primary' }, { text: 'D', type: 'primary' }]}
        />
      </ControllerBar.Group>
    </ScrollView>
  );
};

export default ControllerBarScene;
