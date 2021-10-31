import { memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';

import '../../index.css'; 
import {
  useTodosProviderData,
  useTodosProviderApi,
} from '../../hooks';
import { ToDoListItem } from '../ToDoListItem/ToDoListItem';

export const ToDoList = memo(() => {
  const { todos } = useTodosProviderData();
  const { remove, edit } = useTodosProviderApi();

  const onEditHandler = useCallback(
    (payload) => edit(payload),
    [edit],
  );

  const onRemoveHandler = useCallback(
    (payload) => remove(payload),
    [remove],
  );

  return (
    <div className="toDoList">
      {todos.map((todo) => (
        <ToDoListItem
          key={todo._id}
          todoItem={todo}
          onEdit={onEditHandler}
          onRemove={onRemoveHandler}
        />
      ))}
    </div>
  );
}, isEqual);
