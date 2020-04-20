/* eslint-disable max-len */
import React from 'react';
import { FlatList, View, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import TYFlatList from '../TYLists/list';
import withSkeleton from './withSkeleton';
import { ThemeUtils } from '../../utils';
import { StyledIconFont, StyledFlatList, StyledSwitch } from './styled';

const selectedPath =
  'M288.67 521.63l18.69-25.26a5.217 5.217 0 0 1 7.29-1.09c0.02 0.01 0.04 0.03 0.06 0.04l113.01 86.01a5.216 5.216 0 0 0 6.48-0.13l275.9-228.25a5.22 5.22 0 0 1 6.97 0.29l17.32 16.98a5.212 5.212 0 0 1 0.07 7.37l-0.08 0.08-299.65 292.84a5.221 5.221 0 0 1-7.37-0.08l-0.01-0.01-138.22-142.06a5.206 5.206 0 0 1-0.46-6.73z';
const { getTheme, ThemeConsumer } = ThemeUtils;

let itemHeight = 48;

class ListPopup extends React.Component {
  static propTypes = {
    ...FlatList.propTypes,
    switchValue: PropTypes.bool.isRequired,
    listWrapperStyle: ViewPropTypes.style,
    dataSource: PropTypes.arrayOf(
      PropTypes.shape({
        styles: PropTypes.object,
        title: PropTypes.string,
        Icon: PropTypes.element,
        value: PropTypes.any.isRequired,
      })
    ),

    maxItemNum: PropTypes.number,
    selectedIcon: PropTypes.element,
    type: PropTypes.oneOf(['switch', 'radio']),
    iconTintColor: PropTypes.string,
    contentCenter: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    listItemStyle: ViewPropTypes.style,

    onSelect: PropTypes.func,
    _onDataChange: PropTypes.func,
  };

  static defaultProps = {
    listWrapperStyle: null,
    dataSource: [],
    maxItemNum: 5,
    selectedIcon: null,
    type: 'radio',
    iconTintColor: '',
    contentCenter: null,
    value: -1,
    listItemStyle: null,
    onSelect: () => {},
    _onDataChange: () => {},
  };

  constructor(props) {
    super(props);
    const { selected, selectedArr } = this.calcSelected(props);
    itemHeight = StyleSheet.flatten([props.listItemStyle]).height || 48;
    this.state = {
      selected,
      selectedArr,
    };
    props._onDataChange(props.value);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.selected === nextProps.value) return;
    const { selected, selectedArr } = this.calcSelected(nextProps);
    this.setState({ selected, selectedArr });
  }

  calcSelected = props => {
    const { type, value } = props;
    const isRadio = type === 'radio' && (typeof value === 'string' || typeof value === 'number');
    if (isRadio) return { selected: value, selectedArr: [] };
    const isSwitch =
      type === 'switch' && Object.prototype.toString.call(value) === '[object Array]';
    if (isSwitch) return { selected: -1, selectedArr: value };
    return { selected: -1, selectedArr: [] };
  };

  selectRow = value => {
    const { onSelect, type, _onDataChange } = this.props;
    if (type === 'switch') return;
    const { selected } = this.state;
    const isUnselect = selected === value;
    if (isUnselect) return;
    this.setState({ selected: isUnselect ? -1 : value });
    onSelect && onSelect(value);
    _onDataChange && _onDataChange(value);
  };

  switchValueChange = (sValue, value) => {
    const { onSelect, _onDataChange } = this.props;
    const { selectedArr } = this.state;
    const alreadyIndex = selectedArr.indexOf(value);
    if (sValue) {
      if (alreadyIndex > -1) return;
      selectedArr.push(value);
    } else {
      if (alreadyIndex < 0) return;
      selectedArr.splice(alreadyIndex, 1);
    }
    this.setState({ selectedArr });
    onSelect && onSelect(value, sValue);
    _onDataChange && _onDataChange(selectedArr);
  };

  renderSwitch = value => {
    return (
      <StyledSwitch
        style={{ right: 0 }}
        useNativeDriver={false} // 与 Modal 共用暂时有bug
        onValueChange={sValue => this.switchValueChange(sValue, value)}
        defaultValue={this.state.selectedArr.indexOf(value) > -1}
      />
    );
  };

  renderSelectIcon = value => {
    const { selectedIcon, iconTintColor } = this.props;
    if (this.state.selected === value) {
      return selectedIcon || <StyledIconFont d={selectedPath} color={iconTintColor} />;
    }
    return null;
  };

  renderActions = value => {
    const { type } = this.props;
    if (type === 'switch') {
      return this.renderSwitch(value);
    }
    return this.renderSelectIcon(value);
  };

  renderItem = ({ item, index }) => {
    const { styles = {}, type, contentCenter, listItemStyle, dataSource } = this.props;
    const containerStyle = {
      alignSelf: 'stretch',
      height: itemHeight,
      backgroundColor: '#fff',
    };
    let titleAlign;
    if (contentCenter) {
      titleAlign = 'center';
    } else if (type === 'switch') {
      titleAlign = 'left';
    } else if (type === 'radio') {
      titleAlign = 'center';
    }

    return (
      <ThemeConsumer>
        {globalTheme => {
          const popupTheme = { ...this.props, theme: globalTheme };
          const cellFontColor = getTheme(popupTheme, 'popup.list.cellFontColor');
          const cellFontSize = getTheme(popupTheme, 'popup.cellFontSize');
          const tintColor = getTheme(popupTheme, 'popup.tintColor');
          let flatItemStyle;
          if (listItemStyle !== null && listItemStyle.backgroundColor) {
            flatItemStyle = listItemStyle;
          } else {
            flatItemStyle = {
              ...listItemStyle,
              backgroundColor: getTheme(popupTheme, 'popup.cellBg'),
            };
          }
          const itemStyle = {
            ...styles,
            container: [{ ...containerStyle, ...flatItemStyle }, styles.container],
            content: [{ flex: 1, alignItems: 'center' }, styles.content],
            title: [
              { textAlign: titleAlign, fontSize: cellFontSize, color: cellFontColor },
              styles.title,
            ],
            contentRight: [
              { position: 'absolute', right: type === 'switch' ? 16 : 24 },
              styles.contentRight,
            ],
          };
          return (
            <TYFlatList.Item
              key={`list_${index}`}
              activeOpacity={type === 'switch' ? 1 : 0.8}
              styles={itemStyle}
              tintColor={tintColor}
              Action={this.renderActions(dataSource[index].value)}
              onPress={() => this.selectRow(dataSource[index].value)}
              {...item}
            />
          );
        }}
      </ThemeConsumer>
    );
  };

  render() {
    const {
      switchValue,
      maxItemNum,
      listWrapperStyle,
      dataSource,
      selectedIcon,
      type,
      iconTintColor,
      contentCenter,
      value,
      listItemStyle,
      onSelect,
      _onDataChange,
      ...FlatListProps
    } = this.props;
    const dataCount = dataSource.length > maxItemNum ? maxItemNum : dataSource.length;
    const totalHeight = itemHeight * dataCount;
    return (
      <View
        style={[listWrapperStyle, !switchValue && { opacity: 0.6 }, { height: totalHeight }]}
        pointerEvents={!switchValue ? 'none' : 'auto'}
      >
        <StyledFlatList data={dataSource} renderItem={this.renderItem} {...FlatListProps} />
      </View>
    );
  }
}

export const ListModal = withSkeleton(ListPopup, true);

export default withSkeleton(ListPopup);
