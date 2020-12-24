import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { TYText, Utils, defaultTheme } from 'tuya-panel-kit';

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
      <TYText color="red" align="center" weight="bold" size={36} text="自定义大小 36px" />
      <TYText style={{ fontSize: 36, textAlign: 'center' }} text="自定义大小 36px" />
    </ScrollView>
  );
};

TYTextScene.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withTheme(TYTextScene);
