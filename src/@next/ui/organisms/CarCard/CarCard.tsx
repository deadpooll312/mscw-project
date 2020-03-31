import * as React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Button } from 'antd';

import FlexContainer from '@next/ui/atoms/FlexContainer';
import { selectModuleCarCardMainCarData } from 'app/store/modules/car_card/selectors';
import { getFormattedDateTime } from '@next/utils/dates';
import { TsInfoDTO } from 'app/swagger/model/tsInfoDTO';
import CONSTANTS from '@next/constants';
import Flex from '@next/ui/atoms/Flex';
import { selectKeyByLegendForCarsByColor } from 'app/store/modules/semantics/selectors';

type Props = {
  handleClose: () => void;

  CONDITION_DIC: Record<TsInfoDTO['value'], TsInfoDTO>;
  STATUS_DIC: Record<TsInfoDTO['value'], TsInfoDTO>;
  CAR_GROUP_DIC: Record<TsInfoDTO['value'], TsInfoDTO>;
  VEHICLE_TYPE_DIC: Record<TsInfoDTO['value'], TsInfoDTO>;
  OWNER_DIC: Record<TsInfoDTO['value'], TsInfoDTO>;
};

const parceGovNumber = (gnum: string) => {
  const region = gnum.match(/\d*$/)?.[CONSTANTS.INDEX_OF_ARR.FIRST_INDEX] ?? '';
  const number = gnum.replace(region, '');

  return {
    number,
    region,
  };
};

const CarCard: React.FC<Props> = React.memo(
  (props) => {
    const mainCarData = useSelector(selectModuleCarCardMainCarData);
    const uniqCarLegend = useSelector(selectKeyByLegendForCarsByColor);

    const govNumberData = parceGovNumber(mainCarData.gnum);

    return (
      <InfoContainer>
        <ButtonClose onClick={props.handleClose} />
        <FlexContainer flexDirection="column">
          <Option>
            <LabelGovNumber>Регистрационный номер ТС</LabelGovNumber>
            <Value>
              <GovNumberContainerWrap>
                <GovNumberContainer>
                  <GovNumberWithoutRegion>
                    {govNumberData.number}
                  </GovNumberWithoutRegion>
                  <GovNumberRegion>
                    <FlexContainerWrap flexDirection="column" alignItems="center" justifyContent="space-between">
                      <Number>{govNumberData.region}</Number>
                      <RusLabel>
                        <Flex flexGrow={1} flexShrink={1} flexBasis="50%">
                          <div>RUS</div>
                        </Flex>
                        <FlexLang flexGrow={1} flexShrink={1} flexBasis="50%">
                          <RuFlag />
                        </FlexLang>
                      </RusLabel>

                    </FlexContainerWrap>
                  </GovNumberRegion>
                </GovNumberContainer>
              </GovNumberContainerWrap>

            </Value>
          </Option>
          <Option>
            <Label>Владелец техники</Label>
            <Value>
              {props.OWNER_DIC[mainCarData.owner_id]?.name ?? '-'}
            </Value>
          </Option>
          <Option>
            <Label>Группа техники</Label>
            <Value>
              {'-'}
            </Value>
          </Option>
          <Option>
            <Label>Тип техники</Label>
            <Value>
              {props.VEHICLE_TYPE_DIC[mainCarData.type_id]?.name ?? '-'}
            </Value>
          </Option>
          <Option>
            <Label>Шасси</Label>
            <Value>
              {'-'}
            </Value>
          </Option>
          <Option>
            <Label>Спец оборудование</Label>
            <Value>
              {'-'}
            </Value>
          </Option>
          <Option>
            <Label>Тех. состояние</Label>
            <Value>
              {props.CONDITION_DIC[mainCarData.condition]?.name ?? '-'}
            </Value>
          </Option>
          <Option>
            <Label>Статус</Label>
            <Value>
              <FlexContainer alignItems="center" >
                <span>{props.STATUS_DIC[mainCarData.status_id]?.name ?? '-'}</span>
                <ColorStatus circleColor={uniqCarLegend[mainCarData.status_id]?.colorValue}/>
              </FlexContainer>
            </Value>
          </Option>
          <Option>
            <Label>Последняя точка</Label>
            <Value>
              {getFormattedDateTime(mainCarData.date)}
              <br />
              [{mainCarData.lat}, {mainCarData.long}]
            </Value>
          </Option>
        </FlexContainer>
      </InfoContainer>
    );
  },
);

export default CarCard;

const FlexContainerWrap = styled(FlexContainer)`
  height: 100%;
`;

const Number = styled.span`
  line-height: 2rem;
`;

const ColorStatus = styled.div<{ circleColor: string }>`
  background-color: ${({ circleColor }) => circleColor};
  margin: 0 0.5rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
`;

const FlexLang = styled(Flex)`
  display: flex;
  align-items: center;
`;
const RuFlag = styled.div`
  background-image: url(${require('static/ru.png')});

  background-size: cover;
  border: 1px solid grey;
  width: 1.25rem;
  height: 0.9rem;
`;

const RusLabel = styled(FlexContainer)`
  font-size: 0.9rem;
`;

const GovNumberContainer = styled.div`
  background-color: white;
  color: black;
  font-family: Roboto;
  border: 3px solid black;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  padding: 2px;
`;

const GovNumberContainerWrap = styled.div`
  font-family: Roboto;
  display: flex;
  justify-content: center;
`;

const GovNumberWithoutRegion = styled.div`
  border: 2px solid black;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  padding: 7px 8px;

  font-size: 2.5rem;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const GovNumberRegion = styled.div`
  border: 2px solid black;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;

  padding: 8px;

  min-width: 70px;
  font-size: 1.9rem;
`;

const Option = styled.div`
  margin: 8px;
`;
const Label = styled.div`
  font-family: Roboto;
  font-size: 0.75rem;
  color: #A0A4A8;

  margin-bottom: 0.25rem;
`;

const LabelGovNumber = styled(Label)`
  margin-bottom: 0.5rem;
`;

const Value = styled.div`
  font-family: Roboto;
  font-weight: 800;
  font-size: 1rem;
`;

const InfoContainer = styled.div`
  padding: 10px;
`;

const ButtonClose = styled(Button).attrs({ icon: 'close' })`
  &&& {
    position: absolute;
    right: 0;
  }
`;
