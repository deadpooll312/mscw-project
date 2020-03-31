import * as React from 'react';
import { axiosDashboard } from 'app/api/axios';
import { RestResult } from 'app/types';

const useLoadData = <T extends any>(url: string, defaultValue: T, ...params) => {
  const [data, setData] = React.useState<T>(defaultValue);

  React.useEffect(
    () => {
      let isExist = true;

      setImmediate(
        async () => {
          const ans = await axiosDashboard.get<any, RestResult<T>>(url, { params });

          if (isExist) {
            setData(ans.data);
          }
        },
      );

      return () => {
        isExist = false;
      };
    },
    [url, ...params],
  );

  return data;
};

export default useLoadData;
