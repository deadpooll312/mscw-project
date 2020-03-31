import type { Reducer } from 'redux';
import type { ReduxState } from 'app/store/modules/@types';

export const factoryAction = (key: string) => (type: string) => {
  return `${key}/${type}`;
};

const createReducer = <StoreName extends keyof ReduxState>(
  initialState: ReduxState[StoreName],
  handlers: Record<string, <A extends { type: string; payload: any } & Record<string | symbol | number, any>>(state: ReduxState[StoreName], action: A) => ReduxState[StoreName]>,
): Reducer<ReduxState[StoreName]> => {
  const reducer = (state = initialState, action: any = {}): ReduxState[StoreName] => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };

  return reducer;
};

export default createReducer;
