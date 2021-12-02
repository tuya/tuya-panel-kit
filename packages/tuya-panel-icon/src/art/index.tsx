import React from 'react';
// @ts-ignore
import { StyleSheet, ART, Platform, View, AppState, ScrollView } from 'react-native';
import DefaultSvgs from './defaultSvg';
import { ARTProps, artDefault, IconARTProps, iconArtDefault, artSvgState } from './interface';

const ReactNativeVersion = require('react-native/Libraries/Core/ReactNativeVersion');

const { Surface, Shape } = ART;

let ShapeKey = 0;

export class IconSVG extends React.Component<IconARTProps, artSvgState> {
  static defaultProps = iconArtDefault;

  constructor(props) {
    super(props);
    this.state = {
      currentAppState: true,
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this._setAppState);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._setAppState);
  }

  _setAppState = nextAppState => {
    if (Platform.OS === 'ios') return;
    this.setState({
      currentAppState: nextAppState,
    });
  };

  render() {
    const {
      d,
      width,
      height,
      spaceOffset,
      x,
      y,
      scaleX,
      scaleY,
      scale,
      stroke,
      strokeWidth,
      strokeCap,
      strokeDash,
      strokeJoin,
      fill,
      hFlip,
      vFlip,
      style,
    } = this.props;
    if (!d) return null;

    let dPath = [];
    if (typeof d === 'string') {
      dPath = [d];
    }

    const count = dPath.length;
    if (count === 0) return null;

    const offset = spaceOffset;

    const ShapeProps = {
      x,
      y,
      scaleX: scaleX || scale,
      scaleY: scaleY || scale,
      stroke,
      strokeWidth,
      strokeCap,
      strokeDash,
      strokeJoin,
      fill,
    };
    const transformStyle: { transform?: any } = {};
    const transform = [];
    if (hFlip) {
      transform.push({
        rotateY: '180deg',
      });
    }

    if (vFlip) {
      transform.push({
        rotateX: '180deg',
      });
    }

    if (transform.length) {
      transformStyle.transform = transform;
    }

    const surfaceStyle = StyleSheet.flatten([
      { backgroundColor: 'transparent' },
      style,
      transformStyle,
    ]);

    const containerStyle = { height, width: width * count - offset * (count - 1) };
    let Container = ({ children }) => <View style={containerStyle}>{children}</View>;
    if (
      Platform.OS === 'android' &&
      ReactNativeVersion.version.major * 1000 + ReactNativeVersion.version.minor >= 58
    ) {
      Container = ({ children }) => (
        <View style={containerStyle}>
          <ScrollView scrollEnabled={false}>{children}</ScrollView>
        </View>
      );
    }

    return (
      <Container>
        {this.state.currentAppState && (
          <Surface
            height={height}
            width={width * count - offset * (count - 1)}
            style={surfaceStyle}
          >
            {dPath.map((path, i) => {
              const { props } = path;
              const isSimpleElement = React.isValidElement(path);
              if (!isSimpleElement) {
                return (
                  <Shape
                    {...ShapeProps}
                    key={ShapeKey++}
                    d={path}
                    x={i > 0 ? width * i - offset * i : 0}
                  />
                );
              }
              return React.cloneElement(path, { ...ShapeProps, ...props });
            })}
          </Surface>
        )}
      </Container>
    );
  }
}

const IconFont = (props: ARTProps) => {
  const { color, size, d } = props;
  let dPath = d;
  if (props.name !== undefined) {
    const hasName = Object.prototype.hasOwnProperty.call(DefaultSvgs, props.name);
    dPath = hasName ? DefaultSvgs[props.name] : undefined;
  }

  let viewBox = [];
  if (typeof d === 'object' && d.d) {
    if (typeof d.viewBox === 'string') {
      viewBox = d.viewBox.split(' ').map(v => parseInt(v, 10));
    }
    dPath = d.d;
  }
  if (!dPath) return null;

  const fill = props.fill || color;
  const stroke = props.stroke || color;
  const width = props.width || size;
  const height = props.height || size;

  let x = 0;
  let y = 0;
  let scaleX = 1.0;
  let scaleY = 1.0;

  if (viewBox && viewBox.length === 4) {
    x = props.x || viewBox[0];
    y = props.y || viewBox[1];
    scaleX = props.scaleX || (width - x) / viewBox[2];
    scaleY = props.scaleY || (height - y) / viewBox[3];
  } else {
    x = props.x || 0;
    y = props.y || (props.descent / props.unitsPerEm + 1.0) * height;
    scaleX = props.scaleX || width / props.unitsPerEm;
    scaleY = props.scaleY || -height / props.unitsPerEm;
  }

  return (
    <IconSVG
      {...props}
      width={width}
      height={height}
      x={x}
      y={y}
      scaleX={scaleX}
      scaleY={scaleY}
      fill={fill}
      stroke={stroke}
      d={dPath}
    />
  );
};

IconFont.defaultProps = artDefault;

export default IconFont;
