import * as React from 'react';
import Map from 'ol/Map';
import Feature from 'ol/Feature';
import { createGeometryLayer } from '@next/utils/map';
import { useDispatch, useSelector } from 'react-redux';
import { getDistrictsGeometryByRegion, clearViolationsGeometry } from 'app/store/modules/map/actions';
import { selectLegendForDistricts, selectDistricts, selectSelectedDistrict, selectDistrictsGeometryByDistrictData, isCurrentLevelIsRegion, selectRegionIncidentsIndexes, selectSelectedRegion } from 'app/store/modules/semantics/selectors';
import { FEATURE_TYPES } from 'containers/layers/utils/constants';
import { changeSelectedDistrict } from 'app/store/modules/semantics/actions';
import { defaultLayerHook, cantSelect } from 'containers/DefaultLayer';

import { FeatureLike } from 'ol/Feature';
import DistrictsOverlays from '@next/ui/organisms/DistrictsOverlays';
import { getDistrictStyle } from '@next/routes/MapPage/Layers/DIstricts/utils';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import { selectDistrictsGeometryIndex } from 'app/store/modules/map/selectors';
import { asyncArrayMap } from 'containers/layers/ViolationsLayer/utils';
import { useStyledTheme } from 'styles/themes/hooks';
import { selectModuleViolationCardData } from 'app/store/modules/violation_card/selectors';
import { setViolationCardData } from 'app/store/modules/violation_card/actions';
import CONSTANTS from '@next/constants';
import { GEOJSON } from '@next/utils/map/geojson';

type Props = {
  map: Map;
};

const MapPageDitrictsLayer: React.FC<Props> = React.memo(
  (props) => {
    const theme = useStyledTheme();
    const [features, setFeatures] = React.useState<Feature[]>([]);
    const violationCardData = useSelector(selectModuleViolationCardData);

    const districts = useSelector(selectDistricts);
    const selectedDistrict = useSelector(selectSelectedDistrict);
    const districtGeometryIndex = useSelector(selectDistrictsGeometryIndex);

    const districtsGeometry = useSelector(selectDistrictsGeometryByDistrictData);
    const legendForDistricts = useSelector(selectLegendForDistricts);
    const regionIncidents = useSelector(selectRegionIncidentsIndexes);
    const selectedRegion = useSelector(selectSelectedRegion);

    const dispatch = useDispatch();

    const showAllDistrict = useSelector(isCurrentLevelIsRegion);

    const layer = React.useMemo(
      () => {
        const newLayer = createGeometryLayer('is_district_layer', null);
        props.map.addLayer(newLayer);

        return newLayer;
      },
      [props.map],
    );

    React.useEffect(
      () => {
        return () => props.map.removeLayer(layer);
      },
      [layer],
    );

    React.useEffect(
      () => {
        if (!selectedDistrict) {
          layer.getSource().clear();
          if (showAllDistrict) {
            layer.getSource().addFeatures(features);
          }
        }
      },
      [showAllDistrict, features, !!selectedDistrict],
    );

    React.useEffect(
      () => {
        if (selectedDistrict) {
          layer.getSource().clear();
          const featureDistrict = districtGeometryIndex[selectedDistrict.featureId];

          if (featureDistrict) {
            const copyFeature = GEOJSON.readFeature(featureDistrict);
            copyFeature.set(cantSelect, true);
            copyFeature.setStyle(new Style({
              stroke: new Stroke({
                color: theme.colors.dashboardCard.buttonActive,
                width: 2,
              }),
            }));
            copyFeature.set(cantSelect, true);
            layer.getSource().addFeature(copyFeature);
          }
        }
      },
      [selectedDistrict, districtGeometryIndex],
    );

    React.useEffect(
      () => {
        if (selectedRegion && districts.filterAttributeId) {
          dispatch(
            getDistrictsGeometryByRegion(
              districts.layerId,
              districts.revisionId,
              districts.filterAttributeId,
              selectedRegion.filterCode,
            ),
          );

          dispatch(
            clearViolationsGeometry(),
          );
        }
      },
      [districts, selectedRegion],
    );

    React.useEffect(
      () => {
        let isExist = true;

        const setFeaturesToMap = async () => {
          if (!selectedDistrict) {
            layer.getSource().clear();
          }

          const features = await asyncArrayMap(
            districtsGeometry,
            (featureData) => {
              const newFeature = GEOJSON.readFeature(featureData);

              newFeature.set('featureType', FEATURE_TYPES.district);
              if (isExist && !selectedDistrict) {
                layer.getSource().addFeature(newFeature);
              }

              return newFeature;
            },
          );
   
          if (isExist) {
            setFeatures(features);
          }
        };

        setFeaturesToMap();

        if (showAllDistrict) {
          return () => {
            isExist = false;
            layer.getSource().clear();
          };
        }
      },
      [districtsGeometry],
    );

    React.useEffect(
      () => {
        if (regionIncidents) {
          asyncArrayMap(
            features,
            (feature) => {
              feature.set('total', regionIncidents[feature.getProperties().feature_id]?.checkAmount);
              feature.set(cantSelect, !showAllDistrict);
            },
          );
        }
      },
      [features, showAllDistrict, regionIncidents],
    );

    React.useEffect(
      () => {
        const getStyle = getDistrictStyle(
          legendForDistricts,
          regionIncidents,
        );

        asyncArrayMap(
          features,
          (feature) => feature.setStyle(getStyle(feature)),
        );
      },
      [
        features,
        legendForDistricts,
        regionIncidents,
      ],
    );

    // дефолтные хуки
    const {
      useLayerClickEvent,
      useDefaultHoverFeature,
    } = defaultLayerHook(props.map, layer);

    const {
      selectedFeature,
      // findFeatureInHoverOrCenterMap,
    } = useDefaultHoverFeature(showAllDistrict);

    const handleMapClick = React.useCallback(
      (feature: FeatureLike) => {
        if (feature) {
          const fetureId = feature.getProperties().feature_id;
          const newSelectedRegion = districts.data.find((i) => i.featureId === fetureId);

          dispatch(changeSelectedDistrict(newSelectedRegion));
        }
      },
      [regionIncidents, districts.data],
    );
    useLayerClickEvent(FEATURE_TYPES.district, handleMapClick);

    React.useEffect(
      () => {
        if (districts.data && violationCardData) {
          if (districts.data.length && selectedDistrict?.featureId !== violationCardData?.districtId) {
            setTimeout(
              () => {
                const newSelectedRegion = districts.data.find((i) => i.featureId === violationCardData?.districtId);
                if (newSelectedRegion) {
                  dispatch(changeSelectedDistrict(newSelectedRegion));
                } else {
                  dispatch(
                    setViolationCardData(null),
                  );
                }
              },
              CONSTANTS.TIME.TWO_HUNDRED_MS,
            );

          }
        }
      },
      [violationCardData, districts.data],
    );

    return showAllDistrict && (
      <DistrictsOverlays
        districts={districts}
        map={props.map}
        selectedFeatureFeatureId={selectedFeature?.getProperties()?.feature_id}
        violationsObjectIndex={regionIncidents}
      />
    );
  },
);

export default MapPageDitrictsLayer;
