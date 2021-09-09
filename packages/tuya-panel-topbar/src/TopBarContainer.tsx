import React, { PureComponent } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Rect } from 'react-native-svg';
import { RadialGradient, LinearGradient } from 'tuya-panel-kit';
import { Utils } from 'tuya-panel-utils';
import TopBarContent from './TopBarContent';
import TopBarAction from './TopBarAction';
import {
  StyledTopBarContainer,
  StyledTopBar,
  TOPBAR_MARGIN,
  TOPBAR_HEIGHT,
  TOPBAR_ACTION_WIDTH,
  TOPBAR_ACTION_TEXT_WIDTH,
} from './styled';
import { ITopBarContainerProps, LinearGradientBackground } from './interface';

const { winWidth } = Utils.RatioUtils;

export default class TopBarContainer extends PureComponent<ITopBarContainerProps, null> {
  static displayName = 'TopBar.Container';

  static defaultProps = {
    style: null,
    background: null,
    contentStyle: null,
  };

  constructor(props) {
    super(props);
    this.hasContent = false;
    this.leftItemWidth = 0;
    this.rightItemWidth = 0;
  }

  /* eslint-disable react/no-deprecated */
  componentWillUpdate() {
    this.hasContent = false;
    this.leftItemWidth = 0;
    this.rightItemWidth = 0;
  }

  hasContent: boolean;
  leftItemWidth: number;
  rightItemWidth: number;

  renderBackground() {
    const { style, background } = this.props;
    if (background && typeof background === 'object' && background.stops) {
      const { width = winWidth, height = TOPBAR_HEIGHT } = StyleSheet.flatten([style]);
      const dimension = { width, height };
      // @ts-ignore
      const { x1 = '0%', y1 = '0%', x2 = '0%', y2 = '100%', stops } = background;
      if (Array.isArray(stops)) {
        return <RadialGradient style={dimension} stops={stops} />;
      }
      return (
        <LinearGradient style={dimension} stops={stops} x1={x1} y1={y1} x2={x2} y2={y2}>
          <Rect x="0" y="0" {...dimension} />
        </LinearGradient>
      );
    }
    return null;
  }

  renderAction = (
    child: React.Component<{ style?: StyleProp<ViewStyle>; spacing?: number; source?: string }>
  ) => {
    if (!React.isValidElement(child)) {
      return child;
    }
    let childStyle = child.props.style;
    if (child.type === TopBarContent) {
      this.hasContent = true;
    }
    // 适配Actions位置
    if (child.type === TopBarAction) {
      const { spacing, source } = child.props;
      const isText = typeof source === 'string';
      const defaultWidth = isText ? TOPBAR_ACTION_TEXT_WIDTH : TOPBAR_ACTION_WIDTH;
      const { width = defaultWidth } = StyleSheet.flatten([childStyle]);
      if (!this.hasContent) {
        childStyle = [
          { left: this.leftItemWidth },
          isText && { width: null, maxWidth: TOPBAR_ACTION_TEXT_WIDTH },
          childStyle,
        ];
        if (typeof width === 'number') {
          this.leftItemWidth += width + spacing * 2;
        }
      } else {
        childStyle = [
          { right: this.rightItemWidth },
          isText && { width: null, maxWidth: TOPBAR_ACTION_TEXT_WIDTH },
          childStyle,
        ];
        if (typeof width === 'number') {
          this.rightItemWidth += width + spacing * 2;
        }
      }
    }
    return React.cloneElement(child, {
      ...child.props,
      style: childStyle,
    });
  };

  renderContent = child => {
    // 根据所有Actions，自动适配TopBarContent位置及宽度
    if (child.type === TopBarContent) {
      let spacing = Math.max(this.leftItemWidth, this.rightItemWidth, 70);
      // Content最小宽度为100
      spacing = Math.min(spacing, winWidth / 2 - 50);
      return React.cloneElement(child, {
        ...child.props,
        style: {
          left: spacing,
          right: spacing,
          width: winWidth - spacing * 2 - 2 * TOPBAR_MARGIN,
          ...child.props.style,
        },
      });
    }
    return child;
  };

  render() {
    const { style, contentStyle, background, children } = this.props;
    return (
      <StyledTopBarContainer
        style={[
          typeof background === 'string' && {
            backgroundColor: background,
          },
          style,
        ]}
      >
        {this.renderBackground()}
        <StyledTopBar style={[{ marginHorizontal: TOPBAR_MARGIN }, contentStyle]}>
          {React.Children.toArray(children)
            .map(this.renderAction)
            .map(this.renderContent)}
        </StyledTopBar>
      </StyledTopBarContainer>
    );
  }
}
