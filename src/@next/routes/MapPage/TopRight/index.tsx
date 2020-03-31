import * as React from 'react';

import { ErrorBoundary } from '@next/hocs/ErrorBoundary';
import TopRight from 'containers/TopRight';
import UserInfoBlock from '@next/routes/MapPage/TopRight/UserInfoBlock';
// import ControlBlock from '@next/routes/MapPage/TopRight/ControlBlock';

type Props = {};

const MapPageTopRight: React.FC<Props> = React.memo(
  () => {
    return (
      <TopRight>
        <ErrorBoundary>
          <UserInfoBlock />
        </ErrorBoundary>

        {/*TODO Блок пока не удаляем */}
        {/* <ErrorBoundary>
          <ControlBlock />
        </ErrorBoundary> */}
      </TopRight>
    );
  },
);

export default MapPageTopRight;
