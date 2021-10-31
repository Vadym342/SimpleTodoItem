import T from 'prop-types';

import '../../index.css';

export const Text = ({ size, children, onClick, ...props }) => {
  const style = props.style ?? {};

  return (
    <div
      {...props}
      className="text"
      onClick={onClick}
      style={{ fontSize: size, ...style }}
    >
      {children}
    </div>
  );
};

Text.propTypes = {
  size: T.string,
  onClick: T.func,
  children: T.oneOfType([T.string, T.node, T.arrayOf(T.node)])
    .isRequired,
};
Text.defaultProps = {
  size: '14px',
  onClick: () => null,
};
