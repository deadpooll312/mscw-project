import * as React from 'react';
import  styled from 'styles';
import { WidgetElement } from 'app/swagger/model/widgetElement';
import { sumArr } from '@next/utils/common';
import CONSTANTS from '@next/constants';

type Props = {
  height: number;
  fullData: WidgetElement[];
  data: WidgetElement[];
};

type ItemNameProps = {
  disabled?: boolean;
};

type DescriptionComponentProps = {
  fullData: WidgetElement[];
  data: WidgetElement[];
  rowData: WidgetElement;
};

const DescriptionComponent: React.FC<DescriptionComponentProps> = React.memo(
  (props) => {
    const fullData = props.fullData;
    const data = props.data;
    const rowDataValue = props.rowData.value ?? CONSTANTS.COUNT.ZERO;

    const dataArr = fullData.length
      ? data.filter(({ type }) => fullData.some((rowData) => rowData.type === type))
      : data;

    const isActiveEvent = dataArr.some(({ type }) => type === props.rowData.type);

    const allSum = sumArr(...dataArr.map(({ value }) => value));
    const percent = allSum ? (rowDataValue / allSum * CONSTANTS.PERCENT.ONE_HUNDRED_PERCENT).toFixed(CONSTANTS.COUNT.ONE) : CONSTANTS.COUNT.ZERO;

    return (
      <div>{props.rowData.description} <PercentContainer>{` ${isActiveEvent ? rowDataValue.toLocaleString('ru') : '0'} (${isActiveEvent ? percent : '0'} %)`}</PercentContainer></div>
    );
  },
);

const PercentContainer = styled.span`
  font-family: 'Circe-Regular';
`;

export const WidgetLegend: React.FC<Props> = React.memo(
  (props) => {
    const { height, data } = props;

    // const currentFilterKeys = React.useMemo(() => keyBy(currentFilter, 'type'), [currentFilter]);

    return (
      <LegendBlock height={height}>
        {
          data.map((i, key) => {
            return (
              <LegendItemWrap key = {key}>
                <ColorBlock color = {i.color} />
                <ItemName disabled={!Boolean(i.value)}>
                  <DescriptionComponent rowData={i} data={data} fullData={props.fullData} />
                </ItemName>
              </LegendItemWrap>
            );
          })
        }
      </LegendBlock>
    );
  },
);

const LegendBlock = styled.div<{ height: number }>`
  height: ${({ height }) => `${height}%`};
  width: 90%;
  margin-left: 5%;
  overflow-y: auto;
`;

const LegendItemWrap = styled.div`
  display: inline-block;
  width: 50%;
  margin-bottom: 7px;
`;

const ColorBlock = styled.div<{ color: string }>`
  display: inline-block;
  margin-right: 15px;
  width: 14px;
  height: 14px;
  position: relative;
  top: 2px;
  background-color: ${({ color }) => color};
  border-radius: 3px;
`;

const ItemName = styled.div<ItemNameProps>`
  display: inline-block;
  font-family: ${(props) => props.theme.fonts.family.sidebar.extra };
  color: ${({ theme, disabled }) => (
    disabled ? theme.colors.palette.disableGray : 'inherit'
  )};
`;
