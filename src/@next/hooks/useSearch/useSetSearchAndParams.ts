import * as React from 'react';

import { useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import { HandleSetSearchAndParams, HandleSetSearchAndParamsNewSearchData } from '@next/hooks/useSearch/useSetSearchAndParams.h';
import { generateHistoryPath, makeObjFromMemoize } from '@next/utils/history_search';

const useSetSearchAndParams = () => {
  const routeLocation = useLocation();
  const routeHistory = useHistory();
  const routeMatch = useRouteMatch();

  const handleSetSearchAndParams = React.useCallback<HandleSetSearchAndParams>(
    ({ params, search, type, path }) => {
      routeHistory[type ?? 'push'](
        generateHistoryPath(
          path ?? routeMatch.path,
          params,
          search,

          routeMatch.params,
          routeLocation.search,
        ),
      );
    },
    [
      routeMatch.path,
      routeMatch.params,
      routeHistory.push,
      routeHistory.replace,
      routeLocation.search,
    ],
  );

  const routeLocationState = makeObjFromMemoize(routeLocation.search) as HandleSetSearchAndParamsNewSearchData['search'];

  return {
    handleSetSearchAndParams,
    routeLocationState,
  };
};

export default useSetSearchAndParams;
