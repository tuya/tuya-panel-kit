import { TYText, IconFont } from 'tuya-panel-kit';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ClassicIconBackground } from 'tuya-panel-style-icon-background';
import { Utils } from 'tuya-panel-utils';
import { INordicStepCardProps, INordicDefaultProps, IStudioStepCardState } from './interface';

const { convertX: cx } = Utils.RatioUtils;
const { add, subtract } = Utils.NumberUtils;
const { parseToStyle } = Utils.ThemeUtils;

export class StyleNordicStepCard extends React.PureComponent<
  INordicStepCardProps,
  IStudioStepCardState
> {
  static defaultProps = INordicDefaultProps;
  constructor(props: INordicStepCardProps) {
    super(props);
    this.state = {
      val: props.value,
    };
  }

  /* eslint-disable camelcase */

  UNSAFE_componentWillReceiveProps(nextProps: INordicStepCardProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        val: nextProps.value,
      });
    }
  }

  timerId: NodeJS.Timeout;

  handleMath = (isMinus: boolean) => {
    const { val } = this.state;
    const { stepValue = 1, min = 0, max = 99, onValueChange } = this.props;
    if (isMinus) {
      if (val > min) {
        const step = Math.min(stepValue, subtract(val, min));
        const res = subtract(val, step);
        onValueChange && onValueChange(res);
        this.setState({
          val: res,
        });
      }
    } else if (val <= max) {
      const step = Math.min(stepValue, subtract(max, val));
      const res = add(val, step);
      onValueChange && onValueChange(res);
      this.setState({
        val: res,
      });
    }
  };

  handlePressOut = () => {
    clearInterval(this.timerId);
  };

  handlePressIn = (isMinus: boolean) => () => {
    const { milliseconds } = this.props;
    this.handleMath(isMinus);
    this.timerId && clearInterval(this.timerId);
    this.timerId = setInterval(() => {
      this.handleMath(isMinus);
    }, milliseconds);
  };

  render() {
    const {
      style,
      iconStyle,
      width,
      radius,
      padding,
      backgroundColor,
      buttonStyle,
      buttonWidth,
      buttonHeight,
      buttonRadius,
      buttonBgColor,
      minusIcon,
      buttonIconColor,
      plusIcon,
      buttonIconSize,
      minusDisabled,
      plusDisabled,
      valueSize,
      valueColor,
      valueWeight,
      valueStyle,
      min = 0,
      max = 99,
      text,
      fontColor,
      fontSize,
      fontWeight,
      textStyle,
      showIcon,
      unit,
      ...rest
    } = this.props;
    const { val } = this.state;
    return (
      <View
        style={[
          {
            backgroundColor,
            borderRadius: radius,
            width,
            ...parseToStyle(padding, 'padding'),
          },
          style,
        ]}
      >
        <View style={{ flexDirection: 'row', marginBottom: cx(20), flex: 1, alignItems: 'center' }}>
          <ClassicIconBackground {...rest} showIcon={showIcon} style={iconStyle} />
          <TYText
            text={text}
            size={fontSize}
            color={fontColor}
            weight={fontWeight}
            style={[{ marginLeft: showIcon ? cx(12) : 0, lineHeight: cx(24) }, textStyle]}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={[
              {
                width: buttonWidth,
                height: buttonHeight,
                borderRadius: buttonRadius,
                backgroundColor: buttonBgColor,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: minusDisabled || val === min ? 0.4 : 1,
              },
              buttonStyle,
            ]}
            disabled={minusDisabled || val === min}
            activeOpacity={0.6}
            onPressOut={this.handlePressOut}
            onPressIn={this.handlePressIn(true)}
          >
            <IconFont
              name="minus"
              size={buttonIconSize}
              d={minusIcon}
              fill={buttonIconColor}
              // @ts-ignore
              fillOpacity={minusDisabled || val === min ? 0.4 : 1}
            />
          </TouchableOpacity>
          <TYText
            text={`${val}${unit}`}
            size={valueSize}
            color={valueColor}
            weight={valueWeight}
            align="center"
            style={[
              {
                flex: 1,
                lineHeight: cx(28),
              },
              valueStyle,
            ]}
          />
          <TouchableOpacity
            style={[
              {
                width: buttonWidth,
                height: buttonHeight,
                borderRadius: buttonRadius,
                backgroundColor: buttonBgColor,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: plusDisabled || val === max ? 0.4 : 1,
              },
              buttonStyle,
            ]}
            activeOpacity={0.6}
            onPressOut={this.handlePressOut}
            onPressIn={this.handlePressIn(false)}
            disabled={plusDisabled || val === max}
          >
            <IconFont
              name="plus"
              size={buttonIconSize}
              d={plusIcon}
              fill={buttonIconColor}
              // @ts-ignore
              fillOpacity={plusDisabled || val === max ? 0.4 : 1}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
