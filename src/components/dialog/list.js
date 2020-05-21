import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ViewPropTypes } from 'react-native';
import { RatioUtils, ThemeUtils } from '../../utils';
import TYFlatList from '../TYLists/list';
import TYText from '../TYText';
import { StyledContainer, StyledContent, StyledTitle, StyledSubTitle, StyledList } from './styled';

const { getTheme, ThemeConsumer } = ThemeUtils;
const { convertX: cx } = RatioUtils;

const ITEM_HEIGHT = 56;

export default class List extends Component {
  static propTypes = {
    /**
     * 数据源超出多少可滚动
     */
    maxItemNum: PropTypes.number,
    /**
     * 数据源
     */
    dataSource: PropTypes.array.isRequired,
    /**
     * 容器样式
     */
    style: ViewPropTypes.style,
    /**
     * 内容样式
     */
    contentStyle: ViewPropTypes.style,
    /**
     * 列表样式
     */
    listStyle: ViewPropTypes.style,
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
  };

  static defaultProps = {
    maxItemNum: 5,
    style: null,
    contentStyle: null,
    listStyle: null,
    titleStyle: null,
    titleNumberOfLines: 2,
    subTitle: '',
    subTitleStyle: null,
  };

  renderItem = ({ item }) => {
    const { styles = {}, ...props } = item;
    return (
      <ThemeConsumer>
        {globalTheme => {
          const ListItemProps = { theme: { dialog: { ...globalTheme.dialog } } };
          const itemBackGround = getTheme(ListItemProps, 'dialog.bg');
          const itemFontColor = getTheme(ListItemProps, 'dialog.titleFontColor');
          const itemFontSize = getTheme(ListItemProps, 'dialog.titleFontSize');
          return (
            <TYFlatList.Item
              styles={{
                ...styles,
                container: [
                  {
                    height: ITEM_HEIGHT,
                    backgroundColor: itemBackGround,
                    justifyContent: 'center',
                  },
                  styles.container,
                ],
                contentCenter: [{ alignItems: 'center' }, styles.contentCenter],
                title: [
                  {
                    fontWeight: '500',
                    fontSize: itemFontSize,
                    color: itemFontColor,
                  },
                  styles.title,
                ],
              }}
              {...props}
            />
          );
        }}
      </ThemeConsumer>
    );
  };

  render() {
    const {
      maxItemNum,
      dataSource,
      style,
      contentStyle,
      listStyle,
      titleNumberOfLines,
      title,
      titleStyle,
      subTitle,
      subTitleStyle,
      ...TYFlatListProps
    } = this.props;
    return (
      <StyledContainer style={style}>
        <StyledContent
          style={[{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }, contentStyle]}
        >
          <StyledTitle
            style={[{ paddingVertical: subTitle ? 0 : 12 }, titleStyle]}
            numberOfLines={titleNumberOfLines}
          >
            {title}
          </StyledTitle>
          {!!subTitle && <StyledSubTitle style={subTitleStyle}>{subTitle}</StyledSubTitle>}
          <StyledList
            style={[listStyle, { maxHeight: maxItemNum * ITEM_HEIGHT + cx(16) }]}
            scrollEnabled={dataSource.length > maxItemNum}
            keyExtractor={(item, idx) => item.key || idx}
            data={dataSource}
            renderItem={this.renderItem}
            {...TYFlatListProps}
          />
        </StyledContent>
      </StyledContainer>
    );
  }
}
