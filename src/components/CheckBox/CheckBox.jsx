import T from 'prop-types';
import { memo } from 'react';
import isEqual from 'react-fast-compare';

export const CheckBox = memo(
  ({ checked = false, onChange }) => (
    <input type="checkbox" onChange={onChange} checked={checked} />
  ),
  isEqual,
);

CheckBox.propTypes = {
  onChange: T.func.isRequired,
  checked: T.bool,
};
