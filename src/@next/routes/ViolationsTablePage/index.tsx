import * as React from 'react';
import styled from 'styles';
import { useSelector, useDispatch } from 'react-redux';

import { ErrorBoundary } from '@next/hocs/ErrorBoundary';
import Loading from '@next/ui/atoms/Loading';
import { selectPrimaryFiltersWithoutTheme, selectSecondaryFilters, selectModuleSidebarViolationTypeIsSys } from 'app/store/modules/sidebar/selectors';
import ViolationsSimpleTableWrap from '@next/routes/ViolationsTablePage/ViolationsSimpleTableWrap';
import { ObjectForTable } from 'app/api/types';
import ThemeDashboardCardBlock from '@next/ui/atoms/ThemeDashboardCardBlock';
import FlexContainer from '@next/ui/atoms/FlexContainer';
import ButtonExportViolationTable from '@next/routes/ViolationsTablePage/ButtonExportViolationTable/ButtonExportViolationTable';
import useSetSearchAndParams from '@next/hooks/useSearch/useSetSearchAndParams';
import { getDashboardTableData } from 'app/store/modules/table/actions';
import { selectModuleDashboardTableData, selectModuleDashboardTableDataIsLoading } from 'app/store/modules/table/selectors';

type Props = {};

const ViolationsTablePage: React.FC<Props> = React.memo(
  () => {
    const dispatch = useDispatch();
    const dashboardTableData = useSelector(selectModuleDashboardTableData);
    const isLoading =  useSelector(selectModuleDashboardTableDataIsLoading);
    const [sortData, setSortData] = React.useState<{ field: keyof ObjectForTable; isReverse: boolean }>({ field: null, isReverse: false });

    const [paginationData, setPaginationData] = React.useState({
      page: 0,
      size: 15,
      totalElements: 0,
      totalPages: 0,
    });

    const primaryFiltersWithoutTheme = useSelector(selectPrimaryFiltersWithoutTheme);
    const secondaryFilters = useSelector(selectSecondaryFilters);
    const violationTypeIsSys = useSelector(selectModuleSidebarViolationTypeIsSys);

    const localArrData = React.useMemo(() => dashboardTableData?.objects || [], [dashboardTableData]);

    React.useEffect(
      () => {
        if (dashboardTableData) {
          setPaginationData((oldData) => {
            const totalElements = dashboardTableData?.totalElements ?? 0;
            const totalPages = dashboardTableData?.totalPages ?? 0;
  
            return {
              ...oldData,
              totalElements,
              totalPages,
              page: oldData.page >= totalPages ? Math.max(totalPages - 1, 0) : oldData.page,
            };
          });
        }
      },
      [dashboardTableData]);

    React.useEffect(
      () => {
        if (Object.keys(secondaryFilters).length) {
          dispatch(getDashboardTableData({ paginationData, sortData }));
        }
      },
      [paginationData.size, paginationData.page, secondaryFilters, primaryFiltersWithoutTheme, sortData],
    );

    const {
      handleSetSearchAndParams,
    } = useSetSearchAndParams();

    const handleShowViolationInfo = React.useCallback(
      (rowData: ObjectForTable) => {
        handleSetSearchAndParams({
          search: {
            violationPartialData: {
              objectTypeCode: rowData.objectTypeCode,
              featureId: rowData.featureId,

              okrugName: rowData.okrugName,
              districtName: rowData.districtName,
            }
          }
        });
      },
      [primaryFiltersWithoutTheme, handleSetSearchAndParams],
    );

    const handleChangePage = React.useCallback(
      (page: number) => {
        setPaginationData((oldData) => ({
          ...oldData,
          page,
        }));
      },
      [],
    );

    const handleSort = React.useCallback(
      (field: keyof ObjectForTable, isReverse: boolean) => {
        setSortData({
          field,
          isReverse,
        });
      },
      [],
    );

    return (
      <ErrorBoundary>
        <ContainerWidgetCard>
          <h2>
            <FlexContainer justifyContent="space-between">
              <ThemeDashboardCardBlock>Нарушения</ThemeDashboardCardBlock>
              <ButtonExportViolationTable sortData={sortData} isDataEmpty={!localArrData || !localArrData.length} />
            </FlexContainer>
          </h2>
          {
            isLoading
              ? <Loading type="new_spinner" />
              : (
                <ViolationsSimpleTableWrap
                  localArrData={localArrData}
                  handleShowViolationInfo={handleShowViolationInfo}
                  isSys={violationTypeIsSys}
                  sortData={sortData}
                  handleSort={handleSort}

                  paginationData={paginationData}

                  handleChangePage={handleChangePage}
                />
              )
          }
        </ContainerWidgetCard>
      </ErrorBoundary>
    );
  },
);

export default ViolationsTablePage;

export const ContainerWidgetCard = styled(ThemeDashboardCardBlock)`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  margin: 20px 20px;
  padding: 10px 20px;
  overflow: hidden;
  box-shadow: 0px 0px 5px 0px ${({ theme }) => theme.colors.dashboardCard.boxShadow};
`;
