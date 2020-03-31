import * as React from 'react';
import Map from 'ol/Map';

import Feature, { FeatureLike } from 'ol/Feature';
import Style from 'ol/style/Style';
import { useSelector, useDispatch } from 'react-redux';

import { createViolationsLayer, getViolationStyle, createParkPinsLayer } from './utils';

import { ReduxState } from 'app/store/modules/@types';
import { checkIsMer } from '@next/utils/checkOnPermission';
import { getViolationsGeometryByDistrict } from 'app/store/modules/map/actions';
import { selectViolationsGeometry } from 'app/store/modules/map/selectors';
import {
  selectCheckMayor,
  selectLegendForViolationsBySource,
  // selectSelectedViolationType,
  selectSelectedDistrict,
  selectDistrictIncidentsIndexes,
  isCurrentLevelIsDistrict,
} from 'app/store/modules/semantics/selectors';
import { selectUser } from 'app/store/modules/app/selectors';
import VectorLayer from 'ol/layer/Vector';
import { Layer } from 'app/store/modules/semantics/types';
import { selectModuleViolationCardData } from 'app/store/modules/violation_card/selectors';
import CONSTANTS from '@next/constants';
import { selectModuleSidebarViolationTypeIsSys } from 'app/store/modules/sidebar/selectors';
import { ViolationsTypes } from '@next/ui/atoms/map/types';

type Props = {
  selectedFeature: FeatureLike;
  setSelectedFeature: (selectedFeature: FeatureLike) => any;
  isVisible: boolean;
  layer: Layer;
  map: Map;
};

const featureTypeToCheck = new Set(['Polygon', 'MultiPolygon']);
const hideFeature = (feature: FeatureLike, getStyle: (feature: Feature) => Style | Style[]) => {
  if (feature) {
    if ('set' in feature) {
      const typeOld = feature.getGeometry().getType();
      if (featureTypeToCheck.has(typeOld) && ('setStyle' in feature)) {
        feature.set('isSelected', false);
        feature.setStyle(getStyle(feature));
      }
    }
  }
};

const ViolationsLayer: React.FC<Props> = React.memo(
  (props) => {
    const selectedDistrict = useSelector(selectSelectedDistrict);
    const geometry = useSelector((state: ReduxState) => selectViolationsGeometry(state)?.[props.layer.alias]);
    const legendForViolations = useSelector(selectLegendForViolationsBySource);
    const userRoleIsMer = useSelector((state: ReduxState) => checkIsMer(selectUser(state)) && selectCheckMayor(state));

    const districtViolations = useSelector(selectDistrictIncidentsIndexes);
    const violationCardData = useSelector(selectModuleViolationCardData);

    const dispatch = useDispatch();

    const [violationsLayer, setViolationsLayer] = React.useState<VectorLayer>(null);

    const showAllViolation = useSelector(isCurrentLevelIsDistrict);

    const violationTypeIsSys = useSelector(selectModuleSidebarViolationTypeIsSys);

    const selectedViolationType = React.useMemo(
      () => violationTypeIsSys ? ViolationsTypes.violationsSys : ViolationsTypes.violations,
      [violationTypeIsSys]
    );

    React.useEffect(
      () => {
        if (props.layer && selectedDistrict && showAllViolation) {
          dispatch(getViolationsGeometryByDistrict(props.layer, selectedDistrict.featureId));
        }
      },
      [props.layer, selectedDistrict, showAllViolation],
    );

    const getStyle = React.useMemo(
      () => {
        if (legendForViolations) {
          return getViolationStyle(legendForViolations, userRoleIsMer, props.layer.alias);
        }
        return null;
      }, [legendForViolations, userRoleIsMer, props.layer],
    );

    React.useEffect(
      () => {
        if (getStyle) {
          if (props.selectedFeature?.getProperties().alias === props.layer.alias) {
            const type = props.selectedFeature.getGeometry().getType();
            if (featureTypeToCheck.has(type)) {
              if ('setStyle' in props.selectedFeature) {
                props.selectedFeature.set('isSelected', true);
                props.selectedFeature.setStyle(getStyle(props.selectedFeature));
              }
            }
          }

          return () => {
            if (props.selectedFeature) {
              hideFeature(props.selectedFeature, getStyle);
            }
          };
        }
      },
      [props.selectedFeature, getStyle],
    );

    React.useEffect(() => {
      let isExist = true;
      let vectorLayer: VectorLayer = null;
      let parkPinsLayer: VectorLayer = null;

      if (districtViolations && props.layer && geometry) {

        if (props.isVisible) {
          const layerType = props.layer.alias;

          const loadData = () => {
            vectorLayer = createViolationsLayer(
              userRoleIsMer,
              geometry,
              {
                layerType,
                violationType: selectedViolationType,
              },
              districtViolations,
              legendForViolations,
              false,
              getStyle,
            );
            if (!isExist) {
              return;
            }
            if (layerType === 'park') {
              parkPinsLayer = createParkPinsLayer(
                districtViolations,
                selectedViolationType,
              );
              props.map.addLayer(parkPinsLayer);
            }
            if (!isExist) {
              return;
            }
            setViolationsLayer(vectorLayer);
            props.map.addLayer(vectorLayer);
          };

          loadData();
        }
      }

      return () => {
        isExist = false;
        if (vectorLayer) {
          props.map.removeLayer(vectorLayer);
        }
        if (parkPinsLayer) {
          props.map.removeLayer(parkPinsLayer);

        }
      };
    }, [
      selectedViolationType,
      geometry,
      getStyle,
      userRoleIsMer,
      districtViolations,
      props.isVisible,
    ]);

    React.useEffect(
      () => {
        if (violationCardData) {
          if (props.layer.alias === violationCardData?.objectTypeCode) {
            if (violationsLayer) {
              const features = violationsLayer.getSource().getFeatures();
              if (features?.length) {
                const filtredFeature = features.find((feature) => feature.getProperties().feature_id === violationCardData?.featureId);

                setTimeout(
                  () => {
                    props.setSelectedFeature(filtredFeature);
                  },
                  CONSTANTS.TIME.ZERO_SECOND,
                );

              }
            }
          }
        }
      },
      [violationsLayer, violationCardData?.featureId, violationCardData?.objectTypeCode, props.layer.alias, props.setSelectedFeature],
    );

    return null;
  },
);

export default ViolationsLayer;
