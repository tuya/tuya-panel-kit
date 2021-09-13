import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { I18N } from 'tuya-panel-kit';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { ClassicButtonCard } from 'tuya-panel-classic-kit';
import { NordicButtonCard } from 'tuya-panel-nordic-kit';
import { ClassicIconBackground } from 'tuya-panel-style-icon-background';
import { ListView } from '#components';
import Strings from '#i18n';

const PrivateStrings = new I18N({
  en: {
    custom_button_render_method: 'Custom button rendering methods',
    control_multiple_select: 'Controlled multiple selection',
  },
  zh: {
    control_multiple_select: '受控制的多选',
    custom_button_render_method: '自定义按钮渲染方法',
  },
});

const list = [
  {
    label: '按钮1',
    key: '0',
    disabled: true,
  },
  {
    label: '按钮2',
    key: '1',
  },
  {
    label: '按钮3',
    key: '2',
  },
  {
    label: '按钮4',
    key: '3',
  },
];

const list1 = list.map(item => ({
  ...item,
  icon: TuyaRNSvgs.power,
}));

export default () => {
  const [activeKeys, setActiveKeys] = useState(['0', '1']);
  const handActiveKeyChange = (key, nextKeys, data) => {
    setActiveKeys(nextKeys);
  };

  const renderButtonItem = data => {
    // console.log(data);
    return (
      <View style={styles.buttonStyle}>
        <ClassicIconBackground showIconBg={false} icon={data.icon} />
        <Text style={{ marginTop: 15 }}>{data.label}</Text>
      </View>
    );
  };

  return (
    <ListView
      style={{ backgroundColor: '#f9f9f9', height: 'auto' }}
      list={[
        {
          title: Strings.getLang('studio'),
          content: (
            <View>
              <ClassicButtonCard
                title="工作模式"
                showIconBg={false}
                icon={TuyaRNSvgs.power}
                list={list}
                defaultActiveKeys={['1']}
              />
              <Text style={styles.title}>{PrivateStrings.getLang('control_multiple_select')}</Text>
              <ClassicButtonCard
                title="工作模式"
                icon={TuyaRNSvgs.power}
                iconSize={14}
                showIconBg
                iconBgColor={{
                  deg: 90,
                  stops: {
                    '0%': 'red',
                    '100%': 'yellow',
                  },
                }}
                list={list}
                rowCount={4}
                activeKeys={activeKeys}
                activeKeyChange={handActiveKeyChange}
                type="multi"
              />
            </View>
          ),
        },
        {
          title: Strings.getLang('nordic'),
          content: (
            <View>
              <NordicButtonCard
                title="工作模式"
                showIconBg={false}
                icon={TuyaRNSvgs.power}
                list={list}
              />
              <Text style={styles.title}>
                {PrivateStrings.getLang('custom_button_render_method')}
              </Text>
              <NordicButtonCard
                title="工作模式"
                showIconBg={false}
                icon={TuyaRNSvgs.power}
                list={list1}
                renderButtonItem={renderButtonItem}
                rowCount={4}
                showTitle={false}
                backgroundColor="rgba(255, 255, 255, 0)"
              />
            </View>
          ),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(254, 120, 98, 0.3)',
    height: 98,
    borderRadius: 98,
  },
  title: { marginTop: 20, marginBottom: 20, color: '#333' },
});
