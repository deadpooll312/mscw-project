import queryString  from 'query-string';
import { isArray, isNullOrUndefined, isNumber } from 'util';
import memoizeOne from 'memoize-one';

import { HandleSetSearchAndParamsNewSearchData } from '@next/hooks/useSearch/useSetSearchAndParams.h';
import CONSTANTS from '@next/constants';

export const useSearchMergeNewState = (searchState: HandleSetSearchAndParamsNewSearchData['search'], data?: HandleSetSearchAndParamsNewSearchData['search']) => {
  const query = {
    ...searchState,
    ...data,
  };

  Object.entries(query).forEach(([key, data]) => {
    if (isNullOrUndefined(query[key])) {
      delete query[key];                              // eslint-disable-line
    } else {
      query[key] = JSON.stringify(data);
    }
  });

  return query;
};

export const makeObjFromMemoize = memoizeOne(
  (search: string): HandleSetSearchAndParamsNewSearchData['search']  => {
    return Object.entries(queryString.parse(search)).reduce(
      (newObj, [key, data]) => {
        if (isArray(data)) {
          data.forEach((dateItem) => {
            newObj[key] = [];
            newObj[key].push(JSON.parse(dateItem));
          });
        } else {
          newObj[key] = JSON.parse(data);
        }

        return newObj;
      },
      {},
    );
  },
);

export const generatePathParams = (
  path: string,
  params: HandleSetSearchAndParamsNewSearchData['params'],

  routeMatchParams: HandleSetSearchAndParamsNewSearchData['params'],
) => {
  let urlAsArray = path.split('/').map((partOfUrl) => {
    let ans = partOfUrl.replace('?', '');

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        ans = ans.replace(`:${key}`, value || isNumber(value) ? value.toString() : '');
      });
    }

    if (routeMatchParams) {
      Object.entries(routeMatchParams).forEach(([key, value]: [string, string]) => {
        ans = ans.replace(`:${key}`, value ? value : '');
      });
    }

    return ans;
  });

  const emptyIndex = urlAsArray.findIndex((value, index) => index && !value);
  if (emptyIndex > CONSTANTS.INDEX_OF_ARR.FIRST_INDEX) {
    urlAsArray = urlAsArray.slice(CONSTANTS.INDEX_OF_ARR.FIRST_INDEX, emptyIndex);
  }

  return urlAsArray.join('/');
};

export const generatePathSearch = (
  search: HandleSetSearchAndParamsNewSearchData['search'],
  routeLocationSearch: string,
) => {
  return queryString.stringify(
    useSearchMergeNewState(
      makeObjFromMemoize(routeLocationSearch),
      search,
    ),
  );
};

export const generateHistoryPath = (
  path: string,
  params: HandleSetSearchAndParamsNewSearchData['params'],
  search: HandleSetSearchAndParamsNewSearchData['search'],

  routeMatchParams: HandleSetSearchAndParamsNewSearchData['params'],
  routeLocationSearch: string,
) => {
  return `${
    generatePathParams(
      path,
      params,
      routeMatchParams,
    )
  }?${
    generatePathSearch(
      search,
      routeLocationSearch,
    )
  }`;
};
