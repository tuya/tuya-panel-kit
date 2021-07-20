/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import TopBarContainer from './TopBarContainer';
import TopBarContent from './TopBarContent';
import TopBarAction from './TopBarAction';
import { TOPBAR_HEIGHT } from './styled';

export default class TopBar extends PureComponent {
  static height = TOPBAR_HEIGHT;
  static Container = TopBarContainer;
  static Content = TopBarContent;
  static Action = TopBarAction;

  static propTypes = {
    ...TopBarContainer.propTypes,
    ...TopBarContent.propTypes,
    color: PropTypes.string,
    leftActions: PropTypes.oneOfType([
      PropTypes.shape(TopBarAction.propTypes),
      PropTypes.arrayOf(PropTypes.shape(TopBarAction.propTypes)),
    ]),
    actions: PropTypes.oneOfType([
      PropTypes.shape(TopBarAction.propTypes),
      PropTypes.arrayOf(PropTypes.shape(TopBarAction.propTypes)),
    ]),
  };

  static defaultProps = {
    color: null,
    leftActions: null,
    actions: null,
  };

  render() {
    const {
      style, // from topbar.container
      contentStyle, // from topbar.container
      background, // from topbar.container
      color,
      leftActions,
      actions,
      onBack,
      ...contentProps
    } = this.props;
    return (
      <TopBar.Container style={style} contentStyle={contentStyle} background={background}>
        {leftActions ? (
          leftActions.map((item, k) => <TopBar.Action key={k} color={color} {...item} />)
        ) : (
          <TopBar.Action
            accessibilityLabel="TopBar_Btn_Back"
            color={color}
            name="backIos"
            onPress={onBack}
          />
        )}
        <TopBar.Content color={color} {...contentProps} />
        {actions && actions.map((item, k) => <TopBar.Action key={k} color={color} {...item} />)}
      </TopBar.Container>
    );
  }
}
