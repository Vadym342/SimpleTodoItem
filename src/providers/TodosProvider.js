import React, { useCallback, useEffect, useReducer } from 'react';
import uuid from 'uuid/dist/v4';
import { logger } from '../utils';

const TODOS_LOCAL_STORAGE_KEY = 'todos';
const DEFAULT_STATE = {
  todos: [],
};
const TODOS_ACTIONS = {
  ADD: 'add',
  REMOVE: 'remove',
  EDIT: 'edit',
};

const getReducerInitialState = () => {
  try {
    return {
      todos:
        JSON.parse(localStorage.getItem(TODOS_LOCAL_STORAGE_KEY)) ||
        [],
    };
  } catch (e) {
    logger(e);
    return DEFAULT_STATE;
  }
};

const todosReducer = (currentState, action) => {
  const { todos } = currentState;
  const { type, payload } = action;

  switch (type) {
    case TODOS_ACTIONS.ADD:
      return {
        ...currentState,
        todos: [
          ...todos,
          {
            _id: uuid(),
            text: payload.text,
            completed: false,
          },
        ],
      };
    case TODOS_ACTIONS.REMOVE:
      return {
        ...currentState,
        todos: todos.filter((todo) => payload._id !== todo._id),
      };
    case TODOS_ACTIONS.EDIT:
      return {
        ...currentState,
        todos: todos.map((todo) =>
          todo._id === payload._id ? { ...todo, ...payload } : todo,
        ),
      };

    default:
      throw new Error();
  }
};

//! NOTE: on the projects with TypeScript the checkers below are useless
const checkPayloadIdOrThrow = (payload) => {
  if (!payload?._id) throw new Error('"_id" is empty.');
};

const checkPayloadTextOrThrow = (payload) => {
  if (!payload?.text) throw new Error('"text" is empty.');
};

export const TodosContext = React.createContext();

export const TodosProvider = ({ children }) => {
  const [{ todos }, dispatch] = useReducer(
    todosReducer,
    getReducerInitialState(),
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        TODOS_LOCAL_STORAGE_KEY,
        JSON.stringify(todos),
      );
    } catch (e) {
      logger(e);
    }
  }, [todos]);

  const onAddHandler = useCallback(
    (payload) => {
      checkPayloadTextOrThrow(payload);
      dispatch({ type: TODOS_ACTIONS.ADD, payload });
    },
    [dispatch],
  );

  const onRemoveHandler = useCallback(
    (payload) => {
      checkPayloadIdOrThrow(payload);
      dispatch({ type: TODOS_ACTIONS.REMOVE, payload });
    },
    [dispatch],
  );

  const onEditHandler = useCallback(
    (payload) => {
      checkPayloadIdOrThrow(payload);
      dispatch({ type: TODOS_ACTIONS.EDIT, payload });
    },
    [dispatch],
  );

  const api = {
    add: onAddHandler,
    remove: onRemoveHandler,
    edit: onEditHandler,
  };

  const data = { todos };

  return (
    <TodosContext.Provider value={{ api, data }}>
      {children}
    </TodosContext.Provider>
  );
};
