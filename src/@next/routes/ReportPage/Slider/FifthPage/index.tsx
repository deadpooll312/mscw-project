import * as React from 'react';
import { useSelector } from 'react-redux';

import { DetailTable } from 'components/ReportsWidgets/DetailTable';

import {
  renderDetailTableHeader,
  ParagraphPreWrap,
  H3NoneMargin,
  StyledFifthReportPage,
} from '@next/routes/ReportPage/Slider/FifthPage/styled';

import { tableColumnMeta } from '@next/routes/ReportPage/Slider/FifthPage/constants';

import DefaultReportPageContainer from '@next/ui/templates/DefaultReportPage';
import { getFormattedDate } from '@next/utils/dates';
import { selectDate, selectDataSemanticPageIndexRegionFifth } from 'app/store/modules/report/selectors';

type Props = {};

const ReportFifthPage: React.FC<Props> = React.memo(
  () => {
    const date = useSelector(selectDate);
    const dataRegion = useSelector(selectDataSemanticPageIndexRegionFifth);

    const dateFormat = getFormattedDate(date);

    return (
      <DefaultReportPageContainer page={5}>
        <H3NoneMargin>{`Анализ данных контроля нарушений, учтенных накопленным итого в статистике за ${dateFormat}`}</H3NoneMargin>
        <h5>{'(объект учитывается как проверенный (проверенный с нарушением) в случае, если в течении отчетного периода он был проверен минимум 1 раз (было выявлено минимум 1 нарушение), повторные проверки объекта (повторные нарушения на объекте) в течении отчетного периода не учитываются)'}</h5>
        <br />
        <StyledFifthReportPage>
          <DetailTable
            columns={tableColumnMeta}
            dataSource={dataRegion}
            renderHeader={renderDetailTableHeader}
          />
        </StyledFifthReportPage>
        <ParagraphPreWrap centerText fontSize={9}>
          {'*рассчитывается к общему количеству проверенных объектов из всех источников (Контроль жителей + Ведомственный контроль), т.к. при раздельном расчете источников количество объектов, проверенных жителями = количеству выявленных нарушений (и всегда = 100%)\n'}
          {'**1 место - больше всего нарушений, 11 - меньше всего'}
        </ParagraphPreWrap>
      </DefaultReportPageContainer>
    );
  },
);

export default ReportFifthPage;
