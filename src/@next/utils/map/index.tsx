import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import type Style from 'ol/style/Style';
import { GEOJSON } from '@next/utils/map/geojson';

export const createGeometryLayer = (name: string, style: Style, zIndex?: number) => {
  const vectorSource = new VectorSource({ format: GEOJSON });

  const layer = new VectorLayer({
    source: vectorSource,
    style,
    zIndex,
  });

  layer.set('name', name);
  layer.set(name, true);

  return layer;
};
