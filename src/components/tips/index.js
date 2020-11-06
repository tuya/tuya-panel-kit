import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, ColorPropType } from 'react-native';
import Motion from '../motion';
import { RatioUtils } from '../../utils';
import { StyledViewChildren, StyledIconFont } from './styled';

const { convertX: cx } = RatioUtils;

const MOTION_TYPES = Object.keys(Motion).filter(v => {
  return v !== 'Toast';
});

const path = {
  top:
    'M1023.977245 1023.948801c-37.318282 0-74.60812 0.170663-111.926402-0.22755-35.696985-0.398213-75.660541-0.96709-110.418879-14.108131-37.545832-14.221906-62.377281-39.110242-87.379392-68.378925-18.004933-21.048421-53.360592-65.961201-70.597542-87.635386-14.079687-17.777383-41.670185-52.905491-56.745406-69.943335C567.966045 762.294171 544.528344 739.539121 511.988622 739.539121c-32.568165 0-55.977423 22.75505-74.921001 44.08791-15.075221 17.0094-42.665719 52.165952-56.77385 69.943334-17.180063 21.674185-52.535721 66.586965-70.540654 87.635386-25.058999 29.297127-49.862003 54.157019-87.407836 68.378925-34.758339 13.112597-74.721895 13.709918-110.418879 14.108131-37.318282 0.398213-74.60812 0.22755-111.926402 0.22755h1023.977245z',
  bottom:
    'M1023.977245 0.051199c-37.318282 0-74.60812-0.170663-111.926402 0.22755-35.696985 0.398213-75.660541 0.96709-110.418879 14.108131-37.545832 14.221906-62.377281 39.110242-87.379392 68.378925-18.004933 21.048421-53.360592 65.961201-70.597542 87.635386-14.079687 17.777383-41.670185 52.905491-56.745406 69.943335C567.966045 261.705829 544.528344 284.460879 511.988622 284.460879c-32.568165 0-55.977423-22.75505-74.921001-44.08791-15.075221-17.0094-42.665719-52.165952-56.77385-69.943334-17.180063-21.674185-52.535721-66.586965-70.540654-87.635386-25.058999-29.297127-49.862003-54.157019-87.407836-68.378925C187.586943 1.302727 147.623386 0.705407 111.926402 0.307193 74.60812-0.09102 37.318282 0.079643 0 0.079643h1023.977245z',
};

const Center = 'Center';
const Right = 'Right';
const Left = 'Left';
const Top = 'top';
const bottomLeft = 'bottomLeft';
const bottomRight = 'bottomRight';
const topLeft = 'topLeft';
const topRight = 'topRight';

class Tips extends PureComponent {
  static propTypes = {
    /**
     * 气泡的样式
     * @version 3.0.0-rc.18
     */
    contentStyle: ViewPropTypes.style,
    /**
     * 气泡位置
     */
    tipStyle: ViewPropTypes.style, // 气泡的位置
    /**
     * 气泡背景颜色
     */
    bgColor: ColorPropType,
    /**
     * 是否显示气泡
     */
    show: PropTypes.bool,
    /**
     * 嵌套子元素
     */
    children: PropTypes.element,
    /**
     * 是否显示角标
     */
    showCorner: PropTypes.bool,
    /**
     * 角标位置
     */
    cornerPosition: PropTypes.oneOf([
      'topLeft',
      'topCenter',
      'topRight',
      'bottomLeft',
      'bottomCenter',
      'bottomRight',
    ]),
    /**
     * 气泡动画类型
     */
    motionType: PropTypes.oneOf(MOTION_TYPES),
    /**
     * 动画配置
     */
    motionConfig: PropTypes.object,
    /**
     * 是否应用于Popup上伴有遮罩
     * @3.1.3加入
     */
    withModal: PropTypes.bool,
  };
  static defaultProps = {
    children: null,
    show: false,
    bgColor: '#fff',
    showCorner: true,
    contentStyle: undefined,
    tipStyle: null,
    motionType: 'ScaleFadeIn',
    cornerPosition: 'topCenter',
    motionConfig: {},
    withModal: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: props.show,
      width: 0,
      height: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.props.show) {
      this.setState({
        visible: nextProps.show,
      });
    }
  }

  /* eslint-disable getter-return */
  get cornerPosition() {
    const { cornerPosition } = this.props;
    /* eslint-disable indent */
    const position = cornerPosition.match(Left)
      ? Left
      : cornerPosition.match(Right)
      ? Right
      : Center;
    switch (position) {
      case Left:
        return { alignSelf: 'flex-start', left: cx(16) };
      case Center:
        return { alignSelf: 'center' };
      case Right:
        return { alignSelf: 'flex-end', right: cx(16) };
      default:
        break;
    }
  }

  /* eslint-disable getter-return */
  get tipPosition() {
    const { tipStyle, cornerPosition } = this.props;
    const { width, height } = this.state;
    let top, left, right, bottom;
    if (!tipStyle || !tipStyle.position) return;
    if (tipStyle && tipStyle.position === 'absolute') {
      if (cornerPosition.match(Center)) return;
      const tipTop = this._handlePosition(tipStyle.top);
      const tipLeft = this._handlePosition(tipStyle.left);
      const tipBottom = this._handlePosition(tipStyle.bottom);
      const tipRight = this._handlePosition(tipStyle.right);
      switch (cornerPosition) {
        case bottomLeft:
          if (tipTop) {
            top = tipStyle.top + height;
          }
          if (tipLeft) {
            left = tipStyle.left - width + cx(16);
          }
          if (tipRight) {
            right = tipStyle.right + width - cx(16);
          }
          if (tipBottom) {
            bottom = tipStyle.bottom - height;
          }
          return { top, left, right, bottom };
        case bottomRight:
          if (tipTop) {
            top = tipStyle.top + height;
          }
          if (tipLeft) {
            left = tipStyle.left + width - cx(16);
          }
          if (tipRight) {
            right = tipStyle.right - width + cx(16);
          }
          if (tipBottom) {
            bottom = tipStyle.bottom - height;
          }
          return { top, left, right, bottom };
        case topRight:
          if (tipTop) {
            top = tipStyle.top - height;
          }
          if (tipLeft) {
            left = tipStyle.left + width - cx(16);
          }
          if (tipRight) {
            right = tipStyle.right - width + cx(16);
          }
          if (tipBottom) {
            bottom = tipStyle.bottom + height;
          }
          return { top, left, right, bottom };
        case topLeft:
          if (tipTop) {
            top = tipStyle.top - height;
          }
          if (tipLeft) {
            left = tipStyle.left - width + cx(16);
          }
          if (tipRight) {
            right = tipStyle.right + width - cx(16);
          }
          if (tipBottom) {
            bottom = tipStyle.bottom + height;
          }
          return { top, left, right, bottom };
        default:
          break;
      }
    }
  }

  /* eslint-disable getter-return */
  get translate() {
    const { cornerPosition } = this.props;
    const { width, height } = this.state;
    if (cornerPosition.match(Center)) {
      return {
        width: 0,
        height: 0,
      };
    }
    switch (cornerPosition) {
      case topLeft:
        return { width: width - cx(16), height };
      case topRight:
        return { width: -width + cx(16), height };
      case bottomLeft:
        return { width: width - cx(16), height: -height };
      case bottomRight:
        return { width: -width + cx(16), height: -height };
      default:
        break;
    }
  }
  _handlePosition = value => {
    if (value !== 'undefined' && typeof value === 'number') return true;
    return false;
  };

  _handleLayout = layout => {
    const { withModal } = this.props;
    if (layout && typeof layout.width === 'number' && typeof layout.height === 'number') {
      this.setState({
        width: withModal ? 0 : layout.width / 2,
        height: withModal ? 0 : layout.height / 2,
      });
    }
  };

  render() {
    const { visible } = this.state;
    const {
      contentStyle,
      children,
      cornerPosition,
      motionType,
      bgColor,
      showCorner,
      motionConfig,
      tipStyle,
    } = this.props;
    const { width, height } = this.translate;
    const iconPosition = this.cornerPosition;
    const newTipStyle = this.tipPosition;
    const isTop = cornerPosition.match(Top);
    const MotionComp = Motion[motionType];
    return (
      <MotionComp
        {...motionConfig}
        show={visible}
        style={[{ alignItems: 'center', justifyContent: 'center' }, tipStyle, newTipStyle]}
        width={width}
        height={height}
      >
        <View
          onLayout={({ nativeEvent: { layout } }) => this._handleLayout(layout)}
          style={{ borderRadius: cx(5) }}
        >
          {showCorner && isTop && (
            <StyledIconFont style={iconPosition} color={bgColor} d={path.top} />
          )}
          <StyledViewChildren
            style={[
              contentStyle,
              { backgroundColor: bgColor, alignItems: 'center', justifyContent: 'center' },
            ]}
          >
            {children}
          </StyledViewChildren>
          {!isTop && showCorner && (
            <StyledIconFont style={iconPosition} color={bgColor} d={path.bottom} />
          )}
        </View>
      </MotionComp>
    );
  }
}

export default Tips;
