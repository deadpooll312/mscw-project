import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styles';

import MapDashboard from '@next/ui/atoms/map';

import { ErrorBoundary } from '@next/hocs/ErrorBoundary';

import MapPageLayers from '@next/routes/MapPage/Layers';
import { selectMapData } from 'app/store/modules/app/selectors';
import Loading from '@next/ui/atoms/Loading';
import { refreshSemantics, initialRegionsMapData, getWinterData } from 'app/store/modules/semantics/actions';
import { ALIASES } from 'app/store/modules/semantics/constants';
import ViolationBlock from '@next/routes/MapPage/ViolationBlock';
import { selectModuleSidebarEndDateRaw, selectModuleSidebarRegions, selectModuleSidebarDistricts } from 'app/store/modules/sidebar/selectors';

const Sidebar = React.lazy(() => (
  import(/* webpackChunkName: "Sidebar" */ 'containers/sidebar')
));

type Props = {};

const MapPage: React.FC<Props> = React.memo(
  () => {
    const mapData = useSelector(selectMapData);
    const dateFormat = useSelector(selectModuleSidebarEndDateRaw);
    const selectedRegions = useSelector(selectModuleSidebarRegions);
    const selectedDisctricts = useSelector(selectModuleSidebarDistricts);

    const dispatch = useDispatch();

    React.useEffect(
      () => {
        dispatch(initialRegionsMapData());

        return () => {
          dispatch(refreshSemantics());
        };
      },
      [],
    );

    React.useEffect(
      () => {
        if (selectedRegions.length || selectedDisctricts.length) {
          dispatch(
            getWinterData({
              dimension: selectedDisctricts.length ? ALIASES.districts : ALIASES.regions,
              // Пока на бэке нет id районов передаем все время id округов
              // featureId:  selectedDisctrict ? selectedDisctrict.objectId : selectedRegion.featureId,
              featureId: selectedRegions[0]?.type,
              date: dateFormat,
            })
          );
        }
      },
      [
        selectedRegions,
        selectedDisctricts,
        dateFormat,
      ],
    );

    return (
      <RelativeContainer id="map-section">
        {
          Boolean(mapData)
            ? (
              <ErrorBoundary>
                <MapDashboard>
                  {
                    (map) => (
                      <React.Fragment>
                        <ErrorBoundary>
                          <MapPageLayers map={map} />
                        </ErrorBoundary>
                        <React.Suspense fallback={<div></div>}>
                          <ErrorBoundary>
                            <Sidebar map={map} />
                          </ErrorBoundary>
                        </React.Suspense>

                        {/* TODO Пока не удаляем */}
                        {/* <ErrorBoundary>
                          <MapPageTopRight />
                        </ErrorBoundary> */}
                      </React.Fragment>
                    )
                  }
                </MapDashboard>
              </ErrorBoundary>
            )
            : (
              <Loading />
            )
        }
        <ViolationBlock />
      </RelativeContainer>
    );
  },
);

const RelativeContainer = styled.div`
  &&& {
    position: relative;
    flex: 2 2 auto;
    display: flex;
    background-color: ${({ theme }) => theme.colors.palette.grey7};

    >.ol-viewport {
      height: auto !important;
      flex: 1 1 auto;
    }
  }
`;

export default MapPage;
