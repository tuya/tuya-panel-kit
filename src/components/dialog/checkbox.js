import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ViewPropTypes } from 'react-native';
import TYFlatList from '../TYLists/list';
import TYText from '../TYText';
import Footer from './footer';
import {
  StyledContainer,
  StyledHeader,
  StyledTitle,
  StyledSubTitle,
  StyledCheckboxList,
} from './styled';
import withMotion from './withMotion';
import { ThemeUtils } from '../../utils';

const { getTheme, ThemeConsumer } = ThemeUtils;

const ITEM_HEIGHT = 48;

class CheckBoxDialog extends Component {
  static propTypes = {
    /**
     * CheckBox 类型: 单选 or 多选
     */
    type: PropTypes.oneOf(['radio', 'switch']),
    /**
     * 选中的值
     * 单选为 string 或者 number, 多选类型为 array
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]).isRequired,
    /**
     * 最大列表项
     */
    maxItemNum: PropTypes.number,
    /**
     * Checkbox 数据源，其中 value 必填, 除 value 外可为 `CheckboxItem` props
     */
    dataSource: PropTypes.arrayOf(
      PropTypes.shape({
        ...TYFlatList.CheckboxItem.propTypes,
        value: PropTypes.string.isRequired,
      })
    ).isRequired,
    /**
     * Checkbox 变更回调事件
     */
    onChange: PropTypes.func,
    /**
     * 容器样式
     */
    style: ViewPropTypes.style,
    /**
     * 头部样式
     */
    headerStyle: ViewPropTypes.style,
    /**
     * 标题超过多少行显示省略号
     */
    titleNumberOfLines: PropTypes.number,
    /**
     * 标题
     */
    title: PropTypes.string.isRequired,
    /**
     * 标题样式
     */
    titleStyle: TYText.propTypes.style,
    /**
     * 副标题
     */
    subTitle: PropTypes.string,
    /**
     * 副标题样式
     */
    subTitleStyle: TYText.propTypes.style,
    /**
     * 内容
     */
    contentStyle: ViewPropTypes.style,
    /**
     * footer容器样式
     */
    footerWrapperStyle: ViewPropTypes.style,
    /**
     * 取消文案
     */
    cancelText: PropTypes.string.isRequired,
    /**
     * 取消文案样式
     */
    cancelTextStyle: TYText.propTypes.style,
    /**
     * 取消按钮测试标示
     */
    cancelAccessibilityLabel: PropTypes.string,
    /**
     * 确认文案
     */
    confirmText: PropTypes.string.isRequired,
    /**
     * 确认文案样式
     */
    confirmTextStyle: TYText.propTypes.style,
    /**
     * 确认按钮测试标示
     */
    confirmAccessibilityLabel: PropTypes.string,
    /**
     * 取消回调函数
     */
    onCancel: PropTypes.func,
    /**
     * 确认回调函数
     */
    onConfirm: PropTypes.func,
  };

  static defaultProps = {
    type: 'radio',
    maxItemNum: 5,
    style: null,
    headerStyle: null,
    titleNumberOfLines: 2,
    titleStyle: null,
    subTitle: '',
    subTitleStyle: null,
    contentStyle: null,
    footerWrapperStyle: null,
    cancelTextStyle: null,
    cancelAccessibilityLabel: 'Dialog.Cancel',
    confirmTextStyle: null,
    confirmAccessibilityLabel: 'Dialog.Confirm',
    onChange: null,
    onCancel: null,
    onConfirm: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
    if (props.type === 'switch' && !Array.isArray(props.value)) {
      console.warn('CheckBoxDialog: 复选框的 value 必须为 数组');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value && this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  isChecked(value) {
    const { type } = this.props;
    if (type === 'radio') {
      return this.state.value === value;
    } else if (type === 'switch') {
      return this.state.value.some(v => v === value);
    }
    return false;
  }

  _handleCheckBoxChange = (checked, value) => {
    const { type, onChange } = this.props;
    if (type === 'radio') {
      this.setState(() => {
        const newValue = checked ? value : undefined;
        onChange && onChange(newValue);
        return { value: newValue };
      });
    } else if (type === 'switch') {
      this.setState(prevState => {
        let newValue = Array.isArray(prevState.value) ? prevState.value : [];
        if (checked) newValue = [...newValue, value];
        else newValue = newValue.filter(v => v !== value);
        onChange && onChange(newValue);
        return { value: newValue };
      });
    }
  };

  _handleConfirm = () => {
    const { onConfirm } = this.props;
    onConfirm && onConfirm(this.state.value);
  };

  renderCheckBoxItem = ({ item }) => {
    const { styles = {}, value, title, ...checkboxProps } = item;
    const isChecked = this.isChecked(value);
    return (
      <ThemeConsumer>
        {globalTheme => {
          const checkItemProps = { theme: { dialog: { ...globalTheme.dialog } } };
          const itemBackGround = getTheme(checkItemProps, 'dialog.bg');
          const itemFontColor = getTheme(checkItemProps, 'dialog.titleFontColor');
          const itemFontSize = getTheme(checkItemProps, 'dialog.titleFontSize');
          return (
            <TYFlatList.CheckboxItem
              styles={{
                ...styles,
                container: [
                  { height: ITEM_HEIGHT, backgroundColor: itemBackGround },
                  styles.container,
                ],
                title: [{ fontSize: itemFontSize, color: itemFontColor }, styles.title],
              }}
              color={isChecked ? '#44DB5E' : '#e5e5e5'}
              {...checkboxProps}
              title={title || value}
              checked={isChecked}
              onChange={checked => this._handleCheckBoxChange(checked, value)}
            />
          );
        }}
      </ThemeConsumer>
    );
  };

  render() {
    const {
      maxItemNum,
      style,
      headerStyle,
      titleNumberOfLines,
      title,
      titleStyle,
      subTitle,
      subTitleStyle,
      contentStyle,
      dataSource,
      confirmText,
      confirmTextStyle,
      confirmAccessibilityLabel,
      footerWrapperStyle,
      cancelText,
      cancelTextStyle,
      cancelAccessibilityLabel,
      onCancel,
      ...TYFlatListProps
    } = this.props;
    return (
      <StyledContainer style={style}>
        <StyledHeader style={headerStyle}>
          <StyledTitle style={titleStyle} numberOfLines={titleNumberOfLines}>
            {title}
          </StyledTitle>
          {!!subTitle && <StyledSubTitle style={subTitleStyle}>{subTitle}</StyledSubTitle>}
        </StyledHeader>
        <StyledCheckboxList
          style={[contentStyle, { maxHeight: ITEM_HEIGHT * maxItemNum }]}
          scrollEnabled={dataSource.length > maxItemNum}
          keyExtractor={item => item.value}
          data={dataSource}
          renderItem={this.renderCheckBoxItem}
          {...TYFlatListProps}
        />
        <Footer
          style={footerWrapperStyle}
          cancelTextStyle={cancelTextStyle}
          confirmTextStyle={confirmTextStyle}
          cancelText={cancelText}
          confirmText={confirmText}
          cancelAccessibilityLabel={cancelAccessibilityLabel}
          confirmAccessibilityLabel={confirmAccessibilityLabel}
          onCancel={onCancel}
          onConfirm={this._handleConfirm}
        />
      </StyledContainer>
    );
  }
}

export default withMotion(CheckBoxDialog);
