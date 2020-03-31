import * as React from 'react';

import { Row, Column, Value, Description, ColumnTitle } from '@next/routes/ReportPage/Slider/SecondPage/styled';
import { valueWithplusOrMinus } from '@next/utils/common';
import { useStyledTheme } from 'styles/themes/hooks';

type Props = {
  colors: {
    greenColor: {
      color: string;
    };
    orangeColor: {
      color: string;
    };
    redColor: {
      color: string;
    };
  };
  delta: {
    checkedObject: number;
    violationObject: number;
    violationChecksCitizen: number;
    violationCheckGov: number;
    violationCheckGovAndCitizen: number;
    violationCritical: number;
  };
};

const DeltaDayColumn: React.FC<Props> = React.memo(
  (props) => {
    const { colors, delta } = props;
    const { greenColor, orangeColor, redColor } = colors;
    const theme = useStyledTheme();

    return (
      <Column>
        <ColumnTitle textColor={theme.colors.dashboardCard.defaultText}>ИЗМЕНЕНИЯ:</ColumnTitle>
        <Row>
          <Value textColor={greenColor.color}>
            { valueWithplusOrMinus(delta.checkedObject) }
          </Value>
          <Description>
            Объектов проверено
          </Description>
        </Row>
        <Row>
          <Value textColor={orangeColor.color}>
            { valueWithplusOrMinus(delta.violationObject) }
          </Value>
          <Description>
            Объектов с нарушениями
          </Description>
        </Row>
        <Row>
          <Value textColor={theme.colors.dashboardCard.defaultText} fontSize={1.5}>
            { valueWithplusOrMinus(delta.violationChecksCitizen) }
          </Value>
          <Description fontSize={1}>
            Объектов с нарушениями <br /> <b>Контроль жителей</b>
          </Description>
        </Row>
        <Row>
          <Value textColor={theme.colors.dashboardCard.defaultText} fontSize={1.5}>
            { valueWithplusOrMinus(delta.violationCheckGov) }
          </Value>
          <Description fontSize={1}>
            Объектов с нарушениями <br /> <b>Ведомственный контроль</b>
          </Description>
        </Row>
        <Row>
          <Value textColor={theme.colors.dashboardCard.defaultText} fontSize={1.5}>
            { valueWithplusOrMinus(delta.violationCheckGovAndCitizen) }
          </Value>
          <Description fontSize={1}>
            Объектов с нарушениями <br /> <b>Контроль жителей + <br /> Ведомственный контроль</b>
          </Description>
        </Row>
        <Row>
          <Value textColor={redColor.color}>
            { valueWithplusOrMinus(delta.violationCritical) }
          </Value>
          <Description>
            Объектов с критичными нарушениями
          </Description>
        </Row>
      </Column>
    );
  },
);

export default DeltaDayColumn;
