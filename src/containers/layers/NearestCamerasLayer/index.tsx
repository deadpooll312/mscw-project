import * as React from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Draw from 'ol/interaction/Draw';
import GeometryType from 'ol/geom/GeometryType';
import { useSelector, useDispatch } from 'react-redux';
import { transform } from 'ol/proj';
import { ReduxState, PointMode } from 'app/store/modules/@types';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';

import { getCameraSettings } from 'app/api/admin';
import { ObjectEvent } from 'ol/Object';
import { selectPointMode } from 'app/store/modules/map/selectors';
import { selectSelectedDistrict } from 'app/store/modules/semantics/selectors';
import { setCameraSettings, setMapPointMode } from 'app/store/modules/map/actions';
import { hideNearestCamera, showNearestCamera } from 'app/store/modules/semantics/actions';

const pinIcon = require('static/pin.png');

type Props = {
  map: Map;
};

const pinDrawStyle = new Style({
  image: new Icon({
    opacity: 1,
    src: pinIcon,
    anchor: [200, 400],
    anchorXUnits: IconAnchorUnits.PIXELS,
    anchorYUnits: IconAnchorUnits.PIXELS,
    crossOrigin: 'anonymous',
    scale: 0.08,
  }),
});

const MAX_DISTRICTS_ZOOM = 11.5;

const NearestCamerasLayer: React.FC<Props> = React.memo((props) => {
  const {  map } = props;
  const isSearchMode = useSelector((state: ReduxState) => selectPointMode(state) === PointMode.SEARCH);
  const isOffMode = useSelector((state: ReduxState) => selectPointMode(state) === PointMode.OFF);
  const selectedDistrict = useSelector((state: ReduxState) => selectSelectedDistrict(state));
  const dispatch = useDispatch();

  React.useEffect(() => {
    const loadSettings = async () => {
      const result = await getCameraSettings();
      dispatch(setCameraSettings(result.data[0]));
    };
    loadSettings();
  }, []);

  const layerData = React.useMemo(
    () => {
      const source = new VectorSource();

      const layer = new VectorLayer({
        source: source,
        style: pinDrawStyle,
        zIndex: 100,
      });

      map.addLayer(layer);

      return layer;
    },
    [],
  );

  const refreshLayer = React.useCallback(() => {
    dispatch(
      setMapPointMode(PointMode.OFF)
    );
    dispatch(
      hideNearestCamera()
    );
    layerData?.getSource().clear();
  }, [layerData]);

  const onChangeResolution = React.useCallback((e: ObjectEvent & { target: View }) => {
    const zoom = e.target.getZoom();
    if (zoom <= MAX_DISTRICTS_ZOOM && !isOffMode) {
      refreshLayer();
    }
  }, [isOffMode]);

  React.useEffect(
    () => {
      map.getView().on('change:resolution', onChangeResolution);
      return () => {
        map.getView().un('change:resolution', onChangeResolution);
        map.removeLayer(layerData);
      };
    },
    [layerData],
  );

  React.useEffect(() => {
    refreshLayer();
  }, [selectedDistrict]);

  React.useEffect(() => {
    if (isSearchMode) {
      const drawInteraction = new Draw({
        source: layerData.getSource(),
        type: GeometryType.POINT,
        style: pinDrawStyle,
      });

      drawInteraction.on('drawstart', (e) => {
        layerData.getSource().clear();
        dispatch(
          hideNearestCamera()
        );
      });

      drawInteraction.on('drawend', (e) => {
        const coordinates = e.feature.getProperties().geometry.getCoordinates();
        const [lng, lat] = transform(coordinates, 'EPSG:3857', 'EPSG:4326');

        dispatch(
          showNearestCamera([{ lng, lat }])
        );

        dispatch(
          setMapPointMode(PointMode.SELECTED)
        );
      });

      map.addInteraction(drawInteraction);

      return () => {
        map.removeInteraction(drawInteraction);
      };
    }
  }, [layerData, isSearchMode]);

  return null;
},);

export default NearestCamerasLayer;
