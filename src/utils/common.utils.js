// NOTE: in real project should be extended with logger service (e.g. Sentry)
export const logger = (...args) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(...args);
  }
};
