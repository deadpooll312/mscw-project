import type { User } from 'app/types';
import { ROLES, SEASONS_FOR_MER, LEGEND_PERMISSIONS } from 'app/permissions/constants';
import { Season } from 'app/store/modules/@types';

export const checkRole = (user: User): ROLES => {
  let result = ROLES.UNKNOWN;
  user.roles.some((role) => {
    const findedRole = Object.keys(ROLES).find((key) => role.includes(key) && !role.includes(ROLES.ROLE_ADMIN)) as ROLES;
    if (findedRole) {
      result = findedRole;
    }
    return findedRole;
  });
  return result;
};

export const checkIsAdmin = (user: User) => {
  const userRole = checkRole(user);
  return userRole === ROLES.ROLE_DASHBORD_ADMINISTRATOR;
};

export const checkIsMer = (user: User) => {
  const userRole = checkRole(user);
  return userRole === ROLES.ROLE_DASHBORD_MER;
};

const MER_OR_ADMIN = new Set([
  ROLES.ROLE_DASHBORD_MER,
  ROLES.ROLE_DASHBORD_ADMINISTRATOR,
  ROLES.ROLE_ADMIN,
]);
export const checkIsMerOrAdminOrAdministrator = (user: User) => {
  const userRole = checkRole(user);

  return MER_OR_ADMIN.has(userRole);
};

export const getLengendByPermission = <T extends { color: string }>(legend: T[], user: User, seasonActive: Season, checkMayor: boolean): T[] => {
  if (checkMayor && checkIsMer(user) && SEASONS_FOR_MER.has(seasonActive)) {
    return legend.filter(item => !LEGEND_PERMISSIONS[ROLES.ROLE_DASHBORD_MER].includes(item.color));
  }

  return [...legend];
};
