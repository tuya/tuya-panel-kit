import React from 'react';
import { View } from 'react-native';
import { Button, Collapsible, TYText } from 'tuya-panel-kit';

import Strings from '#i18n';

export default () => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <>
      <Button
        stretch={true}
        onPress={() => setCollapsed(!collapsed)}
        text={Strings.getLang('collapsible_label')}
        style={{
          height: 40,
          backgroundColor: '#dfdfdf',
          width: '100%',
        }}
      />
      <Collapsible
        collapsed={collapsed}
        align="top"
        style={{
          width: 375,
          height: 260,
          backgroundColor: '#ff0',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
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
        </View>
      </Collapsible>
    </>
  );
};
