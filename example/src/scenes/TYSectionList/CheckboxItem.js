import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { TYSectionList, TYText } from 'tuya-panel-kit';
import svgs from 'tuya-panel-kit/src/components/iconfont/svg/defaultSvg'; // eslint-disable-line
import Strings from '../../i18n';

const DetailAction = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <TYText type="paragraph" size="large" text={Strings.getLang('tysectionlist_details')} color="rgba(51, 51, 51, 0.5)" />
    <Image style={{ marginLeft: 6 }} source={require('./res/alert.png')} />
  </View>
);

export default class TYSectionListCheckboxItemScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: -1,
      value2: 0,
      values: [],
    };
  }

  get sections() {
    return [
      {
        title: Strings.getLang('motion_single_choice'),
        data: new Array(3).fill(0).map((_, idx) => ({
          key: idx,
          theme: { descFontColor: idx === 0 ? '#7ED321' : '#F5A623' },
          Action: idx === 0 ? Strings.getLang('tyflatlist_success') : Strings.getLang('tyflatlist_failure'),
          title: `${Strings.getLang('tysectionlist_april')}${idx}${Strings.getLang('tysectionlist_day')} 23:15`,
          subTitle: Strings.getLang('tyflatlist_work1'),
          checked: this.state.value === idx,
          onChange: checked => this.setState({ value: checked ? idx : -1 }),
        })),
      },
      {
        title: Strings.getLang('motion_multiple_choice'),
        data: [
          {
            key: 0,
            title: Strings.getLang('tysectionlist_options_selected'),
            checked: this.state.values.includes(0),
            onChange: checked =>
              this.setState(({ values }) => ({
                values: checked ? [...values, 0] : values.filter(v => v !== 0),
              })),
          },
          {
            key: 1,
            title: Strings.getLang('tysectionlist_options_unselected'),
            Action: () => <DetailAction />,
            checked: this.state.values.includes(1),
            onChange: checked =>
              this.setState(({ values }) => ({
                values: checked ? [...values, 1] : values.filter(v => v !== 1),
              })),
          },
          {
            key: 2,
            title: Strings.getLang('tysectionlist_options_inoperable'),
            Action: () => <DetailAction />,
            checked: false,
            disabled: true,
          },
          {
            key: 3,
            title: Strings.getLang('tysectionlist_options_unableto_select'),
            Action: () => <DetailAction />,
            checked: true,
            disabled: true,
          },
        ],
      },
      {
        title: Strings.getLang('tysectionlist_fit_test'),
        data: [
          {
            key: 0,
            title: Strings.getLang('tysectionlist_long_title'),
            subTitle: Strings.getLang('tysectionlist_test_subtitle'),
            checked: this.state.value2 === 0,
            checkedIcon: svgs.selectedUnBordered,
            onChange: checked => this.setState({ value2: checked ? 0 : -1 }),
            hideOnUnselect: true,
          },
          {
            key: 1,
            title: Strings.getLang('tysectionlist_long_title'),
            subTitle: Strings.getLang('tysectionlist_test_subtitle'),
            checked: this.state.value2 === 1,
            checkedIcon: svgs.selectedUnBordered,
            onChange: checked => this.setState({ value2: checked ? 1 : -1 }),
            hideOnUnselect: true,
          },
          {
            key: 2,
            title: Strings.getLang('motion_single_choice'),
            checked: this.state.value2 === 2,
            checkedIcon: svgs.selectedUnBordered,
            onChange: checked => this.setState({ value2: checked ? 2 : -1 }),
            Action: () => <DetailAction />,
            hideOnUnselect: true,
          },
        ],
      },
    ];
  }

  renderItem = ({ item }) => {
    return <TYSectionList.CheckboxItem {...item} />;
  };

  render() {
    return (
      <TYSectionList
        style={{ alignSelf: 'stretch' }}
        sections={this.sections}
        renderItem={this.renderItem}
      />
    );
  }
}
