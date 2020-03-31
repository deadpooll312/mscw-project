import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

import { Range } from '@next/ui/atoms/map/types';
import { getFeatureColor, fromHexToRgba } from 'containers/layers/utils/common';
import { LegendItem } from 'app/store/modules/semantics/types';
import { LIGHT_GREY } from 'containers/layers/constants';
import { LayerObjectDTO } from 'app/swagger/model/layerObjectDTO';

// type FieldsToShowPercentViolation = {
//   fieldToGetCount: keyof TotalViolation;
//   fieldToGetTotalCount: keyof TotalViolation;
// };

export const makeRangesToFill = (legend: LegendItem[]) => {
  if (legend) {
    return legend?.reduce<Range>(
      (ranges, item) => {
        ranges[item.color] = {
          min: item.minPercent,
          max: item.maxPercent,
          color: fromHexToRgba(item.colorValue, 0.9),
        };

        return ranges;
      },
      {},
    );
  }

  return {};
};

const getFillFeatureOption = (violationObject: LayerObjectDTO, legend: LegendItem[]) => {
  const violationCount = violationObject?.amount ?? 0;
  const checkAmount = violationObject?.checkAmount ?? 0;
  const amountObjects = violationObject?.amountObject ?? 0;

  let resultColor = LIGHT_GREY;

  // Если не бывает нарушений то делаем округ прозрачным
  if (amountObjects === 0) {
    resultColor = 'transparent';
  } else if (violationCount === 0 && checkAmount === 0) {
    resultColor = LIGHT_GREY;
  } else if (violationObject) {
    const ranges = makeRangesToFill(legend);
    resultColor = getFeatureColor(violationCount, checkAmount, ranges);
  }

  return {
    color: resultColor,
  };
};

// Стилизация
export const getRegionStyle = (legend: LegendItem[], data: Record<string, LayerObjectDTO>) => {
  return (feature: Feature) => {
    const violationObject = data?.[feature.getProperties().feature_id] ?? null;

    return new Style({
      stroke: new Stroke({
        color: '#fff',
        width: 2,
      }),
      fill: new Fill(
        getFillFeatureOption(violationObject, legend),
      ),
      zIndex: 2,
    });
  };
};
