import { TYText } from 'tuya-panel-kit';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ClassicIconBackground } from 'tuya-panel-style-icon-background';
import { Utils } from 'tuya-panel-utils';
import { IStyleListCardProps, IStyleListCardDefaultProps } from './interface';

const { convertX: cx } = Utils.RatioUtils;
const { parseToStyle } = Utils.ThemeUtils;

export const StyleListCard: React.FC<IStyleListCardProps> = ({
  style,
  iconStyle,
  width,
  radius,
  padding,
  backgroundColor,
  text,
  fontColor,
  fontSize,
  fontWeight,
  textStyle,
  showIcon,
  dataSource,
  value,
  activeTextColor,
  iconColor,
  iconBgColor,
  activeIconBgColor,
  activeIconColor,
  onPress,
  ...rest
}) => {
  const [selectedValue, setSelectedValue] = React.useState(value);

  React.useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handlePress = (selected: string) => {
    setSelectedValue(selected);
    typeof onPress === 'function' && onPress(selected);
  };
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
        <ClassicIconBackground
          {...rest}
          iconBgColor={iconBgColor}
          iconColor={iconColor}
          showIcon={showIcon}
          style={iconStyle}
        />
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
      />
      {dataSource.length && (
        <View>
          {dataSource.map(data => {
            const {
              text,
              textSize = cx(16),
              textColor = 'rgba(0, 0, 0, 0.5)',
              textWeight = 400,
              textStyle,
              iconStyle,
              activeBgColor = 'rgba(16, 130, 254, 0.09)',
              iconColor = '#FFF',
              bgColor = 'transparent',
              value: itemValue,
              disabled,
              iconSize = cx(20),
              iconBgSize = cx(36),
              ...restData
            } = data;
            const isActive = itemValue === selectedValue;
            return (
              <TouchableOpacity
                key={itemValue}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: isActive ? activeBgColor : bgColor,
                  borderRadius: cx(12),
                  padding: cx(16),
                }}
                activeOpacity={0.6}
                disabled={disabled}
                onPress={() => handlePress(itemValue)}
              >
                <ClassicIconBackground
                  {...restData}
                  iconSize={iconSize}
                  iconBgSize={iconBgSize}
                  iconColor={isActive ? activeIconColor : iconColor}
                  iconBgColor={isActive ? activeIconBgColor : iconBgColor}
                  style={[{ borderRadius: cx(8) }, iconStyle]}
                />
                <TYText
                  text={text}
                  size={textSize}
                  color={isActive ? activeTextColor : textColor}
                  weight={textWeight}
                  style={[{ marginLeft: cx(16), lineHeight: cx(24) }, textStyle]}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

StyleListCard.defaultProps = IStyleListCardDefaultProps;

export const NordicListCard = (props: IStyleListCardProps) => <StyleListCard {...props} />;
