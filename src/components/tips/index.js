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

class Tips extends PureComponent {
  static propTypes = {
    contentStyle: ViewPropTypes.style, // 气泡的大小
    tipStyle: ViewPropTypes.style, // 气泡的位置
    bgColor: ColorPropType,
    show: PropTypes.bool,
    children: PropTypes.element,
    cornerPosition: PropTypes.oneOf([
      'topLeft',
      'topCenter',
      'topRight',
      'bottomLeft',
      'bottomCenter',
      'bottomRight',
    ]),
    motionType: PropTypes.oneOf(MOTION_TYPES),
    motionConfig: PropTypes.object,
  };
  static defaultProps = {
    children: null,
    show: false,
    bgColor: '#fff',
    contentStyle: undefined,
    tipStyle: null,
    motionType: 'ScaleFadeIn',
    cornerPosition: 'topCenter',
    motionConfig: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: props.show,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.props.show) {
      if (this.props.widthModal) {
        this.setState({
          visible: true,
        });
      } else {
        this.setState({
          visible: nextProps.show,
        });
      }
    }
  }

  /* eslint-disable getter-return */
  get Position() {
    const { cornerPosition } = this.props;
    /* eslint-disable prettier/prettier */
    const position = cornerPosition.match('Left')
      ? 'Left'
      : cornerPosition.match('Right')
        ? 'Right'
        : 'Center';
    switch (position) {
      case 'Left':
        return { alignSelf: 'flex-start', left: cx(16) };
      case 'Center':
        return { alignSelf: 'center' };
      case 'Right':
        return { alignSelf: 'flex-end', right: cx(16) };
      default:
        break;
    }
  }

  render() {
    const { visible } = this.state;
    const {
      contentStyle,
      children,
      cornerPosition,
      motionType,
      bgColor,
      motionConfig,
      tipStyle,
    } = this.props;
    const iconPosition = this.Position;
    const isTop = cornerPosition.match('top');
    const MotionComp = Motion[motionType];
    return (
      <MotionComp
        {...motionConfig}
        show={visible}
        style={[{ alignItems: 'center', justifyContent: 'center' }, tipStyle]}
      >
        <View style={{ borderRadius: cx(5) }}>
          {isTop && <StyledIconFont style={iconPosition} color={bgColor} d={path.top} />}
          <StyledViewChildren
            style={[
              contentStyle,
              { backgroundColor: bgColor, alignItems: 'center', justifyContent: 'center' },
            ]}
          >
            {children}
          </StyledViewChildren>
          {!isTop && <StyledIconFont style={iconPosition} color={bgColor} d={path.bottom} />}
        </View>
      </MotionComp>
    );
  }
}

export default Tips;
