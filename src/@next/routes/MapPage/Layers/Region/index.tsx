import * as React from 'react';
import Map from 'ol/Map';
import Feature from 'ol/Feature';
import { createGeometryLayer } from '@next/utils/map';
import { useDispatch, useSelector } from 'react-redux';
import { getRegionsGeometry } from 'app/store/modules/map/actions';
import {
  selectRegions,
  selectLegendForDistricts,
  selectSelectedRegion,
  selectIsCurrentLevelIsCity,
  selectCityIncidentsIndexes,
  isCurrentLevelIsRegion,
} from 'app/store/modules/semantics/selectors';
import { selectRegionsGeometry } from 'app/store/modules/map/selectors';
import { FEATURE_TYPES } from 'containers/layers/utils/constants';
import { defaultLayerHook, cantSelect } from 'containers/DefaultLayer';
import { FeatureLike } from 'ol/Feature';
import RegionOverlays from '@next/ui/organisms/RegionOverlays';
import { getRegionStyle } from '@next/routes/MapPage/Layers/Region/utils';
import { changeSelectedRegion, getDistricts } from 'app/store/modules/semantics/actions';
import { selectModuleViolationCardData } from 'app/store/modules/violation_card/selectors';
import { setViolationCardData } from 'app/store/modules/violation_card/actions';
import CONSTANTS from '@next/constants';
import { GEOJSON } from '@next/utils/map/geojson';

type Props = {
  map: Map;
};

const MapPageRegionLayer: React.FC<Props> = React.memo(
  (props) => {
    const regions = useSelector(selectRegions);
    const selectedRegion = useSelector(selectSelectedRegion);
    const cityIncidents = useSelector(selectCityIncidentsIndexes);
    const violationCardData = useSelector(selectModuleViolationCardData);

    const regionsGeometry = useSelector(selectRegionsGeometry);
    const legendForDistricts = useSelector(selectLegendForDistricts);

    const dispatch = useDispatch();

    const [features, setFeatures] = React.useState<Feature[]>([]);

    const showAllRegions = useSelector(selectIsCurrentLevelIsCity);
    const showAllDistrict = useSelector(isCurrentLevelIsRegion);

    const layer = React.useMemo(
      () => {
        const newLayer = createGeometryLayer('is_region_layer', null);

        props.map.addLayer(newLayer);

        return newLayer;
      },
      [],
    );

    React.useEffect(
      () => {
        if (selectedRegion) {
          dispatch(getDistricts(selectedRegion));
        }
      },
      [selectedRegion],
    );

    React.useEffect(
      () => {
        return () => {
          props.map.removeLayer(layer);
        };
      },
      [layer],
    );

    React.useEffect(
      () => {
        if (showAllRegions) {
          layer.getSource().clear();
          layer.getSource().addFeatures(features);
          setFeatures([...features]);
        } else {
          layer.getSource().clear();
          if (!showAllDistrict) {
            // const featureRegion = features.find((feature) => feature.getProperties().feature_id === selectedRegion?.featureId);

            // if (featureRegion) {
            //   layer.getSource().addFeature(featureRegion);
            // }
          }
        }
      },
      [selectedRegion, showAllRegions, showAllDistrict],
    );

    React.useEffect(
      () => {
        if (selectedRegion) {
          layer.getSource().clear();
        }
      },
      [layer, !!selectedRegion],
    );

    React.useEffect(
      () => {
        if (regions.layerId, regions.revisionId) {
          dispatch(getRegionsGeometry(regions.layerId, regions.revisionId));
        }
      },
      [regions.layerId, regions.revisionId],
    );

    React.useEffect(
      () => {
        const features = regionsGeometry.map((featureData) => {
          const newFeature = GEOJSON.readFeature(featureData);

          newFeature.set('featureType', FEATURE_TYPES.region);

          return newFeature;
        });

        if (selectedRegion && !showAllRegions) {
          const featureRegion = features.find((feature) => feature.getProperties().feature_id === selectedRegion.featureId);
          if (featureRegion) {
            layer.getSource().addFeature(featureRegion);
          }
        } else {
          layer.getSource().addFeatures(features);
        }

        setFeatures(features);

        return () => {
          layer.getSource().clear();
        };
      },
      [regionsGeometry, layer],
    );

    React.useEffect(
      () => {
        if (cityIncidents) {
          features.forEach((feature) => {
            feature.set('total', cityIncidents[feature.getProperties().feature_id]?.checkAmount);
            feature.set(cantSelect, !!selectedRegion || !showAllRegions);
          });
        }
      },
      [features, showAllRegions, cityIncidents, !!selectedRegion],
    );

    React.useEffect(
      () => {
        if (Object.keys(cityIncidents).length && legendForDistricts && legendForDistricts.length) {
          const getStyle = getRegionStyle(
            legendForDistricts,
            cityIncidents,
          );

          features.forEach((feature) => {
            feature.setStyle(getStyle(feature));
          });
        }
      },
      [
        features,
        legendForDistricts,
        cityIncidents
      ],
    );

    // дефолтные хуки
    const {
      useLayerClickEvent,
      useDefaultHoverFeature,
    } = defaultLayerHook(props.map, layer);

    const handleMapClick = React.useCallback(
      (feature: FeatureLike) => {
        if (feature) {
          const fetureId = feature.getProperties().feature_id;
          const newSelectedRegion = regions.data.find((i) => i.featureId === fetureId);
          dispatch(changeSelectedRegion(newSelectedRegion));
        }
      },
      [regions.data],
    );
    useLayerClickEvent(FEATURE_TYPES.region, handleMapClick);

    const {
      selectedFeature,
    } = useDefaultHoverFeature(showAllRegions);

    React.useEffect(
      () => {
        if (regions.data.length && violationCardData && selectedRegion?.featureId !== violationCardData?.regionId) {
          setTimeout(
            () => {
              const newSelectedRegion = regions.data.find((i) => i.featureId === violationCardData?.regionId);

              if (newSelectedRegion.featureId) {
                dispatch(changeSelectedRegion(newSelectedRegion));
              } else {
                dispatch(
                  setViolationCardData(null),
                );
              }
            },
            CONSTANTS.TIME.TWO_HUNDRED_MS,
          );

        }
      },
      [violationCardData, regions.data],
    );

    return Boolean(showAllRegions && Object.keys(cityIncidents).length) && (
      <RegionOverlays
        regions={regions}
        map={props.map}
        selectedFeatureFeatureId={selectedFeature?.getProperties()?.feature_id}
        data={cityIncidents}
      />
    );
  },
);

export default MapPageRegionLayer;
