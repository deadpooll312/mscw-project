import * as React from 'react';
import styled, { css } from 'styles';
import OutsideClickHandler from 'react-outside-click-handler';

import { ColorSpan } from 'components/ModalMatrix/styled';
import ViolationOption from '@next/ui/organisms/ViolationCard/DefectsBlock/PickDefectBlock/DropdownOption';
import { useStyledTheme } from 'styles/themes/hooks';

const getTextViolationType = (isCritical: boolean, isSystematic: boolean) => {
  if (!isSystematic) {
    return `${isCritical ? 'Критичное' : 'Некритичное'}`;
  }

  return `${getTextViolationType(isCritical, false)}, систематическое`;
};

type Props = {
  currentIndexDeffect: number;
  defectArr: {
    text: string;
    idSystemsName: string;
    violation_type?: string;
    critical: boolean;
    systematic: boolean;
    dataToRequest: {
      ID_object: string;
      ticket: string;
      data_creation: string;
      ID: string;
      system: string;
    };
  }[];

  handleChangeCurrentIndexDeffect: (defect: ValuesOf<Props['defectArr']>) => any;
};

const PickDefectBlock: React.FC<Props> = React.memo(
  (props) => {
    const theme = useStyledTheme();
    const [isShowOtherStatus, setIsShowOtherStatus] = React.useState(false);
    const currentDefect = props.defectArr[props.currentIndexDeffect];

    const omitSelectedDefectArr = React.useMemo(
      () => {
        return props.defectArr.filter((rowData, index) => index !== props.currentIndexDeffect);
      },
      [props.defectArr, props.currentIndexDeffect],
    );

    const handleSelect = React.useCallback(
      (defect: ValuesOf<Props['defectArr']>) => {
        props.handleChangeCurrentIndexDeffect(defect);
      },
      [],
    );

    const setHiddenOther = React.useCallback(
      () => {
        setIsShowOtherStatus(false);
      },
      [],
    );

    React.useEffect(
      () => {
        setIsShowOtherStatus(false);
      },
      [props.currentIndexDeffect],
    );

    const toggleOtherStatus = React.useCallback(
      () => {
        setIsShowOtherStatus((oldValue) => !oldValue);
      },
      [],
    );

    return (
      <BlockData>
        <TextContainer>
          <LabelData>
            Нарушение &nbsp;
            <b>
              <ColorSpan
                colorText={theme.colors.dashboardCard.defaultText}
              >
                {

                }
                ({getTextViolationType(currentDefect?.critical, currentDefect?.systematic)})
              </ColorSpan>
            </b>
          </LabelData>
          <div><b><ColorSpan colorText="#d82555">{currentDefect?.text}</ColorSpan></b></div>
          <OutsideClickHandler
            onOutsideClick={setHiddenOther}
          >
            <ListConatinerWrap isVisible={isShowOtherStatus}>
              <ListConatiner isVisible={isShowOtherStatus}>
                {
                  omitSelectedDefectArr.map((rowData) => (
                    <ViolationOption
                      key={rowData.dataToRequest.ticket}
                      item={rowData}
                      handleSelect={handleSelect}
                    />
                  ))
                }
              </ListConatiner>
            </ListConatinerWrap>
          </OutsideClickHandler>
        </TextContainer>
        {
          Boolean(omitSelectedDefectArr.length) && (
            <OtherContainer onClick={toggleOtherStatus}>Ещё...</OtherContainer>
          )
        }
      </BlockData>
    );
  },
);

export default PickDefectBlock;

const BlockData = styled.div`
  margin-bottom: 20px;
  display: flex;
`;

const LabelData = styled.div`
  margin-bottom: 5px;
`;

const TextContainer = styled.div`
  position: relative;
  flex: 2 2 100%;
  padding: 15px 15px;
`;

const OtherContainer = styled.div`
  flex: 1 1 auto;
  background-color: ${({ theme }) => theme.colors.dashboardCard.cardBackground};
  padding: 15px 15px;

  box-shadow: inset 0px 0px 5px 1px  ${({ theme }) => theme.colors.dashboardCard.boxShadow};

  display: flex;
  align-items: center;

  &:hover {
    box-shadow: inset 0px 0px 5px 2.5px ${({ theme }) => theme.colors.dashboardCard.boxShadow};
  }

  transition: box-shadow 0.25s;
  cursor: pointer;
`;

export const ListConatinerWrap = styled.div<{ isVisible: boolean }>`
  position: absolute;
  left: 0;
  width: 100%;
  padding: 15px;
  z-index: 10;

  ${({ isVisible }) => !isVisible && css`
    z-index: -100;
  `}
`;

export const ListConatiner = styled.div<{ isVisible: boolean }>`
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.dashboardCard.boxShadow};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.dashboardCard.cardBackground};
  width: 100%;
  padding: 5px;

  overflow: auto;

  transform: translateY(${({ isVisible }) => isVisible ? '0' : '-100%'}) scaleY(${({ isVisible }) => isVisible ? '1' : '0'});
  transition: transform 0.1s;
  max-height: 500px;
`;

