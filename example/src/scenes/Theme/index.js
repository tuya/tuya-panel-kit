import _map from 'lodash/map';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TYSectionList, Dialog, Popup, Utils } from 'tuya-panel-kit';
import ColorPicker from '../../components/color-picker';
import { store } from '../../main';
import { updateTheme } from '../../redux/modules/theme';
import Strings from '../../i18n';

const { CoreUtils, ColorUtils } = Utils;

class ThemeSettingScene extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this._color = [360, 0, 0];
  }

  get sections() {
    const sections = _map(this.props.theme, (value, key) => {
      if (key === 'type') {
        return {
          key,
          title: key,
          data: [{ key, title: Strings.getLang('theme_global_type'), value }],
        };
      }
      const datas = value.type ? value[value.type] : value;
      return {
        key,
        title: key,
        data: _map(datas, (themeValue, themeKey) => {
          const themePath = value.type ? `${key}.${value.type}.${themeKey}` : `${key}.${themeKey}`;
          const isObject = CoreUtils.isObject(themeValue);
          return {
            key: themeKey,
            title: themeKey,
            value: isObject ? '' : `${themeValue}`,
            disabled: isObject,
            onPress: () => this._handlePress(themeValue, themePath),
          };
        }),
      };
    });
    return sections;
  }

  buildTheme(themePath, value) {
    const keys = themePath.split('.');
    let newTheme;
    if (keys.length === 3) {
      const [key, type, themeKey] = keys;
      newTheme = { [key]: { [type]: { [themeKey]: value } } };
    }
    if (keys.length === 2) {
      const [key, themeKey] = keys;
      newTheme = { [key]: { [themeKey]: value } };
    }
    return newTheme;
  }

  _handlePress = (themeValue, themePath) => {
    if (typeof themeValue === 'number') {
      Popup.numberSelector({
        title: themePath,
        cancelText: Strings.getLang('dialog_cancel'),
        confirmText: Strings.getLang('dialog_confirm'),
        value: themeValue,
        min: 0,
        max: 375,
        onConfirm: value => {
          const newTheme = this.buildTheme(themePath, value);
          store.dispatch(updateTheme(newTheme));
          Popup.close();
        },
      });
      return;
    }
    Dialog.custom({
      title: themePath,
      cancelText: Strings.getLang('dialog_cancel'),
      confirmText: Strings.getLang('dialog_confirm'),
      content: (
        <ColorPicker
          onComplete={color => {
            this._color = color;
          }}
        />
      ),
      onConfirm: () => {
        const hex = ColorUtils.color.hsv2hex(...this._color);
        const newTheme = this.buildTheme(themePath, hex);
        store.dispatch(updateTheme(newTheme));
        Dialog.close();
      },
    });
  };

  render() {
    return <TYSectionList style={{ marginTop: 16 }} sections={this.sections} />;
  }
}

export default connect(({ theme }) => ({
  theme,
}))(ThemeSettingScene);
