import React from 'react';
import ListItem from '../list-item';
import SwitchButton from '../../switch-button';
import { pick, omit } from './utils';

function SwitchItem({ value, disabled, ...props }) {
  const listItemPropNames = Object.keys(ListItem.propTypes);
  const listItemProps = pick(props, listItemPropNames);
  const switchButtonProps = omit(props, listItemPropNames);
  return (
    <ListItem
      {...listItemProps}
      disabled={disabled}
      Action={<SwitchButton value={value} disabled={disabled} {...switchButtonProps} />}
    />
  );
}

SwitchItem.propTypes = {
  ...ListItem.propTypes,
  ...SwitchButton.propTypes,
};

export default SwitchItem;
