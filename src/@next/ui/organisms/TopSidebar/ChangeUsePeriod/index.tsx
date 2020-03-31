import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styles';
import { SidebarButton } from '@next/ui/atoms/SidebarButton';
import { changeUsePeriod } from 'app/store/modules/sidebar/actions';
import { useEventCallback } from '@next/hooks/useEventCallback';
import FlexContainer from '@next/ui/atoms/FlexContainer';
import { selectModuleSidebarUsePeriod } from 'app/store/modules/sidebar/selectors';

type ComponentChangeUsePeriodProps = {
  isHidden?: boolean;
  isDisabled: boolean;
};

const ComponentChangeUsePeriod: React.FC<ComponentChangeUsePeriodProps> = React.memo((props) => {
  const dispatch = useDispatch();
  const usePeriod = useSelector(selectModuleSidebarUsePeriod);

  const handleClick = useEventCallback(
    () => {
      dispatch(
        changeUsePeriod(!usePeriod),
      );
    },
    [usePeriod],
  );

  React.useEffect(
    () => {
      dispatch(
        changeUsePeriod(false),
      );
    },
    [props.isHidden]
  );

  return (
    <SeasonContainer alignItems="center" isHidden={props.isHidden}>
      <SidebarButton
        title="За период"
        value={null}
        isActive={usePeriod}
        onClick={handleClick}
        disabled={props.isDisabled}
      />
    </SeasonContainer>

  );
});

export default ComponentChangeUsePeriod;

export const SeasonContainer = styled(FlexContainer)<{isHidden?: boolean}>`
  visibility: ${({isHidden}) => isHidden ? 'hidden' : 'visible'};
`;
