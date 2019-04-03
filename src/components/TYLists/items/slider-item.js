import React from 'react';
import { StyleSheet } from 'react-native';
import ListItem from '../list-item';
import Slider from '../../slider';
import { pick, omit } from './utils';

function SliderItem(props) {
  const listItemPropNames = Object.keys(ListItem.propTypes);
  const listItemProps = pick(props, listItemPropNames);
  const sliderProps = omit(props, listItemPropNames);
  return (
    <ListItem
      {...listItemProps}
      styles={{ contentLeft: styles.left, contentRight: styles.right, ...listItemProps.styles }}
      disabled={true}
      actionDisabled={true}
    >
      <Slider
        style={styles.slider}
        trackStyle={styles.track}
        minimumTrackTintColor="#0076FF"
        maximumTrackTintColor="#B7B7B7"
        thumbTintColor="#fff"
        canTouchTrack={true}
        {...sliderProps}
      />
    </ListItem>
  );
}

SliderItem.propTypes = {
  ...ListItem.propTypes,
  ...Slider.propTypes,
};

const styles = StyleSheet.create({
  slider: {
    marginHorizontal: 4,
  },

  track: {
    height: 1,
  },

  left: {
    maxWidth: 72,
  },

  right: {
    maxWidth: 72,
  },
});

export default SliderItem;
