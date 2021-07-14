/* eslint-disable max-len */
import React from 'react';
import { FlatList, View, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import TYFlatList from '../TYLists/list';
import withSkeleton from './withSkeleton';
import { ThemeUtils, RatioUtils } from '../../utils';
import { StyledIconFont, StyledFlatList, StyledCheckout } from './styled';

const selectedPath =
  'M788.053333 276.053333a32 32 0 0 1 48.341334 41.642667l-3.114667 3.584-384 384a32 32 0 0 1-41.642667 3.114667l-3.584-3.114667-170.666666-170.666667a32 32 0 0 1 41.642666-48.341333l3.584 3.114667L426.666667 637.397333l361.386666-361.386666z';
const { getTheme, ThemeConsumer } = ThemeUtils;

let itemHeight = 56;

const { viewWidth } = RatioUtils;

class ListPopup extends React.Component {
  static propTypes = {
    ...FlatList.propTypes,
    /**
     * 按钮开关值
     */
    switchValue: PropTypes.bool.isRequired,
    /**
     * 列表弹窗样式
     */
    listWrapperStyle: ViewPropTypes.style,
    /**
     * 数据源
     */
    dataSource: PropTypes.arrayOf(
      PropTypes.shape({
        styles: PropTypes.object,
        title: PropTypes.string,
        Icon: PropTypes.any,
        value: PropTypes.any.isRequired,
      })
    ),
    /**
     * 最大列表数量
     */
    maxItemNum: PropTypes.number,
    /**
     * 设置type为radio时选中的图标
     */
    selectedIcon: PropTypes.element,
    /**
     * 列表选择弹出层的类型
     */
    type: PropTypes.oneOf(['switch', 'radio', 'arrow']),
    /**
     * 设置type为radio时选中图标的颜色
     */
    iconTintColor: PropTypes.string,
    /**
     * 内容是否居中
     */
    contentCenter: PropTypes.bool,
    /**
     * 选中的值
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    /**
     * 设置每个listItem的样式
     */
    listItemStyle: ViewPropTypes.style,
    /**
     * 选中事件的回调
     * @param {(value: string | number | string[] | number[], switchValue?: boolean) => void}
     */
    onSelect: PropTypes.func,
    /**
     * 数据更改回调
     */
    _onDataChange: PropTypes.func,
    /**
     * 多选框的样式
     */
    switchStyle: ViewPropTypes.style,
  };

  static defaultProps = {
    listWrapperStyle: null,
    dataSource: [],
    maxItemNum: 6,
    selectedIcon: null,
    type: 'radio',
    iconTintColor: '',
    contentCenter: true,
    value: -1,
    listItemStyle: null,
    onSelect: (value, switchValue) => {},
    _onDataChange: () => {},
    switchStyle: {},
  };

  constructor(props) {
    super(props);
    const { selected, selectedArr } = this.calcSelected(props);
    itemHeight = StyleSheet.flatten([props.listItemStyle]).height || 56;
    this.state = {
      selected,
      selectedArr,
    };
    props._onDataChange(props.value);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.selected === nextProps.value || this.props.value === nextProps.value) return;
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
    const { selectedArr } = this.state;
    const newSelectedArr = selectedArr;
    if (type === 'switch') {
      if (selectedArr.indexOf(value) === -1) {
        newSelectedArr.push(value);
      } else {
        const index = selectedArr.indexOf(value);
        newSelectedArr.splice(index, 1);
      }
      this.setState({
        selectedArr: newSelectedArr,
      });
      onSelect && onSelect(value);
      _onDataChange && _onDataChange(newSelectedArr);
    } else {
      this.setState({ selected: value });
      onSelect && onSelect(value);
      _onDataChange && _onDataChange(value);
    }
  };

  renderSwitch = value => {
    const { selectedArr } = this.state;
    const { switchStyle } = this.props;
    const isActive = selectedArr.indexOf(value.toString()) !== -1;
    return (
      <StyledCheckout active={isActive} style={switchStyle}>
        {isActive && <StyledIconFont d={selectedPath} color="#e5e5e5" size={16} />}
      </StyledCheckout>
    );
  };

  renderSelectIcon = value => {
    const { selectedIcon, iconTintColor } = this.props;
    if (this.state.selected === value) {
      return selectedIcon || <StyledIconFont d={selectedPath} color={iconTintColor} size={26} />;
    }
    return null;
  };

  renderActions = value => {
    const { type } = this.props;
    if (type === 'switch') {
      return this.renderSwitch(value);
    } else if (type === 'radio') {
      return this.renderSelectIcon(value);
    }
    return null;
  };

  renderItem = ({ item, index }) => {
    const { styles = {}, type, contentCenter, listItemStyle, dataSource } = this.props;
    const containerStyle = {
      alignSelf: 'stretch',
      minHeight: itemHeight,
      backgroundColor: '#fff',
    };
    let titleAlign;
    if (contentCenter) {
      titleAlign = 'center';
    } else {
      titleAlign = 'left';
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
            content: [
              {
                flex: 1,
                alignItems: 'center',
                paddingLeft: 24,
                paddingRight: 24,
              },
              styles.content,
            ],
            title: [
              {
                textAlign: titleAlign,
                fontSize: cellFontSize,
                color: cellFontColor,
              },
              !!contentCenter && { width: viewWidth - 48 },
              styles.title,
            ],
            contentRight: [
              !!contentCenter && { position: 'absolute', right: 24 },
              styles.contentRight,
            ],
            contentLeft: [{ marginRight: 8 }, styles.contentLeft],
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
        <StyledFlatList
          data={dataSource}
          renderItem={this.renderItem}
          {...FlatListProps}
          scrollEnabled={dataSource.length > maxItemNum}
        />
      </View>
    );
  }
}

export const ListModal = withSkeleton(ListPopup, true);

export default withSkeleton(ListPopup);
