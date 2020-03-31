import * as React from 'react';
import pullAt from 'lodash-es/pullAt';
import { useSelector, useDispatch } from 'react-redux';

import { ObjectContainer, Name, Percent, Count, ArrowButton, SubDiv, LayersNameWrap, SwitchWrap } from './styled';
import { ViolationsTypes } from '@next/ui/atoms/map/types';
import { changeSelectedLayers, setASUPRSelected } from 'app/store/modules/semantics/actions';
import {
  selectASUPRSelected,
  selectASUPRData,
  selectLayersData,
  selectSelectedViolationType,
  selectSelectedLayersBySelectedViolationType,
  selectLayerAreaInfo,
  selectFieldsToShowPercentViolationForMainLayers,
  fieldsToShowPercentViolationForASUPR,
} from 'app/store/modules/semantics/selectors';
import { Layer } from 'app/store/modules/semantics/types';
import InputCheckbox from '@next/ui/atoms/InputCheckbox/InputCheckbox';

type Props = {};

const getASUPRStat = (totalObject) => {
  const allViolations = totalObject?.[fieldsToShowPercentViolationForASUPR.fieldToGetCount] ?? 0;

  const allObjects = totalObject?.[fieldsToShowPercentViolationForASUPR.fieldToGetTotalCount] ?? 0;
  const percent = (allObjects && allObjects) ? allViolations / allObjects * 100 : 0;

  return ({
    percent,
    allViolations,
    allObjects,
  });
};

const checkAsuprAvailable = (alias: string, violationType: ViolationsTypes, selectedLayers: Layer[]) => {
  if (violationType === ViolationsTypes.violations) {
    if (!selectedLayers.length) {
      return true;
    }
    return alias === 'mkd' && selectedLayers.length === 1 && selectedLayers[0].alias === 'mkd';
  }
  return false;
};

const ObjectsComponent: React.FC<Props> = React.memo(
  () => {
    const selectedLayers = useSelector(selectSelectedLayersBySelectedViolationType);
    const layersData = useSelector(selectLayersData);
    const isASUPRSelected = useSelector(selectASUPRSelected);
    const ASUPRData = useSelector(selectASUPRData);
    const violationInfo = useSelector(selectLayerAreaInfo);
    const violationType = useSelector(selectSelectedViolationType);
    const fieldsToShowPercentViolationForMainLayers = useSelector(selectFieldsToShowPercentViolationForMainLayers);

    const dispatch = useDispatch();

    const [displayedSubViolations, setDisplayedSubViolations] = React.useState<string[]>(isASUPRSelected ? ['mkd'] : []);
    const [selectedSubLayers, setSelectedSubLayers] = React.useState<string[]>(isASUPRSelected ? ['mkd'] : []);

    const onCheckboxChange = React.useCallback(
      (checked, checkedAlias, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();

        let pickedLayer = selectedLayers.find((x) => x.alias === checkedAlias);
        let newSelectedLayers: Layer[] = [];

        if (pickedLayer) {
          newSelectedLayers = selectedLayers.filter((x) => x.alias !== checkedAlias);
        } else {
          pickedLayer = layersData.find((x) => x.alias === checkedAlias);
          newSelectedLayers = selectedLayers.concat(pickedLayer);
        }

        if (newSelectedLayers.length) {
          dispatch(
            changeSelectedLayers(violationType, { selectedLayers: newSelectedLayers }),
          );
        }
      },
      [
        selectedLayers,
        layersData,
      ],
    );

    React.useEffect(
      () => {
        if (selectedLayers.length > 1) {
          setDisplayedSubViolations([]);
        }
      },
      [selectedLayers],
    );

    const showSubViolations = React.useCallback((key) => (event) => {
      let data = [];
      if (displayedSubViolations.includes(key)) {
        data = displayedSubViolations.filter((x) => x !== key);
        onSubLayerSelect(null, null);
      } else {
        data = displayedSubViolations.concat(key);
      }
      setDisplayedSubViolations(data);
      if (event) {
        event.stopPropagation();
      }
    }, [displayedSubViolations, selectedSubLayers]);

    const onSubLayerSelect = React.useCallback((checked, checkedAlias) => {
      if (checkedAlias) {
        const isInSelectedSubLayers = selectedSubLayers.indexOf(checkedAlias);
        let newSelectedSubLayers = selectedSubLayers.slice();
        if (isInSelectedSubLayers > -1){
          pullAt(newSelectedSubLayers, isInSelectedSubLayers);
        } else {
          newSelectedSubLayers.push(checkedAlias);
        }
        setSelectedSubLayers(newSelectedSubLayers);
        dispatch(
          setASUPRSelected(isInSelectedSubLayers === -1),
        );
      } else {
        setSelectedSubLayers([]);
        dispatch(
          setASUPRSelected(false),
        );
      }
    }, [selectedSubLayers]);

    return (
      <React.Fragment>
        {
          layersData.map((rowData) => {
            const key = rowData.alias;

            const violationInfoAlias = violationInfo?.[key];
            let ASUPRStat: ReturnType<typeof getASUPRStat> = null;

            const allViolations = violationInfoAlias?.total?.[fieldsToShowPercentViolationForMainLayers.fieldToGetCount] ?? 0;
            const allObjects = violationInfoAlias?.total?.[fieldsToShowPercentViolationForMainLayers.fieldToGetTotalCount] ?? 0;

            const percent = (allObjects && allObjects) ? allViolations / allObjects * 100 : 0;

            const isASUPRAvailable = checkAsuprAvailable(key, violationType, selectedLayers);
            if (isASUPRAvailable) {
              ASUPRStat = getASUPRStat(ASUPRData.total);
            }
            const isSelectedObject = isASUPRSelected ? false : selectedLayers.findIndex((x) => x.alias === key) !== -1;

            return (
              <div key={key}>
                <ObjectContainer paddingHeight={'14px'} hasMargin={!isASUPRAvailable}>
                  {
                    isASUPRAvailable && (
                      <ArrowButton
                        icon={displayedSubViolations.includes(key) ? 'caret-down' : 'caret-right'}
                        onClick={showSubViolations(key)}
                      />
                    )
                  }
                  <LayersNameWrap>
                    <Name height={'18px'}>{rowData.layer_name}</Name>
                    <Percent>
                      {percent.toFixed(2)}%
                    </Percent>
                    <Count>{` (${allViolations} из ${allObjects})`}</Count>
                  </LayersNameWrap>
                  <SwitchWrap>
                    <InputCheckbox
                      isChecked={isSelectedObject}
                      onChange={onCheckboxChange}
                      isDisabled={isASUPRSelected}
                      value={key}
                    />
                  </SwitchWrap>
                </ObjectContainer>
                {
                  displayedSubViolations.includes(key) && (
                    <React.Fragment>
                      <ObjectContainer paddingHeight={'14px'} isSub>
                        <SubDiv>
                          <Name height={'14px'} >Нарушения из АСУПР</Name>
                          <Percent>
                            {ASUPRStat?.percent.toFixed(2) || '0.00' }%
                          </Percent>
                          <Count>{` (${ASUPRStat?.allViolations || 0 } из ${ASUPRStat?.allObjects || 0})`}</Count>
                        </SubDiv>
                        <SwitchWrap>
                          <InputCheckbox
                            isChecked={selectedSubLayers.includes(key)}
                            onChange={onSubLayerSelect}
                            value={key}
                          />
                        </SwitchWrap>
                      </ObjectContainer>
                    </React.Fragment>
                  )
                }
              </div>
            );
          })
        }
      </React.Fragment>
    );
  },
);

export default ObjectsComponent;
