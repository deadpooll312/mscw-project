import { User } from 'app/types';
import { Season } from 'app/store/modules/@types';

import { ROLES, SEASONS_FOR_MER } from 'app/permissions/constants';
import { checkIsMer } from '@next/utils/checkOnPermission';

type SeasonQueryObject = {
  season?: Season;
  role?: ROLES;
};

export const getSeasonQueryObject = (user: User, appMode: Season, checkMer: boolean) => {
  const queryObject: SeasonQueryObject = {};
  if (appMode !== Season.MIXED){
    queryObject.season = appMode;
  }
  if (checkMer && checkIsMer(user) && SEASONS_FOR_MER.has(appMode)) {
    queryObject.role = ROLES.ROLE_DASHBORD_MER;
  }
  return queryObject;
};
