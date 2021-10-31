import { memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';

import { useTodosProviderApi } from '../../hooks';
import { Input } from '../Input/Input';

export const AddToDoInput = memo(() => {
  const { add } = useTodosProviderApi();

  const onSubmitInputHandler = useCallback(
    (text) => add({ text }),
    [add],
  );

  return <Input onSubmit={onSubmitInputHandler} />;
}, isEqual);
