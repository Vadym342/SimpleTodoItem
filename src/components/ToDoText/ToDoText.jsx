import T from 'prop-types';
import { memo } from 'react';
import isEqual from 'react-fast-compare';

import { Text } from '../Text/Text';

const COMPLETED_TODO_STYLE = {
  color: 'red',
  textDecoration: 'line-through',
};

export const ToDoText = memo(
  ({ text, completed, onClick }) =>
    completed ? (
      <Text size="30px" style={COMPLETED_TODO_STYLE}>
        {text}
      </Text>
    ) : (
      <Text size="30px" onClick={onClick}>
        {text}
      </Text>
    ),
  isEqual,
);

ToDoText.propTypes = {
  text: T.string.isRequired,
  completed: T.bool.isRequired,
  onClick: T.func.isRequired,
};
