import * as React from 'react';
import Map from 'ol/Map';
import { useSelector, useDispatch } from 'react-redux';

import { selectLayersData, selectSelectedObject } from 'app/store/modules/semantics/selectors';
import ViolationsLayer from 'containers/layers/ViolationsLayer';
import { selectModuleSidebarObjects } from 'app/store/modules/sidebar/selectors';
import { cantSelect } from 'containers/DefaultLayer';
import { MapBrowserEvent } from 'ol';
import { getVioaltionLayerName } from 'containers/layers/ViolationsLayer/utils';
import { FeatureLike } from 'ol/Feature';
import { changeSelectedObject, hideNearestCamera } from 'app/store/modules/semantics/actions';
import { PointMode } from 'app/store/modules/@types';
import { selectPointMode } from 'app/store/modules/map/selectors';
import { PropertyType } from 'app/types';

type Props = {
  map: Map;
};

const LayersContainer: React.FC<Props> = React.memo(
  (props) => {
    const [selectedFeature, setSelectedFeature] = React.useState<FeatureLike>(null);
    const selectedObject = useSelector(selectSelectedObject);

    const pointSelectMode = useSelector(selectPointMode);
    const dispatch = useDispatch();

    // const selectedLayersBySelectedViolationType = useSelector(selectSelectedLayersBySelectedViolationType);
    const selectedModuleSidebarObjects = useSelector(selectModuleSidebarObjects);

    const forcedVisible = React.useMemo(() => !selectedModuleSidebarObjects.length, [selectedModuleSidebarObjects.length]);

    const layerData = useSelector(selectLayersData);

    React.useEffect(
      () => {
        const handlePointerMove = (e: MapBrowserEvent) => {
          const pixel = props.map.getEventPixel(e.originalEvent);
          const hit = props.map.getFeaturesAtPixel(
            pixel,
          ).filter(
            (feature) => !feature.get(cantSelect)
          ).length;

          document.getElementById('map-section').style.cursor = hit ? 'pointer' : 'default';
        };
        props.map.on('pointermove', handlePointerMove);
      },
      [],
    );

    React.useEffect(
      () => {
        if (pointSelectMode === PointMode.OFF) {
          const handleMapClick = (e: MapBrowserEvent) => {
            const featuresInPixel = props.map.getFeaturesAtPixel(
              e.pixel,
            );

            const isCameraUnderMouse = featuresInPixel.some(
              (feature) => {
                const properties = feature.getProperties();
                if (properties?.features?.length) {
                  if (properties.features.some((maybeCameraFeature) => maybeCameraFeature.getProperties().type === PropertyType.CAMERA)) {
                    return true;
                  }
                }
              },
            );

            if (isCameraUnderMouse) {
              return;
            }

            const filtredFeatures = props.map.getFeaturesAtPixel(
              e.pixel,
            ).reduce<FeatureLike[]>(
              (newArr, feature) => {
                if (feature.get('name')?.includes(getVioaltionLayerName(null, null))) {
                  newArr.push(feature);
                }

                if (feature.getProperties().features?.length) {
                  feature.getProperties().features.forEach(
                    (clusterFeature: FeatureLike) => {
                      if (clusterFeature.get('name')?.includes(getVioaltionLayerName(null, null))) {
                        newArr.push(clusterFeature);
                      }
                    }
                  );
                }

                return newArr;
              },
              [],
            );

            const filtredFeature = filtredFeatures[0] ?? null;

            setSelectedFeature(filtredFeature);
          };

          props.map.on('click', handleMapClick);
          return () => {
            props.map.un('click', handleMapClick);
          };
        }
      },
      [
        pointSelectMode,
      ],
    );

    React.useEffect(
      () => {
        if (!selectedObject) {
          setSelectedFeature(null);
        }
      },
      [selectedObject],
    );

    React.useEffect(
      () => {
        if (selectedFeature) {
          const newFeatureId = selectedFeature.getProperties().feature_id ?? selectedFeature?.getProperties().featureId;
          if (selectedObject?.featureId !== newFeatureId) {
            dispatch(
              changeSelectedObject({
                regionId: selectedFeature.getProperties().region_id ?? selectedFeature?.getProperties().regionId,
                districtId: selectedFeature.getProperties().district_id ?? selectedFeature?.getProperties().districtId,
                featureId: selectedFeature.getProperties().feature_id ?? selectedFeature?.getProperties().featureId,
                dimension: selectedFeature.getProperties().alias,
              }),
            );
          }
        } else {
          dispatch(
            changeSelectedObject(null),
          );
        }

        dispatch(
          hideNearestCamera(),
        );
      },
      [selectedFeature],
    );

    return (
      <React.Fragment>
        {
          layerData.map(
            (selectedLayer) => (
              <ViolationsLayer
                selectedFeature={selectedFeature}
                setSelectedFeature={setSelectedFeature}
                key={selectedLayer.alias}
                map={props.map}
                layer={selectedLayer}
                isVisible={forcedVisible || selectedModuleSidebarObjects.some(({ type }) => selectedLayer.alias === type)}
              />
            ),
          )
        }
      </React.Fragment>
    );
  },
);

export default LayersContainer;
