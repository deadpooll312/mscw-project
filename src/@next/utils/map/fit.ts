import type Map from 'ol/Map';
import type { Extent } from 'ol/extent';
import type SimpleGeometry from 'ol/geom/SimpleGeometry';
import type { FitOptions } from 'ol/View';

const defaultDuration = 1000;

const LastFitId = Symbol('meta');

export const fitExtent = (map: Map, extent: SimpleGeometry | Extent, options: FitOptions, callBack?: () => any) => {
  clearTimeout(map[LastFitId]);

  map[LastFitId] = setTimeout(
    () => {
      map.getView().fit(extent, { duration: defaultDuration, ...options });
      if (callBack) {
        setTimeout(
          () => {
            callBack();
          },
          options.duration || defaultDuration
        );
      }
    }, 100
  );
};
