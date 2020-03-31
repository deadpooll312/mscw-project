import * as React from 'react';
import { useSelector } from 'react-redux';

import { Row, RowFlex, LineTitle, BtnSystemWrap } from './styled';
import WidgetsCircle from 'containers/Widgets/Circle';
import WidgetsAreas from 'containers/Widgets/Areas';
import WidgetsLine from 'containers/Widgets/Line';

import { FixSize } from '@next/routes/ReportPage/Slider/styled';
import WidgetsHeader from '@next/ui/templates/AnalyticsHeader';
import { AvalibleCurrentTypes, AvalibleCurrentSystems } from 'app/store/modules/analytics/types';
import AnalyticsPageWidgetButton from '@next/routes/AnalyticsPage/Slider/Widget/Button';
import AnalyticsPageWidgetSystemsButton from '@next/routes/AnalyticsPage/Slider/Widget/SystemsButton';
import { Season, AnalyticsViolationTypes } from 'app/store/modules/@types';
import AnalyticsPageSeasonButton from '@next/routes/AnalyticsPage/Slider/Widget/SeasonButton';
import AnalyticsPageViolationTypeButton from '@next/routes/AnalyticsPage/Slider/Widget/ViolationTypeButton';
import { selectDate } from 'app/store/modules/analytics/selectors';

type Props = {};

const buttonTypes: AvalibleCurrentTypes[] = ['dt', 'odh', 'mkd', 'tpu'];
const buttonSystems: AvalibleCurrentSystems[] = ['ALL', 'CAFAP', 'OATI', 'MGI', 'CODD', 'EDC', 'NG'];
const seasonButtons = [Season.ALL, Season.MIXED, Season.WINTER];
const violationTypeButtons = [AnalyticsViolationTypes.CRT, AnalyticsViolationTypes.ALL];

const AnalyticsPageWidget: React.FC<Props> = React.memo(
  () => {
    const date = useSelector(selectDate);

    return (
      <FixSize>
        <WidgetsHeader currentTime={date}>
          {
            buttonTypes.map((type) => (
              <AnalyticsPageWidgetButton key={type} type={type} />
            ))
          }
          <BtnSystemWrap>
            {
              buttonSystems.map((type) => (
                <AnalyticsPageWidgetSystemsButton key={type} type={type} />
              ))
            }  
          </BtnSystemWrap>
          <BtnSystemWrap>
            {
              seasonButtons.map((type) => (
                <AnalyticsPageSeasonButton key={type} type={type} />
              ))
            }
          </BtnSystemWrap>
          <BtnSystemWrap>
            {
              violationTypeButtons.map((type) => (
                <AnalyticsPageViolationTypeButton key={type} type={type} />
              ))
            }
          </BtnSystemWrap>
        </WidgetsHeader>
        <RowFlex height={405}>
          <WidgetsCircle />
          <WidgetsAreas />
        </RowFlex>
        {/* <Row height={320}> */}
        <Row height={380}>
          <LineTitle>Объекты с нарушениями по округам</LineTitle>
          <WidgetsLine />
        </Row>
      </FixSize>
    );
  },
);

export default AnalyticsPageWidget;
