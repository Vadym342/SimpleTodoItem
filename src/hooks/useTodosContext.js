import { useContext } from 'react';

import { TodosContext } from '../providers/TodosProvider';

export const useTodosContext = () => {
  const todosContext = useContext(TodosContext);

  if (!todosContext) {
    throw new Error(
      '"useTodosContext" hook must be inside of "TodosProvider".',
    );
  }

  return todosContext;
};
