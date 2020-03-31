import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styles';

import Loading from '@next/ui/atoms/Loading';
import { ContainerWidgetCard } from '@next/routes/ViolationsTablePage';
import FlexContainer from '@next/ui/atoms/FlexContainer';
import { selectModuleSidebarEndDateRaw, selectModuleSidebarRegions, selectModuleSidebarDistricts } from 'app/store/modules/sidebar/selectors';
import { useStyledTheme } from 'styles/themes/hooks';
import AmchartPieOfPie from '@next/ui/atoms/AmchartPieOfPie';
import { selectDashleatData, selectDashleatWidgetStateIsLoading } from 'app/store/modules/dashboard/selectors';
import { getDashleatData } from 'app/store/modules/dashboard/actions';
import { getFormattedDashDate } from '@next/utils/dates';
import { GetDashboardDashletDataParams } from 'app/api/types';
import { Color } from '@next/ui/molecules/ViolationLegendList/ViolationLegendList';
import CONSTANTS from '@next/constants';

const DashleatWidget: React.FC = React.memo(() => {
  const themeData = useStyledTheme();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectDashleatWidgetStateIsLoading);
  const sidebarDate = useSelector(selectModuleSidebarEndDateRaw);
  const currentRegions = useSelector(selectModuleSidebarRegions);
  const currentDistricts = useSelector(selectModuleSidebarDistricts);

  const dataList = useSelector(selectDashleatData);
  const date = getFormattedDashDate(sidebarDate, false, true);

  React.useEffect(
    () => {
      let params: GetDashboardDashletDataParams = {
        date,
      };

      if (currentRegions.length) {
        params.regionId = currentRegions[CONSTANTS.INDEX_OF_ARR.FIRST_INDEX].type;
      }

      if (currentDistricts.length) {
        params.districtId = currentDistricts[CONSTANTS.INDEX_OF_ARR.FIRST_INDEX].type;
      }
      dispatch(getDashleatData(params));
    },
    [date, JSON.stringify(currentRegions), JSON.stringify(currentDistricts)],
  );

  return (
    <StyledDefectsWidget>
      <StyledDefectsWidgetTitle>Силы и средства (% от штатного норматива)</StyledDefectsWidgetTitle>
      <TreemapContainer>
        <TotalRowContainer justifyContent="space-between">
          {
            dataList?.map((rowData) => (
              <DashleatLegendItem key={rowData.color}>
                <Color color={rowData.color} />
                <div key={rowData.type} >
                  {rowData.title} - <TotalDiv textColor={rowData.color}>{(rowData.value ?? '-').toLocaleString('ru')} ({rowData.percent ?? '-'}%)</TotalDiv>
                </div>
              </DashleatLegendItem>
            ))
          }
        </TotalRowContainer>
        <TreemapContainerChart>
          <AmchartPieOfPie
            backgroundColor={themeData.colors.dashboardCard.cardBackground}
            data={dataList}
          />
        </TreemapContainerChart>
      </TreemapContainer>
      {
        isLoading && <Loading type="new_spinner" />
      }
    </StyledDefectsWidget>
  );
});

export default DashleatWidget;

const TreemapContainer = styled.div`
  flex: 1 1 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const TreemapContainerChart = styled(TreemapContainer)`
  flex: 1 1 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: center;
  align-items: center;
  justify-content: center;
`;

const StyledDefectsWidget = styled(ContainerWidgetCard)`
  background-color: ${({ theme }) => theme.colors.palette.white1 };
  width: 95%;
  margin: 0 auto;
  padding: 20px 10px;
  height: 460px;
  margin-top: 10px;
  position: relative;
  box-shadow: 0px 0px 5px 0px ${({ theme }) => theme.colors.dashboardCard.boxShadow};
  margin-bottom: 20px;
`;

export const StyledDefectsWidgetTitle = styled.div`
  font-size:  ${({ theme }) => theme.fonts.size.lg };
  font-family: ${({ theme }) => theme.fonts.family.sidebar.extra };
  font-weight: 900;
  padding: 0 20px;
`;

const TotalRowContainer = styled(FlexContainer)`
  margin: 5px 20px;
  font-size: 1.2rem;
`;

const TotalDiv = styled.span<{ textColor: string }>`
  color: ${({ textColor }) => textColor || 'inherit'};
  position: relative;
  top: 1px;
`;

const DashleatLegendItem = styled.div`
   & > div {
     display: inline-block;
     margin-right: 10px;
   }
   & > div:first-child {
    position: relative;
    top: 3px;

    @media (min-width: 1000px) and (max-width: 1449px)  {
      top: 6px;
    }
   }


   @media (min-width: 1000px) and (max-width: 1449px)  {
      font-size: 0.8rem;
   }
`;
