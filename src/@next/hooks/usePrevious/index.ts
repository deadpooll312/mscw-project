import * as React from 'react';

// https://ru.reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
// https://ru.reactjs.org/docs/hooks-faq.html#can-i-run-an-effect-only-on-updates
const usePrevious = <F extends any>(anyValue: F): F => {
  const container = React.useRef<F>();

  React.useEffect(() => {
    container.current = anyValue;
  });
  return container.current;
};

export default usePrevious;
