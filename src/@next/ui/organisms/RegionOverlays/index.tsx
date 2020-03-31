import * as React from 'react';
import Map from 'ol/Map';
import MapEvent from 'ol/MapEvent';

import {
  getSize,
  getRegionTitleFontSize,
  getRegionViolatoinTitleFontSize,
} from './utils';
import { InfoBlock } from './styled';
import { ReduxState } from 'app/store/modules/@types';
import DefaultOverlay from 'containers/DefaultLayer/Overlay';
import MapOverlay from '@next/ui/atoms/MapOverlay';
import MapCircleOverlay from '@next/ui/atoms/MapCircleOverlay';
import FontCirceRegular from '@next/ui/atoms/FontCirceRegular';
import { LayerObjectDTO } from 'app/swagger/model/layerObjectDTO';
// import { TotalViolation, ViolationObject } from 'app/store/modules/semantics/types';

type Props = {
  map: Map;
  selectedFeatureFeatureId: string;
  
  regions: ReduxState['semantics']['regions'];
  data: Record<string, LayerObjectDTO>;
  // fieldsToShowPercentViolation: {
  //   fieldToGetCount: keyof TotalViolation;
  //   fieldToGetTotalCount: keyof TotalViolation;
  // };
  // violationsObjectIndex: Record<string, Pick<ViolationObject, 'feature_id' | 'object_name' | 'total'>>,
};

const defaultSize = 60;

const RegionOverlays: React.FC<Props> = React.memo(
  (props) => {
    const { data } = props;

    const [currentZoom, setCurrentZoom] = React.useState(props.map.getView().getZoom());

    React.useEffect(
      () => {
        const handleMouseMoveEnd = (e: MapEvent) => {
          setCurrentZoom(e.target.getView().getZoom());
        };

        props.map.on('moveend', handleMouseMoveEnd);

        return () => {
          props.map.un('moveend', handleMouseMoveEnd);
        };
      },
      [],
    );

    const size = getSize(defaultSize, currentZoom);

    return Boolean(data) && (
      <React.Fragment>
        {
          props.regions?.data?.map(
            (featureData) => {
              const region = data[featureData.featureId];
              const countObjects = region?.amount ?? 0;
              const totalCountObjects = region?.checkAmount ?? 0;
              const amountObjects = region?.amountObject ?? 0;

              const isSelected = props.selectedFeatureFeatureId === featureData.featureId;

              return Boolean(amountObjects) && (
                <MapOverlay
                  key={featureData.shortName}
                  position={featureData?.centroid?.coordinates}
                  map={props.map}
                  size={size}
                  isSelected={isSelected}
                >
                  <DefaultOverlay
                    show={isSelected}
                    size={size}
                  >
                    <InfoBlock size={size}>
                      <span>Нарушения</span>
                      <div>
                        <strong>{countObjects}</strong>
                        из
                        <span>{totalCountObjects}</span>
                      </div>
                    </InfoBlock>
                  </DefaultOverlay>
                  <MapCircleOverlay size={size}>
                    <FontCirceRegular fontSize={getRegionTitleFontSize(currentZoom)}>{featureData.shortName}</FontCirceRegular>
                    <FontCirceRegular fontSize={getRegionViolatoinTitleFontSize(currentZoom)}>{countObjects ?? '0'}</FontCirceRegular>
                  </MapCircleOverlay>
                </MapOverlay>
              );
            },
          )
        }
      </React.Fragment>
    );
  },
);

export default RegionOverlays;
