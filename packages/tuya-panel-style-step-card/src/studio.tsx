import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { IconFont } from 'tuya-panel-kit';
import { Utils } from 'tuya-panel-utils';
import { IStudioStepCardProps, IStudioDefaultProps, IStudioStepCardState } from './interface';

const { convertX: cx } = Utils.RatioUtils;
const { add, subtract } = Utils.NumberUtils;

export class StyleStepCard extends React.PureComponent<IStudioStepCardProps, IStudioStepCardState> {
  static defaultProps = IStudioDefaultProps;
  constructor(props: IStudioStepCardProps) {
    super(props);
    this.state = {
      val: props.value,
    };
  }

  /* eslint-disable camelcase */

  UNSAFE_componentWillReceiveProps(nextProps: IStudioStepCardProps) {
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
        this.setState({
          val: res,
        });
        onValueChange && onValueChange(res);
      }
    } else if (val <= max) {
      const step = Math.min(stepValue, subtract(max, val));
      const res = add(val, step);
      this.setState({
        val: res,
      });
      onValueChange && onValueChange(res);
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
      min = 0,
      max = 99,
    } = this.props;
    const { val } = this.state;
    return (
      <View
        style={[
          {
            width: cx(360),
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row',
          },
          style,
        ]}
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
    );
  }
}
