import React from 'react';
import { View } from 'react-native';
import { Button, Collapsible, Utils } from 'tuya-panel-kit';
import Strings from '#i18n';

const { convertX: cx } = Utils.RatioUtils;

export default () => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <View style={{ backgroundColor: '#F5F5F6', height: cx(600) }}>
      <Button
        stretch={true}
        onPress={() => setCollapsed(!collapsed)}
        text={Strings.getLang('collapsible_label')}
        textStyle={{
          fontSize: cx(14),
        }}
        style={{
          height: 40,
          backgroundColor: '#fff',
          width: '100%',
          borderColor: '#F5F5F6',
          borderTopWidth: 1,
        }}
      />
      <Collapsible
        collapsed={collapsed}
        align="top"
        style={{
          height: 260,
          backgroundColor: '#fff',
          // justifyContent: 'center',
          // alignItems: 'center',
        }}
      >
        {/* <View
          style={{
            width: 308,
            height: 185,
            borderRadius: 28,
            backgroundColor: '#ddd',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TYText
            style={{
              textAlign: 'center',
              color: '#666',
              fontSize: 20,
            }}
            text="Talk is cheap, show me the code."
          />
          <TYText
            style={{
              marginTop: 30,
              textAlign: 'center',
              color: '#666',
              fontSize: 16,
            }}
            text={Strings.getLang('collapsible_content')}
          />
        </View> */}
      </Collapsible>
    </View>
  );
};
