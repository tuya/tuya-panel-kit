import React from 'react';
import { View } from 'react-native';
import { Button, Utils } from 'tuya-panel-kit';
import Strings from '#i18n';
import { ListView } from '#components';

const { convertX: cx } = Utils.RatioUtils;

const powerPath = `M874.039 149.961c199.948 199.949 199.948 524.13 0 724.078-199.949 199.948-524.13 199.948-724.078 0-199.948-199.949-199.948-524.13 0-724.078 19.995-19.995 52.413-19.995 72.408 0 19.995 19.995 19.995 52.413 0 72.408-159.959 159.959-159.959 419.303 0 579.262 159.959 159.959 419.303 159.959 579.262 0 159.959-159.959 159.959-419.303 0-579.262-19.995-19.995-19.995-52.413 0-72.408 19.995-19.995 52.413-19.995 72.408 0zM562.2 0a1 1 0 0 1 1 1v510a1 1 0 0 1-1 1H461.8a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h100.4z`;

export default () => {
  return (
    <ListView
      list={[
        {
          title: Strings.getLang('pure_text_button'),
          content: (
            <Button
              text={Strings.getLang('click_me_once')}
              textStyle={{
                fontSize: cx(14),
                color: '#000000',
              }}
              wrapperStyle={{
                alignSelf: 'flex-start',
              }}
            />
          ),
        },
        {
          title: Strings.getLang('pure_icon_button'),
          content: (
            <Button
              iconColor="#fff"
              size={24}
              style={{
                width: cx(48),
                height: cx(48),
                backgroundColor: '#1C1D1E',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.5,
                shadowRadius: 8,
                elevation: 8,
              }}
              wrapperStyle={{
                alignSelf: 'flex-start',
              }}
              iconPath={powerPath}
            />
          ),
        },
        {
          title: Strings.getLang('with_text_icon_button'),
          content: (
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
              <Button
                iconColor="#fff"
                size={24}
                style={{
                  width: cx(48),
                  height: cx(48),
                  backgroundColor: '#1C1D1E',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 8,
                  elevation: 8,
                }}
                iconPath={powerPath}
                text={Strings.getLang('power')}
              />
              <Button
                iconColor="#fff"
                textDirection="right"
                size={24}
                iconPath={powerPath}
                style={{
                  width: cx(48),
                  height: cx(48),
                  backgroundColor: '#1C1D1E',
                }}
                textStyle={{
                  color: '#fff',
                  marginLeft: 0,
                  marginRight: cx(15),
                }}
                wrapperStyle={{
                  backgroundColor: '#1C1D1E',
                  borderRadius: cx(12),
                  marginLeft: cx(27),
                  position: 'relative',
                  top: cx(-12),
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 8,
                  elevation: 8,
                }}
                text={Strings.getLang('power')}
              />
            </View>
          ),
        },
      ]}
    />
  );
};
