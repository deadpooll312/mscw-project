import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedObject, selectSelectedDistrict, selectSelectedRegion } from 'app/store/modules/semantics/selectors';
import { getViolationCardData, setViolationCardData } from 'app/store/modules/violation_card/actions';
import { selectModuleViolationCardData } from 'app/store/modules/violation_card/selectors';
import { changeSelectedObject } from 'app/store/modules/semantics/actions';
import usePrevious from '@next/hooks/usePrevious';
import useSetSearchAndParams from '@next/hooks/useSearch/useSetSearchAndParams';

type Props = {};

const ViolationsMapCard: React.FC<Props> = React.memo(
  () => {
    const violationCardData = useSelector(selectModuleViolationCardData);
    const selectedObject = useSelector(selectSelectedObject);
    const selectedRegion = useSelector(selectSelectedRegion);
    const selectedDistrict = useSelector(selectSelectedDistrict);
    const dispatch = useDispatch();

    const violationCardHasData = Boolean(violationCardData);

    const {
      handleSetSearchAndParams,
    } = useSetSearchAndParams();

    React.useEffect(
      () => {
        let newViolationData: Parameters<typeof getViolationCardData>[0] = null;

        if (selectedObject && selectedRegion && selectedDistrict) {
          newViolationData = {
            featureId: selectedObject.featureId,
            objectTypeCode: selectedObject.dimension,
            okrugName: selectedRegion?.shortName,
            districtName: selectedDistrict.name,
          };

          if (violationCardData?.featureId !== newViolationData.featureId) {
            handleSetSearchAndParams({
              search: {
                violationPartialData: {
                  objectTypeCode: newViolationData.objectTypeCode,
                  featureId: newViolationData.featureId,

                  okrugName: newViolationData.okrugName,
                  districtName: newViolationData.districtName,
                }
              }
            });
          }
        }
      },
      [selectedObject, selectedRegion?.shortName, selectedDistrict?.name],
    );

    React.useEffect(
      () => {
        if (!violationCardHasData && selectedObject) {
          dispatch(
            changeSelectedObject(null),
          );
        }
      },
      [violationCardHasData],
    );

    const prevSelectedObject = usePrevious(selectedObject) || null;
    React.useEffect(
      () => {
        if (!selectedObject && prevSelectedObject !== selectedObject && violationCardHasData) {
          dispatch(
            setViolationCardData(null),
          );
        }
      },
      [selectedObject],
    );

    return null;
  }
);

export default ViolationsMapCard;
