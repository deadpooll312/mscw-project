import {
  call,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { PromiseMeta } from 'app/store/promise_middleware/constant';

const createEffect = <PromiseAns extends any>(actionType: string, takeFunc: typeof takeEvery | typeof takeLatest, effect: any) => {
  function* wrapEffect(action: any) {
    const ans: PromiseAns = yield call(effect, action);
    action?.[PromiseMeta]?.resolve?.(ans);
  }

  return function* () {
    yield takeFunc(actionType, wrapEffect);
  };
};

export default createEffect;
