import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { TYText, Utils, defaultTheme } from 'tuya-panel-kit';
import Strings from '../../i18n';

const { withTheme } = Utils.ThemeUtils;

const TYTextScene = props => {
  const typeMap = ['heading', 'title', 'paragraph'];
  const sizeMap = ['large', 'normal', 'small'];
  return (
    <ScrollView>
      {typeMap.map(type =>
        sizeMap.map((size, idx) => {
          const { fontSize } = defaultTheme.text[type][size](props.theme);
          return (
            <View
              key={`${type}-${size}`}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: 36,
              }}
            >
              <TYText>{`${type}-${size}`}</TYText>
              <TYText type={type} size={sizeMap[idx]}>{`${fontSize}px`}</TYText>
            </View>
          );
        })
      )}
      {/* Custom Size Text */}
      <TYText color="red" align="center" weight="bold" size={36} text={Strings.getLang('tytext_custom_size')} />
      <TYText style={{ fontSize: 36, textAlign: 'center' }} text={Strings.getLang('tytext_custom_size')} />
    </ScrollView>
  );
};

TYTextScene.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withTheme(TYTextScene);
