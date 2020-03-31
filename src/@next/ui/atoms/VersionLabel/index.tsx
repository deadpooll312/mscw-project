import * as React from 'react';
import { Popover } from 'antd';

import AbsoluteBottomRight from '@next/ui/atoms/AbsoluteBottomRight';

type Props = {};

const VersionLabel: React.FC<Props> = React.memo(
  () => {
    return (
      <Popover
        trigger="click"
        placement="topLeft"

        content={(
          <section>
            <div>{_VERSION_}</div>
            <div>{_HASH_}</div>
            <div>{_COMMIT_DATE_}</div>
          </section>
        )}
      >
        <AbsoluteBottomRight
          title={`Версия ${_VERSION_} ${_HASH_} ${_COMMIT_DATE_}`}
          children={_VERSION_}
        />
      </Popover>
    );
  },
);

export default VersionLabel;
