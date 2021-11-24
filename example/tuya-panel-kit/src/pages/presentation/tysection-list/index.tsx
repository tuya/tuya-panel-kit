import React from 'react';
import { View } from 'react-native';
import { TYSectionList, TYText, Utils } from 'tuya-panel-kit';

import Strings from '#i18n';

const { height } = Utils.RatioUtils;

export default () => {
  const [state, set] = React.useState({
    value: -1,
    sliderValue: 50,
    name: '',
    switchValue: true,
  });
  const setState = value => set({ ...state, ...value });

  const sections = [
    {
      title: Strings.getLang('tysectionlist_basic'),
      data: [
        {
          key: 0,
          theme: { descFontColor: '#FF4444' },
          title: Strings.getLang('tysectionlist_basic_title'),
          subTitle: Strings.getLang('tysectionlist_basic_subTitle'),
          value: 'New',
          arrow: true,
          Action: (
            <View
              style={{
                paddingHorizontal: 4,
                borderRadius: 8,
                backgroundColor: '#FF4444',
              }}
            >
              <TYText type="paragraph" size="normal" text="New" color="#fff" />
            </View>
          ),
        },
      ],
      renderItem: ({ item }) => <TYSectionList.Item {...item} />,
    },
    {
      title: Strings.getLang('tysectionlist_select'),
      data: [
        {
          key: 0,
          theme: { descFontColor: '#7ED321' },
          Action: Strings.getLang('tysectionlist_select_action'),
          title: Strings.getLang('tysectionlist_select_title'),
          subTitle: Strings.getLang('tysectionlist_select_subTitle'),
          checked: state.value === 0,
          onChange: checked => setState({ value: checked ? 0 : -1 }),
        },
      ],
      renderItem: ({ item }) => <TYSectionList.CheckboxItem {...item} />,
    },
    {
      title: Strings.getLang('tysectionlist_slider'),
      data: [
        {
          key: 0,
          actionType: 'iconfont',
          Icon: 'volume-sharp-off',
          Action: 'volume-sharp-max',
          value: state.sliderValue,
          minimumValue: 0,
          maximumValue: 100,
          canTouchTrack: true,
          onSlidingComplete: sliderValue => setState({ sliderValue }),
        },
      ],
      renderItem: ({ item }) => <TYSectionList.SliderItem {...item} />,
    },
    {
      title: Strings.getLang('tysectionlist_input'),
      data: [
        {
          key: 0,
          title: Strings.getLang('tysectionlist_input_title'),
          value: state.name,
          placeholder: Strings.getLang('tysectionlist_input_place'),
          onChangeText: name => setState({ name }),
        },
      ],
      renderItem: ({ item }) => <TYSectionList.InputItem {...item} />,
    },
    {
      title: Strings.getLang('tysectionlist_switch'),
      data: [
        {
          key: 0,
          title: Strings.getLang('tysectionlist_switch_title'),
          subTitle: Strings.getLang('tysectionlist_switch_subTitle'),
          value: state.switchValue,
          onValueChange: value => setState({ switchValue: value }),
        },
      ],
      renderItem: ({ item }) => <TYSectionList.SwitchItem {...item} />,
    },
  ];

  return (
    <View style={{ height, backgroundColor: '#F8F8F8' }}>
      <TYSectionList
        style={{ alignSelf: 'stretch' }}
        sections={sections as any}
        renderItem={({ item }) => <TYSectionList.CheckboxItem {...(item as any)} />}
      />
    </View>
  );
};
