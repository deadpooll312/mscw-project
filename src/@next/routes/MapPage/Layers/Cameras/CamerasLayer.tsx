import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Map, Feature } from 'ol';
import VectorSource from 'ol/source/Vector';
import Cluster from 'ol/source/Cluster';
import VectorLayer from 'ol/layer/Vector';
import Point from 'ol/geom/Point';
import { selectNearestCamerasData } from 'app/store/modules/semantics/selectors';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import { fromLonLat } from 'ol/proj';
import Select from 'ol/interaction/Select';
import { click } from 'ol/events/condition';
import { isNumber } from 'util';

import { pinIcon } from 'containers/layers/constants';
import { hideNearestCamera } from 'app/store/modules/semantics/actions';
// import { getRandomCoordinates } from '@next/utils/common';

import { getCameraStream } from 'app/api/camera';
import { FullSizeCamera } from '@next/routes/MapPage/Layers/Cameras/FullSizeCamera';
import styled from 'styles';
import CamerasSlider from '@next/routes/MapPage/Layers/Cameras/CamerasSlider';
import TriggerOnFocusViolation from '@next/routes/MapPage/Layers/Cameras/Triggers/TriggerOnFocusViolation';
import { PropertyType } from 'app/types';
import CONSTANTS from '@next/constants';

type Props = {
  map: Map;
};

const DISTANCE_TO_CAMERAS = 10;

function featureStyle({ size = 1, selected = false, hovered = false, isFakeCoordinates = false }) {
  return new Style({
    image: new Icon({
      opacity: 1,
      src: size > 1 ? pinIcon.cluster({ size }) : pinIcon.camera({ selected, hovered, isFakeCoordinates }),
      anchor: [15, 18],
      anchorXUnits: IconAnchorUnits.PIXELS,
      anchorYUnits: IconAnchorUnits.PIXELS,
      crossOrigin: 'anonymous',
    }),
    zIndex: 100,
  });
}

const getStyleFinction = (activeCamera: number, hoveredCamera: number) => (feature) => {
  const features = feature.getProperties().features;
  let index: number;
  let isFakeCoordinates: boolean;
  // если на карте уже не кластеризованный пин
  if (features && features.length === 1) {
    index = features[0].getProperties().index;
    isFakeCoordinates = features[0].getProperties().fakeCoordinates;
  }
  const size = feature.get('features').length;
  const style = featureStyle({ size, selected: index === activeCamera, hovered: index === hoveredCamera, isFakeCoordinates });
  return style;
};

const CarmerasLayers: React.FC<Props> = React.memo(
  (props) => {
    const dispatch = useDispatch();

    const nearestCamerasData = useSelector(selectNearestCamerasData);

    const [camerasLinks, setCamerasLinks] = React.useState<string[]>([]);
    const [activeCamera, setActiveCamera] = React.useState<number>(CONSTANTS.INDEX_OF_ARR.FIRST_INDEX);
    const [hoveredCamera, setHoveredCamera] = React.useState<number>(null);
    const [fullSizeCamera, setFullSizeCamera] = React.useState<number>(null);

    const mainCointainer = React.useMemo(
      () => {
        return document.querySelector('#main-section');
      },
      [],
    );

    const layer = React.useMemo(
      () => {
        const vectorSource = new VectorSource();
        const clusterSource = new Cluster({
          distance: DISTANCE_TO_CAMERAS,
          source: vectorSource,
        });
        const layerNew = new VectorLayer({
          source: clusterSource,
          style: null,
          zIndex: 100,
        });

        props.map.addLayer(layerNew);

        return layerNew;
      },
      [props.map],
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
        if (layer) {
          layer.setStyle(getStyleFinction(activeCamera, hoveredCamera));
        }
      },
      [activeCamera, hoveredCamera, layer],
    );

    React.useEffect(
      () => {
        const selectInteraction = new Select({
          condition: click,
          layers: [layer],
          style: null,
        });

        selectInteraction.on('select', (evt) => {
          const foundedFeature = evt.selected[0];

          if (!foundedFeature) {
            return;
          }
          const { features } = foundedFeature.getProperties();

          if (features) {
            if (features.length === 1) {
              const feat = features[0];

              const type = feat.getProperties().type;
              if (type !== PropertyType.CAMERA) {
                return;
              }
              const index = feat.getProperties().index;

              setActiveCamera(index);
            } else {
              selectInteraction.getFeatures().clear();
            }
          }
        });
        props.map.addInteraction(selectInteraction);

        return () => {
          selectInteraction.getFeatures().clear();
          props.map.removeInteraction(selectInteraction);
          dispatch(
            hideNearestCamera(),
          );
        };
      },
      [layer],
    );

    React.useEffect(
      () => {
        (layer.getSource() as Cluster).getSource().clear();
        if (nearestCamerasData) {
          // иногда с сервера приходят камеры, имеющие абсолютно одинаковые координаты, поэтому они слипаются
          // чтобы не слипались в одной точке несколько камер, делаем их расположение рандомно в очень маленьком радиусе
          const doublesCameras = nearestCamerasData.reduce((res, curr, index) => {
            const uid = `${curr.lat}-${curr.lng}`;
            return { ...res, [uid]: res[uid] ? res[uid].concat(index) : [index] };
          }, {});

          Object.values(doublesCameras).forEach((cameraValue: string[]) => {
            if (cameraValue.length === 1) {
              return;
            }
            // const mainCamera = nearestCamerasData[cameraValue[0]];
            // const bbox = [mainCamera.lng - 0.000025, mainCamera.lat - 0.000025, mainCamera.lng + 0.000025, mainCamera.lat + 0.000025];
            // const points = getRandomCoordinates(cameraValue.length - 1, bbox);
            // const pointsFeatures = points;
            for (let i = 1; i < cameraValue.length; i++) {
              // nearestCamerasData[cameraValue[i]].lng = pointsFeatures[i - 1][0];
              // nearestCamerasData[cameraValue[i]].lat = pointsFeatures[i - 1][1];
              nearestCamerasData[cameraValue[i]].fakeCoordinates = true;
            }
          });

          nearestCamerasData.forEach((camera, index) => {
            const cameraPin = new Point(fromLonLat([+camera.lng, +camera.lat]));
            const cameraPinFeature = new Feature({
              id: `${PropertyType.CAMERA}-${index}`,
              index: index,
              type: PropertyType.CAMERA,
              geometry: cameraPin,
              dist: camera.distance,
              fakeCoordinates: camera.fakeCoordinates,
            });

            if(camera.fakeCoordinates) {
              const randomNumber = Math.random();
              cameraPinFeature.getGeometry().translate(10 * index * randomNumber, 10 * index * randomNumber);
            }

            getCameraStream(camera.id)
              .then((response) => {
                if (response?.code) {
                  const videoLink = response.data.urlStreamLive; // response.data.urlStreamLive
                  setCamerasLinks((prevState) => {
                    const newState = [...prevState];
                    newState[index] = videoLink;

                    return newState;
                  });
                }
              });
            (layer.getSource() as Cluster).getSource().addFeature(cameraPinFeature);
          });
        }
      },
      [layer, nearestCamerasData],
    );

    const handleFullSizeShrinkClick = React.useCallback(
      () => {
        setFullSizeCamera(null);
      },
      [],
    );

    const handleClose = React.useCallback(
      () => {
        dispatch(
          hideNearestCamera(),
        );
      },
      [],
    );

    return Boolean(nearestCamerasData) && (
      <React.Fragment>
        <TriggerOnFocusViolation />
        {
          isNumber(fullSizeCamera) && (
            <FullSizeCamera
              link={camerasLinks[fullSizeCamera]}
              parentContainer={mainCointainer}
              onFullSizeShrinkClick={handleFullSizeShrinkClick}

              cameraData={nearestCamerasData[fullSizeCamera]}
              isControlled
            />
          )
        }
        <Container>
          <SliderWrapper lengthCamerasLinks={camerasLinks.length}>
            <CamerasSlider
              camerasData={nearestCamerasData}

              slidesToShow={camerasLinks.length}

              camerasLinks={camerasLinks}
              activeCamera={activeCamera}

              handleHoveredCamera={setHoveredCamera}
              handleSetActiveCamera={setActiveCamera}
              handleFullSizeClick={setFullSizeCamera}
              handleClose={handleClose}
            />
          </SliderWrapper>
        </Container>
      </React.Fragment>
    );
  },
);

export default CarmerasLayers;

const Container = styled.div`
  z-index: 100;
  position: absolute;
  bottom: 0;
  width: calc(100% - 500px);                                          /* 500 - ширина сайдбара */
  display: flex;
  justify-content: center;
  padding: 0 20px;
`;

const SliderWrapper = styled.div<{ lengthCamerasLinks: number }>`
  position: relative;
  width: ${({ lengthCamerasLinks }) => 100 / 3 * Math.min(lengthCamerasLinks, 3)}%;
  border-radius: 6px;
  background-color: rgba(196, 196, 196, 0.6);
  box-shadow: 0px 15px 15px 0 rgba(0,0,0,0.15);
`;
