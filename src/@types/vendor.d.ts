
declare let __DEV__: string;
declare let _VERSION_: string;
declare let System;
declare let NODE_ENV;
declare let _HASH_: string;
declare let _COMMIT_DATE_: string;
declare let _BUILD_TIME_: string;
declare let _WS_CAR_PATH_: string;

declare namespace NodeJS {
  interface Global {
    dispatch: any;
    defaultLogin: string;
    defaultLoginPass: string;
  }
}

interface Window {
  notification: any;
  _app: any;
  __app: any;
  app: any;
  persistor: any;
}
declare module '*.jpg';
declare module '*.png';
declare module '*.svg';
