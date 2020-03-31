import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ThemedStyledProps } from 'styles';

import ColumnsChart from '@next/ui/molecules/TypesViolationsChart';

import { selectDashboardDefectWidget, selectDefectsWidgetState } from 'app/store/modules/dashboard/selectors';
import { ReduxState } from 'app/store/modules/@types';
import Loading from '@next/ui/atoms/Loading';
import { States } from 'app/store/modules/dashboard/types';
import { ContainerWidgetCard } from '@next/routes/ViolationsTablePage';
import { useStyledTheme } from 'styles/themes/hooks';

const DefectsWidget: React.FC = () => {
  const defectsWidgetData = useSelector(selectDashboardDefectWidget);
  const isLoading = useSelector((state: ReduxState) => selectDefectsWidgetState(state) === States.FETCHING);
  const themeData = useStyledTheme();

  return (
    <StyledDefectsWidget>
      <StyledDefectsWidgetTitle>Топ-10 нарушений</StyledDefectsWidgetTitle>
      {
        isLoading
          ? <Loading type="new_spinner" />
          : (
            <ColumnsChart
              data={defectsWidgetData}
              backgroundColor={themeData.colors.dashboardCard.cardBackground}
            />
          )
      }
    </StyledDefectsWidget>
  );
};

export default DefectsWidget;

const StyledDefectsWidget = styled(ContainerWidgetCard)`
  background-color: ${(props: ThemedStyledProps<{}>) => props.theme.colors.palette.white1 };
  width: 95%;
  margin: 0 auto;
  padding: 20px 10px;
  height: 410px;
  margin-top: 10px;
  position: relative;
  box-shadow: 0px 0px 5px 0px ${({ theme }) => theme.colors.dashboardCard.boxShadow};
  margin-bottom: 20px;
`;

export const StyledDefectsWidgetTitle = styled.div`
  font-size:  ${(props: ThemedStyledProps<{}>) => props.theme.fonts.size.lg };
  font-family: ${(props: ThemedStyledProps<{}>) => props.theme.fonts.family.sidebar.extra };
  font-weight: 900;
  padding: 0 20px;
`;
