// eslint-disable-next-line import/prefer-default-export
export const getCornerDirection = (direction, cornerColor) => {
  const list = {
    top: {
      top: 8,
      right: 8,
      left: 8,
      bottom: 6,
      topColor: 'transparent',
      rightColor: 'transparent',
      leftColor: 'transparent',
      bottomColor: cornerColor || '#fff',
      flexValue: {},
      cornerDirectionValue: {
        key: 'left',
        value: 80,
      },
    },
    bottom: {
      right: 8,
      left: 8,
      bottom: 8,
      top: 6,
      topColor: cornerColor || '#fff',
      rightColor: 'transparent',
      leftColor: 'transparent',
      bottomColor: 'transparent',
      flexValue: {},
      cornerDirectionValue: {
        key: 'left',
        value: 80,
      },
    },
    left: {
      top: 8,
      right: 6,
      left: 8,
      bottom: 8,
      topColor: 'transparent',
      rightColor: cornerColor || '#fff',
      leftColor: 'transparent',
      bottomColor: 'transparent',
      flexValue: { flexDirection: 'row' },
      cornerDirectionValue: {
        key: 'top',
        value: 20,
      },
    },
    right: {
      right: 8,
      left: 6,
      bottom: 8,
      top: 8,
      topColor: 'transparent',
      rightColor: 'transparent',
      leftColor: cornerColor || '#fff',
      bottomColor: 'transparent',
      flexValue: { flexDirection: 'row' },
      cornerDirectionValue: {
        key: 'top',
        value: 20,
      },
    },
  };
  return list[direction];
};
