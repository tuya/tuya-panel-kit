/* eslint-disable max-len */
import React from 'react';
import { FlatList, View, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import TYFlatList from '../TYLists/list';
import SwitchButton from '../switch-button';
import IconFont from '../iconfont';
import withSkeleton from './withSkeleton';

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
    iconTintColor: '#44DB5E',
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
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selected === nextProps.value) return;
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
      <SwitchButton
        useNativeDriver={false} // 与 Modal 共用暂时有bug
        onValueChange={sValue => this.switchValueChange(sValue, value)}
        size={{ width: 50, height: 30 }}
        defaultValue={this.state.selectedArr.indexOf(value) > -1}
      />
    );
  };

  renderSelectIcon = value => {
    const { selectedIcon, iconTintColor } = this.props;
    if (this.state.selected === value) {
      return selectedIcon || <IconFont name="selected" color={iconTintColor} size={17} />;
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
    const titleColor = type === 'switch' ? '#666' : '#333';
    const itemStyle = {
      ...styles,
      container: [{ ...containerStyle, ...listItemStyle }, styles.container],
      content: [{ flex: 1, alignItems: 'center' }, styles.content],
      title: [{ textAlign: titleAlign, fontSize: 16, color: titleColor }, styles.title],
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
        Action={this.renderActions(dataSource[index].value)}
        onPress={() => this.selectRow(dataSource[index].value)}
        {...item}
      />
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
        <TYFlatList data={dataSource} renderItem={this.renderItem} {...FlatListProps} />
      </View>
    );
  }
}

export const ListModal = withSkeleton(ListPopup, true);

export default withSkeleton(ListPopup);
