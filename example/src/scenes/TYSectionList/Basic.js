import React, { Component } from 'react';
import { View } from 'react-native';
import { TYSdk, TYText, TYSectionList } from 'tuya-panel-kit';
import Strings from '../../i18n';

const TYNative = TYSdk.native;

export default class TYSectionListBasicScene extends Component {
  state = {
    switch1: true,
    switch2: false,
  };

  get sections() {
    return [
      {
        title: Strings.getLang('tysectionlist_basic_list'),
        data: new Array(2).fill(0).map((_, idx) => ({
          key: idx,
          title: `${Strings.getLang('tysectionlist_list_title')}${idx + 1}`,
          value: idx === 0 ? '' : Strings.getLang('tysectionlist_details'),
          arrow: true,
          onPress: this._handleItemPress(idx),
        })),
      },
      {
        title: Strings.getLang('tysectionlist_switch_list'),
        data: new Array(2).fill(0).map((_, idx) => ({
          key: idx,
          title: `${Strings.getLang('tysectionlist_list_title')}${idx + 1}`,
          value: this.state[`switch${idx + 1}`],
          onValueChange: value => this.setState({ [`switch${idx + 1}`]: value }),
        })),
      },
      {
        title: Strings.getLang('tysectionlist_custom_color'),
        data: new Array(3).fill(0).map((_, idx) => {
          const valueMap = {
            0: Strings.getLang('tysectionlist_details'),
            1: Strings.getLang('tysectionlist_new_content'),
            2: Strings.getLang('tysectionlist_warning_message'),
          };
          const colorMap = {
            0: 'rgba(51, 51, 51, 0.5)',
            1: '#0E7EFF',
            2: '#FF4444',
          };
          return {
            key: idx,
            theme: { descFontColor: colorMap[idx] },
            title: `${Strings.getLang('tysectionlist_list_title')}${idx + 1}`,
            value: valueMap[idx],
            onPress: this._handleItemPress(idx),
          };
        }),
      },
      {
        title: Strings.getLang('tysectionlist_custom_action'),
        data: new Array(3).fill(0).map((_, idx) => {
          const valueMap = {
            0: '8',
            1: '99+',
            2: 'New',
          };
          return {
            key: idx,
            title: `${Strings.getLang('tysectionlist_list_title')}${idx + 1}`,
            Action: (
              <View style={{ paddingHorizontal: 4, borderRadius: 8, backgroundColor: '#FF4444' }}>
                <TYText type="paragraph" size="normal" text={valueMap[idx]} color="#fff" />
              </View>
            ),
            arrow: true,
          };
        }),
      },
      {
        title: Strings.getLang('tysectionlist_category_title'),
        data: [
          {
            key: 0,
            title: Strings.getLang('tysectionlist_list_title'),
            arrow: true,
          },
        ],
      },
      {
        footer: Strings.getLang('tysectionlist_description'),
        data: [
          {
            key: 0,
            title: Strings.getLang('tysectionlist_list_title'),
            arrow: true,
          },
        ],
      },
      {
        footer: (
          <View style={{ flexDirection: 'row' }}>
            <TYText
              type="paragraph"
              size="normal"
              color="#666"
              text={Strings.getLang('tysectionlist_description')}
            />
            <TYText type="paragraph" size="normal" color="#3388FF" text={Strings.getLang('tysectionlist_learnmore')} />
          </View>
        ),
        data: [
          {
            key: 0,
            title: Strings.getLang('tysectionlist_list_title'),
            arrow: true,
          },
        ],
      },
      {
        footer:
          `${Strings.getLang('tysectionlist_description')}${Strings.getLang('tysectionlist_description')}${Strings.getLang('tysectionlist_description')}`,
        data: [
          {
            key: 0,
            title: Strings.getLang('tysectionlist_list_title'),
            arrow: true,
          },
        ],
      },
      {
        title: Strings.getLang('tysectionlist_adaptation_test'),
        data: [
          {
            key: 0,
            title: Strings.getLang('tysectionlist_list_title'),
            subTitle: `${Strings.getLang('tysectionlist_information')}${Strings.getLang('tysectionlist_information')}${Strings.getLang('tysectionlist_information')}`,
            arrow: true,
          },
          {
            key: 1,
            title: `${Strings.getLang('tysectionlist_longtitle')}${Strings.getLang('tysectionlist_longtitle')}${Strings.getLang('tysectionlist_longtitle')}`,
            subTitle: Strings.getLang('tysectionlist_details'),
            arrow: true,
          },
          {
            key: 2,
            title: `${Strings.getLang('tysectionlist_longtitle')}${Strings.getLang('tysectionlist_longtitle')}${Strings.getLang('tysectionlist_longtitle')}`,
            subTitle: `${Strings.getLang('tysectionlist_information')}${Strings.getLang('tysectionlist_information')}${Strings.getLang('tysectionlist_information')}`,
            arrow: true,
          },
          {
            key: 3,
            title: `${Strings.getLang('tysectionlist_longtitle')}${Strings.getLang('tysectionlist_longtitle')}${Strings.getLang('tysectionlist_longtitle')}`,
            value: true,
          },
          {
            key: 4,
            theme: { subFontColor: '#FF4444' },
            title: `${Strings.getLang('tysectionlist_longtitle')}${Strings.getLang('tysectionlist_longtitle')}${Strings.getLang('tysectionlist_longtitle')}`,
            subTitle: Strings.getLang('tysectionlist_warning_message'),
          },
          {
            key: 5,
            title: `${Strings.getLang('tysectionlist_longtitle')}${Strings.getLang('tysectionlist_longtitle')}${Strings.getLang('tysectionlist_longtitle')}`,
            children: (
              <View
                style={{
                  alignSelf: 'flex-start',
                  marginTop: 4,
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
      },
    ];
  }

  _handleItemPress = value => () => {
    TYNative.simpleTipDialog(`Click Item ${value}`, () => {});
  };

  render() {
    return <TYSectionList style={{ alignSelf: 'stretch' }} sections={this.sections} />;
  }
}
