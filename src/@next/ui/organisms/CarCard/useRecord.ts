import * as React from 'react';
import keyBy from 'lodash-es/keyBy';

const useRecord = <T extends any>(data: T[], field: keyof T) => {
  return React.useMemo(
    () => {
      return keyBy(data, field);
    },
    [data],
  );
};

export default useRecord;
