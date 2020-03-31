import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AnalyticsViolationTypes } from 'app/store/modules/@types';
import { SidebarButton } from '@next/ui/atoms/SidebarButton';
import { changeViolationType, resetToInitialFiltersWithSaveViolationAndSeason } from 'app/store/modules/sidebar/actions';
import { selectModuleSidebarViolationType } from 'app/store/modules/sidebar/selectors';
import { SIDEBAR_VIOLATIONS } from '@next/ui/organisms/TopSidebar/constants';
import { SeasonContainer } from '@next/ui/organisms/TopSidebar/PickSeason';

const checkViolationActive = (violationInStore: AnalyticsViolationTypes, violationItem: AnalyticsViolationTypes) => {
  switch (violationInStore) {
    case AnalyticsViolationTypes.ALL: {
      if (violationItem === AnalyticsViolationTypes.SYS) {
        return false;
      }

      return true;
    }
    case AnalyticsViolationTypes.SYS: {
      if (violationItem !== AnalyticsViolationTypes.SYS) {
        return false;
      }
      return true;
    }
  }

  return violationInStore === violationItem;
};

type Props = {
  isDisabled: boolean;
};

const PickViolations: React.FC<Props> = React.memo((props) => {
  const dispatch = useDispatch();
  const violationActive = useSelector(selectModuleSidebarViolationType);

  const onViolationButtonClick = React.useCallback((event) => {
    const targetType = (event.target as HTMLButtonElement).value as AnalyticsViolationTypes;
    let newType = null;

    if (targetType === AnalyticsViolationTypes.SYS) {
      if (violationActive !== AnalyticsViolationTypes.SYS) {
        newType = targetType;
      } else {
        newType = AnalyticsViolationTypes.ALL;
      }
    } else {
      if (violationActive === AnalyticsViolationTypes.ALL) {
        newType = targetType === AnalyticsViolationTypes.CMN ? AnalyticsViolationTypes.CRT : AnalyticsViolationTypes.CMN;
      } else {
        if (violationActive === AnalyticsViolationTypes.SYS) {
          newType = targetType;
        }
        if (violationActive === AnalyticsViolationTypes.CMN) {
          newType = targetType === AnalyticsViolationTypes.CRT ? AnalyticsViolationTypes.ALL : AnalyticsViolationTypes.CRT;
        }
        if (violationActive === AnalyticsViolationTypes.CRT) {
          newType = targetType === AnalyticsViolationTypes.CMN ? AnalyticsViolationTypes.ALL : AnalyticsViolationTypes.CMN;
        }
      }
    }

    dispatch(
      changeViolationType(newType),
    );
    dispatch(resetToInitialFiltersWithSaveViolationAndSeason());

  }, [violationActive]);

  return (
    <SeasonContainer>
      <span>Нарушения</span>
      {
        SIDEBAR_VIOLATIONS.map(
          violation =>
            <SidebarButton
              key={violation.id}
              title={violation.title}
              isActive={checkViolationActive(violationActive, violation.id)}
              value={violation.id}
              onClick={onViolationButtonClick}
              disabled={props.isDisabled}
            />
        )
      }
    </SeasonContainer>

  );
});

export default PickViolations;

