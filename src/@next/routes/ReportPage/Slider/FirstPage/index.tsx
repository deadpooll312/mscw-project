import * as React from 'react';
import { useSelector } from 'react-redux';

import ReportFirstPageContainer from '@next/ui/templates/ReportFirstPageContainer';
import { getFormattedDateWithSpace } from '@next/utils/dates';
import { selectDate } from 'app/store/modules/report/selectors';

const title = (
  <React.Fragment>
    Мониторинг содержания объектов 
    <br/>
    городского хозяйства
  </React.Fragment>
);
const textTwo = (
  <React.Fragment>
    Объединенные данные
    <br/>
    НАШ ГОРОД • ЕДЦ • ОАТИ • ЦАФАП • ЦОДД
  </React.Fragment>
);
const textInfo = 'Учитываются данные о проверках, поступивших с 21:00 дня, предшествующему отчетному, до 21:00 отчетного дня';

const ReportFirstPage: React.FC<{}> = React.memo(
  () => {
    const date = useSelector(selectDate);
    const dateFormat = getFormattedDateWithSpace(date);

    const textOne = `Ежедневная статистика за ${dateFormat} года`;

    return (
      <ReportFirstPageContainer
        title={title}
        textOne={textOne}
        textTwo={textTwo}
        textInfo={textInfo}
      />
    );
  },
);

export default ReportFirstPage;