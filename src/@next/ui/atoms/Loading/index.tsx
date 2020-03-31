import * as React from 'react';
import Icon from 'antd/lib/icon';
import styled from 'styles';

const LoadingSpinSvg = React.lazy(() => (
  import(/* webpackChunkName: "LoadingSpinSvg" */ '@next/ui/atoms/Loading/SpinSvg')
));

const IconWrap = styled(Icon)`
  position: absolute;
  font-size: 24px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

type Props = {
  type?: 'default' | 'new_spinner';
  loadingWidth?: string;
  overall?: boolean;
  backgroundColor?: string;
};

const Loading: React.FC<Props> = React.memo(
  (props) => {
    if (props.type === 'new_spinner') {
      return (
        <React.Suspense fallback={<div></div>}>
          <LoadingSpinSvg loadingWidth={props.loadingWidth} overall={props.overall} backgroundColor={props.backgroundColor} />

        </React.Suspense>
      );
    }

    return (
      <IconWrap
        type="loading"
        spin={true}
      />
    );
  },
);

export default Loading;
