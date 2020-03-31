import * as H from 'history';

export const isEqualPathWithLocation = (location: H.History<any>['location'], path: string) => {
  return location.pathname === path;
};
