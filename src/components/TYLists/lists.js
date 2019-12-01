import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, SectionList, StyleSheet, ViewPropTypes } from 'react-native';
import { defaultTheme } from '../theme';
import { CoreUtils, RatioUtils, ThemeUtils } from '../../utils';
import {
  StyledValueText,
  StyledHeader,
  StyledHeaderText,
  StyledFooter,
  StyledFooterText,
} from './styled';
import ListItem from './list-item';
import CheckboxItem from './items/checkbox-item';
import InputItem from './items/input-item';
import SliderItem from './items/slider-item';
import SwitchItem from './items/switch-item';

const { get } = CoreUtils;
const { convertX: cx } = RatioUtils;
const { getTheme, ThemeConsumer } = ThemeUtils;

/* eslint-disable new-cap */
export default class TYSectionLists extends Component {
  static Item = ListItem;
  static CheckboxItem = CheckboxItem;
  static InputItem = InputItem;
  static SliderItem = SliderItem;
  static SwitchItem = SwitchItem;

  static propTypes = {
    ...SectionList.propTypes,
    /* sections 格式
      [{
        title,
        data: [{
          styles: [Object],
          title: [string],
          value: [bool, string],
          subTitle: [string],
          onPress: [func],
          Icon: [Func | Element],
          Action: [Func | Element],
          ...ListItemProps,
        }],
      }, {
        title,
        data,
      }]
    */
    sections: PropTypes.array.isRequired,
    headerStyle: Text.propTypes.style,
    separatorStyle: ViewPropTypes.style,
    sectionListRef: PropTypes.func,
    useART: PropTypes.bool,
  };

  static defaultProps = {
    headerStyle: null,
    separatorStyle: null,
    sectionListRef: null,
    useART: false,
  };

  renderSectionHeader = ({ section }) => {
    const { title } = section;
    const { sections } = this.props;
    const { headerStyle } = this.props;
    const sectionIdx = sections.findIndex(sec => sec.title === title);
    const prevSectionHasFooter = !!get(sections, `${sectionIdx - 1}.footer`);
    if (title) {
      return (
        <StyledHeader style={[{ marginTop: prevSectionHasFooter ? 0 : 24 }, headerStyle]}>
          {React.isValidElement(title) ? title : <StyledHeaderText>{title}</StyledHeaderText>}
        </StyledHeader>
      );
    }
    return <View style={{ marginTop: prevSectionHasFooter ? 0 : 12 }} />;
  };

  renderSectionFooter = ({ section: { footer } }) => {
    const { footerStyle } = this.props;
    if (footer) {
      return (
        <StyledFooter style={footerStyle}>
          {React.isValidElement(footer) ? footer : <StyledFooterText>{footer}</StyledFooterText>}
        </StyledFooter>
      );
    }
    return null;
  };

  renderItem = ({ item, ...otherData }) => {
    const { useART } = this.props;
    const { value, SwitchButtonProps, renderItem, ...listItemProps } = item;
    if (typeof renderItem === 'function') {
      return renderItem({ item, ...otherData });
    }
    if (typeof value === 'boolean') {
      return <SwitchItem value={value} useART={useART} {...listItemProps} {...SwitchButtonProps} />;
    } else if (typeof value !== 'undefined') {
      const descFontColor = get(item, 'theme.descFontColor');
      const valueStyle = [descFontColor && { color: descFontColor }, get(item, 'styles.valueText')];
      return (
        <ListItem
          useART={useART}
          {...listItemProps}
          Action={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <StyledValueText style={valueStyle}>{value}</StyledValueText>
              {typeof listItemProps.Action === 'function'
                ? listItemProps.Action()
                : listItemProps.Action}
            </View>
          }
        />
      );
    }
    return <ListItem useART={useART} {...listItemProps} />;
  };

  render() {
    const {
      contentContainerStyle,
      separatorStyle,
      sections,
      sectionListRef,
      ...sectionListProps
    } = this.props;
    return (
      <ThemeConsumer>
        {globalTheme => {
          const propsWithTheme = { ...this.props, theme: globalTheme };
          const contentStyle = [
            {
              backgroundColor: getTheme(
                propsWithTheme,
                'list.boardBg',
                defaultTheme.list.light.boardBg
              ),
            },
            contentContainerStyle,
          ];
          const sepStyle = [
            {
              marginLeft: cx(16),
              height: StyleSheet.hairlineWidth,
              backgroundColor: getTheme(
                propsWithTheme,
                'list.cellLine',
                defaultTheme.list.light.cellLine
              ),
            },
            separatorStyle,
          ];
          return (
            <SectionList
              contentContainerStyle={contentStyle}
              ItemSeparatorComponent={() => <View style={sepStyle} />}
              renderSectionHeader={this.renderSectionHeader}
              renderSectionFooter={this.renderSectionFooter}
              renderItem={this.renderItem}
              sections={sections}
              keyExtractor={item => item.key}
              stickySectionHeadersEnabled={false}
              {...sectionListProps}
              ref={sectionListRef}
            />
          );
        }}
      </ThemeConsumer>
    );
  }
}
