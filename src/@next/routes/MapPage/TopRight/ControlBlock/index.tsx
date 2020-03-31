import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ReduxState } from 'app/store/modules/@types';
import WhiteBlock from 'containers/WhiteBlock';
import RadioGroup from '@next/ui/atoms/RadioGroup';
import ControlRadio from '@next/routes/MapPage/TopRight/ControlBlock/ControlRadio';
import CheckBoxBlock from '@next/routes/MapPage/TopRight/ControlBlock/CheckBoxBlock';

import { checkIsMer } from '@next/utils/checkOnPermission';
import { AVAILABLE_CONTROL } from 'app/store/modules/semantics/constants';
import FlexContainer from '@next/ui/atoms/VerticalRadioContainer';
import { selectSelectedViolationType, selectViolationSource, selectASUPRSelected } from 'app/store/modules/semantics/selectors';
import { selectUser } from 'app/store/modules/app/selectors';
import { changeViolationSource, getSystemTypes } from 'app/store/modules/semantics/actions';

type Props = {};

const ControlBlock: React.FC<Props> = React.memo(
  () => {
    const violationType = useSelector(selectSelectedViolationType);
    const violationSource = useSelector(selectViolationSource);
    const isASUPRSelected = useSelector((state: ReduxState) => !!selectASUPRSelected(state));
    const userRoleIsMer = useSelector((state: ReduxState) => checkIsMer(selectUser(state)));

    const dispatch = useDispatch();

    const onChange = React.useCallback(
      (event) => {
        dispatch(
          changeViolationSource(
            event?.target?.value ?? event
          ),
        );
      },
      [],
    );

    React.useEffect(
      () => {
        dispatch(getSystemTypes());
      },
      [],
    );
    
    React.useEffect(
      () => {
        if (violationType !== 'violations') {
          onChange(AVAILABLE_CONTROL.ALL);
        }
      },
      [violationType, onChange],
    );

    return violationType === 'violations' && (
      <WhiteBlock maxWidth={250}>
        {userRoleIsMer && <CheckBoxBlock /> }
        <RadioGroup onChange={onChange} value={violationSource} disabled={isASUPRSelected}>
          <FlexContainer>
            <ControlRadio type={AVAILABLE_CONTROL.GOVERNMENT} title="Контроль города" />
            <ControlRadio type={AVAILABLE_CONTROL.CITIZEN} title="Контроль жителей" />
            <ControlRadio type={AVAILABLE_CONTROL.ALL} title="Сводная информация" />
          </FlexContainer>
        </RadioGroup>
      </WhiteBlock>
    );
  },
);

export default ControlBlock;
