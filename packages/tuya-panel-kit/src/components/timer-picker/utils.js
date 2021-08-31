import { CoreUtils } from '../../utils';

const { toFixed } = CoreUtils;

export const getHourSelections = is12Hours => {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    let label = '';
    if (is12Hours) {
      label = i === 0 ? 12 : i <= 12 ? i : i - 12;
    } else {
      label = toFixed(i, 2);
    }
    hours.push({
      value: i,
      label: label.toString(),
    });
  }
  return hours;
};

export const getMinsSelections = () => {
  const minutes = [];
  for (let i = 0; i < 60; i++) {
    minutes.push({
      value: i,
      label: toFixed(i, 2),
    });
  }
  return minutes;
};

export const getTimePrefixSelections = (amText, pmText) => [
  {
    value: 'AM',
    label: amText,
  },
  {
    value: 'PM',
    label: pmText,
  },
];

export const getPrefix = hour => (hour >= 12 ? 'PM' : 'AM');
