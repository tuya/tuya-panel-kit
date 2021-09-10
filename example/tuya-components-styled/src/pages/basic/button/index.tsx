import React from 'react';
import { View } from 'react-native';
import { TYSdk, Utils, I18N } from 'tuya-panel-kit';
import { ClassicButton, NordicButton, AcrylicButton, PaintButton } from 'tuya-panel-style-button';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { ListView } from '#components';
import Strings from '#i18n';

const { get, compareVersion } = Utils.CoreUtils;

const requireRnVersion = '5.31';

const PrivateStrings = new I18N({
  en: {
    no_icon_or_background: 'No icon, no background',
    set_padding: 'Set padding',
  },
  zh: {
    no_icon_or_background: '没有图标、没有背景',
    set_padding: '设置内边距',
  },
});

export default () => {
  const appRnVersion = get(TYSdk.mobile, 'mobileInfo.appRnVersion');
  const isGreater = appRnVersion && compareVersion(appRnVersion, requireRnVersion);
  const isShow = isGreater === 0 || isGreater === 1;
  return (
    <ListView
      style={{ backgroundColor: '#f8f8f8', height: 'auto' }}
      list={[
        {
          title: Strings.getLang('studio'),
          content: (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}
            >
              <ClassicButton
                onLongPress={() => console.log('long press')}
                icon={TuyaRNSvgs.power}
                text="开关"
                iconColor="#158CFB"
              />
            </View>
          ),
        },
        {
          title: Strings.getLang('nordic'),
          content: (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}
            >
              <NordicButton icon={TuyaRNSvgs.power} text="开关" iconColor="#FFF" />
            </View>
          ),
        },
        {
          title: Strings.getLang('acrylic'),
          content: (
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
              <AcrylicButton
                icon={TuyaRNSvgs.power}
                text="开关"
                iconColor="#FFF"
                isSupportAcrylic={isShow}
              />
            </View>
          ),
        },
        {
          title: Strings.getLang('paint'),
          content: (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}
            >
              <PaintButton icon={TuyaRNSvgs.power} text="开关" iconColor="#FFF" />
            </View>
          ),
        },
        {
          title: PrivateStrings.getLang('no_icon_or_background'),
          content: (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}
            >
              <PaintButton
                width={90}
                showIcon={false}
                icon={TuyaRNSvgs.power}
                text="开关"
                iconColor="#FFF"
                padding={[5, 0, 0, 5]}
              />
              <PaintButton
                width={90}
                showIconBg={false}
                icon={TuyaRNSvgs.power}
                text="开关"
                iconColor="#158CFC"
                style={{ marginLeft: 10 }}
              />
            </View>
          ),
        },
        {
          title: PrivateStrings.getLang('set_padding'),
          content: (
            <PaintButton
              icon={TuyaRNSvgs.power}
              text="开关"
              iconColor="#FFF"
              style={{ marginLeft: 10 }}
              padding={[10, 40, 0, 0]}
            />
          ),
        },
      ]}
    />
  );
};
