import React from 'react';
import { View } from 'react-native';
import { SwitchButton } from 'tuya-panel-kit';

import { ListView } from '#components';
import Strings from '#i18n';

const dPath = "M513.8 786.2c20.1 0 36.4-16.3 36.4-36.4v-291.5c0-20.1-16.3-36.4-36.4-36.4-20.1 0-36.4 16.3-36.4 36.4V749.8c-0.1 20.1 16.3 36.4 36.4 36.4zM315.2 691c12 0.9 21.1-3.2 27.4-12.2 6.3-9 7.1-20.2 2.4-33.7-84.8-55.3-140.9-150.9-140.9-259.7 0-171.1 138.7-309.7 309.7-309.7s309.7 138.7 309.7 309.7c0 108.8-56.1 204.5-140.9 259.7-4.7 11.6-4.7 21.9 0 30.9s14.6 14 29.8 15c99.8-65 165.8-177.6 165.8-305.6C878.2 184.2 715 21 513.8 21S149.4 184.2 149.4 385.4c0 128 66 240.6 165.8 305.6z"

export default () => {
  const [value1, setValue1] = React.useState(true);
  const [value2, setValue2] = React.useState(false);
  return (
    <ListView
      list={[
        {
          title: Strings.getLang('switchbutton_style1'),
          content: (
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <SwitchButton
                value={value1}
                onValueChange={v => setValue1(v)}
                style={{ marginRight: 14 }}
              />
              <SwitchButton value={value2} onValueChange={v => setValue2(v)} />
            </View>
          ),
        },
        {
          title: Strings.getLang('switchbutton_style2'),
          content: (
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <SwitchButton
                value={value1}
                size={{ activeSize: 4, margin: 6 }}
                thumbStyle={{ width: 4, height: 12, borderRadius: 2 }}
                onValueChange={v => setValue1(v)}
                style={{ marginRight: 14 }}
              />
              <SwitchButton
                value={value2}
                size={{ activeSize: 4, margin: 6 }}
                thumbStyle={{ width: 4, height: 12, borderRadius: 2 }}
                onValueChange={v => setValue2(v)}
              />
            </View>
          ),
        },
        {
          title: Strings.getLang('switchbutton_style_basic_text'),
          content: (
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <SwitchButton
                size={{ activeSize: 18, margin: 5, width: 52, height: 28, borderRadius: 10 }}
                theme={{ onTintColor: '#57BCFB', onThumbTintColor: '#FFF' }}
                thumbStyle={{ width: 18, height: 18, borderRadius: 6 }}
                value={value1}
                onText="ON"
                offText="OFF"
                onValueChange={v => setValue1(v)}
                style={{ marginRight: 14 }}
              />
              <SwitchButton
                value={value2}
                size={{ activeSize: 18, margin: 5, width: 52, height: 28, borderRadius: 10 }}
                theme={{ onTintColor: '#57BCFB', onThumbTintColor: '#FFF' }}
                thumbStyle={{ width: 18, height: 18, borderRadius: 6 }}
                onText="ON"
                offText="OFF"
                onValueChange={v => setValue2(v)}
              />
            </View>
          ),
        },
        {
          title: Strings.getLang('switchbutton_style_icon'),
          content: (
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <SwitchButton
                size={{ activeSize: 40, margin: 4, width: 92, height: 48, borderRadius: 10 }}
                theme={{ onTintColor: '#00F', onThumbTintColor: '#57BCFB', thumbTintColor: '#57BCFB' }}
                thumbStyle={{ width: 40, height: 40, borderRadius: 9 }}
                value={value1}
                onText="ON"
                offText="OFF"
                onTextStyle={{ color: '#57BCFB', left: 15 }}
                d={dPath}
                iconColor="#FFF"
                offTextStyle={{ right: 15 }}
                onValueChange={v => setValue1(v)}
                style={{ marginRight: 14 }}
              />
              <SwitchButton
                value={value2}
                size={{ activeSize: 40, margin: 4, width: 92, height: 48, borderRadius: 10 }}
                theme={{ onTintColor: '#00F', onThumbTintColor: '#57BCFB', thumbTintColor: '#57BCFB' }}
                thumbStyle={{ width: 40, height: 40, borderRadius: 9 }}
                onText="ON"
                offText="OFF"
                onTextStyle={{ color: '#57BCFB', left: 15 }}
                d={dPath}
                iconColor="#FFF"
                offTextStyle={{ right: 15 }}
                onValueChange={v => setValue2(v)}
              />
            </View>
          ),
        },
        {
          title: Strings.getLang('switchbutton_style_thumb'),
          content: (
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <SwitchButton
                size={{ activeSize: 34, margin: 3, width: 78, height: 40, borderRadius: 16 }}
                theme={{ onTintColor: '#57BCFB', onThumbTintColor: '#FFF' }}
                thumbStyle={{ width: 34, height: 34, borderRadius: 14 }}
                value={value1}
                switchType="thumbMore"
                onValueChange={v => setValue1(v)}
                style={{ marginRight: 14 }}
              />
              <SwitchButton
                value={value2}
                size={{ activeSize: 34, margin: 3, width: 78, height: 40, borderRadius: 16 }}
                theme={{ onTintColor: '#57BCFB', onThumbTintColor: '#FFF' }}
                thumbStyle={{ width: 34, height: 34, borderRadius: 14 }}
                switchType="thumbMore"
                onValueChange={v => setValue2(v)}
              />
            </View>
          ),
        },
        {
          title: Strings.getLang('switchbutton_style_gradient'),
          content: (
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <SwitchButton
                value={value1}
                onText=""
                offText=""
                tintColor="#E5E5E5"
                onTintColor={{
                  '0%': '#FA709A',
                  '100%': '#FEDD44',
                }}
                onValueChange={v => setValue1(v)}
                style={{ marginRight: 14 }}
              />
              <SwitchButton
                value={value2}
                onText=""
                offText=""
                tintColor="#E5E5E5"
                onTintColor={{
                  '0%': '#FA709A',
                  '100%': '#FEDD44',
                }}
                onValueChange={v => setValue2(v)}
              />
            </View>
          ),
        },
        {
          title: Strings.getLang('switchbutton_style_gradient_text'),
          content: (
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <SwitchButton
                value={value1}
                onValueChange={v => setValue1(v)}
                tintColor="#E5E5E5"
                onText="ON"
                offText="OFF"
                onTintColor={{
                  '0%': '#FA709A',
                  '100%': '#FEDD44',
                }}
                style={{ marginRight: 14 }}
              />
              <SwitchButton
                value={value2}
                onValueChange={v => setValue2(v)}
                tintColor="#E5E5E5"
                onText="ON"
                offText="OFF"
                onTintColor={{
                  '0%': '#FA709A',
                  '100%': '#FEDD44',
                }}
              />
            </View>
          ),
        },
        {
          title: Strings.getLang('switchbutton_style_uncontrol'),
          content: (
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <SwitchButton
                defaultValue={true}
                onValueChange={value => console.log(value)}
                style={{ marginRight: 14 }}
              />
              <SwitchButton defaultValue={false} onValueChange={value => console.log(value)} />
            </View>
          ),
        },
      ]}
    />
  );
};
