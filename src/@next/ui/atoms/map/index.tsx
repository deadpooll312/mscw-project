import 'ol/ol.css';
import * as React from 'react';
import type Map from 'ol/Map';
import ControlRotate from 'ol/control/Rotate';
import { useSelector } from 'react-redux';

import { centerMsk } from '@next/constants/moscow';
import { selectEGKOBasemapUrlUrlTemplate } from 'app/store/modules/app/selectors';
import { createMap, createViewWGS, setTileLayer, addOverViewMapWithZoom, createView, createTiles2GIS } from 'app/layers';

function getWGSTiles(urlTemplate: string) {
  return createTiles2GIS(urlTemplate, { opacity: 0.7 });
}

function switchMapSRS(map: Map, urlTemplate: string) {
  setTileLayer(map, getWGSTiles(urlTemplate));
  addOverViewMapWithZoom(map, createView({ zoom: map.getView().getZoom() - 4 }));
  map.updateSize();
}

type Props = {
  children: (map: Map) => React.ReactNode;
};

const MapDashboard: React.FC<Props> = React.memo(
  (props) => {
    const [map, setMap] = React.useState<Map>(null);

    const urlTemplate = useSelector(selectEGKOBasemapUrlUrlTemplate);

    React.useEffect(
      () => {
        const node = document.getElementById('map-section');

        if (node && urlTemplate) {
          const mapNew = createMap({
            target: node,
            // pixelRatio: 1,                     // | при дефолтном значении карта чётче (window.devicePixelRatio)
            controls: [
              new ControlRotate({
                tipLabel: 'Исходное положение',
              }),
            ],

            // Зум был 9.6
            view: createViewWGS({
              minZoom: 9,
              zoom: 10,
              center: centerMsk,
            }),
            layers: [],
          });
          switchMapSRS(mapNew, urlTemplate);

          mapNew.updateSize();

          setMap(mapNew);

          return () => {
            mapNew.getLayers().clear();
            mapNew.setTarget(null);
            setMap(null);
          };
        }
      },
      [urlTemplate],
    );

    return (
      <React.Fragment>
        {map && props.children(map)}
      </React.Fragment>
    );
  },
);

export default MapDashboard;
