import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TextInput, ViewPropTypes, StyleSheet, Platform } from 'react-native';
import Divider from '../../divider';
import TYText from '../../TYText';
import ListItem from '../list-item';

function InputItem({ style, title, titleStyle, inputStyle, ...textInputProps }) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <TYText style={[styles.title, titleStyle]}>{title}</TYText>
        <TextInput
          style={[styles.textInput, { padding: Platform.OS === 'android' ? 0 : null }, inputStyle]}
          placeholderTextColor="#dbdbdb"
          underlineColorAndroid="transparent"
          {...textInputProps}
        />
      </View>
      <View style={styles.dot} />
      <Divider />
    </View>
  );
}

InputItem.propTypes = {
  ...ListItem.propTypes,
  ...TextInput.propTypes,
  /**
   * 列表项的标题
   */
  title: PropTypes.string.isRequired,
  /**
   * 标题样式
   */
  titleStyle: Text.propTypes.style,
  /**
   * TextInput样式
   */
  inputStyle: ViewPropTypes.style,
};

InputItem.defaultProps = {
  titleStyle: null,
  inputStyle: null,
};

const styles = StyleSheet.create({
  container: {
    height: 94,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },

  content: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  title: {
    fontSize: 14,
    color: '#999',
  },

  textInput: {
    alignSelf: 'stretch',
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#dbdbdb',
  },
});

export default InputItem;
