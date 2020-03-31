import * as React from 'react';
import styled from 'styles';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Loading from '@next/ui/atoms/Loading';
import ThemeDashboardCardBlock from '@next/ui/atoms/ThemeDashboardCardBlock';
import { selectModuleViolationCardHasData, selectModuleViolationCardIsLoading, selectModuleViolationCardData } from 'app/store/modules/violation_card/selectors';
import useSetSearchAndParams from '@next/hooks/useSearch/useSetSearchAndParams';
import { resetViolationCardData, getViolationCardData, setViolationCardData } from 'app/store/modules/violation_card/actions';
import { selectPrimaryFiltersWithoutTheme, selectSecondaryFilters, selectSecondaryFiltersWithoutRegionAndDistricts } from 'app/store/modules/sidebar/selectors';
import usePrevious from '@next/hooks/usePrevious';
import { SIDEBAR_TABS_LEFT, SIDEBAR_TABS_RIGHT } from '@next/ui/organisms/TopSidebar/constants';

type Props = {};

const ViolationCard = React.lazy(() => (
  import(/* webpackChunkName: "ViolationCard" */ '@next/ui/organisms/ViolationCard/ViolationCard')
));

const ViolationCardWrap: React.FC<Props> = React.memo(
  () => {
    const violationCardIsLoading = useSelector(selectModuleViolationCardIsLoading);
    const violationData = useSelector(selectModuleViolationCardData);
    const violationCardHasData = useSelector(selectModuleViolationCardHasData);
    const primaryFilters = useSelector(selectPrimaryFiltersWithoutTheme);
    const secondaryFiltersOwn = useSelector(selectSecondaryFilters);
    const secondaryFiltersWithoutRegionAndDistricts = useSelector(selectSecondaryFiltersWithoutRegionAndDistricts);

    const routeLocation = useLocation();
    const dispatch = useDispatch() as any;

    const {
      routeLocationState,
      handleSetSearchAndParams,
    } = useSetSearchAndParams();

    React.useEffect(() => {
      if (violationData && ![SIDEBAR_TABS_LEFT.TABLE.path, SIDEBAR_TABS_RIGHT.MAP.path].includes(routeLocation.pathname as any)) {
        dispatch(
          resetViolationCardData(),
        );
      }
    }, [routeLocation.pathname, ]);

    React.useEffect(
      () => {
        if (routeLocationState.violationPartialData) {
          let violationSourceSystem = null;
          if (secondaryFiltersWithoutRegionAndDistricts.sources.length) {
            violationSourceSystem = secondaryFiltersWithoutRegionAndDistricts.sources.reduce(
              (acc, item, index, array) => {
                if(index !== array.length -1) {
                  return acc.concat(item.type).concat(',');
                } 
                return acc.concat(item.type);
              }, ''
            );
          }
          setImmediate(
            async () => {
              const ans = await dispatch(
                getViolationCardData(
                  {
                    featureId: routeLocationState.violationPartialData.featureId,
                    objectTypeCode: routeLocationState.violationPartialData.objectTypeCode,
                    okrugName: routeLocationState.violationPartialData.okrugName,
                    districtName: routeLocationState.violationPartialData.districtName,
                  },
                  primaryFilters,
                  violationSourceSystem
                )
              );

              if (!ans) {
                handleClose();
              }
            },
          );

        }
      },
      [routeLocationState],
    );

    React.useEffect(
      () => {
        if (violationData) {
          handleClose();
        }
      },
      [primaryFilters, secondaryFiltersWithoutRegionAndDistricts],
    );

    const prevRegions = usePrevious(secondaryFiltersOwn.regions);
    const prevDistricts = usePrevious(secondaryFiltersOwn.districts);

    React.useEffect(
      () => {
        if (violationData) {
          const isSameRegion = prevRegions?.length && !secondaryFiltersOwn.regions.some(({ type }) => type === violationData.regionId);
          const isSameDistrict = prevDistricts?.length && !secondaryFiltersOwn.districts.some(({ type }) => type === violationData.districtId);

          if (isSameRegion || isSameDistrict) {
            handleClose();
          }
        }
      },
      [secondaryFiltersOwn.districts, secondaryFiltersOwn.regions, violationData],
    );

    const handleClose = React.useCallback(
      () => {
        handleSetSearchAndParams({
          path: routeLocation.pathname,
          search: {
            violationPartialData: null,
          }
        });
        dispatch(
          setViolationCardData(null),
        );
      },
      [handleSetSearchAndParams, routeLocation.pathname],
    );

    return (
      <ViolationCardFormWrap isShow={Boolean(violationCardHasData || violationCardIsLoading)} as={ThemeDashboardCardBlock}>
        {
          violationCardIsLoading || !violationCardHasData
            ? <Loading type="new_spinner" />
            : (
              <React.Suspense fallback={<Loading type="new_spinner" />}>
                <ViolationCard handleClose={handleClose} />
              </React.Suspense >
            )
        }
      </ViolationCardFormWrap>
    );
  },
);

export default ViolationCardWrap;

const ViolationCardFormWrap = styled.section<{ isShow: boolean }>`
  position: absolute;
  z-index: 1000;
  top: 0;
  right: 0;

  width: 510px;
  border-bottom: 1px solid #E6E6E6;

  height: 75%;
  box-shadow: -5px 0px 5px 0px ${({ theme }) => theme.colors.dashboardCard.boxShadow};

  transform: translateX(${({ isShow }) => isShow ? '0%' : '100%'}) scaleX(${({ isShow }) => isShow ? 1 : 0});
  opacity: ${({ isShow }) => isShow ? 1 : 0};
  transition: transform 0.5s, opacity 0.5s;

  overflow: auto;

  height: 100%;
`;
