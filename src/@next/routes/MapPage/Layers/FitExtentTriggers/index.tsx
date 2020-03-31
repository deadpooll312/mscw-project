import * as React from 'react';
import Map from 'ol/Map';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectCurrentLevel,
  selectSelectedRegion,
  selectSelectedDistrict,
  selectReigionsData,
  selectDistrictsData,
  selectIsCurrentLevelIsCity,
  isCurrentLevelIsRegion,
  isCurrentLevelIsDistrict,
  selectSelectedObject,
} from 'app/store/modules/semantics/selectors';

import { ObjectEvent } from 'ol/Object';
import { View, MapBrowserEvent } from 'ol';
import { changeSelectedDistrict, refreshSelectedDistrict, changeSelectedRegion } from 'app/store/modules/semantics/actions';
import { cantSelect, isShadow } from 'containers/DefaultLayer';
import RegionFitExtentTrigger from '@next/routes/MapPage/Layers/FitExtentTriggers/RegionFitExtentTrigger';
import DistrictFitExtentTrigger from '@next/routes/MapPage/Layers/FitExtentTriggers/DistrictFitExtentTrigger';
import ViolationFitExtentTrigger from '@next/routes/MapPage/Layers/FitExtentTriggers/ViolationFitExtentTrigger';
import { selectModuleViolationCardData } from 'app/store/modules/violation_card/selectors';

type Props = {
  map: Map;
};

const FitExtentTriggers: React.FC<Props> = React.memo(
  (props) => {
    const currentLevel = useSelector(selectCurrentLevel);
    const showAllRegions = useSelector(selectIsCurrentLevelIsCity);
    const showAllDistrict = useSelector(isCurrentLevelIsRegion);
    const showAllViolation = useSelector(isCurrentLevelIsDistrict);

    const regionsData = useSelector(selectReigionsData);
    const selectedRegion = useSelector(selectSelectedRegion);

    const districtsData = useSelector(selectDistrictsData);
    const selectedDistrict = useSelector(selectSelectedDistrict);

    const violationCardData = useSelector(selectModuleViolationCardData);
    const selectedObject = useSelector(selectSelectedObject);

    const dispatch = useDispatch();

    React.useEffect(
      () => {
        if (!(violationCardData?.featureId !== selectedObject?.featureId)) {
          let prevZoom = props.map.getView().getZoom();
          let inAir = false;
          let featureUnderMouse = null;

          const handleChangeResolution = (e: ObjectEvent) => {
            if (inAir) {
              return;
            }
            const view: View = e.target;

            const nextZoom = view.getZoom();

            if (currentLevel === 'region' && regionsData.length) {
              if (nextZoom > prevZoom && nextZoom > 11.5) {
                let feature = featureUnderMouse;

                if (!feature) {
                  feature = props.map.getFeaturesAtPixel(
                    props.map.getPixelFromCoordinate(
                      view.getCenter(),
                    ),
                  )[0];
                }

                if (feature && (feature.get(cantSelect) || feature.get(isShadow))) {
                  feature = null;
                }

                if (feature) {
                  inAir = true;
                  const fetureId = feature.getProperties().feature_id;
                  const newSelectedRegion = regionsData.find((i) => i.featureId === fetureId);

                  dispatch(changeSelectedRegion(newSelectedRegion));
                }
              }
            }
            if (currentLevel === 'district' && districtsData.length) {
              if (nextZoom > prevZoom && nextZoom > 13.5) {
                let feature = featureUnderMouse;

                if (!feature) {
                  feature = props.map.getFeaturesAtPixel(
                    props.map.getPixelFromCoordinate(
                      view.getCenter(),
                    ),
                  )[0];
                }

                if (feature && (feature.get(cantSelect) || feature.get(isShadow))) {
                  feature = null;
                }

                if (feature) {
                  inAir = true;
                  const fetureId = feature.getProperties().feature_id;
                  const newSelectedRegion = districtsData.find((i) => i.featureId === fetureId);

                  dispatch(changeSelectedDistrict(newSelectedRegion));
                }
              }
              if (prevZoom > nextZoom && nextZoom < 11) {
                inAir = true;
                dispatch(changeSelectedRegion(null));
              }
            }

            if (currentLevel === 'violation') {
              if (prevZoom > nextZoom && nextZoom < 13) {
                inAir = true;
                dispatch(refreshSelectedDistrict());
              }
            }
            prevZoom = nextZoom;
          };

          const handlePointerMove = (e: MapBrowserEvent) => {
            if (currentLevel !== 'violation') {
              const pixel = props.map.getEventPixel(e.originalEvent);
              const feature = props.map.getFeaturesAtPixel(
                pixel,
              )?.[0];

              featureUnderMouse = feature ?? null;
            }
          };

          const mouseOut = () => featureUnderMouse = null;

          const id = setTimeout(
            () => {
              props.map.on('pointermove', handlePointerMove);
              props.map.getViewport().addEventListener('mouseout', mouseOut);

              props.map.getView().on('change:resolution', handleChangeResolution);

              props.map.once('pointermove', handlePointerMove);
            },
            1200,
          );

          return () => {
            clearTimeout(id);
            props.map.getView().un('change:resolution', handleChangeResolution);
            props.map.getViewport().removeEventListener('mouseout', mouseOut);
            props.map.un('pointermove', handlePointerMove);

          };
        }
      },
      [
        violationCardData,
        selectedObject,
        props.map,
        currentLevel,
        regionsData,
        districtsData,
        showAllRegions,
        showAllDistrict,
        showAllViolation,
        selectedRegion,              // нужно, чтобы при смене округа зум не позволял вылететь на другой уровень
        selectedDistrict,            // нужно, чтобы при смене округа зум не позволял вылететь на другой уровень
      ],
    );

    return (
      <React.Fragment>
        <RegionFitExtentTrigger map={props.map} />
        <DistrictFitExtentTrigger map={props.map} />
        <ViolationFitExtentTrigger map={props.map} />
      </React.Fragment>
    );
  },
);

export default FitExtentTriggers;
