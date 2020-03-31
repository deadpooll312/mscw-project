import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { prepareTiNao } from 'utils';
import { ReduxState, Season } from 'app/store/modules/@types';

import { ViolationsTypes } from '@next/ui/atoms/map/types';
import { changeSelectedRegion, changeSelectedDistrict, changeSelectedObject } from 'app/store/modules/semantics/actions';
import { sortAlphabet } from '@next/utils/common';
import {
  selectRegions,
  selectSelectedRegion,
  selectDistricts,
  selectSelectedDistrict,
  selectWinterData,
  selectSelectedViolationType,
  selectLayersData,
  selectLayerViolationInfoByFeatureId,
  selectLayerAreaInfo,
  selectCurrentLevel,
} from 'app/store/modules/semantics/selectors';
import { selectMapData } from 'app/store/modules/app/selectors';
import Loading from '@next/ui/atoms/Loading';
import { RegionDataItem, DistrictDataItem } from 'app/store/modules/semantics/types';
import { selectModuleSidebarSeason, selectModuleSidebarEndDateRaw } from 'app/store/modules/sidebar/selectors';

const SelectComponent = React.lazy(() => (
  import(/* webpackChunkName: "@SelectComponent" */ 'containers/sidebar/TabContainers/components/selectComponent')
));
// TODO Пока не удаляем
// const ObjectCardContainer = React.lazy(() => (
//   import(/* webpackChunkName: "@ObjectCardContainer" */ 'containers/sidebar/TabContainers/components/objectCardComponent')
// ));
const WeatherComponent = React.lazy(() => (
  import(/* webpackChunkName: "@WeatherComponent" */ 'containers/sidebar/TabContainers/components/weatherComponent')
));
const SnowInfo = React.lazy(() => (
  import(/* webpackChunkName: "@SnowInfo" */ 'containers/sidebar/TabContainers/components/snowInfo')
));
//TODO Пока не удаляем
// const LayersSelector = React.lazy(() => (
//   import(/* webpackChunkName: "@LayersSelector" */ 'containers/sidebar/TabContainers/TabMap/LayersSelector')
// ));
const HelpInfo = React.lazy(() => (
  import(/* webpackChunkName: "@HelpInfo" */ 'components/HelpInfo')
));

type StateProps = {
  mapData: ReturnType<typeof selectMapData>;

  currentLevel: 'region' | 'district' | 'violation';
  infoByFeatureId: ReturnType<typeof selectLayerViolationInfoByFeatureId>;
  violationInfo: ReturnType<typeof selectLayerAreaInfo>;
  regions: ReduxState['semantics']['regions'];
  selectedRegion: RegionDataItem;
  districts: ReduxState['semantics']['districts'];
  selectedDistrict: DistrictDataItem;
  endDate: ReduxState['sidebar']['filters']['endDate'];
  winterData: ReduxState['semantics']['winterData'];
  layerNames: ReduxState['semantics']['layers']['data'];
  violationType: ViolationsTypes.violations | ViolationsTypes.violationsSys;
  seasonActive: ReduxState['sidebar']['filters']['season'];
};
type DispatchProps = {
  changeSelectedRegion: typeof changeSelectedRegion;
  changeSelectedDistrict: typeof changeSelectedDistrict;
  changeSelectedObject: typeof changeSelectedObject;
};
type OwnProps = {};
type Props = (
  StateProps
  & DispatchProps
  & OwnProps
);

type MapContainerState = {
  areaInfo: any;
  isLoading: boolean;
};

const prepareAreasArray = (areasArrayIndex, originalAreaData, field: 'name' | 'shortName') => {
  return originalAreaData.map((areaEl) => {
    const matchedEl = areasArrayIndex[areaEl.featureId];
    const name = areaEl ? areaEl[field] : 'неизвестно';

    return ({
      ...matchedEl?.total,
      name,
    });
  });
};

class MapContainer extends React.Component<Props, MapContainerState> {
  makeAreaInfo = () => {
    const isRegion = this.props.currentLevel === 'region';

    const areaInfo = prepareAreasArray(
      this.props.infoByFeatureId,
      this.props[isRegion ? 'regions' : 'districts'].data,
      isRegion ? 'shortName' : 'name',
    );

    let resultAreaInfo = areaInfo;

    if (isRegion) {
      resultAreaInfo = prepareTiNao(areaInfo);
    }

    return resultAreaInfo;
  };

  onChangeDistrict = (value) => {
    if (value) {
      const { districts } = this.props;
      const district = districts.data.find((item) => item.objectId === value);

      this.props.changeSelectedDistrict(district);
    }
  };

  onChangeRegion = (value: string) => {
    const { props } = this;

    if (value) {
      const newSelectedRegion = props.regions.data.find((item) => item.objectId === value);

      props.changeSelectedRegion(newSelectedRegion);
    }
  };

  getAdmItemId = () => {
    const { props } = this;

    const { selectedRegion, selectedDistrict } = props;
    if (selectedDistrict) {
      return selectedDistrict.featureId;
    }
    if (selectedRegion) {
      return selectedRegion.featureId;
    }
    return props.mapData.featureId;
  };

  isMixedMonitor = () => this.props.seasonActive === Season.MIXED;
  isWinterMonitor = () => this.props.seasonActive === Season.WINTER;
  isSummerMonitor = () => this.props.seasonActive === Season.ALL;
  checkHelpInfo = () => this.isMixedMonitor() || this.isWinterMonitor();

  getObjectInfo = () => {
    return this.props.layerNames.map((layerData) => ({
      name: layerData.layer_name ?? 'неизвестно',
      ...(this.props.violationInfo?.[layerData.alias]?.total ?? {}),
    }));
  };

  clearSelect = () => {
    this.props.changeSelectedObject(null);
    this.props.changeSelectedRegion(null);
    this.props.changeSelectedDistrict(null);
  };

  render() {
    const {
      districts,
      regions,
      selectedRegion,
      selectedDistrict,
      endDate,
      // TODO Пока не удаляем
      // selectedObject
      currentLevel,
    } = this.props;

    const isRegion = currentLevel === 'region';
    const isDistrictSelectVisible = Boolean(selectedRegion);
    const selectedAdmItemId = this.getAdmItemId();
    const isDataExists = Boolean(regions?.data?.length);
    const regionsData = regions.data.sort((a, b) => sortAlphabet(a.name, b.name));
    const districtsData = districts.data.sort((a, b) => sortAlphabet(a.name, b.name));

    const getSnowDepth = () => {
      if (this.props.winterData && this.props.winterData.snowDepth !== '') {
        return `${this.props.winterData.snowDepth} см`;
      } else {
        return '0.0 см';
      }
    };

    return (
      <React.Fragment>
        <Container>
          <React.Suspense fallback={<Loading type="new_spinner" />}>
            {
              isDataExists && (
                <SelectWrapper>
                  <SelectComponent
                    name="ОКРУГ"
                    data={regionsData}
                    isDistrictSelectVisible={isDistrictSelectVisible}
                    onChange={this.onChangeRegion}
                    isRegionSelect={true}
                    value={selectedRegion?.objectId || 'Выбор округа'}
                  />
                  <React.Suspense fallback={<Loading type="new_spinner" />}>
                    {
                      isDistrictSelectVisible
                        && (
                          <SelectComponent
                            name="РАЙОН"
                            data={districtsData}
                            isDistrictSelectVisible={isDistrictSelectVisible}
                            onChange={this.onChangeDistrict}
                            onClear={this.clearSelect}
                            value={selectedDistrict?.objectId}
                          />
                        )
                    }
                  </React.Suspense>
                </SelectWrapper>
              )
            }
          </React.Suspense>
          <React.Suspense fallback={<Loading type="new_spinner" />}>
            {
              isDistrictSelectVisible && (
                <SnowInfo
                  days={this.props.winterData?.daysAfterSnowfall ?? 0}
                  height={getSnowDepth()}
                  isSummerMonitor={this.isSummerMonitor()}
                  isMixedMonitor={this.isMixedMonitor()}
                  isWinterMonitor={this.isWinterMonitor()}
                />
              )
            }
          </React.Suspense>
          {/* <React.Suspense fallback={<Loading type="new_spinner" />}>
              {
                selectedObject
                  ? <ObjectCardContainer />
                  : <LayersSelector />
              }
            </React.Suspense> */}
          <React.Suspense fallback={<Loading type="new_spinner" />}>
            {
              (this.isWinterMonitor() || this.isMixedMonitor()) && this.props.violationType !== ViolationsTypes.violationsSys && (
                <HelpInfo
                  alias={this.props.currentLevel}
                  objectsInfo={this.getObjectInfo()}
                  areaInfo={this.makeAreaInfo()}
                  isLoading={false}
                />
              )
            }
          </React.Suspense>
        </Container>
        <React.Suspense fallback={<Loading type="new_spinner" />} >
          {
            selectedAdmItemId && (
              <WeatherComponent
                date={endDate}
                admItemFeatureId={selectedAdmItemId}
                isWinter={this.isWinterMonitor()}
              >
                {
                  !isRegion && (
                    <SnowInfo
                      days={this.props.winterData?.daysAfterSnowfall ?? 0}
                      height={getSnowDepth()}
                      isSummerMonitor={this.isSummerMonitor()}
                      isMixedMonitor={this.isMixedMonitor()}
                      isWinterMonitor={this.isWinterMonitor()}
                    />
                  )
                }
              </WeatherComponent>
            )
          }
        </React.Suspense>
      </React.Fragment>
    );
  }
}

export default connect<StateProps, DispatchProps, OwnProps, ReduxState>(
  (state) => ({
    mapData: selectMapData(state),

    currentLevel: selectCurrentLevel(state),
    violationInfo: selectLayerAreaInfo(state),

    infoByFeatureId: selectLayerViolationInfoByFeatureId(state),
    regions: selectRegions(state),
    selectedRegion: selectSelectedRegion(state),

    districts: selectDistricts(state),
    selectedDistrict: selectSelectedDistrict(state),

    endDate: selectModuleSidebarEndDateRaw(state),

    winterData: selectWinterData(state),
    layerNames: selectLayersData(state),
    violationType: selectSelectedViolationType(state),
    seasonActive: selectModuleSidebarSeason(state),
  }),
  (dispatch) => ({
    changeSelectedRegion: bindActionCreators(changeSelectedRegion, dispatch),
    changeSelectedDistrict: bindActionCreators(changeSelectedDistrict, dispatch),
    changeSelectedObject: bindActionCreators(changeSelectedObject, dispatch),
  }),
)(MapContainer);

const SelectWrapper = styled.div`
  /* margin-top: 20px; */
  height: 55px;
  border-radius: 6px;
  //background-color: #746a8f;
  background-color: ${({ theme }) => theme.colors.dashboardCard.radioDate};
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  @media (min-width: 2000px) and (max-width: 4000px)  {
    height: 70px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-grow: 1;
  padding: 10px 0 60px 0;
`;
