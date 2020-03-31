import * as React from 'react';
import Map from 'ol/Map';
import MapEvent from 'ol/MapEvent';
import keyBy from 'lodash-es/keyBy';

import {
  getSize,
  getRegionViolatoinTitleFontSize,
  getCenterTextDistricts,
} from './utils';
import { ReduxState } from 'app/store/modules/@types';
import DefaultOverlay from 'containers/DefaultLayer/Overlay';
import MapOverlay from '@next/ui/atoms/MapOverlay';
import MapCircleOverlay from '@next/ui/atoms/MapCircleOverlay';
import FontCirceRegular from '@next/ui/atoms/FontCirceRegular';
import { InfoBlock, DistrictName } from './styled';
import { LayerObjectDTO } from 'app/swagger/model/layerObjectDTO';
// import { ViolationObject } from 'app/store/modules/semantics/types';

type Props = {
  map: Map;
  selectedFeatureFeatureId: string;
  districts: ReduxState['semantics']['districts'];
  // fieldsToShowPercentViolation: {
  //   fieldToGetCount: keyof TotalViolation;
  //   fieldToGetTotalCount: keyof TotalViolation;
  // };
  violationsObjectIndex: Record<string, LayerObjectDTO>;
};

const defaultSize = 30;

const DistrictsOverlays: React.FC<Props> = React.memo(
  (props) => {
    const {
      violationsObjectIndex,
      // fieldsToShowPercentViolation,
    } = props;

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

    const dataDistrictsIndex = React.useMemo(
      () => {
        return keyBy(
          props.districts.data,
          'featureId',
        );
      },
      [props.districts.data],
    );

    return Boolean(violationsObjectIndex) && (
      <React.Fragment>
        {
          props.districts?.data?.map(
            (featureData) => {
              const district = violationsObjectIndex[featureData.featureId];
              const countObjects = district?.amount ?? 0;
              const totalCountObjects = district?.checkAmount ?? 0;
              const amountObjects = district?.amountObject ?? 0;

              const isSelected = props.selectedFeatureFeatureId === featureData.featureId;

              return Boolean(amountObjects) && (
                <MapOverlay
                  key={featureData.featureId}
                  position={getCenterTextDistricts(featureData)}
                  map={props.map}
                  size={size}
                  isSelected={isSelected}
                >
                  <DefaultOverlay
                    show={isSelected}
                    dependenceSize={size}
                    size={size + 20}
                    center
                  >
                    <InfoBlock size={size}>
                      <DistrictName>{dataDistrictsIndex[featureData.featureId]?.name}</DistrictName>
                      <div>
                        <strong>{countObjects}</strong>
                        из
                        <span>{totalCountObjects}</span>
                      </div>
                    </InfoBlock>
                  </DefaultOverlay>
                  <MapCircleOverlay size={size}>
                    <FontCirceRegular fontSize={getRegionViolatoinTitleFontSize(currentZoom)}>{countObjects ?? '-'}</FontCirceRegular>
                  </MapCircleOverlay>
                </MapOverlay>
              );
            })
        }
      </React.Fragment>
    );
  },
);

export default DistrictsOverlays;
