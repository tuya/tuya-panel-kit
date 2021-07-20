import { Utils } from 'tuya-panel-utils';
import baseTheme from './base';

const { getTheme } = Utils.ThemeUtils;

export interface IProps {
  [key: string]: any;
}

/**
 * Dialog Variants
 */
const d1 = baseTheme.dialog.basic;

export const dialog = {
  width: (props: IProps): number => getTheme(props, 'dialog.width', d1.width),
  radius: (props: IProps): number => getTheme(props, 'dialog.radius', d1.radius),
  bgColor: (props: IProps): string => getTheme(props, 'dialog.bg', d1.bg),
  lineColor: (props: IProps): string => getTheme(props, 'dialog.lineColor', d1.lineColor),
  cellHeight: (props: IProps): number => getTheme(props, 'dialog.cellHeight', d1.cellHeight),
  titleFontSize: (props: IProps): number =>
    getTheme(props, 'dialog.titleFontSize', d1.titleFontSize),
  titleFontColor: (props: IProps): string =>
    getTheme(props, 'dialog.titleFontColor', d1.titleFontColor),
  subTitleFontSize: (props: IProps): number =>
    getTheme(props, 'dialog.subTitleFontSize', d1.subTitleFontSize),
  subTitleFontColor: (props: IProps): string =>
    getTheme(props, 'dialog.subTitleFontColor', d1.subTitleFontColor),
  cancelFontSize: (props: IProps): number =>
    getTheme(props, 'dialog.cancelFontSize', d1.cancelFontSize),
  cancelFontColor: (props: IProps): string =>
    getTheme(props, 'dialog.cancelFontColor', d1.cancelFontColor),
  confirmFontSize: (props: IProps): number =>
    getTheme(props, 'dialog.confirmFontSize', d1.confirmFontSize),
  confirmFontColor: (props: IProps): string =>
    getTheme(props, 'dialog.confirmFontColor', d1.confirmFontColor),
  pressColor: (props: IProps): string => getTheme(props, 'dialog.pressColor', d1.pressColor),
  prompt: {
    bg: (props: IProps): string => getTheme(props, 'dialog.prompt.bg', d1.prompt.bg),
    radius: (props: IProps): number => getTheme(props, 'dialog.prompt.radius', d1.prompt.radius),
    padding: (props: IProps): number => getTheme(props, 'dialog.prompt.padding', d1.prompt.padding),
    placeholder: (props: IProps): string =>
      getTheme(props, 'dialog.prompt.placeholder', d1.prompt.placeholder),
  },
};

/**
 * Popup Variants
 */
const d2 = baseTheme.popup.basic;

export const popup = {
  cellHeight: (props: IProps): number => getTheme(props, 'popup.cellHeight', d2.cellHeight),
  cellBg: (props: IProps): string => getTheme(props, 'popup.cellBg', d2.cellBg),
  cellFontColor: (props: IProps): string =>
    getTheme(props, 'popup.cellFontColor', d2.cellFontColor),
  cellFontSize: (props: IProps): number => getTheme(props, 'popup.cellFontSize', d2.cellFontSize),
  titleRadius: (props: IProps): number => getTheme(props, 'popup.titleRadius', d2.titleRadius),
  titleHeight: (props: IProps): number => getTheme(props, 'popup.titleHeight', d2.titleHeight),
  titleBg: (props: IProps): string => getTheme(props, 'popup.titleBg', d2.titleBg),
  footerRadius: (props: IProps): number => getTheme(props, 'popup.footerRadius', d2.footerRadius),
  bottomBg: (props: IProps): string => getTheme(props, 'popup.bottomBg', d2.bottomBg),
  lineColor: (props: IProps): string => getTheme(props, 'popup.lineColor', d2.lineColor),
  titleFontSize: (props: IProps): number =>
    getTheme(props, 'popup.titleFontSize', d2.titleFontSize),
  titleFontColor: (props: IProps): string =>
    getTheme(props, 'popup.titleFontColor', d2.titleFontColor),
  cancelFontSize: (props: IProps): number =>
    getTheme(props, 'popup.cancelFontSize', d2.cancelFontSize),
  cancelFontColor: (props: IProps): string =>
    getTheme(props, 'popup.cancelFontColor', d2.cancelFontColor),
  confirmFontSize: (props: IProps): number =>
    getTheme(props, 'popup.confirmFontSize', d2.confirmFontSize),
  confirmFontColor: (props: IProps): string =>
    getTheme(props, 'popup.confirmFontColor', d2.confirmFontColor),
  subTitleFontColor: (props: IProps): string =>
    getTheme(props, 'popup.subTitleFontColor', d2.subTitleFontColor),
  backIconColor: (props: IProps): string =>
    getTheme(props, 'popup.backIconColor', d2.backIconColor),
  pressColor: (props: IProps): string => getTheme(props, 'popup.pressColor', d2.pressColor),
};

export default {
  dialog,
  popup,
};
