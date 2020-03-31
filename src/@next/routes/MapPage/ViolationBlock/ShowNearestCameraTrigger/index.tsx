import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as olExtent from 'ol/extent';
import { transform } from 'ol/proj';
import { MultiPoint } from 'geojson';

import { selectCurrentViolationGeometry } from 'app/store/modules/semantics/selectors';
import { selectUser } from 'app/store/modules/app/selectors';
import { checkIsMerOrAdminOrAdministrator } from '@next/utils/checkOnPermission';
import { GeometryType } from 'types';
import { GEOJSON } from '@next/utils/map/geojson';
import { Centroid } from 'app/store/modules/semantics/types';
import { hideNearestCamera, showNearestCamera } from 'app/store/modules/semantics/actions';
import { selectModuleSidebarSearchButtonTrashContainerFilter } from 'app/store/modules/sidebar/selectors';

type Props = {};

const GeometryTypeSetCheck = new Set([
  GeometryType.MultiPolygon,
  GeometryType.Polygon,
  GeometryType.LineString,
]);

const ShowNearestCameraTrigger: React.FC<Props> = React.memo(
  () => {
    const user = useSelector(selectUser);
    const selectedViolationFeature = useSelector(selectCurrentViolationGeometry);
    const isMerOrAdminOrAdministrator = checkIsMerOrAdminOrAdministrator(user);
    const trashContainerStatusData = useSelector(selectModuleSidebarSearchButtonTrashContainerFilter);

    const dispatch = useDispatch();

    React.useEffect(
      () => {
        if (isMerOrAdminOrAdministrator && selectedViolationFeature) {
          const { type } = selectedViolationFeature.geometry;

          const newFeature = GEOJSON.readFeature(selectedViolationFeature);
          let lng;
          let lat;
          let cameraCoordinates = [];
          const typeForCheck = type.toUpperCase() as typeof GeometryType[keyof typeof GeometryType];

          if (GeometryTypeSetCheck.has(typeForCheck)) {
            const extent = newFeature.getGeometry().getExtent();
            const center = olExtent.getCenter(extent);
            [lng, lat] = transform(center, 'EPSG:3857', 'EPSG:4326');
            cameraCoordinates.push({ lng, lat });
          } else if (type.toUpperCase() === GeometryType.Point) {
            const { coordinates } = selectedViolationFeature.geometry as Centroid;
            [lng, lat] = transform(coordinates, 'EPSG:3857', 'EPSG:4326');
            cameraCoordinates.push({ lng, lat });
          } else if (type.toUpperCase() === GeometryType.MultiPoint) {
            const { coordinates } = selectedViolationFeature.geometry as MultiPoint;
            coordinates.forEach(item => {
              [lng, lat] = transform(item, 'EPSG:3857', 'EPSG:4326');
              cameraCoordinates.push({ lng, lat });
            });
          }

          if (trashContainerStatusData.isActive) {
            cameraCoordinates = cameraCoordinates.map(
              (rowData) => ({
                ...rowData,
                trash: true,
              }),
            );
          }

          dispatch(
            showNearestCamera(cameraCoordinates),
          );

          return () => {
            dispatch(hideNearestCamera());
          };
        }
      },
      [
        isMerOrAdminOrAdministrator,
        selectedViolationFeature,
        trashContainerStatusData,
      ],
    );

    return null;
  }
);

export default ShowNearestCameraTrigger;
