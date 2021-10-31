import T from 'prop-types';
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  memo,
} from 'react';
import isEqual from 'react-fast-compare';

import '../../index.css';

export const Input = memo(({ onSubmit, initialValue }) => {
  const textInput = useRef();
  const [value, setInputValue] = useState(initialValue);

  useEffect(() => textInput.current.focus(), []);

  const onChangeHandler = useCallback(
    (e) => setInputValue(e.target.value),
    [],
  );

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (value.length > 0) {
        onSubmit(value);
        setInputValue('');
      }
    },
    [onSubmit, value],
  );

  return (
    <form onSubmit={onSubmitHandler}>
      <input
        ref={textInput}
        value={value}
        onChange={onChangeHandler}
      />
    </form>
  );
}, isEqual);

Input.propTypes = {
  onSubmit: T.func.isRequired,
  initialValue: T.string,
};

Input.defaultProps = {
  initialValue: '',
};
