import { useCallback, useState, memo } from 'react';
import T from 'prop-types';
import isEqual from 'react-fast-compare';

import '../../index.css';
import { Input } from '../Input/Input';
import { CheckBox } from '../CheckBox/CheckBox';
import { Icon } from '../Icon/Icon';
import { ToDoText } from '../ToDoText/ToDoText';

export const ToDoListItem = memo(({ todoItem, onEdit, onRemove }) => {
  const { _id, text, completed } = todoItem;

  const [isEditable, setIsEditable] = useState(false);

  const onSubmitInputHandler = useCallback(
    (enteredText) => {
      if (enteredText !== text) {
        onEdit({ _id, text: enteredText });
      }
      setIsEditable(false);
    },
    [_id, text, onEdit],
  );

  const onClickRemoveHandler = useCallback(
    () => onRemove({ _id }),
    [_id, onRemove],
  );

  const onChangeCheckBoxHandler = useCallback(
    () => onEdit({ _id, completed: !completed }),
    [_id, completed, onEdit],
  );

  const onClickTextHandler = useCallback(
    () => setIsEditable(true),
    [],
  );

  return (
    <div className="toDoListItem">
      <CheckBox
        checked={completed}
        onChange={onChangeCheckBoxHandler}
      />
      {isEditable ? (
        <Input initialValue={text} onSubmit={onSubmitInputHandler} />
      ) : (
        <ToDoText
          text={text}
          completed={completed}
          onClick={onClickTextHandler}
        />
      )}
      <Icon name="remove" onClick={onClickRemoveHandler} />
    </div>
  );
}, isEqual);

ToDoListItem.propTypes = {
  todoItem: T.shape({
    _id: T.string.isRequired,
    text: T.string.isRequired,
    completed: T.bool.isRequired,
  }).isRequired,
  onEdit: T.func.isRequired,
  onRemove: T.func.isRequired,
};
