import { AnyAction } from 'redux';
import { PromiseMeta } from 'app/store/promise_middleware/constant';

const createAction = <A extends AnyAction & { payload: any }>(action: A) => {
  let resolve = null;
  const promise = new Promise((res) => resolve = res);

  return {
    ...action,
    [PromiseMeta]: {
      promise,
      resolve,
    }
  };
};

export default createAction;
