import { ThemeUtils } from '../../utils';
import baseTheme from './base';

const { getTheme } = ThemeUtils;

/**
 * Dialog Variants
 */
const d1 = baseTheme.dialog.basic;

export const dialog = {
  width: props => getTheme(props, 'dialog.width', d1.width),
  radius: props => getTheme(props, 'dialog.radius', d1.radius),
  bgColor: props => getTheme(props, 'dialog.bg', d1.bg),
  lineColor: props => getTheme(props, 'dialog.lineColor', d1.lineColor),
  cellHeight: props => getTheme(props, 'dialog.cellHeight', d1.cellHeight),
  titleFontSize: props => getTheme(props, 'dialog.titleFontSize', d1.titleFontSize),
  titleFontColor: props => getTheme(props, 'dialog.titleFontColor', d1.titleFontColor),
  subTitleFontSize: props => getTheme(props, 'dialog.subTitleFontSize', d1.subTitleFontSize),
  subTitleFontColor: props => getTheme(props, 'dialog.subTitleFontColor', d1.subTitleFontColor),
  cancelFontSize: props => getTheme(props, 'dialog.cancelFontSize', d1.cancelFontSize),
  cancelFontColor: props => getTheme(props, 'dialog.cancelFontColor', d1.cancelFontColor),
  confirmFontSize: props => getTheme(props, 'dialog.confirmFontSize', d1.confirmFontSize),
  confirmFontColor: props => getTheme(props, 'dialog.confirmFontColor', d1.confirmFontColor),
  prompt: {
    bg: props => getTheme(props, 'dialog.prompt.bg', d1.prompt.bg),
    radius: props => getTheme(props, 'dialog.prompt.radius', d1.prompt.radius),
    padding: props => getTheme(props, 'dialog.prompt.padding', d1.prompt.padding),
    placeholder: props => getTheme(props, 'dialog.prompt.placeholder', d1.prompt.placeholder),
  },
};

/**
 * Popup Variants
 */
const d2 = baseTheme.popup.basic;

export const popup = {
  cellHeight: props => getTheme(props, 'popup.cellHeight', d2.cellHeight),
  cellBg: props => getTheme(props, 'popup.cellBg', d2.cellBg),
  cellFontColor: props => getTheme(props, 'popup.cellFontColor', d2.cellFontColor),
  cellFontSize: props => getTheme(props, 'popup.cellFontSize', d2.cellFontSize),
  titleRadius: props => getTheme(props, 'popup.titleRadius', d2.titleRadius),
  titleHeight: props => getTheme(props, 'popup.titleHeight', d2.titleHeight),
  titleBg: props => getTheme(props, 'popup.titleBg', d2.titleBg),
  footerRadius: props => getTheme(props, 'popup.footerRadius', d2.footerRadius),
  bottomBg: props => getTheme(props, 'popup.bottomBg', d2.bottomBg),
  lineColor: props => getTheme(props, 'popup.lineColor', d2.lineColor),
  titleFontSize: props => getTheme(props, 'popup.titleFontSize', d2.titleFontSize),
  titleFontColor: props => getTheme(props, 'popup.titleFontColor', d2.titleFontColor),
  cancelFontSize: props => getTheme(props, 'popup.cancelFontSize', d2.cancelFontSize),
  cancelFontColor: props => getTheme(props, 'popup.cancelFontColor', d2.cancelFontColor),
  confirmFontSize: props => getTheme(props, 'popup.confirmFontSize', d2.confirmFontSize),
  confirmFontColor: props => getTheme(props, 'popup.confirmFontColor', d2.confirmFontColor),
  subTitleFontColor: props => getTheme(props, 'popup.subTitleFontColor', d2.subTitleFontColor),
  backIconColor: props => getTheme(props, 'popup.backIconColor', d2.backIconColor),
};

export default {
  dialog,
  popup,
};
