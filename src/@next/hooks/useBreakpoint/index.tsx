import * as React from 'react';
import { useDispatch } from 'react-redux';
import { setBreakpoint } from 'app/store/modules/app/actions';
import { BreakpointSizes } from 'app/types';

let BREAKPOINTS = {};

function initMatchMedia(breakpointSetter) {
  const handleMediaChange = (breakpoint) => (mq) => {
    if (mq.matches) {
      breakpointSetter(breakpoint);
    }
  };

  const LAPTOP = window.matchMedia(`(max-width: ${BreakpointSizes.LAPTOP - 1}px)`);
  const DESKTOP = window.matchMedia(`(min-width: ${BreakpointSizes.LAPTOP}px) and (max-width: ${BreakpointSizes.DESKTOP - 1}px)`);
  const WIDE = window.matchMedia(`(min-width: ${BreakpointSizes.DESKTOP}px)`);
  LAPTOP.addListener(handleMediaChange('LAPTOP'));
  DESKTOP.addListener(handleMediaChange('DESKTOP'));
  WIDE.addListener(handleMediaChange('WIDE'));
  BREAKPOINTS = { LAPTOP, DESKTOP, WIDE };

  Object.keys(BREAKPOINTS).forEach((bpKey) => {
    handleMediaChange(bpKey)(BREAKPOINTS[bpKey]);
  });
}

const useBreakpoint = (deep: any[]) => {
  const dispatch = useDispatch();

  React.useEffect(
    () => {
      initMatchMedia((arg: Parameters<typeof setBreakpoint>[0]) => dispatch(setBreakpoint(arg)));
    },
    deep,
  );
};

export default useBreakpoint;
