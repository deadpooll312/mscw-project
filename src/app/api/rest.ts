import axios from 'axios';

import { axiosDashboard } from 'app/api/axios';

type LoginData = {
  login: string;
  password: string;
};

export type CredentialsData = {
  login: string;
  password: string;
  firstNewPassword: string;
  secondNewPassword: string;
};

/**
 * Получение списка всех параметров
 * https://gost-jira.atlassian.net/wiki/spaces/EGIPAPIDOC/pages/523927976/GET+settings+-
 * @param q
 */
export function getSettings(q?) {
  const params = new URLSearchParams(q);
  return axiosDashboard
    .get(`/egip/settings`, {
      params
    });
}

/**
 * Аутентификация
 * https://gost-jira.atlassian.net/wiki/spaces/EGIPAPIDOC/pages/734822680/POST+egip+login+-
 * @param data
 */
export function loginApi(data: LoginData): Promise<any> {
  const baseURL = axiosDashboard.defaults.baseURL;
  return axios
    .post<any>(`/egip/login`, data, {
      baseURL,
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((r) => {
      const xAuthToken = r.headers['x-auth-token'];
      return { data: r.data, xAuthToken };
    });
}

/**
 * Выход из системы
 * https://gost-jira.atlassian.net/wiki/spaces/EGIPAPIDOC/pages/734790077/POST+egip+logout+-
 */
export function logout(): Promise<any> {
  const baseURL = axiosDashboard.defaults.baseURL;

  return axios
    .post<any>(`/egip/logout`, {}, { baseURL }).then((r) => {
      return r.data;
    }).catch(() => {
      //
    });   // упало и упало
}

/**
 * Получение списка всех параметров
 */
export function verificationRequest() {
  return getSettings();
}

/**
 * Обновить устаревший пароль пользователя
 * https://gost-jira.atlassian.net/wiki/spaces/EGIPAPIDOC/pages/966000641/POST+acl+password+expired+-
 * @param data
 */
export function postUpdateCredentials(data: CredentialsData): Promise<any> {
  return axiosDashboard
    .post<any>(`/egip/acl/password/expired`, data, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
}

/**
 * Получение настроек сложности пароля
 */
export function getPasswordPolicy(): Promise<any> {
  return axiosDashboard.get<any>(`/egip/acl/system/settings/current`, {});
}

/**
 * Предоставление списка типов доменных объектов с поисковым запросом
 * @param q
 */

export function getAclTypes(q = 'filter=kind.in(SERVICE)&page=0&size=1000&sort=type,desc'): Promise<any> {
  const params = new URLSearchParams(q);
  return axiosDashboard.get<any>(`/egip/acl/types`, {
    params
  });
}

/**
 * Получение всех шаблонов url картографических основ
 * https://gost-jira.atlassian.net/wiki/spaces/EGIPAPIDOC/pages/675807354/GET+basemaps+-+url
 */
export async function getBasemaps(): Promise<any> {
  return axiosDashboard
    .get<any>(`/egip/basemaps`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
}

/**
 * Получение списка назначенных прав
 * https://gost-jira.atlassian.net/wiki/spaces/EGIPAPIDOC/pages/664043730/GET+acl+permissions+-
 * @param q
 */
export function getPermissions(q?): Promise<any> {
  const params = new URLSearchParams(q);
  return axiosDashboard
    .get<any>(`/egip/acl/permissions `, {
      params,
    });
}

/**
 * Получение списка всех пользователей и количества пользователей
 * @param q
 */
export function getUsers(q?): Promise<any> {
  const params = new URLSearchParams(q);
  return Promise.all([
    axiosDashboard.get<any>(`/egip/acl/users`, {
      params
    }),
    axiosDashboard.get<any>(`/egip/acl/users/count`)
  ])
    .then(([res, countRes]) => {
      if (res.request) {
        res.data.totalCount = countRes.data.data.response;
        return res;
      }
      res['totalCount'] = countRes['data'].response;
      return res;
    });
}

/**
 * Поиск пользователей по фильтрам
 * https://gost-jira.atlassian.net/wiki/spaces/EGIPAPIDOC/pages/913572628/POST+acl+users+search-c+-
 * https://gost-jira.atlassian.net/wiki/spaces/EGIPAPIDOC/pages/924713025/POST+acl+users+count-c+-
 * @param q
 */
export function getUsersSearchС({ bodyParams, queryParams }) {
  const q = new URLSearchParams(queryParams);
  return Promise.all([
    axiosDashboard.post<any>(`/egip/acl/users/search-c?${q}`, {
      ...bodyParams,
    }),
    axiosDashboard.post<any>(`/egip/acl/users/count-c`, {
      ...bodyParams,
    })
  ])
    .then(([res, countRes]) => {
      if (res.request) {
        res.data.totalCount = countRes.data.data.response;
        return res;
      }
      res['totalCount'] = countRes['data'].response;
      return res;
    });
}

/**
 * Поиск профилей пользователей по фильтрам
 * @param q
 */
export function getProfilesSearchС({ bodyParams, queryParams }) {
  const q = new URLSearchParams(queryParams);
  return Promise.all([
    axiosDashboard.post<any>(`/egip/acl/profiles/search-c?${q}`, {
      ...bodyParams,
    }),
    axiosDashboard.post<any>(`/egip/acl/profiles/count-c`, {
      ...bodyParams,
    })
  ])
    .then(([res, countRes]) => {
      if (res.request) {
        res.data.totalCount = countRes.data.data.response;
        return res;
      }
      res['totalCount'] = countRes['data'].response;
      return res;
    });
}

export function getInstructionData() {
  return axiosDashboard
    .get<any>(`api/v1/dashboard/report/instruction/`);
}