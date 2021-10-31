import T from 'prop-types';
import { memo } from 'react';
import isEqual from 'react-fast-compare';

import { CONFIG } from './config';

export const Icon = memo(({ name, ...props }) => {
  const Component = CONFIG[name];
  return Component ? <Component {...props} /> : null;
}, isEqual);

Icon.propTypes = {
  name: T.oneOf(['remove']).isRequired,
  with: T.string,
  height: T.string,
  color: T.string,
};

Icon.defaultProps = {
  height: '14px',
  width: '14px',
  color: '#000',
};
