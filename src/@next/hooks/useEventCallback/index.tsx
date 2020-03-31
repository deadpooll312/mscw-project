import * as React from 'react';

export function useEventCallback<Args extends any[], Callback extends (...args: Args) => unknown, Deps extends any[]>(
  fn: Callback,
  dependencies: Deps,
) {
  type RefValue = Callback | (() => never);
 
  const ref = React.useRef<RefValue>(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });
 
  React.useLayoutEffect(
    () => {
      ref.current = fn;
    },
    [fn, ...dependencies],
  );
 
  return (React.useCallback(
    (...args) => {
      const refFn = ref.current as Callback;
 
      return refFn(...(args as Args));
    },
    [ref],
  ) as any) as Callback;
}