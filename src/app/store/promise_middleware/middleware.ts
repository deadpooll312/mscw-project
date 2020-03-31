import { PromiseMeta } from 'app/store/promise_middleware/constant';

const promiseMiddleware = store => next => action => {
  const result = next(action);
  return action?.[PromiseMeta]?.promise ?? result;
};

export default promiseMiddleware;
