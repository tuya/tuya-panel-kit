import React from 'react';
import ListItem from '../list-item';
import SwitchButton from '../../switch-button';
import { pick, omit } from './utils';

function SwitchItem({ value, ...props }) {
  const listItemPropNames = Object.keys(ListItem.propTypes);
  const listItemProps = pick(props, listItemPropNames);
  const switchButtonProps = omit(props, listItemPropNames);
  return (
    <ListItem
      disabled={true}
      {...listItemProps}
      Action={
        <SwitchButton
          value={value}
          onTintColor="#44DB5E"
          onThumbTintColor="#fff"
          {...switchButtonProps}
        />
      }
    />
  );
}

SwitchItem.propTypes = {
  ...ListItem.propTypes,
  ...SwitchButton.propTypes,
};

export default SwitchItem;
