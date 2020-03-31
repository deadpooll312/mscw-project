import * as React from 'react';
import styled from 'styles';
import { useSelector, useDispatch } from 'react-redux';

import { getFormattedDateTime, getDateFromUtcToLocal } from '@next/utils/dates';
import PickDefectBlock from '@next/ui/organisms/ViolationCard/DefectsBlock/PickDefectBlock';
import BlockFotosVideo from '@next/ui/organisms/ViolationCard/DefectsBlock/BlockFotosVideo';
import { selectModuleViolationCardActiveDefectIndex, selectModuleViolationCardDataDefects, selectModuleViolationCardData } from 'app/store/modules/violation_card/selectors';
import { setViolationCardActiveDefectIndex } from 'app/store/modules/violation_card/actions';
import { isSocLayer } from '@next/utils/checkLayerType';

type Props = {};

const SystemNamesWithPhotos = new Set(['НГ', 'ЦАФАП']);

const DefectsBlock: React.FC<Props> = React.memo(
  (props) => {
    const violationCardData = useSelector(selectModuleViolationCardData);
    const defectArr = useSelector(selectModuleViolationCardDataDefects);

    const currentIndexDeffect = useSelector(selectModuleViolationCardActiveDefectIndex);
    const dispatch = useDispatch();

    React.useEffect(
      () => {
        const activeIndex = defectArr.findIndex((defect) => SystemNamesWithPhotos.has(defect.idSystemsName));

        dispatch(
          setViolationCardActiveDefectIndex(
            activeIndex === -1 ? 0 : activeIndex,
          )
        );
      },
      [defectArr],
    );

    const handleChangeCurrentIndexDeffect = React.useCallback(
      (defect: ValuesOf<typeof defectArr>) => {
        dispatch(
          setViolationCardActiveDefectIndex(
            defectArr.findIndex((rowData) => rowData === defect)
          ),
        );
      },
      [defectArr],
    );

    const currentDefect = defectArr[currentIndexDeffect];

    // eslint-disable-next-line
    const dateClosed: string = Boolean(currentDefect?.dataToRequest?.date_closed) ?
      getFormattedDateTime(getDateFromUtcToLocal(currentDefect?.dataToRequest?.date_closed)) : null;

    return currentDefect && (
      <BlockData>
        <PickDefectBlock
          currentIndexDeffect={currentIndexDeffect}
          defectArr={defectArr}
          handleChangeCurrentIndexDeffect={handleChangeCurrentIndexDeffect}
        />
        <LineData>
          <LabelData>ID нарушения</LabelData>
          <div><b>{`(ID: ${currentDefect.dataToRequest.ticket}; ${getFormattedDateTime(getDateFromUtcToLocal(currentDefect?.dataToRequest?.data_creation))}; ${currentDefect?.idSystemsName ?? ''})`}</b></div>
          {
            !isSocLayer(violationCardData.objectTypeCode) && (
              <React.Fragment>
                {
                  dateClosed && (
                    <LabelData>Дата и время устранения</LabelData>
                  )
                }
                <div><b>{dateClosed}</b></div>
              </React.Fragment>
            )
          }
        </LineData>
        {
          Boolean(currentDefect?.hasfotovideo) && (
            <LineData>
              <BlockFotosVideo
                defect={currentDefect}
              />
            </LineData>
          )
        }
      </BlockData>
    );
  },
);

export default DefectsBlock;

const BlockData = styled.div`
  /* padding: 15px; */
`;

const LabelData = styled.div`
  margin: 5px 0;
`;

const LineData = styled.div`
  padding: 0px 15px;
  margin-bottom: 20px;
`;
