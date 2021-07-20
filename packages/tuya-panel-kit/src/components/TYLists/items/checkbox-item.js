import React from 'react';
import ListItem from '../list-item';
import Checkbox from '../../checkbox';
import { pick, omit } from './utils';

function CheckboxItem({ checked, reverse, disabled, onChange, ...props }) {
  const listItemPropNames = Object.keys(ListItem.propTypes);
  const { Icon, Action, ...listItemProps } = pick(props, listItemPropNames);
  const checkboxProps = omit(props, listItemPropNames);
  return (
    <ListItem
      styles={{ contentLeft: { alignSelf: 'flex-start', marginTop: 4 } }}
      {...listItemProps}
      Icon={
        reverse ? (
          Icon
        ) : (
          <Checkbox {...checkboxProps} checked={checked} disabled={disabled} onChange={onChange} />
        )
      }
      Action={
        reverse ? (
          <Checkbox {...checkboxProps} checked={checked} disabled={disabled} onChange={onChange} />
        ) : (
          Action
        )
      }
      disabled={disabled}
      onPress={() => onChange && onChange(!checked)}
    />
  );
}

CheckboxItem.propTypes = {
  ...ListItem.propTypes,
  ...Checkbox.propTypes,
};

export default CheckboxItem;
